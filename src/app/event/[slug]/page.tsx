import EventDetailPage from "../EventDetailPage";

async function getEvent(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/event/posts?slug=${slug}`,
      {
        next: { revalidate: 60 }, // cache for 1 minute
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch event:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

// ✅ Generate SEO metadata (title, description, canonical, Open Graph)
export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  const event = await getEvent(slug);

  if (!event) {
    return {
      title: "Event Not Found | NovaNectar",
      description:
        "The event you're looking for doesn't exist or may have been removed.",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/event/${params.slug}`,
      },
    };
  }

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/event/${event.slug}`;

  return {
    title: event.metaTitle || `${event.title} | NovaNectar`,
    description: event.metaDescription || event.description?.slice(0, 160),
    alternates: {
      canonical: url, // ✅ canonical tag fix
    },
    openGraph: {
      title: event.title,
      description: event.description,
      url,
      images: event.featuredImage ? [{ url: event.featuredImage }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: event.featuredImage ? [event.featuredImage] : [],
    },
  };
}

export default async function EventPage({ params }: any) {
  const { slug } = await params;
  const event = await getEvent(slug);
  return <EventDetailPage event={event} />;
}
