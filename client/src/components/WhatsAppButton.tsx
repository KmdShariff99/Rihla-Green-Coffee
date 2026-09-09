import { MessageCircle } from "lucide-react";
import { companyInfo } from "@shared/schema";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp.replace(/\+/g, "")}?text=Hello, I'm interested in your green coffee products.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BD5A] transition-all hover:scale-105 animate-pulse-once"
      aria-label="Chat on WhatsApp"
      data-testid="button-whatsapp-floating"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
