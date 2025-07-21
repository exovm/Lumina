import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Feed from './Feed';
import MusicPlayer from './MusicPlayer';

function Profile() {
  return (
    <div className="card">
      <h2>Profile</h2>
      <p>This is your profile page. More features coming soon!</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="card">
      <h2>404</h2>
      <p>Page not found.</p>
    </div>
  );
}

function Legal() {
  return (
    <div className="card">
      <h2>Legal</h2>
      <p>This is the legal information for Lumina. (Replace with your actual legal text.)</p>
    </div>
  );
}
function Terms() {
  return (
    <div className="card" style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Terms of Service</h2>
      <p><strong>Last Updated: July 21, 2025</strong></p>
      <p>Welcome to Lumina ("we," "us," "our," or the "Platform"). These Terms of Service ("Terms") govern your access to and use of our website, mobile applications, and related services (collectively, the "Service"). By creating an account, accessing, or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.</p>
      <ol style={{ paddingLeft: 20 }}>
        <li><strong>Eligibility</strong><br />You must be at least 13 years old (or the minimum age in your jurisdiction) to use the Service. By using the Service, you represent and warrant that you meet this age requirement and have the legal capacity to enter into this agreement.</li>
        <li><strong>Account Registration</strong><br />To use certain features, you must create an account and provide accurate, current, and complete information.<br />You are responsible for safeguarding your account credentials and for all activity under your account.<br />You agree to notify us immediately of any unauthorized use of your account or security breach.</li>
        <li><strong>Access to Your Email and Contacts</strong><br />With your explicit consent, we may access your email account or contacts to provide enhanced services such as importing contacts, suggesting connections, or sending notifications.<br />We will only access the minimum information necessary for these purposes.<br />You may revoke this permission at any time through your account settings or by contacting us.<br />We will never send emails on your behalf without your consent.<br />Your email credentials are not stored by us; access is managed securely via authorized protocols (e.g., OAuth).</li>
        <li><strong>User Content</strong><br />You retain ownership of all content you post, upload, or share on the Platform ("User Content").<br />By posting User Content, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with providing and promoting the Service.<br />You represent that you have all necessary rights to your User Content and that it does not infringe the rights of any third party.<br />We reserve the right, but are not obligated, to remove or disable access to User Content that violates these Terms or is otherwise objectionable.</li>
        <li><strong>Acceptable Use Policy</strong><br />You agree not to use the Service to:<ul><li>Post or transmit content that is unlawful, harmful, defamatory, obscene, abusive, hateful, harassing, or invasive of privacy.</li><li>Engage in fraudulent, misleading, or deceptive conduct.</li><li>Upload viruses or other malicious code.</li><li>Attempt to gain unauthorized access to other users' accounts or our systems.</li><li>Spam, solicit, or advertise without our permission.</li></ul></li>
        <li><strong>Privacy and Data Collection</strong><br />Our Privacy Policy explains how we collect, use, and protect your personal data. By using the Service, you consent to our Privacy Policy and data practices.<br />We collect information you provide directly and automatically through your use of the Service, including device information, usage data, and location data.<br />If you connect your email account, we may collect email addresses, contact names, and other relevant information solely to provide the features you have authorized.<br />We do not sell your personal information to third parties.</li>
        <li><strong>Notifications and Communications</strong><br />By creating an account, you agree to receive service-related emails and push notifications.<br />You may opt out of promotional communications at any time, but you cannot opt out of essential service communications necessary for your account.</li>
        <li><strong>Third-Party Services</strong><br />The Service may integrate with third-party services (such as email providers or social media networks).<br />Your use of these third-party services is governed by their terms, and we are not responsible for their actions.<br />You consent to sharing your information with third parties as needed to provide these integrations.</li>
        <li><strong>Intellectual Property</strong><br />All content and materials on the Service, excluding User Content, are owned by or licensed to us and protected by copyright, trademark, and other laws.<br />You may not copy, modify, distribute, sell, or lease any part of the Service without our written permission.</li>
        <li><strong>Termination and Suspension</strong><br />We reserve the right to suspend or terminate your account and access to the Service for violations of these Terms or other policies.<br />Upon termination, your right to use the Service immediately ceases, but these Terms and your obligations shall survive termination.</li>
        <li><strong>Disclaimers and Limitation of Liability</strong><br />The Service is provided "as is" without warranties of any kind, express or implied.<br />We do not guarantee the accuracy, reliability, or availability of the Service.<br />To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Service.</li>
        <li><strong>Indemnification</strong><br />You agree to indemnify, defend, and hold harmless exovm, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, liabilities, costs, or expenses arising from your use of the Service or violation of these Terms.</li>
        <li><strong>Changes to the Terms</strong><br />We may update these Terms at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Service after changes constitutes acceptance of the new Terms.</li>
        <li><strong>Governing Law and Dispute Resolution</strong><br />These Terms are governed by the laws of your jurisdiction.<br />Any disputes arising out of or related to these Terms or the Service will be resolved through binding arbitration in your location, except that either party may seek injunctive relief in a court of competent jurisdiction.</li>
        <li><strong>Entire Agreement</strong><br />These Terms and our Privacy Policy constitute the entire agreement between you and us regarding the Service and supersede any prior agreements.</li>
        <li><strong>Contact Information</strong><br />If you have questions or concerns about these Terms, please contact us at:<br />discordtufe@gmail.com</li>
      </ol>
      <p>By using Lumina, you acknowledge that you have read, understood, and agree to these Terms of Service.</p>
    </div>
  );
}

function Privacy() {
  return (
    <div className="card" style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Privacy Policy</h2>
      <p><strong>Last Updated: July 21, 2025</strong></p>
      <p>At Lumina (“we,” “us,” or “our”), your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile applications, and related services (collectively, the “Service”). Please read this policy carefully. By accessing or using the Service, you consent to the data practices described herein.</p>
      <ol style={{ paddingLeft: 20 }}>
        <li><strong>Information We Collect</strong>
          <ol type="a">
            <li><strong>Information You Provide Directly</strong><br />
              <ul>
                <li><strong>Account Information:</strong> When you register, we collect your name, email address, username, password, profile picture, and other profile information you provide.</li>
                <li><strong>User Content:</strong> Any content you post, upload, share, or send through the Service.</li>
                <li><strong>Communication:</strong> If you contact us, we may keep a record of your correspondence.</li>
              </ul>
            </li>
            <li><strong>Information Collected Automatically</strong><br />
              <ul>
                <li><strong>Usage Data:</strong> Information about how you use the Service, such as pages visited, features used, log-in times, and interactions.</li>
                <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address, and unique device identifiers.</li>
                <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to improve your experience, analyze usage, and provide personalized content.</li>
              </ul>
            </li>
            <li><strong>Email and Contacts Information</strong><br />
              <ul>
                <li><strong>With Your Consent:</strong> If you choose to link your email account, we may access your email address book and contacts to help you connect with friends and suggest contacts.</li>
                <li><strong>Scope:</strong> We access only the necessary contact information, such as names and email addresses, and do not store your email account passwords.</li>
                <li><strong>Your Control:</strong> You can revoke this permission at any time via your account settings or by contacting us.</li>
              </ul>
            </li>
          </ol>
        </li>
        <li><strong>How We Use Your Information</strong><br />
          We use the information we collect to:
          <ul>
            <li>Provide, maintain, and improve the Service.</li>
            <li>Personalize your experience and suggest connections or content.</li>
            <li>Communicate with you, including service announcements and updates.</li>
            <li>Protect against fraud, abuse, and unauthorized use.</li>
            <li>Comply with legal obligations and enforce our Terms of Service.</li>
          </ul>
        </li>
        <li><strong>Sharing Your Information</strong><br />
          We do not sell your personal information. We may share your information with:
          <ul>
            <li><strong>Service Providers:</strong> Trusted third-party vendors who help operate our Service, under confidentiality agreements.</li>
            <li><strong>Legal Compliance:</strong> When required by law, regulation, legal process, or governmental request.</li>
            <li><strong>Business Transfers:</strong> If we merge, acquire, or sell assets, your information may be transferred as part of that transaction.</li>
            <li><strong>With Your Consent:</strong> When you explicitly agree to share information with third parties.</li>
          </ul>
        </li>
        <li><strong>Cookies and Tracking Technologies</strong><br />
          We use cookies, web beacons, pixel tags, and similar technologies to collect information about your interactions with the Service. Cookies are small data files placed on your device that help us recognize you and remember your preferences.<br />
          <strong>Types of Cookies We Use:</strong>
          <ul>
            <li><strong>Essential Cookies:</strong> Necessary for the operation of the Service (e.g., login, security).</li>
            <li><strong>Performance Cookies:</strong> Help us understand how you use the Service and improve it.</li>
            <li><strong>Functionality Cookies:</strong> Remember your preferences and settings.</li>
            <li><strong>Advertising and Analytics Cookies:</strong> Collect data to personalize ads and measure their effectiveness.</li>
          </ul>
          <strong>Your Choices:</strong> You can control or disable cookies through your browser settings, but this may affect your ability to use certain features of the Service.
        </li>
        <li><strong>Data Security</strong><br />
          We implement reasonable administrative, technical, and physical safeguards to protect your information from unauthorized access, disclosure, or destruction. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
        </li>
        <li><strong>Data Retention</strong><br />
          We retain your information for as long as necessary to provide the Service, comply with legal obligations, resolve disputes, and enforce our agreements.
        </li>
        <li><strong>Your Rights and Choices</strong>
          <ol type="a">
            <li><strong>Access, Correction, and Deletion:</strong> You may access, correct, update, or delete your personal information by accessing your account settings or contacting us.</li>
            <li><strong>Email Communications:</strong> You can opt out of promotional emails at any time by following the unsubscribe instructions in the emails. Essential service emails cannot be opted out of.</li>
            <li><strong>Revoke Email Access:</strong> You can disconnect your email account access at any time through your account settings or by contacting us.</li>
          </ol>
        </li>
        <li><strong>GDPR Rights (For Users in the European Economic Area)</strong><br />
          If you are located in the European Economic Area, you have the following rights under the General Data Protection Regulation (GDPR):
          <ul>
            <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data, subject to legal exceptions.</li>
            <li><strong>Right to Restrict Processing:</strong> Request limitations on how we use your data.</li>
            <li><strong>Right to Data Portability:</strong> Request your data in a portable format.</li>
            <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing.</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
          </ul>
          To exercise these rights, please contact us at discordtufe@gmail.com.
        </li>
        <li><strong>CCPA Rights (For California Residents)</strong><br />
          If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
          <ul>
            <li><strong>Right to Know:</strong> Request details about the categories and specific pieces of personal information we collect and share.</li>
            <li><strong>Right to Delete:</strong> Request deletion of your personal information, subject to exceptions.</li>
            <li><strong>Right to Opt-Out:</strong> Direct us not to sell your personal information (we do not sell your information).</li>
            <li><strong>Non-Discrimination:</strong> You will not be discriminated against for exercising your CCPA rights.</li>
          </ul>
          To submit a request under the CCPA, please contact us at discordtufe@gmail.com.
        </li>
        <li><strong>Children’s Privacy</strong><br />
          Our Service is not directed to children under 13 (or the applicable minimum age in your jurisdiction). We do not knowingly collect personal information from children under this age. If we learn we have collected such information, we will delete it promptly.
        </li>
        <li><strong>International Users</strong><br />
          If you access our Service from outside your jurisdiction, your information may be transferred to and processed in your jurisdiction or other countries. By using the Service, you consent to such transfers.
        </li>
        <li><strong>Changes to This Privacy Policy</strong><br />
          We may update this Privacy Policy from time to time. We will notify you by posting the updated policy with a new "Last Updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
        </li>
        <li><strong>Contact Us</strong><br />
          If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:<br />
          discordtufe@gmail.com
        </li>
      </ol>
      <p>Thank you for trusting Lumina with your personal information. Protecting your privacy is our priority.</p>
    </div>
  );
}

function AdBlockBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // AdBlock detection: try to load a fake ad script
    const bait = document.createElement('div');
    bait.className = 'adsbox';
    bait.style.height = '1px';
    bait.style.position = 'absolute';
    bait.style.left = '-9999px';
    document.body.appendChild(bait);
    setTimeout(() => {
      if (window.getComputedStyle(bait).display === 'none' || bait.offsetHeight === 0) {
        setShow(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      } else {
        document.body.style.overflow = '';
      }
      document.body.removeChild(bait);
    }, 100);
    return () => { document.body.style.overflow = ''; };
  }, []);
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 3000,
      background: 'rgba(20,20,20,0.98)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: '1.3rem', textAlign: 'center',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        background: 'rgba(255,0,0,0.92)',
        color: '#fff',
        borderRadius: '1.5rem',
        padding: '2.5rem 2rem',
        boxShadow: '0 8px 32px 0 #f00a',
        maxWidth: 480,
        border: '2px solid #fff',
      }}>
        <span style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'block', textShadow: '0 0 16px #f00' }}>Ad Blocker Detected</span>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Lumina requires ads to function and support our platform. Please disable your ad blocker and reload the page to continue using the site.
        </p>
        <p style={{ fontSize: '1rem', color: '#fff', opacity: 0.8 }}>
          After disabling your ad blocker, refresh this page.
        </p>
      </div>
    </div>
  );
}

function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('lumina_cookie_consent')) {
      setShow(true);
    }
  }, []);
  const accept = () => {
    localStorage.setItem('lumina_cookie_consent', 'true');
    setShow(false);
  };
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 2000,
      background: 'rgba(0,0,0,0.92)', color: '#fff', textAlign: 'center', padding: '1rem',
      fontWeight: 500, fontSize: '1rem', boxShadow: '0 -2px 16px #00ffff88',
    }}>
      <span>
        Lumina uses cookies to enhance your experience. By continuing to use the site, you consent to our use of cookies. <a href="/privacy" style={{ color: '#00ffff', textDecoration: 'underline' }}>Learn more</a>.
      </span>
      <button onClick={accept} style={{ marginLeft: 20, background: '#00ffff', color: '#000', border: 'none', borderRadius: 8, padding: '0.3rem 1rem', cursor: 'pointer', fontWeight: 700 }}>Accept</button>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Router>
      <AdBlockBanner />
      <CookieConsent />
      <div className="container">
        <header>
          <h1>Lumina</h1>
          <p>Welcome to your futuristic social media platform!</p>
          <nav style={{ margin: '1rem 0' }}>
            <Link to="/" style={{ marginRight: '1.5rem' }}>Home</Link>
            <Link to="/profile" style={{ marginRight: '1.5rem' }}>Profile</Link>
            {!isLoggedIn && <Link to="/signup" style={{ marginRight: '1.5rem' }}>Sign Up</Link>}
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {isLoggedIn && <button onClick={handleLogout} style={{ marginLeft: '1.5rem' }}>Logout</button>}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer>
          <p>&copy; 2024 Lumina</p>
          <p style={{ fontSize: '0.9rem', color: '#00ffff', marginTop: '0.5rem' }}>Developed by exovm</p>
          <div style={{ marginTop: '0.5rem' }}>
            <Link to="/legal" style={{ color: '#00ffff', marginRight: '1.5rem' }}>Legal</Link>
            <Link to="/terms" style={{ color: '#00ffff', marginRight: '1.5rem' }}>Terms of Service</Link>
            <Link to="/privacy" style={{ color: '#00ffff' }}>Privacy Policy</Link>
          </div>
        </footer>
        <MusicPlayer />
      </div>
    </Router>
  );
}

export default App; 