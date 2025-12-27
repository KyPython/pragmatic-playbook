import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Success! Check your email for next steps.' });
        setEmail('');
        setFirstName('');
        setLastName('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Infrastructure Consulting | The Founder's Infrastructure Playbook</title>
        <meta name="description" content="Infrastructure consulting for Seed/Series A startups. Recover $50K+ in lost velocity. Deploy with confidence. Scale your team without breaking things." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* HubSpot Embed Code */}
      <Script
        id="hs-script-loader"
        strategy="afterInteractive"
        src="https://js-na2.hs-scripts.com/243698495.js"
      />

      <main className="container">
        <div className="hero">
          <h1 className="title">
            Recover $50K+ in Lost Velocity
          </h1>
          <p className="subtitle">
            Infrastructure consulting for Seed/Series A startups. Deploy on Friday 5 PM with confidence.
          </p>
          <div className="cta-buttons">
            <a href="#consulting" className="btn btn-primary">
              View Services
            </a>
            <a href="#contact" className="btn btn-secondary">
              Book a Call
            </a>
          </div>
        </div>

        <section id="problem" className="problem">
          <h2>Your Team Used to Ship 1 Feature/Week. Now It Takes 3 Weeks.</h2>
          <p>
            I see this all the time. Your team has shipped for 6+ months, and now:
          </p>
          <ul>
            <li>Features take 2-3 weeks instead of 2 days</li>
            <li>Deployments are risky (only Monday mornings)</li>
            <li>New engineers take 2+ weeks to onboard</li>
            <li>Production bugs discovered days later</li>
            <li>Team velocity is declining</li>
          </ul>
          <p className="highlight">
            <strong>The Math:</strong> Every $1 of technical debt costs $3–5 in future development time.
          </p>
          <p className="math">
            If you've shipped for 6+ months, you're probably losing <strong>$5K–$20K per month</strong> to technical debt.
          </p>
        </section>

        <section id="consulting" className="services">
          <h2>Infrastructure Consulting Services</h2>
          <p className="section-intro">
            I help Seed/Series A startups recover lost velocity and deploy with confidence.
          </p>
          
          <div className="service-grid">
            <div className="service-card">
              <h3>Technical Audit</h3>
              <div className="price">$1,500</div>
              <p className="duration">4 hours</p>
              <ul>
                <li>Codebase analysis</li>
                <li>Technical debt inventory</li>
                <li>Cost estimates ($50K+ typically found)</li>
                <li>Prioritized improvement roadmap</li>
                <li>90-day action plan</li>
              </ul>
              <p className="deliverable">
                <strong>I deliver:</strong> 10-page technical audit report
              </p>
            </div>

            <div className="service-card featured">
              <div className="badge">Most Popular</div>
              <h3>Architecture Review</h3>
              <div className="price">$2,500</div>
              <p className="duration">8 hours</p>
              <ul>
                <li>Deep architectural analysis</li>
                <li>Scaling strategy</li>
                <li>Data model optimization</li>
                <li>Performance analysis</li>
                <li>Team interviews</li>
              </ul>
              <p className="deliverable">
                <strong>I deliver:</strong> 15-page architecture assessment + roadmap
              </p>
            </div>

            <div className="service-card">
              <h3>CI/CD Implementation</h3>
              <div className="price">$3,000</div>
              <p className="duration">12 hours</p>
              <ul>
                <li>GitHub Actions setup</li>
                <li>Automated testing</li>
                <li>Monitoring (Sentry)</li>
                <li>Rollback procedures</li>
                <li>Team training</li>
              </ul>
              <p className="deliverable">
                <strong>I deliver:</strong> Deploy in 8 minutes, rollback in 2 minutes
              </p>
            </div>
          </div>

          <div className="service-grid">
            <div className="service-card">
              <h3>Testing Workshop</h3>
              <div className="price">$2,000</div>
              <p className="duration">4 hours</p>
              <ul>
                <li>Testing strategy</li>
                <li>Live implementation</li>
                <li>CI/CD setup</li>
                <li>30-day action plan</li>
              </ul>
              <p className="deliverable">
                <strong>I deliver:</strong> 70% code coverage in one week
              </p>
            </div>

            <div className="service-card">
              <h3>Refactoring Sprint</h3>
              <div className="price">$3,500</div>
              <p className="duration">15 hours</p>
              <ul>
                <li>Deep code analysis</li>
                <li>Hands-on refactoring</li>
                <li>Pair programming sessions</li>
                <li>Documentation</li>
              </ul>
              <p className="deliverable">
                <strong>I deliver:</strong> One module goes from nightmare to manageable
              </p>
            </div>
          </div>
        </section>

        <section className="results">
          <h2>Real Results</h2>
          <div className="results-grid">
            <div className="result-card">
              <div className="result-number">$180K</div>
              <div className="result-label">Recovered Annually</div>
              <p>I helped a Series A startup reduce deployment time from 1.5 hours to 8 minutes. Features now ship in 2 days instead of 3 weeks.</p>
            </div>
            <div className="result-card">
              <div className="result-number">70%</div>
              <div className="result-label">Code Coverage</div>
              <p>I helped a team achieve this in one week. Automated testing now catches 90% of bugs before production.</p>
            </div>
            <div className="result-card">
              <div className="result-number">2 min</div>
              <div className="result-label">Rollback Time</div>
              <p>I set this up for teams so they can deploy on Friday 5 PM with confidence. Rollback in 2 minutes if something breaks.</p>
            </div>
          </div>
        </section>

        <section id="signup" className="signup">
          <h2>Get Free Infrastructure Resources</h2>
          <p>I share weekly insights, case studies, and practical guides on building production-grade infrastructure.</p>
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-input"
              />
            </div>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
            <button type="submit" disabled={submitting} className="btn btn-primary btn-large">
              {submitting ? 'Signing up...' : 'Get Free Resources'}
            </button>
            <p className="form-note">
              No spam. Unsubscribe anytime. I respect your inbox.
            </p>
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}
          </form>
        </section>

        <section id="contact" className="contact">
          <h2>Ready to Recover Lost Velocity?</h2>
          <p>Let's discuss how I can help your team ship faster and deploy with confidence.</p>
          <div className="contact-buttons">
            <a href="https://calendly.com/kyjahn-smith/consultation" className="btn btn-primary btn-large">
              Book a Free 15-Minute Call
            </a>
            <a href="mailto:hello@foundersinfra.com" className="btn btn-secondary btn-large">
              Email Me
            </a>
          </div>
          <p className="contact-note">
            Or reply to any email - I read every message.
          </p>
        </section>

        <footer>
          <p>&copy; {new Date().getFullYear()} The Founder's Infrastructure Playbook</p>
          <p>
            <a href="https://foundersinfra.com">foundersinfra.com</a>
          </p>
        </footer>
      </main>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          background: #fff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero {
          text-align: center;
          padding: 80px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          margin: 40px 0;
        }

        .title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 24px;
          margin-bottom: 40px;
          opacity: 0.95;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 16px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 18px;
          transition: transform 0.2s, box-shadow 0.2s;
          display: inline-block;
          border: none;
          cursor: pointer;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background: white;
          color: #667eea;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: white;
          color: #667eea;
        }

        .contact .btn-secondary {
          color: #667eea;
          border: 2px solid #667eea;
        }

        .contact .btn-secondary:hover {
          background: #667eea;
          color: white;
        }

        .btn-large {
          padding: 20px 40px;
          font-size: 20px;
        }

        section {
          padding: 60px 20px;
          margin: 40px 0;
        }

        h2 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #333;
          text-align: center;
          line-height: 1.2;
        }

        h3 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #667eea;
        }

        .problem {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 40px;
          margin: 40px 0;
        }

        .problem h2 {
          margin-bottom: 20px;
        }

        .problem p {
          margin: 15px 0;
          font-size: 16px;
          line-height: 1.6;
        }

        .problem ul {
          margin: 20px 0;
          padding-left: 30px;
          list-style: none;
        }

        .problem li {
          margin: 10px 0;
          padding-left: 20px;
          position: relative;
        }

        .problem li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #667eea;
          font-weight: bold;
          font-size: 20px;
        }

        .highlight {
          background: #fff3cd;
          padding: 20px;
          border-left: 4px solid #ffc107;
          border-radius: 4px;
          margin: 20px 0;
          font-weight: 500;
        }

        .math {
          background: #d1ecf1;
          padding: 20px;
          border-left: 4px solid #0c5460;
          border-radius: 4px;
          margin: 20px 0;
        }

        .services {
          text-align: center;
        }

        .section-intro {
          font-size: 20px;
          color: #666;
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .service-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 12px;
          text-align: left;
          position: relative;
          border: 2px solid transparent;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .service-card.featured {
          border-color: #667eea;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .badge {
          position: absolute;
          top: -12px;
          right: 20px;
          background: #667eea;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .price {
          font-size: 36px;
          font-weight: 700;
          color: #667eea;
          margin: 10px 0;
        }

        .duration {
          color: #666;
          margin-bottom: 20px;
        }

        .service-card ul {
          list-style: none;
          margin: 20px 0;
        }

        .service-card li {
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
        }

        .service-card li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #667eea;
          font-weight: bold;
        }

        .deliverable {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 14px;
        }

        .results {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 40px;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .result-card {
          background: white;
          padding: 30px;
          border-radius: 8px;
          text-align: center;
        }

        .result-number {
          font-size: 48px;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 10px;
        }

        .result-label {
          font-size: 18px;
          font-weight: 600;
          color: #666;
          margin-bottom: 15px;
        }

        .signup {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          padding: 60px 40px;
          text-align: center;
        }

        .signup h2 {
          color: white;
        }

        .signup-form {
          max-width: 500px;
          margin: 30px auto 0;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        .form-input {
          width: 100%;
          padding: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          font-size: 16px;
          background: rgba(255,255,255,0.1);
          color: white;
          margin-bottom: 15px;
        }

        .form-input::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .form-input:focus {
          outline: none;
          border-color: white;
          background: rgba(255,255,255,0.2);
        }

        .form-note {
          margin-top: 15px;
          font-size: 14px;
          opacity: 0.9;
          font-style: italic;
          color: rgba(255,255,255,0.9);
        }

        .message {
          margin-top: 15px;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
        }

        .message.success {
          background: rgba(255,255,255,0.2);
          color: white;
        }

        .message.error {
          background: rgba(255,0,0,0.2);
          color: white;
        }

        .contact {
          text-align: center;
          padding: 60px 20px;
          background: #f8f9fa;
          border-radius: 12px;
          margin: 40px 0;
        }

        .contact-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin: 30px 0;
        }

        .contact-note {
          color: #666;
          font-size: 14px;
          margin-top: 20px;
          font-style: italic;
        }

        footer {
          text-align: center;
          padding: 40px 20px;
          color: #666;
          border-top: 1px solid #e0e0e0;
          margin-top: 60px;
        }

        footer a {
          color: #667eea;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 32px;
          }

          .subtitle {
            font-size: 20px;
          }

          .cta-buttons, .contact-buttons {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            text-align: center;
          }

          h2 {
            font-size: 28px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .service-grid, .results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
