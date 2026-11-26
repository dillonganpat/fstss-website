import Link from "next/link";
import PageHeading from "@/components/PageHeading";

export default function NotFound() {
  return (
    <>
      <PageHeading eyebrow="404" title="Page not found" intro="That page doesn't exist. Try one of the links below." />
      <Link href="/" className="rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-white hover:bg-brand">
        Back to home
      </Link>
    </>
  );
}
