import type { ReactNode } from "react";
import { LeafCursor } from "@/components/brand/Leaf";
import { FooterTwo, HeaderTwo } from "@/components/two/Chrome2";

/**
 * Design 2, under /2. Same colours, typefaces, logo and wording as Design 1; a
 * different layout, its own components (src/components/two) and its own photographs.
 */
export default function DesignTwoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderTwo />
      <main id="main" data-design="2">
        {children}
      </main>
      <FooterTwo />
      <LeafCursor />
    </>
  );
}
