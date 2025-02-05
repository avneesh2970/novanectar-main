import type { Metadata } from "next";
import { use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/services-data";
import ServiceContent from "@/components/services/ServiceContent";
import FooterSection from "@/components/footer/FooterSection";
import Script from "next/script";
import Navbar from "@/components/navbar/Navbar";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceById(resolvedParams.id);

  if (!service) {
    return notFound();
  }

  return {
    title: `${service.title} | Novanectar Services`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://novanectar.co.in/services/${resolvedParams.id}`,
      images: [
        {
          url: "https://novanectar.co.in/twitter-image.jpg",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: ["https://novanectar.co.in/twitter-image.jpg"],
    },
    alternates: {
      canonical: `https://novanectar.co.in/services/${resolvedParams.id}`,
    },
  };
}


// Add structured data for the service
function getServiceStructuredData(service: ReturnType<typeof getServiceById>) {
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Novanectar Services Pvt. Ltd.",
      url: "https://novanectar.co.in",
    },
    image: service.coverImage,
    url: `https://novanectar.co.in/services/${service.id}`,
  };
}

export default function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const service = getServiceById(resolvedParams.id);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceStructuredData(service)),
        }}
      />
      <main className="min-h-screen">
        <Navbar />
        <div
          className="relative w-full"
          style={{ height: "calc(100vw / (16 / 9))" }}
        >
          <Image
            src={service.coverImage}
            alt={service.title}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        <ServiceContent service={service} />
        <FooterSection />
      </main>
    </>
  );
}
