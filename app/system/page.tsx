import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SystemExperience } from "@/components/system/SystemExperience";

export const metadata: Metadata = {
  title: "The System · How the machine works | Anand Iyer",
  description:
    "A compounding loop: data enrichment, content automation, outreach automation, and conversion optimisation — each stage opening into the real work it ships.",
};

export default function SystemPage() {
  return (
    <main className="relative">
      <Nav />
      <SystemExperience />
      <Footer />
    </main>
  );
}
