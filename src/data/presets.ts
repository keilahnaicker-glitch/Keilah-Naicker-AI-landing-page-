import { PresetTemplate } from '../types';

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'hvac-repair',
    title: 'HVAC & Home Cooling',
    category: 'Home Services',
    description: 'High-converting emergency AC repair & maintenance landing page with urgent lead capture.',
    variables: {
      businessType: 'HVAC & Climate Control',
      service: 'Summer Emergency AC Repair & Maintenance',
      painPoint: 'High summer electric bills and unexpected air conditioner breakdowns during heatwaves',
      ctaText: 'Get Free AC Inspection & Estimate',
      primaryColor: '#0284c7', // Sky Blue
      secondaryColor: '#0f172a', // Dark Slate
      accentColor: '#f97316', // Orange
      companyName: 'Apex Air & Heating Solutions',
      phoneNumber: '(800) 555-COOL',
      emailAddress: 'support@apexairservices.com',
      additionalNotes: 'Include 100% Satisfaction Guarantee and $50 Off First Service Special Coupon'
    },
    sampleHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apex Air & Heating | Emergency AC Repair</title>
  <style>
    /* CSS Reset & Variables */
    :root {
      --primary: #0284c7;
      --primary-hover: #0369a1;
      --secondary: #0f172a;
      --accent: #f97316;
      --accent-hover: #ea580c;
      --bg-light: #f8fafc;
      --card-bg: #ffffff;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --border-color: #e2e8f0;
      --radius-sm: 8px;
      --radius-md: 16px;
      --radius-lg: 24px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
      --shadow-md: 0 10px 25px -5px rgba(2, 132, 199, 0.1), 0 8px 10px -6px rgba(0,0,0,0.05);
      --shadow-lg: 0 20px 30px -10px rgba(15, 23, 42, 0.15);
      --font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-family);
      background-color: var(--bg-light);
      color: var(--text-main);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    /* Container */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Header Navigation */
    .site-header {
      background: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-sm);
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 72px;
    }
    .logo-brand {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--secondary);
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
    }
    .logo-icon {
      background: var(--primary);
      color: #fff;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
    }
    .header-contact {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .phone-link {
      color: var(--secondary);
      text-decoration: none;
      font-weight: 700;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .badge-emergency {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
    }

    /* Hero Section */
    .hero-section {
      padding: 60px 0 80px;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      position: relative;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1fr 480px;
      gap: 48px;
      align-items: center;
    }
    .hero-eyebrow {
      display: inline-block;
      background: #e0f2fe;
      color: var(--primary);
      font-size: 0.875rem;
      font-weight: 700;
      padding: 6px 16px;
      border-radius: 30px;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .hero-title {
      font-size: 2.75rem;
      font-weight: 800;
      color: var(--secondary);
      line-height: 1.2;
      margin-bottom: 20px;
      letter-spacing: -0.02em;
    }
    .hero-title span {
      color: var(--primary);
    }
    .hero-subtitle {
      font-size: 1.125rem;
      color: var(--text-muted);
      margin-bottom: 32px;
      max-width: 580px;
    }
    .hero-highlights {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 30px;
    }
    .highlight-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      color: var(--text-main);
    }
    .check-icon {
      color: #16a34a;
      font-weight: 900;
    }

    /* Lead Capture Card Form */
    .form-card {
      background: var(--card-bg);
      padding: 36px;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      position: relative;
    }
    .form-header {
      margin-bottom: 24px;
      text-align: center;
    }
    .form-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--secondary);
      margin-bottom: 6px;
    }
    .form-subtitle {
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    .form-group {
      margin-bottom: 18px;
      text-align: left;
    }
    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-main);
      margin-bottom: 6px;
    }
    .form-input {
      width: 100%;
      padding: 14px 16px;
      border: 1.5px solid var(--border-color);
      border-radius: var(--radius-sm);
      font-size: 1rem;
      font-family: inherit;
      color: var(--text-main);
      background-color: #f8fafc;
      transition: all 0.2s ease;
    }
    .form-input:focus {
      outline: none;
      border-color: var(--primary);
      background-color: #ffffff;
      box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.15);
    }
    .cta-button {
      width: 100%;
      background-color: var(--accent);
      color: #ffffff;
      border: none;
      padding: 16px 24px;
      font-size: 1.05rem;
      font-weight: 700;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
    .cta-button:hover {
      background-color: var(--accent-hover);
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(249, 115, 22, 0.4);
    }
    .form-privacy {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-align: center;
      margin-top: 14px;
    }

    /* Trust Section */
    .trust-section {
      background: #ffffff;
      padding: 30px 0;
      border-bottom: 1px solid var(--border-color);
    }
    .trust-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      text-align: center;
    }
    .trust-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 12px;
      background: var(--bg-light);
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
    }
    .trust-icon {
      font-size: 1.25rem;
    }
    .trust-text {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--secondary);
    }

    /* Benefits Section */
    .section-padding {
      padding: 80px 0;
    }
    .section-title-wrap {
      text-align: center;
      max-width: 640px;
      margin: 0 auto 50px;
    }
    .section-badge {
      color: var(--primary);
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .section-heading {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--secondary);
      line-height: 1.25;
    }
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
    }
    .benefit-card {
      background: var(--card-bg);
      padding: 36px 28px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }
    .benefit-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-md);
      border-color: rgba(2, 132, 199, 0.3);
    }
    .benefit-icon-box {
      width: 56px;
      height: 56px;
      background: #e0f2fe;
      color: var(--primary);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: 20px;
    }
    .benefit-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--secondary);
      margin-bottom: 12px;
    }
    .benefit-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* Why Choose Us Section */
    .why-us-section {
      background: #f1f5f9;
      padding: 80px 0;
    }
    .why-us-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }
    .why-card {
      background: #ffffff;
      padding: 32px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }
    .why-num {
      background: var(--primary);
      color: #ffffff;
      font-weight: 800;
      font-size: 1.2rem;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .why-content h4 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--secondary);
      margin-bottom: 8px;
    }
    .why-content p {
      font-size: 0.925rem;
      color: var(--text-muted);
    }

    /* Testimonials Section */
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }
    .testimonial-card {
      background: var(--card-bg);
      padding: 36px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
    }
    .stars {
      color: #f59e0b;
      font-size: 1.1rem;
      margin-bottom: 16px;
    }
    .testimonial-quote {
      font-size: 1.05rem;
      color: var(--text-main);
      font-style: italic;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .author-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--primary);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .author-info h5 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--secondary);
    }
    .author-info p {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    /* Final Banner CTA */
    .final-cta {
      background: linear-gradient(135deg, var(--secondary) 0%, #1e293b 100%);
      color: #ffffff;
      padding: 70px 0;
      text-align: center;
    }
    .final-cta-content {
      max-width: 720px;
      margin: 0 auto;
    }
    .final-cta h2 {
      font-size: 2.25rem;
      font-weight: 800;
      margin-bottom: 16px;
    }
    .final-cta p {
      font-size: 1.1rem;
      color: #94a3b8;
      margin-bottom: 32px;
    }
    .btn-scroll-top {
      display: inline-block;
      background: var(--accent);
      color: #ffffff;
      padding: 16px 36px;
      font-size: 1.1rem;
      font-weight: 700;
      border-radius: var(--radius-sm);
      text-decoration: none;
      transition: all 0.2s ease;
      box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
    }
    .btn-scroll-top:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
    }

    /* Footer */
    .site-footer {
      background: #090d16;
      color: #64748b;
      padding: 40px 0;
      font-size: 0.875rem;
      border-top: 1px solid #1e293b;
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .footer-links a {
      color: #94a3b8;
      text-decoration: none;
      margin-left: 20px;
    }
    .footer-links a:hover {
      color: #ffffff;
    }

    /* Mobile Responsive Media Queries */
    @media (max-width: 992px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .benefits-grid, .why-us-grid, .testimonials-grid {
        grid-template-columns: 1fr;
      }
      .trust-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .hero-title {
        font-size: 2rem;
      }
      .form-card {
        padding: 24px 18px;
      }
      .trust-grid {
        grid-template-columns: 1fr;
      }
      .header-content {
        flex-direction: column;
        height: auto;
        padding: 16px 0;
        gap: 12px;
      }
      .footer-content {
        flex-direction: column;
        text-align: center;
      }
      .footer-links a {
        margin: 0 10px;
      }
    }
  </style>
</head>
<body>

  <!-- Site Header -->
  <header class="site-header">
    <div class="container">
      <div class="header-content">
        <a href="#" class="logo-brand">
          <div class="logo-icon">⚡</div>
          <span>Apex Air Solutions</span>
        </a>
        <div class="header-contact">
          <span class="badge-emergency">⚡ 24/7 Fast Dispatch</span>
          <a href="tel:8005552665" class="phone-link">📞 (800) 555-COOL</a>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-section">
    <div class="container">
      <div class="hero-grid">
        <!-- Hero Text -->
        <div class="hero-text-area">
          <span class="hero-eyebrow">Certified Local Air Conditioning Experts</span>
          <h1 class="hero-title">Stop Paying High Energy Bills Every <span>Summer Heatwave</span></h1>
          <p class="hero-subtitle">Our certified technicians keep your air conditioning running ice-cold, prevent costly mid-summer breakdowns, and save you money on monthly utility bills.</p>

          <div class="hero-highlights">
            <div class="highlight-item"><span class="check-icon">✓</span> Same-Day Emergency Service & Fast Arrival</div>
            <div class="highlight-item"><span class="check-icon">✓</span> $50 Off Coupon for First-Time Clients</div>
            <div class="highlight-item"><span class="check-icon">✓</span> 100% Money-Back Satisfaction Guarantee</div>
          </div>
        </div>

        <!-- Lead Capture Form Card -->
        <div class="form-card" id="leadForm">
          <div class="form-header">
            <h3 class="form-title">Claim Your Free AC Inspection</h3>
            <p class="form-subtitle">Lock in your instant $50 discount & priority dispatch</p>
          </div>
          <form onsubmit="handleFormSubmit(event)">
            <div class="form-group">
              <label class="form-label" for="fullName">Full Name</label>
              <input type="text" id="fullName" class="form-input" placeholder="e.g. Sarah Jenkins" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="phone">Phone Number</label>
              <input type="tel" id="phone" class="form-input" placeholder="(555) 000-0000" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="email">Email Address</label>
              <input type="email" id="email" class="form-input" placeholder="sarah@example.com" required>
            </div>
            <button type="submit" class="cta-button">
              Get Free AC Inspection & Estimate →
            </button>
            <p class="form-privacy">🔒 100% Secure. We respect your privacy & never spam.</p>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust Indicators Bar -->
  <section class="trust-section">
    <div class="container">
      <div class="trust-grid">
        <div class="trust-item">
          <span class="trust-icon">🛡️</span>
          <span class="trust-text">Licensed & Insured</span>
        </div>
        <div class="trust-item">
          <span class="trust-icon">⭐</span>
          <span class="trust-text">5-Star Google Rated</span>
        </div>
        <div class="trust-item">
          <span class="trust-icon">⚡</span>
          <span class="trust-text">Same-Day Service</span>
        </div>
        <div class="trust-item">
          <span class="trust-icon">💯</span>
          <span class="trust-text">Satisfaction Guaranteed</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Key Benefits Section -->
  <section class="section-padding">
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-badge">Why Homeowners Love Us</span>
        <h2 class="section-heading">Enjoy Unmatched Cooling Efficiency All Summer Long</h2>
      </div>

      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon-box">❄️</div>
          <h3 class="benefit-title">Max Cooling Performance</h3>
          <p class="benefit-desc">Our deep precision tune-up restores factory cooling output so every room in your home stays crisp and comfortable.</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon-box">💸</div>
          <h3 class="benefit-title">Lower Monthly Energy Bills</h3>
          <p class="benefit-desc">An optimized AC compressor consumes up to 30% less electricity, saving you hundreds on summer cooling costs.</p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon-box">🛠️</div>
          <h3 class="benefit-title">Zero Breakdown Risk</h3>
          <p class="benefit-desc">We catch minor wear and tear before it turns into an expensive emergency breakdown on a 95° afternoon.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose Us Differentiators -->
  <section class="why-us-section">
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-badge">The Apex Difference</span>
        <h2 class="section-heading">Why Choose Apex Air & Heating?</h2>
      </div>

      <div class="why-us-grid">
        <div class="why-card">
          <div class="why-num">01</div>
          <div class="why-content">
            <h4>Experienced Certified Technicians</h4>
            <p>Every technician is background-checked, EPA-certified, and brings over 10 years of hands-on HVAC expertise to your door.</p>
          </div>
        </div>

        <div class="why-card">
          <div class="why-num">02</div>
          <div class="why-content">
            <h4>Upfront Flat-Rate Pricing</h4>
            <p>No surprise fees or hidden hourly charges. You receive a guaranteed written quote before any work begins.</p>
          </div>
        </div>

        <div class="why-card">
          <div class="why-num">03</div>
          <div class="why-content">
            <h4>Fast Response & On-Time Arrival</h4>
            <p>We respect your schedule. Our team arrives promptly with fully equipped trucks ready to fix problems on the spot.</p>
          </div>
        </div>

        <div class="why-card">
          <div class="why-num">04</div>
          <div class="why-content">
            <h4>Comprehensive Warranty Protection</h4>
            <p>All parts and labor are backed by our industry-leading 100% Money-Back Satisfaction Warranty.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="section-padding">
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-badge">Real Customer Reviews</span>
        <h2 class="section-heading">Trusted by Over 5,000 Local Homeowners</h2>
      </div>

      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="stars">★★★★★</div>
          <p class="testimonial-quote">"Our AC unit died in the middle of a brutal July heatwave. Apex arrived within 2 hours, fixed the failed capacitor, and had icy air blowing in 30 minutes! Unbelievable service."</p>
          <div class="testimonial-author">
            <div class="author-avatar">MD</div>
            <div class="author-info">
              <h5>Marcus Davis</h5>
              <p>Homeowner, Northside</p>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="stars">★★★★★</div>
          <p class="testimonial-quote">"After their tune-up, our electric bill dropped by nearly $80 a month! The technician was polite, clean, and explained everything clearly before starting."</p>
          <div class="testimonial-author">
            <div class="author-avatar">ER</div>
            <div class="author-info">
              <h5>Elena Rodriguez</h5>
              <p>Homeowner, Westlake</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Final Call to Action -->
  <section class="final-cta">
    <div class="container">
      <div class="final-cta-content">
        <h2>Don't Suffer Through Another Sweaty Heatwave</h2>
        <p>Slots are filling up fast for this week's emergency inspection specials. Claim your $50 coupon before offer expires!</p>
        <a href="#leadForm" class="btn-scroll-top">Claim Your Free AC Inspection Now →</a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div>© 2026 Apex Air & Heating Solutions. All Rights Reserved.</div>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">License #HVAC-99281</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    function handleFormSubmit(e) {
      e.preventDefault();
      const fullName = document.getElementById('fullName').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;

      // Post lead to parent frame if embedded
      window.parent.postMessage({
        type: 'LEAD_SUBMISSION',
        data: { fullName, phone, email, businessName: 'Apex Air & Heating Solutions' }
      }, '*');

      alert('🎉 Thank you, ' + fullName + '! Your request for a Free AC Inspection has been received. Our technician will call you at ' + phone + ' shortly.');
    }
  </script>
</body>
</html>`
  },
  {
    id: 'saas-ai',
    title: 'B2B AI Writing SaaS',
    category: 'Software & Technology',
    description: 'Modern, high-converting dark-mode / vibrant SaaS landing page for an AI copy assistant.',
    variables: {
      businessType: 'B2B SaaS Tech',
      service: 'AI Writing & Content Generation Platform',
      painPoint: 'Spending endless hours writing marketing blogs, ad copy, and sales emails manually',
      ctaText: 'Start 14-Day Free Trial (No Card Needed)',
      primaryColor: '#6366f1', // Indigo
      secondaryColor: '#090d16', // Dark
      accentColor: '#10b981', // Emerald
      companyName: 'ScribeAI Pro',
      phoneNumber: '(888) 991-AI-WRITE',
      emailAddress: 'hello@scribeaipro.com',
      additionalNotes: 'Highlight 10x faster writing speed, SEO optimization, and instant trial access.'
    }
  },
  {
    id: 'solar-energy',
    title: 'Residential Solar Installation',
    category: 'Clean Energy',
    description: 'Clean, trustworthy eco-friendly landing page with solar savings calculator hook.',
    variables: {
      businessType: 'Solar Energy & Battery Systems',
      service: 'Residential Solar Panel Installation',
      painPoint: 'Surging utility power prices and blackout vulnerabilities',
      ctaText: 'Calculate Solar Savings & Get Quote',
      primaryColor: '#f59e0b', // Amber/Solar Gold
      secondaryColor: '#1e293b', // Deep Slate
      accentColor: '#16a34a', // Eco Green
      companyName: 'Solara Energy Systems',
      phoneNumber: '(800) 700-SUNS',
      emailAddress: 'quotes@solaraenergy.com',
      additionalNotes: 'Emphasize 30% Federal Tax Credits, $0 Down Financing, and 25-Year Warranty.'
    }
  },
  {
    id: 'dental-emergency',
    title: 'Emergency Dental Clinic',
    category: 'Healthcare & Dental',
    description: 'Reassuring, high-trust emergency medical landing page with immediate booking form.',
    variables: {
      businessType: 'Dental Practice',
      service: 'Same-Day Emergency Dental & Tooth Pain Relief',
      painPoint: 'Unbearable sudden toothaches and inability to get a quick dentist appointment',
      ctaText: 'Book Immediate Emergency Appointment',
      primaryColor: '#0d9488', // Teal
      secondaryColor: '#0f172a', // Navy
      accentColor: '#0284c7', // Sky Blue
      companyName: 'BrightSmile Emergency Dental',
      phoneNumber: '(800) 991-PAIN',
      emailAddress: 'care@brightsmiledental.com',
      additionalNotes: 'Include Pain-Free Sedation Dentistry, Most Insurances Accepted, Gentle Care.'
    }
  },
  {
    id: 'legal-advisor',
    title: 'Personal Injury Law Firm',
    category: 'Legal Services',
    description: 'Authoritative, premium law firm landing page designed for immediate consultation leads.',
    variables: {
      businessType: 'Personal Injury Law Firm',
      service: 'Auto Accident & Personal Injury Legal Representation',
      painPoint: 'Insurance companies delaying injury payouts and medical debt mounting after an accident',
      ctaText: 'Get Free Confidential Case Evaluation',
      primaryColor: '#991b1b', // Deep Crimson
      secondaryColor: '#18181b', // Charcoal
      accentColor: '#d97706', // Gold Accent
      companyName: 'Vanguard Injury Attorneys',
      phoneNumber: '(800) 500-LAWS',
      emailAddress: 'claims@vanguardlawyers.com',
      additionalNotes: 'Zero upfront fees—you pay NOTHING unless we win your case! Over $50M recovered.'
    }
  },
  {
    id: 'fitness-coaching',
    title: '1-on-1 Fitness & Transformation',
    category: 'Health & Wellness',
    description: 'Vibrant, motivating personal fitness training landing page with consultation signup.',
    variables: {
      businessType: 'Fitness & Body Transformation',
      service: 'Personal Training & Custom Nutrition Coaching',
      painPoint: 'Struggling to lose stubborn body fat despite dieting and wasting money on gym memberships',
      ctaText: 'Claim Free 1-on-1 Fitness Assessment',
      primaryColor: '#dc2626', // Red
      secondaryColor: '#090d16', // Dark
      accentColor: '#eab308', // Yellow
      companyName: 'PeakPulse Fitness Studio',
      phoneNumber: '(800) 333-FIT1',
      emailAddress: 'info@peakpulsefit.com',
      additionalNotes: 'Guaranteed 90-day transformation results with tailored meal plans.'
    }
  }
];
