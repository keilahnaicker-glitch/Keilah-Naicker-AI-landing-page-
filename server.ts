import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Helper to strip markdown code blocks
  const cleanHtmlOutput = (rawText: string): string => {
    let clean = rawText.trim();
    if (clean.startsWith('```html')) {
      clean = clean.replace(/^```html\s*/i, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/, '');
    }
    if (clean.endsWith('```')) {
      clean = clean.replace(/\s*```$/, '');
    }
    return clean.trim();
  };

  // API Endpoint: Generate Landing Page HTML
  app.post('/api/generate-landing-page', async (req, res) => {
    try {
      const {
        businessType,
        service,
        painPoint,
        ctaText,
        primaryColor = '#0284c7',
        secondaryColor = '#0f172a',
        accentColor = '#f97316',
        companyName = 'Apex Business Solutions',
        phoneNumber = '(800) 555-0199',
        emailAddress = 'contact@example.com',
        additionalNotes = '',
      } = req.body;

      const ai = getGeminiClient();

      const prompt = `You are an award-winning UI/UX designer, front-end developer, and conversion rate optimization (CRO) expert.

Generate a complete, high-converting standalone landing page strictly using ONLY raw HTML and embedded CSS inside one single HTML code block.

BUSINESS DETAILS:
- Business Type: ${businessType}
- Specific Service: ${service}
- Primary Customer Pain Point: ${painPoint}
- Call-to-Action Button Text: ${ctaText}
- Primary Color: ${primaryColor}
- Secondary Color: ${secondaryColor}
- Accent Color: ${accentColor}
- Company Name: ${companyName}
- Phone Number: ${phoneNumber}
- Email Address: ${emailAddress}
${additionalNotes ? `- Special Instructions / Copy Notes: ${additionalNotes}` : ''}

STRICT TECHNICAL & STYLING MANDATES:
1. Output MUST be ONE SINGLE complete standalone HTML document starting with <!DOCTYPE html> and ending with </html>.
2. ALL styling must be in an embedded <style> block inside the <head>.
3. DO NOT use external CSS frameworks (No Tailwind, No Bootstrap), DO NOT use external icon libraries (FontAwesome, Lucide, Google Fonts CDN, etc.). Use system font stacks and standard CSS styling or Unicode characters/emojis for icons.
4. DO NOT use external JavaScript libraries or CDNs. Include a tiny inline JavaScript snippet in <script> at the bottom that intercepts the lead form submission (e.g., e.preventDefault()), shows a friendly success message modal/alert, and posts a window message: window.parent.postMessage({ type: 'LEAD_SUBMISSION', data: { fullName, phone, email, businessName: '${companyName}' } }, '*');
5. FULL RESPONSIVENESS: Mobile-first responsive CSS media queries for desktop, laptop, tablet, and mobile screens (touch target sizes >= 44px on mobile, full width CTA on mobile).
6. ACCESSIBILITY: WCAG AA contrast against background, proper label elements, clean focus outlines.

REQUIRED SECTIONS TO INCLUDE IN THE LANDING PAGE:
- SITE HEADER: Company logo/brand name, emergency badge/tagline, telephone link, clean nav container.
- HERO SECTION:
  * Eyebrow badge or tag.
  * Powerful, bold headline addressing customer's biggest pain point: "${painPoint}".
  * Persuasive subheadline explaining value proposition for "${service}".
  * 3 key bullet checkmarks/highlights.
- LEAD CAPTURE FORM CARD:
  * Card-style layout with floating labels or clean input fields: Full Name, Phone Number, Email Address.
  * High-visibility, prominent CTA button using text: "${ctaText}".
  * Hover effects, rounded corners, subtle box-shadows, input focus glow ring.
- TRUST INDICATORS SECTION (Below Hero):
  * 4 trust cards/badges (e.g. Licensed & Insured, 5-Star Rated, Same-Day Service, Satisfaction Guaranteed) using Unicode icons or CSS pills.
- BENEFITS SECTION:
  * 3 key benefits of "${service}" with icon box, bold title, short persuasive description.
- WHY CHOOSE US SECTION:
  * 3-4 differentiators (e.g. Certified Experts, Upfront Transparent Pricing, Fast Response Time, Money-Back Guarantee).
- TESTIMONIALS SECTION:
  * 2 realistic customer reviews with 5-star ratings (★★★★★), reviewer avatar circle, name, and location/title.
- FINAL CTA BANNER SECTION:
  * High urgency headline and subheadline near bottom with scroll-to-form button or secondary form trigger.
- FOOTER:
  * Company Name (${companyName}), copyright notice (© 2026), Privacy Policy link, Terms of Service link.

Return ONLY the complete HTML code. Do not wrap in commentary or markdown explanations.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
        },
      });

      const rawText = response.text || '';
      const htmlCode = cleanHtmlOutput(rawText);

      res.json({ success: true, htmlCode });
    } catch (err: any) {
      console.error('Error generating landing page:', err);
      res.status(500).json({
        success: false,
        error: err.message || 'Failed to generate landing page with Gemini AI',
      });
    }
  });

  // API Endpoint: Refine Landing Page
  app.post('/api/refine-landing-page', async (req, res) => {
    try {
      const { currentHtml, instruction } = req.body;
      if (!currentHtml || !instruction) {
        return res.status(400).json({ success: false, error: 'Missing currentHtml or instruction' });
      }

      const ai = getGeminiClient();

      const prompt = `You are a conversion optimization expert and front-end developer.

Here is an existing single-file HTML+CSS landing page:
\`\`\`html
${currentHtml}
\`\`\`

USER INSTRUCTION FOR REFINEMENT:
"${instruction}"

STRICT MANDATES:
1. Modify the HTML/CSS according to the user's instruction while maintaining the full single-file standalone structure (<!DOCTYPE html> ... embedded <style> ... </html>).
2. DO NOT introduce external CSS, JS, or CDN dependencies.
3. Ensure the lead capture form submission script remains intact (window.parent.postMessage({ type: 'LEAD_SUBMISSION', data: ... })).
4. Return ONLY the modified complete HTML code without commentary.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          temperature: 0.6,
        },
      });

      const rawText = response.text || '';
      const htmlCode = cleanHtmlOutput(rawText);

      res.json({ success: true, htmlCode });
    } catch (err: any) {
      console.error('Error refining landing page:', err);
      res.status(500).json({
        success: false,
        error: err.message || 'Failed to refine landing page',
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
