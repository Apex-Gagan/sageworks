import type { ReactNode } from "react";
import { HeaderThree, SideTab } from "@/components/three/Header";
import { FooterThree } from "@/components/three/Footer";
import { SampleSwitcher } from "@/components/shared/SampleSwitcher";

/**
 * Sample 3 "Daylight". Built on the client's two people-facing references:
 * mindvalley.com (bold centred statements, photo mosaics, giant numbers,
 * image cards, pill buttons) and drchatterjee.com (full-width photo slider,
 * tiles with highlighted titles, a teal accent, cards with one large corner,
 * a persistent side tab).
 */
export default function SampleThreeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-three">
      <HeaderThree />
      <main>{children}</main>
      <FooterThree />
      <SideTab />
      <SampleSwitcher />
    </div>
  );
}
