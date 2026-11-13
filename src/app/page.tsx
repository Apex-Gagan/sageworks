import type { Metadata } from "next";
import { Fort, type FortSample } from "@/components/overview/Fort";
import { imageData } from "@/components/shared/Pic";
import type { ImageKey } from "@/content/captions";

export const metadata: Metadata = {
  title: "Sagework | Three design directions",
};

/** What each window of the fort opens onto. */
const samples: (Omit<FortSample, "src" | "blur" | "alt"> & { image: ImageKey })[] = [
  {
    id: "1",
    name: "Still",
    line: "Light, editorial and quiet. Photographs sit like plates in a journal, with headlines that rise and a gallery that moves as you scroll.",
    references: "Aesop for atmosphere. Seed for science-led restraint.",
    type: "Cormorant Garamond with Hanken Grotesk",
    palette: ["#f3f4ec", "#e8ebde", "#35543a", "#1b2a20"],
    ground: "#f3f4ec",
    ink: "#1b2a20",
    image: "hospitals/zen-waiting",
  },
  {
    id: "2",
    name: "Canopy",
    line: "Dark forest and marigold. The triad becomes three overlapping photographs, portraits sit in arches, and sections slide over one another like sheets.",
    references: "Mindvalley for philosophy and scale. Dr Chatterjee for warmth and authority.",
    type: "Bricolage Grotesque with Hanken Grotesk",
    palette: ["#0c1410", "#131e18", "#e9b54d", "#ede8da"],
    ground: "#0c1410",
    ink: "#ede8da",
    image: "academic/msap-aerial-mist",
  },
  {
    id: "3",
    name: "Daylight",
    line: "White and cream with a green highlighter. A full-width photo slider, tiles with highlighted titles, giant numbers, photo mosaics and bold centred statements.",
    references: "Mindvalley for bold statements, mosaics and numbers. Dr Chatterjee for the slider, tiles and warmth.",
    type: "Google Sans Flex",
    palette: ["#fdfdfb", "#faf9f3", "#9aca28", "#1f2a36"],
    ground: "#fdfdfb",
    ink: "#151b25",
    image: "hospitals/whitefield-lobby-rings",
  },
];

export default function Overview() {
  const fortSamples: FortSample[] = samples.map(({ image, ...s }) => {
    const d = imageData(image);
    return { ...s, src: d.src, blur: d.blur, alt: d.alt };
  });
  return <Fort samples={fortSamples} />;
}
