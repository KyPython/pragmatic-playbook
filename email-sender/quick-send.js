#!/usr/bin/env node

/**
 * Quick script to send first email to interested contacts
 * Usage: node quick-send.js <email1> <email2> ...
 * Or: node quick-send.js --file contacts.txt
 */

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

if (!HUBSPOT_API_KEY) {
  console.error('❌ HUBSPOT_API_KEY not set. Add it to .env file.');
  process.exit(1);
}

// First email from course launch sequence
const FIRST_EMAIL = {
  subject: 'Welcome to The Founder\'s Infrastructure Playbook',
  body: `Hi [Name],

Welcome! You've taken the first step toward building production-grade infrastructure.

Over the next 8 weeks, you'll learn:
- How to detect technical debt before it costs $50k
- How to build MVPs in 2 weeks instead of 3 months
- How to deploy on Friday 5 PM without fear

**Your first project is ready:** Navigate to \`projects/01-broken-windows\` and start identifying technical debt.

Questions? Just reply to this email.

Let's build something great,
[Your Name]`
};

async function findOrCreateContact(email) {
  try {
    // Try to find existing contact
    const response = await axios.get(
      `${HUBSPOT_API_URL}/contacts/v1/contact/email/${encodeURIComponent(email)}/profile`,
      {
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`
        }
      }
    );
    return response.data.vid;
  } catch (error) {
    if (error.response?.status === 404) {
      // Create new contact
      const response = await axios.post(
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
      return response.data.vid;
    }
    throw error;
  }
}

async function addToWorkflow(email, workflowId) {
  try {
    const contactId = await findOrCreateContact(email);
    
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
    if (error.response?.status === 409) {
      // Already enrolled
      return { success: true, message: 'Already enrolled' };
    }
    return { success: false, error: error.response?.data?.message || error.message };
  }
}

async function main() {
  let emails = [];
  
  if (process.argv[2] === '--file' && process.argv[3]) {
    // Read from file
    const fileContent = fs.readFileSync(process.argv[3], 'utf8');
    emails = fileContent.split('\n')
      .map(line => line.trim())
      .filter(line => line && line.includes('@'));
  } else {
    // Get emails from command line
    emails = process.argv.slice(2).filter(arg => arg.includes('@'));
  }
  
  if (emails.length === 0) {
    console.log('Usage:');
    console.log('  node quick-send.js <email1> <email2> ...');
    console.log('  node quick-send.js --file contacts.txt');
    console.log('\nExample:');
    console.log('  node quick-send.js founder@startup.com');
    console.log('  node quick-send.js --file interested-contacts.txt');
    process.exit(1);
  }
  
  console.log(`📧 Sending welcome email to ${emails.length} contact(s)\n`);
  
  if (process.env.HUBSPOT_WORKFLOW_ID) {
    console.log('✅ Using HubSpot workflow for automated sequence\n');
    
    for (const email of emails) {
      console.log(`Processing: ${email}`);
      const result = await addToWorkflow(email, process.env.HUBSPOT_WORKFLOW_ID);
      
      if (result.success) {
        console.log(`  ✅ Enrolled in workflow`);
        console.log(`  📅 Emails will be sent automatically\n`);
      } else {
        console.log(`  ❌ Error: ${result.error}\n`);
      }
    }
  } else {
    console.log('⚠️  HUBSPOT_WORKFLOW_ID not set.');
    console.log('   Contacts will be added to HubSpot, but emails must be sent manually.');
    console.log('   See setup-workflow.md to configure automated sequences.\n');
    
    for (const email of emails) {
      console.log(`Processing: ${email}`);
      try {
        const contactId = await findOrCreateContact(email);
        console.log(`  ✅ Contact added/updated (ID: ${contactId})`);
        console.log(`  📝 Send email manually from HubSpot or set up workflow\n`);
      } catch (error) {
        console.log(`  ❌ Error: ${error.message}\n`);
      }
    }
  }
  
  console.log(`\n✅ Done! Processed ${emails.length} contact(s)`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Check HubSpot to verify contacts`);
  console.log(`   2. Set up workflow (see setup-workflow.md)`);
  console.log(`   3. Or send emails manually from HubSpot`);
}

main().catch(console.error);

