import type { Metadata } from "next";
import EventIndexPage from "@/components/events/EventIndexPage";
import { getEvents } from "@/lib/content";
import { buildPageMetadata } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Events",
  description:
    "Discover NovaNectar events, workshops, sessions, and community updates from our team and partners.",
  path: "/event",
});

export default async function EventPage() {
  const events = await getEvents();
  return <EventIndexPage items={events} />;
}
