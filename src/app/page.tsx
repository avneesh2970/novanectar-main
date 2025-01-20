import CallingIcon from "@/components/calling/Call";
import ContactForm from "@/components/contact/contact";
import FAQSection from "@/components/faq/FaqSection";
import FooterSection from "@/components/footer/FooterSection";
import Landing from "@/components/landing/Landing";
import ProcessSection from "@/components/process/ProcessSection";
import ProjectSession from "@/components/projects/ProjectSession";
import TestimonialSection from "@/components/testimonial/TestimonialSecion";
import WhatsappIcon from "@/components/whatsapp/Whatsapp";
import WhyChooseUs from "@/components/why-us/WhyUsSession";

export default function Home() {
  return (
    <div className="">
      <Landing />
      <ProcessSection />
      <div id="project-section">
        <ProjectSession />
      </div>
      <WhyChooseUs />
      <ContactForm />
      <TestimonialSection />
      <FAQSection />
      <FooterSection />
      <WhatsappIcon />
      <CallingIcon/>
    </div>
  );
}
