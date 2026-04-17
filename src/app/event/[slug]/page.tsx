import EventDetailPage from "../EventDetailPage";
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/content";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return {
      title: "Event Not Found | NovaNectar",
      description:
        "The event you're looking for doesn't exist or may have been removed.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = absoluteUrl(`/event/${event.slug}`);

  return {
    title: event.metaTitle || `${event.title} | NovaNectar`,
    description: event.metaDescription || event.description?.slice(0, 160),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: event.metaTitle || event.title,
      description: event.metaDescription || event.description,
      url,
      siteName: SITE_NAME,
      images: event.featuredImage ? [{ url: event.featuredImage }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: event.metaTitle || event.title,
      description: event.metaDescription || event.description,
      images: event.featuredImage ? [event.featuredImage] : [],
    },
  };
}

export default async function EventPage({ params }: any) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.metaDescription || event.description,
    startDate: `${event.eventDate.split("T")[0]}T${event.eventTime}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.venue,
      address: event.venue,
    },
    organizer: {
      "@type": "Organization",
      name: event.organizer || SITE_NAME,
      url: SITE_URL,
    },
    image: event.featuredImage ? [event.featuredImage] : [],
    url: absoluteUrl(`/event/${event.slug}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventDetailPage event={event} />
    </>
  );
}
