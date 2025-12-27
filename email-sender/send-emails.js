require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

if (!HUBSPOT_API_KEY) {
  console.error('❌ HUBSPOT_API_KEY not set in .env file');
  process.exit(1);
}

// Parse email sequence markdown
function parseEmailSequence(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const emails = [];
  
  // Split by email headers (## Email X:)
  const emailSections = content.split(/^## Email \d+:/m);
  
  emailSections.forEach((section, index) => {
    if (index === 0) return; // Skip header section
    
    const lines = section.trim().split('\n');
    const email = {
      subject: '',
      body: '',
      day: null
    };
    
    let currentField = null;
    let bodyLines = [];
    
    lines.forEach(line => {
      if (line.startsWith('**Subject:**')) {
        email.subject = line.replace('**Subject:**', '').trim();
      } else if (line.startsWith('**Day')) {
        const dayMatch = line.match(/Day (\d+)/);
        if (dayMatch) {
          email.day = parseInt(dayMatch[1]);
        }
      } else if (line.startsWith('---')) {
        // End of email
      } else if (line.trim()) {
        bodyLines.push(line);
      }
    });
    
    email.body = bodyLines.join('\n').trim();
    
    if (email.subject && email.body) {
      emails.push(email);
    }
  });
  
  return emails;
}

// Send email via HubSpot
async function sendEmailToContact(contactEmail, subject, body) {
  try {
    // First, find or create contact
    const contactId = await findOrCreateContact(contactEmail);
    
    // Create email in HubSpot
    const emailResponse = await axios.post(
      `${HUBSPOT_API_URL}/marketing/v3/transactional/single-email/send`,
      {
        emailId: process.env.HUBSPOT_EMAIL_ID || 'default', // You'll need to create an email template in HubSpot
        message: {
          to: contactEmail,
          subject: subject,
          htmlBody: convertMarkdownToHTML(body)
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return { success: true, contactId, emailId: emailResponse.data.id };
  } catch (error) {
    console.error(`Error sending email to ${contactEmail}:`, error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}

// Alternative: Use HubSpot workflows (recommended)
async function addContactToWorkflow(contactEmail, workflowId) {
  try {
    const contactId = await findOrCreateContact(contactEmail);
    
    await axios.post(
      `${HUBSPOT_API_URL}/automation/v3/workflows/${workflowId}/enrollments/contacts/${contactId}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return { success: true, contactId };
  } catch (error) {
    console.error(`Error adding to workflow:`, error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}

// Find or create contact
async function findOrCreateContact(email) {
  try {
    // Try to find existing contact
    const searchResponse = await axios.get(
      `${HUBSPOT_API_URL}/contacts/v1/contact/email/${encodeURIComponent(email)}/profile`,
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`
        }
      }
    );
    
    return searchResponse.data.vid;
  } catch (error) {
    if (error.response?.status === 404) {
      // Create new contact
      const createResponse = await axios.post(
        `${HUBSPOT_API_URL}/contacts/v1/contact`,
        {
          properties: [
            { property: 'email', value: email },
            { property: 'lifecyclestage', value: 'subscriber' }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return createResponse.data.vid;
    }
    throw error;
  }
}

// Convert markdown to HTML
function convertMarkdownToHTML(markdown) {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  
  return `<p>${html}</p>`;
}

// Main function
async function main() {
  const sequenceType = process.argv[2] || 'launch';
  
  const sequenceFiles = {
    launch: '../emails/01-course-launch-sequence.md',
    consulting: '../emails/02-consulting-outreach.md',
    nurture: '../emails/03-nurture-sequence.md'
  };
  
  const filePath = path.join(__dirname, sequenceFiles[sequenceType]);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Email sequence file not found: ${filePath}`);
    process.exit(1);
  }
  
  console.log(`📧 Loading email sequence: ${sequenceType}`);
  const emails = parseEmailSequence(filePath);
  console.log(`✅ Found ${emails.length} emails in sequence\n`);
  
  // Get contact emails (from command line or file)
  let contacts = [];
  
  if (process.argv[3]) {
    // Single email from command line
    contacts = [process.argv[3]];
  } else if (process.argv[3] === '--file' && process.argv[4]) {
    // List of emails from file
    const fileContent = fs.readFileSync(process.argv[4], 'utf8');
    contacts = fileContent.split('\n')
      .map(line => line.trim())
      .filter(line => line && line.includes('@'));
  } else {
    console.log('Usage:');
    console.log('  node send-emails.js <sequence> <email>');
    console.log('  node send-emails.js <sequence> --file <emails.txt>');
    console.log('\nSequences: launch, consulting, nurture');
    console.log('\nExample:');
    console.log('  node send-emails.js launch user@example.com');
    console.log('  node send-emails.js launch --file contacts.txt');
    process.exit(1);
  }
  
  console.log(`📬 Sending to ${contacts.length} contact(s)\n`);
  
  // For each contact, enroll in workflow or send first email
  for (const email of contacts) {
    console.log(`\n📧 Processing: ${email}`);
    
    // Option 1: Add to HubSpot workflow (RECOMMENDED)
    // You'll need to create a workflow in HubSpot first
    if (process.env.HUBSPOT_WORKFLOW_ID) {
      const result = await addContactToWorkflow(email, process.env.HUBSPOT_WORKFLOW_ID);
      if (result.success) {
        console.log(`  ✅ Added to workflow (contact ID: ${result.contactId})`);
        console.log(`  📅 Emails will be sent automatically based on workflow schedule`);
      } else {
        console.log(`  ❌ Failed: ${result.error}`);
      }
    } else {
      // Option 2: Send first email immediately
      const firstEmail = emails[0];
      const result = await sendEmailToContact(email, firstEmail.subject, firstEmail.body);
      
      if (result.success) {
        console.log(`  ✅ Email sent successfully`);
        console.log(`  📝 Subject: ${firstEmail.subject}`);
      } else {
        console.log(`  ❌ Failed: ${result.error}`);
      }
    }
  }
  
  console.log(`\n✅ Done! Processed ${contacts.length} contact(s)`);
  console.log(`\n💡 Tip: Set up HubSpot workflows for automated email sequences`);
}

main().catch(console.error);

