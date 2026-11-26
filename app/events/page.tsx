import type { Metadata } from "next";
import EventList from "@/components/EventList";
import PageHeading from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past FSTSS events at UWI St. Augustine.",
};

export default function Events() {
  return (
    <>
      <PageHeading title="Events" intro="What's coming up, and what you may have missed." />
      <EventList showPast />
    </>
  );
}
