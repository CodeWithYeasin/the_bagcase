import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8801410221201"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={20} />
      <span className="hidden sm:block">Chat with us</span>
    </a>
  );
}
