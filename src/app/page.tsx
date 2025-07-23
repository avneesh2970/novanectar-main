
import { Suspense, lazy } from "react";
import { MainContent } from "@/components/landing/MainContent";

// Eagerly load critical above-the-fold components
import LoadingSpinner from "@/components/ui/loading-spinner";
import { HomeFaqs } from "@/data/faqsData";
import StatsCounter from "@/components/stats/stats";

// Lazy load below-the-fold components
const ProcessSection = lazy(
  () => import("@/components/process/ProcessSection")
);
const ProjectSession = lazy(
  () => import("@/components/projects/ProjectSession")
);
const Clients = lazy(() => import("@/components/ourClients/Clients"));
const WhyChooseUs = lazy(() => import("@/components/why-us/WhyUsSession"));
const ContactForm = lazy(() => import("@/components/contact/contact"));
const TestimonialSection = lazy(
  () => import("@/components/testimonial/TestimonialSecion")
);
const FAQSection = lazy(() => import("@/components/faq/FaqSection"));
const FooterSection = lazy(() => import("@/components/footer/FooterSection"));
const WhatsappIcon = lazy(() => import("@/components/whatsapp/Whatsapp"));
const CallingIcon = lazy(() => import("@/components/calling/Call"));

export default function Home() {
  return (
    <>
      {/* Critical path rendering - load immediately */}
      <MainContent />

      {/* Below-the-fold content - lazy load with suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <ProcessSection />
        </div>
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <ProjectSession />
        </div>
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <Clients />
        </div>
      </Suspense>

      {/* ///////////////////////////////////////////////////// */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <StatsCounter />
        </div>
      </Suspense>

      {/* ///////////////////////////////////////////////////// */}

      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <WhyChooseUs />
        </div>
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <ContactForm />
        </div>
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <TestimonialSection />
        </div>
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <div className="content-visibility-auto">
          <FAQSection faqs={HomeFaqs} />
        </div>
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <FooterSection />
      </Suspense>

      {/* Floating action buttons - load after main content */}
      <Suspense fallback={null}>
        <WhatsappIcon />
      </Suspense>

      <Suspense fallback={null}>
        <CallingIcon />
      </Suspense>
    </>
  );
}
