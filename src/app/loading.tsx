import { LeafDraw } from "@/components/brand/Leaf";

/** The loading mark between pages: the leaf drawing itself (questionnaire, Q19). */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading" data-loading className="flex min-h-[60vh] items-center justify-center">
      <LeafDraw loop duration={1.2} className="h-24 w-auto text-sage" />
    </div>
  );
}
