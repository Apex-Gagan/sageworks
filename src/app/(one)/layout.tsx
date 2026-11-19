import type { ReactNode } from "react";
import { LeafCursor } from "@/components/brand/Leaf";
import { Footer, Header } from "@/components/site/Chrome";

/** Design 1: the header and green footer around every page at the site root. */
export default function DesignOneLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <LeafCursor />
    </>
  );
}
