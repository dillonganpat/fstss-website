import type { Metadata } from "next";
import Image from "next/image";
import PageHeading from "@/components/PageHeading";

export const metadata: Metadata = {
  title: "Campus Map",
  description: "The full UWI St. Augustine campus map. View it online or download the PDF.",
};

export default function MapPage() {
  return (
    <>
      <PageHeading title="Campus map" intro="The full UWI St. Augustine campus map. Open the large version to zoom in, or download it to view offline." />
      <div className="mb-6 flex flex-wrap gap-3">
        <a
          href="/assets/map-hires.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-white hover:bg-brand"
        >
          Open full-size map<span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          href="/assets/sta_map.pdf"
          download
          className="rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold hover:bg-surface-2"
        >
          Download PDF
        </a>
      </div>
      <Image
        src="/assets/map-preview.jpg"
        alt="Map of the UWI St. Augustine campus showing buildings and roads"
        width={2600}
        height={1560}
        loading="lazy"
        className="w-full rounded-2xl border border-line"
      />
    </>
  );
}
