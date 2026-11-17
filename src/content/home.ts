import type { ImageKey } from "./captions";

/**
 * Homepage copy. Taken from "Sagework | Website Content Master" (Page 1),
 * with supporting lines from Pages 3 to 6. Edit copy here, not in components.
 */

export const hero = {
  headline: "Designing human systems for health, resilience and performance",
  sub: "Sagework helps leaders, institutions and organisations understand and improve the systems that shape how people live, work and perform.",
  cta: "Discover Sagework",
  tagline: "Built on Biology. Integrated Through Systems. Scaled for Human Potential.",
};

export const about = {
  kicker: "About Sagework",
  statement: "Health is shaped by systems.",
  lead: "Sagework is an evidence-led advisory and design practice working across biology, environment and behaviour.",
  body: [
    "Biology does not operate in isolation. Nutrition, the gut microbiome, the built environment and human behaviour interact continuously, influencing health, resilience and performance.",
    "Sagework brings these forces into one evidence-led framework. We translate research into practical strategy, system design and implementation for organisations, institutions and leaders addressing complex human challenges.",
  ],
  pull: "The conditions around us become part of the conditions within us.",
};

export const triad = {
  kicker: "The SAGE Triad",
  title: "Three domains. One human system.",
  intro:
    "Biology, environment and behaviour are not separate variables. They are connected conditions within one human system.",
  body: "Sagework examines how these domains interact, identifies where the system is working against people and designs interventions that can be applied in the real world.",
  close:
    "Biology responds to conditions. Environments influence behaviour. Behaviour reinforces outcomes. Sustainable change requires all three to be considered together.",
  cta: "Research & Evidence",
  domains: [
    {
      name: "Biology",
      question: "What is happening within us.",
      body: "We use evidence from clinical nutrition, gut microbiome research and preventive health to understand the biological factors influencing health and performance.",
      detail: "Nutrition, the gut microbiome, metabolism, sleep, stress physiology, circadian rhythms and preventive health.",
    },
    {
      name: "Environment",
      question: "What is happening around us.",
      body: "We examine how light, air, sound, food, space, nature and movement shape the conditions in which people function, recover and perform.",
      detail: "Light, sound, air, food, nature, movement, sensory experience and the places in which people live, learn, work, heal and age.",
    },
    {
      name: "Behaviour",
      question: "What people are enabled to do repeatedly.",
      body: "We translate knowledge into behaviours, routines and operating practices that people and organisations can sustain.",
      detail: "Habits, routines, relationships, culture, purpose, incentives and the actions that become part of everyday life.",
    },
  ],
};

export const work = {
  kicker: "Work with Sagework",
  title: "Build health and performance into the system.",
  lead: "Sagework advises leaders, institutions and organisations that want health, resilience and performance designed into the way they operate, not added as a disconnected initiative.",
  note: "The objective is not more activity. It is a clearer understanding of the system, better decisions and interventions that can hold under real operating conditions.",
  cta: "Work With Sagework",
  services: [
    {
      name: "Consulting",
      body: "Evidence-led consulting for healthcare, workplaces, schools, hospitality, buildings and other settings responsible for the health and experience of the people they serve.",
      outputs: "A project brief, design recommendations, a programme or environment strategy, or an implementation roadmap.",
    },
    {
      name: "Strategic Advisory",
      body: "Direct, ongoing counsel for leaders making complex decisions across health, wellbeing, human performance and systems design.",
      outputs: "Regular advisory discussions, decision briefs, evidence reviews or a phased strategic plan.",
    },
    {
      name: "Evaluation and Audit",
      body: "Independent assessment of environments, services and practices through the connected lenses of biology, environment and behaviour, identifying gaps, risks and priorities for action.",
      outputs: "A current-state assessment, gap analysis, prioritised action plan or evaluation framework.",
    },
    {
      name: "Education and Knowledge",
      body: "Evidence reviews, white papers, leadership briefings and learning programmes that turn complex science into informed decisions and practical action.",
      outputs: "Workshops, talks, leadership briefings, evidence reviews, white papers or learning programmes.",
    },
    {
      name: "Board Strategy",
      body: "Independent counsel for boards and leadership teams navigating health strategy, responsible growth, innovation and long-term organisational resilience.",
      outputs: "A board briefing, facilitated board strategy discussion or strategic review of a proposed health initiative.",
    },
    {
      name: "Investments and Partnerships",
      body: "Selective strategic collaboration with founders, researchers and organisations developing evidence-led approaches to health, wellbeing and human performance.",
      outputs: "An exploration of strategic fit, an evidence review or a proposed advisory or research collaboration.",
    },
  ],
};

export const founderTeaser = {
  kicker: "Meet Dr Shruti Pai",
  role: "Founder and Director, Sagework",
  lead: "One driving question.",
  question: "How do we build systems that genuinely help people live and work better?",
  body: [
    "Dr Shruti Pai is a business leader, clinical nutrition scientist, gut microbiome researcher and human systems designer. Her work brings together more than two decades of experience across business, healthcare, education, food systems, research and environmental design.",
    "She founded Sagework to help leaders and institutions move beyond fragmented solutions and address the connected biological, environmental and behavioural conditions that shape human outcomes.",
  ],
  cta: "Meet the Founder",
};

export const closing = {
  title: "Better health begins with better conditions",
  body: "For leaders shaping places, services, institutions or ideas that influence how people live, learn, work, eat, heal or age, Sagework provides the evidence, framework and strategic direction to design what comes next.",
  cta: "Start a Conversation",
};

/**
 * The homepage opening film: one photograph per lens of the SAGE Triad, each with the
 * lens line from the founder page. Stills stand in until the edited video is supplied.
 */
export const film: { lens: "Biology" | "Environment" | "Behaviour"; line: string; image: ImageKey; pos?: string }[] = [
  { lens: "Biology", line: "What is happening within us.", image: "people/leaf-talk", pos: "50% 30%" },
  { lens: "Environment", line: "What is happening around us.", image: "people/park-walk", pos: "50% 60%" },
  { lens: "Behaviour", line: "What people are enabled to do repeatedly.", image: "people/craft-table", pos: "50% 35%" },
];

/**
 * "What will you get by working with us?" The items are the possible outputs listed
 * for each service on the Work with Sagework page (content master, Page 7).
 */
export const outcomes = {
  statement:
    "The objective is not more activity. It is a clearer understanding of the system, better decisions and interventions that can hold under real operating conditions.",
  label: "Possible outputs",
  items: [
    "A project brief and design recommendations",
    "A programme or environment strategy",
    "An implementation roadmap",
    "A current-state assessment and gap analysis",
    "A prioritised action plan",
    "Decision briefs and evidence reviews",
    "Workshops, talks and leadership briefings",
    "A board briefing or strategic review",
  ],
  note: "Scope and deliverables are agreed at the outset of each engagement.",
};
