import type { ReactNode } from "react";
import { NavTwo } from "@/components/two/Nav";
import { FooterTwo } from "@/components/two/Footer";
import { SampleSwitcher } from "@/components/shared/SampleSwitcher";

/** Sample 2 "Canopy": dark, immersive, photography-led. Mindvalley scale with Rangan Chatterjee's warmth. */
export default function SampleTwoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-two grain font-body">
      <NavTwo />
      <main>{children}</main>
      <FooterTwo />
      <SampleSwitcher />
    </div>
  );
}
