import type { ReactNode } from "react";
import { NavOne } from "@/components/one/Nav";
import { FooterOne } from "@/components/one/Footer";
import { SampleSwitcher } from "@/components/shared/SampleSwitcher";

/** Sample 1 "Still": light, editorial, hairline. Aesop atmosphere with Seed's evidence cues. */
export default function SampleOneLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-one grain font-body">
      <NavOne />
      <main>{children}</main>
      <FooterOne />
      <SampleSwitcher />
    </div>
  );
}
