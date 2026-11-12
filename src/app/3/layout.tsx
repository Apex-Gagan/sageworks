import type { ReactNode } from "react";
import { SidebarThree } from "@/components/three/Sidebar";
import { FooterThree } from "@/components/three/Footer";
import { SampleSwitcher } from "@/components/shared/SampleSwitcher";

/**
 * Sample 3 "Folio": cool porcelain, indigo ink, one vermilion accent.
 * Structure differs from the other two: a fixed side rail instead of a top
 * bar, master-and-detail selectors, and leaf-shaped feature photographs.
 */
export default function SampleThreeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-three grain font-body">
      <SidebarThree />
      <div className="xl:pl-[264px]">
        <main>{children}</main>
        <FooterThree />
      </div>
      <SampleSwitcher />
    </div>
  );
}
