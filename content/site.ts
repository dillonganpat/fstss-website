export const site = {
  name: "FSTSS",
  fullName: "Faculty of Science and Technology Student Society",
  campus: "UWI St. Augustine",
  description:
    "Faculty of Science and Technology Student Society, UWI St. Augustine. Events, resources, and how to get in touch.",
  url: "https://fstss-website.vercel.app",
  contact: {
    name: "Nirvana Kandhai",
    role: "Guild Representative, FSTSS",
    email: "guildfstrep@my.uwi.edu",
    phone: "+1 (868) 286-1885",
    phoneHref: "tel:+18682861885",
  },
  social: [
    { label: "Instagram", handle: "@fstssuwi", href: "https://www.instagram.com/fstssuwi/" },
    { label: "TikTok", handle: "@fstssuwi", href: "https://www.tiktok.com/@fstssuwi" },
    {
      label: "Facebook",
      handle: "FST Students Society UWI STA",
      href: "https://www.facebook.com/p/FST-Students-Society-UWI-STA-100074688009148/",
    },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About Us" },
  { href: "/events/", label: "Events" },
  { href: "/map/", label: "Map" },
  { href: "/resources/", label: "Resources" },
  { href: "/contact/", label: "Contact" },
] as const;
