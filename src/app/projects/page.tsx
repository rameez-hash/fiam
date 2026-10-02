import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Commercial Lighting Projects",
  description:
    "Explore Fiam Pakistan commercial lighting project capabilities across offices, hospitality, outdoor pathways, and decorative interiors.",
  path: "/projects",
  keywords: ["Fiam Pakistan projects", "commercial lighting projects"],
});

const projects = [
  {
    title: "Commercial linear offices",
    text: "Continuous linear LED and wall washer systems for modern workplaces.",
    href: "/categories/commercial-led-light",
  },
  {
    title: "Retail accent modules",
    text: "GU10, MR16, PAR, and AR111 modules for display and ceiling aiming.",
    href: "/categories/fixtures-led-module",
  },
  {
    title: "Outdoor pathways",
    text: "IP65 step lights guiding circulation for hotels, villas, and façades.",
    href: "/categories/outdoor-light",
  },
  {
    title: "Decorative hospitality",
    text: "Soft panel and multi-point decorative luminaires for atmosphere-led interiors.",
    href: "/categories/decorative-lighting",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <section className="bg-bg-deep text-white">
        <div className="container-page py-24">
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-white/55">Projects</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Commercial applications
          </h1>
          <p className="mt-5 max-w-2xl text-white/70 leading-relaxed">
            Fiam Pakistan luminaires are specified across commercial interiors, outdoor landscapes, and decorative
            hospitality environments.
          </p>
        </div>
      </section>

      <section className="container-page section-pad grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={project.href}
            className="group border border-line bg-white p-8 transition-colors hover:border-accent"
          >
            <h2 className="font-display text-3xl font-semibold tracking-tight group-hover:text-accent transition-colors">
              {project.title}
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed">{project.text}</p>
            <span className="mt-8 inline-block text-[12px] font-semibold tracking-[0.16em] uppercase">
              View collection →
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
