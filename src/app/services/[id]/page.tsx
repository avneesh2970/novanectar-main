import { use } from "react";
import Image from "next/image";
import { getServiceById } from "@/lib/services-data";
import ServiceContent from "@/components/services/ServiceContent";
import FooterSection from "@/components/footer/FooterSection";

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
    <main className="min-h-screen bg-[#bcd0f3]">
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
  );
}
