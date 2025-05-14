import CallingIcon from "@/components/calling/Call";
import ContactForm from "@/components/contact/contact";
import FAQSection from "@/components/faq/FaqSection";
import FooterSection from "@/components/footer/FooterSection";
// import Landing from "@/components/landing/Landing";
import Clients from "@/components/ourClients/Clients";
import { MainContent } from "@/components/landing/MainContent";
import ProcessSection from "@/components/process/ProcessSection";
import ProjectSession from "@/components/projects/ProjectSession";
import TestimonialSection from "@/components/testimonial/TestimonialSecion";
import WhatsappIcon from "@/components/whatsapp/Whatsapp";
import WhyChooseUs from "@/components/why-us/WhyUsSession";

export default function Home() {
  return (
    <>
      {/* <Landing /> */}
      <MainContent />
      <ProcessSection />
      <div id="project-section">
        <ProjectSession />
      </div>
      <Clients />
      <WhyChooseUs />
      <ContactForm />
      <TestimonialSection />
      <FAQSection />
      <FooterSection />
      <WhatsappIcon />
      <CallingIcon />
    </>
  );
}
