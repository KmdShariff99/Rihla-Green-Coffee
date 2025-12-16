import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { enquirySchema, products, blogPosts, companyInfo, exportSteps } from "@shared/schema";
import OpenAI from "openai";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

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

  // E-Catalogue download (simple HTML version for now)
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
    body { font-family: 'Inter', system-ui, sans-serif; color: #333; line-height: 1.6; }
    .page { max-width: 800px; margin: 0 auto; padding: 40px; page-break-after: always; }
    .header { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid #3E2723; }
    .logo { font-size: 32px; font-weight: bold; color: #3E2723; margin-bottom: 8px; }
    .tagline { font-size: 18px; color: #666; font-style: italic; }
    h1 { color: #3E2723; font-size: 28px; margin-bottom: 20px; }
    h2 { color: #3E2723; font-size: 20px; margin: 30px 0 15px; border-bottom: 1px solid #ddd; padding-bottom: 8px; }
    h3 { color: #2E7D32; font-size: 16px; margin: 20px 0 10px; }
    p { margin-bottom: 15px; }
    .intro { font-size: 16px; color: #555; }
    .compliance { background: #f5f5f0; padding: 20px; border-radius: 8px; margin: 30px 0; }
    .compliance h3 { margin-top: 0; color: #3E2723; }
    .contact { margin-top: 30px; }
    .contact p { margin-bottom: 8px; }
    .product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
    .product { background: #fafafa; padding: 15px; border-radius: 8px; border: 1px solid #eee; }
    .product h4 { color: #3E2723; margin-bottom: 8px; font-size: 14px; }
    .product p { font-size: 12px; margin-bottom: 4px; color: #666; }
    .product strong { color: #333; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888; }
    @media print {
      .page { padding: 20px; }
      .product-grid { grid-template-columns: 1fr 1fr; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">Rihla Global</div>
      <div class="tagline">From Bean to Cup</div>
    </div>
    
    <h1>Indian Green Coffee Beans</h1>
    
    <p class="intro">
      ${companyInfo.description}
    </p>
    
    <div class="compliance">
      <h3>Quality & Compliance</h3>
      <p>All products are export-grade green coffee beans prepared and graded as per Coffee Board of India (ICB) guidelines. We provide transparent specifications including moisture content, screen size, and grade details for every lot.</p>
    </div>
    
    <div class="contact">
      <h3>Contact Us</h3>
      <p><strong>Email:</strong> ${companyInfo.email}</p>
      <p><strong>Phone:</strong> ${companyInfo.phone}</p>
      <p><strong>WhatsApp:</strong> ${companyInfo.whatsapp}</p>
      <p><strong>Location:</strong> ${companyInfo.address}</p>
    </div>
  </div>
  
  <div class="page">
    <h1>Product Catalogue</h1>
    
    <h2>Arabica Coffee (Washed - Plantation)</h2>
    <div class="product-grid">
      ${products.filter(p => p.category === 'arabica').map(p => `
        <div class="product">
          <h4>${p.name}</h4>
          <p><strong>Grade:</strong> ${p.grade}</p>
          <p><strong>Origin:</strong> ${p.origin}</p>
          <p><strong>Screen Size:</strong> ${p.screenSize}</p>
          <p><strong>Moisture:</strong> ${p.moisture}</p>
          <p>${p.technicalProfile}</p>
        </div>
      `).join('')}
    </div>
    
    <h2>Robusta Coffee (Washed - Robusta Parchment)</h2>
    <div class="product-grid">
      ${products.filter(p => p.category === 'robusta').map(p => `
        <div class="product">
          <h4>${p.name}</h4>
          <p><strong>Grade:</strong> ${p.grade}</p>
          <p><strong>Origin:</strong> ${p.origin}</p>
          <p><strong>Screen Size:</strong> ${p.screenSize}</p>
          <p><strong>Moisture:</strong> ${p.moisture}</p>
          <p>${p.technicalProfile}</p>
        </div>
      `).join('')}
    </div>
    
    <h2>Specialty Coffee</h2>
    <div class="product-grid">
      ${products.filter(p => p.category === 'specialty').map(p => `
        <div class="product">
          <h4>${p.name}</h4>
          <p><strong>Grade:</strong> ${p.grade}</p>
          <p><strong>Origin:</strong> ${p.origin}</p>
          <p><strong>Screen Size:</strong> ${p.screenSize}</p>
          <p><strong>Moisture:</strong> ${p.moisture}</p>
          <p>${p.technicalProfile}</p>
        </div>
      `).join('')}
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${companyInfo.name}. All rights reserved.</p>
      <p>Prepared and graded in compliance with Coffee Board of India standards.</p>
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
