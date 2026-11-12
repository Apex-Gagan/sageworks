import type { ImageKey } from "./captions";

/**
 * Founder page copy. Taken from "Sagework | Website Content Master" (Page 2).
 */

export const founderHero = {
  name: "Dr Shruti Pai",
  roles: [
    "Business Leader",
    "Clinical Nutrition Scientist",
    "Gut Microbiome Researcher",
    "Human Systems Designer",
  ],
  title: "Founder and Director, Sagework",
  lead: "One question has shaped more than two decades of her work.",
  question: "How do we build systems that truly help people?",
  intro: [
    "Dr Shruti Pai works at the intersection of business, science, environment and human behaviour.",
    "Her perspective has been built through more than two decades of leading businesses, scaling operations, conducting scientific research and shaping environments across hospitality, healthcare, education and food systems.",
    "This combination defines Sagework: evidence that can inform decisions, systems that can support people and ideas that can be executed in the real world.",
  ],
  portrait: "founder/reviewing-designs" as ImageKey,
};

export type Chapter = {
  id: string;
  role: string;
  title: string;
  maxim: string;
  body: string[];
  /** Closing line set large. */
  pull?: string;
  pullLead?: string;
  facts?: { value: string; label: string }[];
  images: ImageKey[];
  link?: { label: string; href: string };
};

export const chapters: Chapter[] = [
  {
    id: "business-leader",
    role: "Business Leader",
    title: "Building ideas into working systems",
    maxim: "Ideas must work.",
    body: [
      "Dr Shruti began her career in business and operations, long before she entered scientific research.",
      "For more than two decades, she has built and led businesses, environments and operational systems across hospitality, healthcare, education and large-scale food services. This experience taught her how strategy moves from an idea to execution, where systems fail and what sustainable scale actually requires.",
      "At Manipal Resorts, she founded and scaled Chef on Wheels into a catering operation delivering approximately 110,000 meals a day.",
      "Chef on Wheels later became part of Manipal Integrated Services. In 2016, Quess Corp acquired the facility management and catering businesses of Manipal Integrated Services.",
    ],
    pullLead: "The experience reinforced a principle that continues to guide her work:",
    pull: "A good idea only matters if it can be built, scaled and made to work in the real world.",
    facts: [
      { value: "110,000", label: "meals a day at Chef on Wheels" },
      { value: "2016", label: "catering business acquired by Quess Corp" },
    ],
    images: [
      "hospitality/chef-van-team",
      "founder/chef-on-wheels-kitchen",
      "hospitality/chef-van-serving",
    ],
  },
  {
    id: "scientist",
    role: "Scientist and Researcher",
    title: "Understanding human health through evidence",
    maxim: "Evidence before assumption.",
    body: [
      "Dr Shruti holds a PhD in Clinical Nutrition, an MSc in Clinical Nutrition and a BSc (Hons) in Biomedical Sciences (Medical Virology).",
      "Her doctoral research examined the relationship between the maternal and infant gut microbiome, infant growth and body composition during the first year of life.",
      "Her wider research interests include early-life health, breastfeeding, nutrition, metabolism, preventive health and the biological factors that influence how differently people respond to similar conditions.",
    ],
    pullLead: "Research strengthened a question that had already emerged through her business experience:",
    pull: "Why do the same systems, environments and recommendations produce different outcomes for different people?",
    facts: [
      { value: "PhD", label: "Clinical Nutrition" },
      { value: "MSc", label: "Clinical Nutrition" },
      { value: "BSc (Hons)", label: "Biomedical Sciences, Medical Virology" },
    ],
    images: ["hospitals/tree-of-life-front", "hospitals/physio-get-set-go"],
    link: { label: "Research & evidence", href: "#research" },
  },
  {
    id: "designer",
    role: "Human Systems Designer",
    title: "Understanding the environment as an active input",
    maxim: "The environment shapes biology.",
    body: [
      "Before founding Sagework, Dr Shruti spent more than a decade as Creative Director, working across hospitals, universities, clinics, hostels and workplaces.",
      "This experience showed her that the environment is not simply the setting in which health happens. It is one of the inputs shaping it.",
      "Light, sound, air, colour, food, nature, movement and human interaction can influence how people feel, behave, recover and perform.",
    ],
    pullLead: "Design is therefore not only about how a place looks.",
    pull: "It is about what that place enables people to feel, understand and do.",
    images: [
      "hospitals/mangalore-shell-lobby",
      "founder/studio-team",
      "hospitals/whitefield-angel-corridor",
      "founder/site-auditorium",
      "academic/marc-auditorium",
    ],
    link: { label: "See the projects", href: "projects" },
  },
  {
    id: "writer",
    role: "Writer and Educator",
    title: "Turning complex evidence into useful understanding",
    maxim: "Knowledge must be usable.",
    body: [
      "Dr Shruti writes and teaches across the gut microbiome, nutrition, women's health, early-life biology, behaviour and the relationship between people and their environments.",
      "Her work translates complex evidence without stripping it of meaning. It asks better questions, distinguishes evidence from assumption and connects scientific understanding with the decisions people make in everyday life.",
    ],
    images: ["founder/team-table"],
  },
  {
    id: "dr-gutsy",
    role: "Dr Gutsy",
    title: "Truth over trends",
    maxim: "Stay curious. Ask better questions.",
    body: [
      "Dr Gutsy is Sagework's public education platform, founded by Dr Shruti Pai. It explores health questions through evidence-led public education.",
      "It brings together scientific rigour, curiosity and clear communication to make gut microbiome science and human biology easier to understand, question and remember.",
      "Dr Gutsy does not offer another stream of health trends. It examines what the evidence shows, what remains uncertain and why context matters.",
    ],
    images: [],
    link: { label: "Explore Dr Gutsy", href: "#gutsy" },
  },
  {
    id: "global",
    role: "Global Perspective",
    title: "Understanding health within context",
    maxim: "Context changes outcomes.",
    body: [
      "Dr Shruti's life and work across India, Singapore, Malaysia, Australia and the United Kingdom have shaped how she studies human health.",
      "Travel continues to extend that perspective. She observes how cultures eat, move, rest, age, connect and organise their surroundings, and what those patterns reveal about the relationship between biology, environment and behaviour.",
    ],
    pullLead: "Different cultures may approach health differently, but the same principle remains:",
    pull: "People cannot be understood separately from the systems in which they live.",
    facts: [
      { value: "India", label: "" },
      { value: "Singapore", label: "" },
      { value: "Malaysia", label: "" },
      { value: "Australia", label: "" },
      { value: "United Kingdom", label: "" },
    ],
    images: ["hospitals/malaysia-mural", "academic/msap-aerial-mist"],
  },
  {
    id: "lived",
    role: "Lived Experience",
    title: "Where knowledge is tested by life",
    maxim: "Knowledge must hold up in the real world.",
    body: [
      "Dr Shruti is a mother, entrepreneur, researcher, designer and lifelong learner.",
      "Business taught her to execute. Science taught her to question. Design taught her to observe. Motherhood, reinvention and lived experience taught her that knowledge has value only when it can work within the complexity of real life.",
    ],
    images: ["founder/site-foundation", "founder/mosaic-wall"],
  },
];

export const lenses = {
  lead: "This is why Sagework examines health through three connected lenses:",
  items: [
    {
      name: "Biology",
      line: "What is happening within us.",
      body: "Nutrition, the gut microbiome, metabolism, sleep, stress physiology, circadian rhythms and preventive health.",
    },
    {
      name: "Environment",
      line: "What is happening around us.",
      body: "Light, sound, air, food, nature, movement, sensory experience and the places in which people live, learn, work, heal and age.",
    },
    {
      name: "Behaviour",
      line: "What people are enabled to do repeatedly.",
      body: "Habits, routines, relationships, culture, purpose, incentives and the actions that become part of everyday life.",
    },
  ],
  close: [
    "Biology shows us what is happening.",
    "The environment reveals what is shaping it.",
    "Behaviour determines what is repeated.",
  ],
  final: "Sagework operates where all three meet.",
  tagline: "Built on Biology. Integrated Through Systems. Scaled for Human Potential.",
  cta: "Work With Sagework",
};
