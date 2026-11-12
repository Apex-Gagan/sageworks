import type { ImageKey } from "./captions";

/**
 * Homepage copy. Taken from "Sagework | Website Content Master" (Page 1),
 * with supporting lines from Pages 3 to 6. Edit copy here, not in components.
 */

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "connect@sagework.in";
export const contactHref = `mailto:${contactEmail}?subject=${encodeURIComponent("Start a conversation with Sagework")}`;

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

/** Facts drawn from the founder page and research page copy. */
export const proof = [
  { value: "20+", unit: "years", label: "leading businesses and shaping environments" },
  { value: "110,000", unit: "meals a day", label: "served at scale by Chef on Wheels" },
  { value: "PhD", unit: "Clinical Nutrition", label: "with maternal and infant gut microbiome research" },
  { value: "5", unit: "countries", label: "India, Singapore, Malaysia, Australia, United Kingdom" },
];

export type Domain = {
  name: string;
  question: string;
  body: string;
  detail: string;
  image: ImageKey;
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
      image: "hospitals/physio-figures",
    },
    {
      name: "Environment",
      question: "What is happening around us.",
      body: "We examine how light, air, sound, food, space, nature and movement shape the conditions in which people function, recover and perform.",
      detail: "Light, sound, air, food, nature, movement, sensory experience and the places in which people live, learn, work, heal and age.",
      image: "academic/msap-terrace-steps",
    },
    {
      name: "Behaviour",
      question: "What people are enabled to do repeatedly.",
      body: "We translate knowledge into behaviours, routines and operating practices that people and organisations can sustain.",
      detail: "Habits, routines, relationships, culture, purpose, incentives and the actions that become part of everyday life.",
      image: "academic/msap-courtyard",
    },
  ] satisfies Domain[],
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
      image: "hospitals/whitefield-lobby-rings",
    },
    {
      name: "Strategic Advisory",
      body: "Direct, ongoing counsel for leaders making complex decisions across health, wellbeing, human performance and systems design.",
      outputs: "Regular advisory discussions, decision briefs, evidence reviews or a phased strategic plan.",
      image: "founder/team-table",
    },
    {
      name: "Evaluation and Audit",
      body: "Independent assessment of environments, services and practices through the connected lenses of biology, environment and behaviour, identifying gaps, risks and priorities for action.",
      outputs: "A current-state assessment, gap analysis, prioritised action plan or evaluation framework.",
      image: "founder/site-materials",
    },
    {
      name: "Education and Knowledge",
      body: "Evidence reviews, white papers, leadership briefings and learning programmes that turn complex science into informed decisions and practical action.",
      outputs: "Workshops, talks, leadership briefings, evidence reviews, white papers or learning programmes.",
      image: "academic/marc-auditorium",
    },
    {
      name: "Board Strategy",
      body: "Independent counsel for boards and leadership teams navigating health strategy, responsible growth, innovation and long-term organisational resilience.",
      outputs: "A board briefing, facilitated board strategy discussion or strategic review of a proposed health initiative.",
      image: "academic/boardroom-skylight",
    },
    {
      name: "Investments and Partnerships",
      body: "Selective strategic collaboration with founders, researchers and organisations developing evidence-led approaches to health, wellbeing and human performance.",
      outputs: "An exploration of strategic fit, an evidence review or a proposed advisory or research collaboration.",
      image: "founder/studio-team",
    },
  ] satisfies { name: string; body: string; outputs: string; image: ImageKey }[],
};

export const sectors = [
  "Healthcare and care settings",
  "Schools and universities",
  "Workplaces and leadership teams",
  "Architecture and the built environment",
  "Food, hospitality and community systems",
  "Health founders and organisations",
];

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

export type Sense = { name: string; line: string; body: string; image: ImageKey };

export const senses = {
  kicker: "The Five Senses",
  title: "The body's interface with the world",
  intro:
    "The senses are a primary pathway through which the environment becomes biological information.",
  body: "Light, sound, smell, taste and touch provide continuous sensory input. The brain and body interpret these signals, influencing attention, stress, emotion, behaviour and physiological response.",
  close:
    "Sagework studies the senses as functional inputs within human systems, not as decorative features of experience.",
  cta: "Explore the Five Senses",
  items: [
    {
      name: "Sight",
      line: "Light that supports the activity",
      body: "Light affects circadian timing, alertness and cognitive function. Research indicates that the timing, intensity and quality of light can influence how people feel and perform.",
      image: "hospitals/whitefield-lobby-lights",
    },
    {
      name: "Sound",
      line: "Acoustics with consequences",
      body: "Sound affects attention, stress and recovery. In healthcare and workplace settings, persistent or poorly managed noise can impair concentration, rest and wellbeing.",
      image: "academic/marc-auditorium-stage",
    },
    {
      name: "Smell",
      line: "The biology of scent and association",
      body: "Smell is closely connected to brain systems involved in memory and emotion, giving scent a direct role in perception, experience and behaviour.",
      image: "hospitals/zen-orchid",
    },
    {
      name: "Taste",
      line: "Food choices begin with the food environment",
      body: "Taste is both experience and biological signalling. It influences appetite, food choice and the body's responses before and during eating.",
      image: "hospitality/wgsha-kitchen-red",
    },
    {
      name: "Touch",
      line: "Contact and physical comfort",
      body: "Touch provides information about safety, connection and the physical environment.",
      image: "hospitals/mangalore-spiral-turtle",
    },
  ] satisfies Sense[],
};

export const gutsy = {
  kicker: "Meet Dr Gutsy",
  title: "Curiosity backed by evidence",
  lead: "Dr Gutsy asks the questions that health culture often oversimplifies.",
  body: "Dr Gutsy is Sagework's public education platform, founded by Dr Shruti Pai. It offers evidence-led exploration of the gut microbiome, nutrition, sensory science and everyday health claims. Complex science is examined critically and translated without reducing it to trends, fear or false certainty.",
  questions: [
    "What can the organisms living within us tell us about nutrition, development and health?",
    "How do the conditions around us become part of our daily experience?",
    "What makes a claim convincing, and what makes it credible?",
  ],
  sign: "Stay curious. Stay evidence-led. Stay gutsy.",
  cta: "Explore Dr Gutsy",
};

export const research = {
  kicker: "Research and Evidence",
  title: "Evidence must be visible.",
  lead: "Explore peer-reviewed publications, white papers, evidence reviews and essays examining how biology, environment and behaviour shape human health, resilience and performance.",
  body: "We distinguish established evidence from emerging research, interpretation and hypothesis, so decision-makers can understand both what is known and where uncertainty remains.",
  principles: ["Clear sources", "Proportionate claims", "Visible uncertainty"],
  cta: "Research & Evidence",
  publications: [
    {
      title:
        "Temporal burden of WHO Critical-priority Enterobacteriaceae in the infant gut during early life influenced by maternal postpartum antibiotic exposure",
      journal: "Indian Journal of Medical Microbiology",
      year: "2025",
    },
    {
      title: "Exclusive Breastfeeding and Body Composition in Indian Infants: A Prospective Study",
      journal: "Indian Pediatrics",
      year: "2025",
    },
    {
      title:
        "Comparison of growth patterns in the first year of life between term small for gestational age and appropriate for gestational age South Indian infants",
      journal: "BMJ Paediatrics Open",
      year: "2024",
    },
    {
      title:
        "Comparison of Anthropometry and Body Composition Using Air Displacement Plethysmography in Term Small for Gestational Age and Appropriate for Gestational Age Neonates",
      journal: "Indian Pediatrics",
      year: "2023",
    },
    {
      title: "Intraindividual double burden of malnutrition: The contribution of the infant gut microbiome",
      journal: "Asia Pacific Journal of Clinical Nutrition",
      year: "2022",
    },
  ],
  papers: [
    { code: "01", title: "The Human Adaptation Gap" },
    { code: "02", title: "The Biology of the Five Senses" },
    { code: "03", title: "The Gut-Brain Axis" },
    { code: "04", title: "Circadian Biology" },
    { code: "05", title: "Sleep by Design" },
    { code: "06", title: "Stress, Safety & Human Regulation" },
  ],
};

export const closing = {
  title: "Better health begins with better conditions",
  body: "For leaders shaping places, services, institutions or ideas that influence how people live, learn, work, eat, heal or age, Sagework provides the evidence, framework and strategic direction to design what comes next.",
  cta: "Start a Conversation",
};

/** Photographs used for the homepage "selected environments" strip. */
export const homeGallery: { image: ImageKey; title: string; place: string }[] = [
  { image: "hospitals/mangalore-shell-lobby", title: "A lobby shaped by the sea", place: "Manipal Hospital, Mangalore" },
  { image: "academic/marc-auditorium", title: "An auditorium that carries sound", place: "MARC Auditorium, Bengaluru" },
  { image: "hospitals/whitefield-angel-corridor", title: "Corridors with the circle of life", place: "Manipal Hospital, Whitefield" },
  { image: "hospitals/paediatric-ceiling", title: "A canopy for children to look up to", place: "Paediatric ward" },
  { image: "hospitality/wgsha-hexagon", title: "Metal hexagons across an atrium", place: "WGSHA, Manipal" },
  { image: "hospitals/dwarka-facade-kites", title: "Kites, flowers and taking flight", place: "Manipal Hospital, Dwarka" },
  { image: "hospitality/valley-rangoli-restaurant", title: "A restaurant called Rangoli", place: "Valley View, Manipal" },
  { image: "academic/msap-exterior", title: "A school of architecture in brick", place: "MSAP, Manipal" },
];
