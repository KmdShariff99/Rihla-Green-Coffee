import { MessageCircle } from "lucide-react";
import { companyInfo } from "@shared/schema";

export function WhatsAppButton() {
  const whatsappNumber = companyInfo.whatsapp.replace(/\D/g, "");
  const whatsappMessage = "Hello Rihla Global, I would like a green coffee quote.\nProduct:\nQuantity (kg):\nDestination country:\nPackaging preference:\nCompany:\nBusiness email:\nAdditional requirements:";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

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
