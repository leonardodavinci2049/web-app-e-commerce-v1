import { ContactSection } from "@/components/company/sections/contact";
import { LocationSection } from "@/components/company/sections/location";

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
      {/* Location Section */}
      <LocationSection />
    </main>
  );
}
