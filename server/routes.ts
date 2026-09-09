import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { enquirySchema, products, blogPosts, companyInfo, exportSteps } from "@shared/schema";
import OpenAI from "openai";

// Support both Replit AI Integrations (preferred) and direct OpenAI API key (for AWS deployment)
const getOpenAIConfig = () => {
  // Prefer Replit AI Integrations if available
  if (process.env.AI_INTEGRATIONS_OPENAI_BASE_URL && process.env.AI_INTEGRATIONS_OPENAI_API_KEY) {
    return {
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
    };
  }
  // Fall back to direct OpenAI API key for external deployments
  if (process.env.OPENAI_API_KEY) {
    return {
      baseURL: "https://api.openai.com/v1",
      apiKey: process.env.OPENAI_API_KEY
    };
  }
  // No API key configured - chatbot will gracefully fail
  return {
    baseURL: "https://api.openai.com/v1",
    apiKey: "not-configured"
  };
};

const openai = new OpenAI(getOpenAIConfig());

const systemPrompt = `You are a helpful AI assistant for Rihla Global, an India-based exporter of green coffee beans. You help international coffee buyers with information about:

1. Company Information:
- ${companyInfo.name} is an India-based exporter of green coffee beans
- We work with growers and processors across major coffee-producing regions in India
- We focus on sourcing, grading, and supplying export-ready green coffee beans
- We follow Coffee Board of India (ICB) guidelines

2. Products:
We offer three categories of green coffee beans:

A. Arabica Coffee (Washed - Plantation):
${products.filter(p => p.category === 'arabica').map(p => `- ${p.name}: ${p.grade}, Screen Size: ${p.screenSize}, ${p.technicalProfile}`).join('\n')}

B. Robusta Coffee (Washed - Robusta Parchment):
${products.filter(p => p.category === 'robusta').map(p => `- ${p.name}: ${p.grade}, Screen Size: ${p.screenSize}, ${p.technicalProfile}`).join('\n')}

C. Specialty Coffee:
${products.filter(p => p.category === 'specialty').map(p => `- ${p.name}: ${p.grade}, ${p.technicalProfile}`).join('\n')}

3. Export Process:
${exportSteps.map(s => `Step ${s.step}: ${s.title} - ${s.description}`).join('\n')}

4. Contact Information:
- Email: ${companyInfo.email}
- Phone: ${companyInfo.phone}
- WhatsApp: ${companyInfo.whatsapp}
- Location: ${companyInfo.address}

Guidelines:
- Be professional and helpful
- Do NOT provide pricing information - direct users to contact us for quotes
- Do NOT make claims not supported by the information provided
- If asked about topics outside your knowledge, politely redirect to contacting us directly
- Keep responses concise and focused
- For detailed specifications or quotes, always encourage users to fill the contact form or reach out via WhatsApp`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Submit enquiry
  app.post("/api/enquiry", async (req, res) => {
    try {
      const result = enquirySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid enquiry data", 
          details: result.error.flatten() 
        });
      }
      
      const enquiry = await storage.createEnquiry(result.data);
      console.log("New enquiry received:", enquiry);
      
      res.json({ success: true, id: enquiry.id });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      res.status(500).json({ error: "Failed to submit enquiry" });
    }
  });

  // AI Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_completion_tokens: 500,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || 
        "I apologize, but I couldn't process your request. Please try again or contact us directly.";

      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      res.json({ 
        response: "I'm having trouble connecting right now. Please try again later or contact us via WhatsApp or email for assistance." 
      });
    }
  });

  // Health check endpoint for monitoring
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Get products
  app.get("/api/products", (_req, res) => {
    res.json(products);
  });

  // Get blog posts
  app.get("/api/blog", (_req, res) => {
    res.json(blogPosts);
  });

  // Get single blog post
  app.get("/api/blog/:slug", (req, res) => {
    const post = blogPosts.find(p => p.slug === req.params.slug);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(post);
  });

  // E-Catalogue download (HTML version with logo and tabloid format)
  app.get("/api/catalogue", (_req, res) => {
    const catalogueHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rihla Global - E-Catalogue</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', system-ui, sans-serif; color: #333; line-height: 1.6; background: #fff; }
    .page { max-width: 900px; margin: 0 auto; padding: 40px; page-break-after: always; }
    .header { display: flex; align-items: center; gap: 20px; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 3px solid #3E2723; }
    .logo-img { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; }
    .logo-text { flex: 1; }
    .logo-name { font-size: 32px; font-weight: bold; color: #3E2723; margin-bottom: 4px; }
    .tagline { font-size: 16px; color: #2E7D32; font-style: italic; }
    h1 { color: #3E2723; font-size: 28px; margin-bottom: 20px; }
    h2 { color: #3E2723; font-size: 20px; margin: 30px 0 15px; background: #f5f0eb; padding: 10px 15px; border-left: 4px solid #3E2723; }
    h3 { color: #2E7D32; font-size: 16px; margin: 20px 0 10px; }
    p { margin-bottom: 15px; }
    .intro { font-size: 16px; color: #555; line-height: 1.8; }
    .compliance { background: linear-gradient(135deg, #f5f0eb 0%, #e8e0d8 100%); padding: 25px; border-radius: 8px; margin: 30px 0; border: 1px solid #d4c8bc; }
    .compliance h3 { margin-top: 0; color: #3E2723; }
    .contact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px; }
    .contact-item { display: flex; align-items: flex-start; gap: 10px; padding: 12px; background: #fafafa; border-radius: 6px; border: 1px solid #eee; }
    .contact-item strong { color: #3E2723; min-width: 80px; }
    .contact-item span { color: #555; }
    
    /* Tabloid Table Styles */
    .product-table { width: 100%; border-collapse: collapse; margin: 20px 0 30px; font-size: 13px; }
    .product-table thead { background: #3E2723; color: white; }
    .product-table th { padding: 12px 10px; text-align: left; font-weight: 600; }
    .product-table td { padding: 10px; border-bottom: 1px solid #e0e0e0; vertical-align: top; }
    .product-table tbody tr:nth-child(even) { background: #f9f7f5; }
    .product-table tbody tr:hover { background: #f0ebe5; }
    .product-name { font-weight: 600; color: #3E2723; }
    .product-profile { font-size: 12px; color: #666; font-style: italic; }
    
    .footer { text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #3E2723; }
    .footer p { font-size: 12px; color: #666; margin-bottom: 5px; }
    .footer .company { font-weight: 600; color: #3E2723; }
    
    @media print {
      .page { padding: 20px; }
      .product-table { font-size: 11px; }
      .product-table th, .product-table td { padding: 8px 6px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <img src="/attached_assets/WhatsApp_Image_2025-11-17_at_21.51.48_1765898801817.jpeg" alt="Rihla Global Logo" class="logo-img" onerror="this.style.display='none'">
      <div class="logo-text">
        <div class="logo-name">${companyInfo.name}</div>
        <div class="tagline">${companyInfo.tagline}</div>
      </div>
    </div>
    
    <h1>Indian Green Coffee Beans - Export Catalogue</h1>
    
    <p class="intro">
      ${companyInfo.description}
    </p>
    
    <div class="compliance">
      <h3>Quality & Compliance</h3>
      <p>All products are export-grade green coffee beans prepared and graded as per Coffee Board of India (ICB) guidelines. We provide transparent specifications including moisture content, screen size, and grade details for every lot.</p>
    </div>
    
    <h3>Contact Information</h3>
    <div class="contact-grid">
      <div class="contact-item">
        <strong>Email:</strong>
        <span>${companyInfo.email}</span>
      </div>
      <div class="contact-item">
        <strong>Phone:</strong>
        <span>${companyInfo.phone}</span>
      </div>
      <div class="contact-item">
        <strong>WhatsApp:</strong>
        <span>${companyInfo.whatsapp}</span>
      </div>
      <div class="contact-item">
        <strong>Location:</strong>
        <span>${companyInfo.address}</span>
      </div>
    </div>
  </div>
  
  <div class="page">
    <div class="header">
      <img src="/attached_assets/WhatsApp_Image_2025-11-17_at_21.51.48_1765898801817.jpeg" alt="Rihla Global Logo" class="logo-img" onerror="this.style.display='none'">
      <div class="logo-text">
        <div class="logo-name">${companyInfo.name}</div>
        <div class="tagline">Product Catalogue</div>
      </div>
    </div>
    
    <h2>Arabica Coffee (Washed - Plantation)</h2>
    <table class="product-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Grade</th>
          <th>Origin</th>
          <th>Screen Size</th>
          <th>Moisture</th>
          <th>Profile</th>
        </tr>
      </thead>
      <tbody>
        ${products.filter(p => p.category === 'arabica').map(p => `
        <tr>
          <td class="product-name">${p.name}</td>
          <td>${p.grade}</td>
          <td>${p.origin}</td>
          <td>${p.screenSize}</td>
          <td>${p.moisture}</td>
          <td class="product-profile">${p.technicalProfile}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
    
    <h2>Robusta Coffee (Washed - Robusta Parchment)</h2>
    <table class="product-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Grade</th>
          <th>Origin</th>
          <th>Screen Size</th>
          <th>Moisture</th>
          <th>Profile</th>
        </tr>
      </thead>
      <tbody>
        ${products.filter(p => p.category === 'robusta').map(p => `
        <tr>
          <td class="product-name">${p.name}</td>
          <td>${p.grade}</td>
          <td>${p.origin}</td>
          <td>${p.screenSize}</td>
          <td>${p.moisture}</td>
          <td class="product-profile">${p.technicalProfile}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
    
    <h2>Specialty Coffee</h2>
    <table class="product-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Grade</th>
          <th>Origin</th>
          <th>Screen Size</th>
          <th>Moisture</th>
          <th>Profile</th>
        </tr>
      </thead>
      <tbody>
        ${products.filter(p => p.category === 'specialty').map(p => `
        <tr>
          <td class="product-name">${p.name}</td>
          <td>${p.grade}</td>
          <td>${p.origin}</td>
          <td>${p.screenSize}</td>
          <td>${p.moisture}</td>
          <td class="product-profile">${p.technicalProfile}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
    
    <div class="footer">
      <p class="company">${companyInfo.name}</p>
      <p>${companyInfo.email} | ${companyInfo.phone} | ${companyInfo.whatsapp}</p>
      <p>Prepared and graded in compliance with Coffee Board of India standards.</p>
      <p>&copy; ${new Date().getFullYear()} ${companyInfo.name}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', 'inline; filename="rihla-global-catalogue.html"');
    res.send(catalogueHtml);
  });

  return httpServer;
}
