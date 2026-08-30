import ChatWidget from "@/components/ChatWidget";

// Ye page bilkul minimal/transparent hai — koi navigation, koi extra
// chrome — taake iframe mein embed karne pe sirf widget dikhe, kuch aur
// nahi. Koi website is tarah use kar sakti hai:
//   <iframe src="https://yourdomain.com/widget" width="380" height="560"></iframe>
export default function WidgetPage() {
  return (
    <div className="h-screen w-screen bg-transparent p-2">
      <ChatWidget />
    </div>
  );
}
