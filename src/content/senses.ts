import type { ImageKey } from "./captions";

/**
 * The Five Senses (content master, Page 4, with the homepage summary from Page 1).
 * `figure` is the number inside the client's own cited finding, lifted out so each
 * sense leads with a statistic. Sight has no number in the source text yet.
 */
export type Sense = {
  name: string;
  line: string;
  figure: string | null;
  figureLabel: string;
  finding: string;
  source: string;
  body: string;
  practice: string;
  image: ImageKey;
};

export const sensesIntro = {
  kicker: "The Five Senses",
  homeTitle: "The body's interface with the world",
  homeLead: "The senses are a primary pathway through which the environment becomes biological information.",
  title: "How the environment communicates with the body",
  lead: "Every environment places demands on the people within it. Light, sound, smell, taste and touch help shape how we experience a space, direct our attention and respond to what is happening around us.",
  body: "Sagework integrates sensory science, environmental design and operational expertise to help organisations make informed, practical decisions about spaces, food systems and everyday practices.",
  close: "Sagework studies the senses as functional inputs within human systems, not as decorative features of experience.",
};

export const senses: Sense[] = [
  {
    name: "Sight",
    line: "Light that supports the activity",
    figure: null,
    figureLabel: "Light treated as a timed biological input",
    finding:
      "An international expert consensus published in PLOS Biology provides separate recommendations for daytime, evening and night-time light exposure in healthy adults. It supports treating light as a timed biological input.",
    source: "PLOS Biology (journals.plos.org)",
    body: "Light supports vision and also carries information about time of day. Glare, contrast, visual complexity and access to daylight all deserve attention when designing a space.",
    practice:
      "For organisations, the starting point is to assess lighting where people actually work, learn or rest, then address glare and task visibility. The timing dimension is explored further in our circadian science work.",
    image: "hospitals/whitefield-lobby-rings",
  },
  {
    name: "Sound",
    line: "Acoustics with consequences",
    figure: "8%",
    figureLabel: "higher relative risk of ischaemic heart disease for each 10 dB of long-term road-traffic noise",
    finding:
      "A WHO-commissioned systematic review found an 8% higher relative risk of developing ischaemic heart disease for each 10 dB increase in long-term road-traffic noise exposure. This population-level association is specific to that exposure and outcome.",
    source: "PubMed (pubmed.ncbi.nlm.nih.gov)",
    body: "Sound can support communication or compete with it. Its source, duration and predictability matter, alongside its volume.",
    practice:
      "Within organisations, we examine avoidable noise, speech clarity, privacy and the separation of activities that make competing acoustic demands.",
    image: "people/conversation",
  },
  {
    name: "Smell",
    line: "The biology of scent and association",
    figure: "2004",
    figureLabel: "Nobel Prize for discoveries explaining odour receptors and the olfactory system",
    finding:
      "Richard Axel and Linda Buck received the 2004 Nobel Prize in Physiology or Medicine for discoveries explaining odour receptors and the organisation of the olfactory system. Their work established a molecular foundation for understanding smell.",
    source: "The Nobel Prize (nobelprize.org)",
    body: "Smell helps us recognise food, places and familiar experiences. It is closely connected with memory and emotion, yet responses to the same odour can differ considerably.",
    practice:
      "In practice, Sagework begins with odour sources, ventilation and the needs of the people exposed. Fragrance choices require particular care in settings where people have sensitivities. A pleasant scent alone does not establish a health benefit.",
    image: "founder/garden-flowers",
  },
  {
    name: "Taste",
    line: "Food choices begin with the food environment",
    figure: "11.5%",
    figureLabel: "fewer calories purchased when cafeterias changed food availability and portion sizes",
    finding:
      "In a randomised trial across 19 workplace cafeterias, changing food availability and portion sizes reduced calories purchased from targeted food categories by 11.5%. The study measured purchases, not consumption or weight loss.",
    source: "PLOS (journals.plos.org)",
    body: "Flavour combines taste with smell, texture, temperature and expectation. Food choice also depends on what is available, affordable, convenient and culturally familiar.",
    practice:
      "This offers a practical example of changing the conditions around choice. Sagework connects sensory appeal with nutrition, food provision and operational feasibility, considering the needs of the population being served.",
    image: "hospitality/wgsha-kitchen-red",
  },
  {
    name: "Touch",
    line: "Contact and physical comfort",
    figure: "137",
    figureLabel: "studies in a 2024 meta-analysis of touch interventions",
    finding:
      "A 2024 Nature Human Behaviour meta-analysis of 137 studies found benefits of defined touch interventions for outcomes including pain and anxiety. Those findings concern the interventions studied, rather than a general effect of interior materials.",
    source: "Nature Human Behaviour (nature.com)",
    body: "We encounter environments through seating, surfaces, materials and movement. Temperature and airflow add to the experience of physical comfort.",
    practice:
      "For environmental design, we examine usability, physical comfort and opportunities for adjustment. Where interpersonal touch is relevant to care, consent, training and context are essential.",
    image: "people/tree-touch",
  },
];

export const sensesPage = {
  begin: {
    title: "Begin with what people need to do",
    body: [
      "A classroom needs clear communication. A hospital must support care and rest while keeping essential alarms audible. A workplace needs conditions for both collaboration and concentration.",
      "Sagework examines what people need to do in each setting, the sensory conditions that support or obstruct those activities, and the changes an organisation can realistically implement and evaluate.",
    ],
  },
  together: {
    title: "The senses work together",
    body: [
      "A space is experienced as a whole. Light, conversation, temperature, odour and physical comfort can reinforce one another or create competing demands. The same setting may also affect people differently.",
      "Sagework considers these interactions alongside differences in age, health, sensory sensitivity and the task.",
    ],
  },
  lenses: {
    title: "The SAGE Triad: three connected lenses",
    lead: "Sagework examines sensory environments through three connected lenses: Biology, Environment and Behaviour.",
    items: [
      { name: "Biology", body: "considers the people receiving sensory input and how their needs and responses may differ." },
      { name: "Environment", body: "examines the conditions they encounter, including light, sound, odour, food and physical comfort." },
      { name: "Behaviour", body: "considers what those conditions encourage, interrupt or make easier to sustain." },
    ],
    close: "Together, these lenses connect an understanding of sensory experience with decisions about the environments and practices that shape it.",
  },
  implement: {
    title: "From understanding to implementation",
    body: [
      "A change becomes useful when it can be implemented, maintained and evaluated within the organisation. We consider operating costs, staff routines, accessibility and the experience of the people using the space.",
      "Depending on the setting, this may involve lighting adjustments, acoustic zoning, odour-source management, changes to food provision or greater personal control over physical comfort. Each proposal needs an outcome that can be assessed.",
    ],
  },
  os: [
    { name: "Scan", body: "the people, tasks, sensory conditions and existing operating practices." },
    { name: "Analyse", body: "where the conditions conflict with human needs and what the evidence supports." },
    { name: "Generate", body: "feasible changes with the teams responsible for the environment and its operation." },
    { name: "Execute", body: "a focused pilot, evaluate the results and refine the approach before wider implementation." },
  ],
  measures:
    "Measures may include task visibility, speech intelligibility, reported comfort, food purchasing patterns, satisfaction and food waste. Clinical or productivity outcomes require an evaluation designed to test those outcomes directly.",
  paper: {
    kicker: "Human Adaptation Series | White Paper 02",
    title: "The Biology of the Five Senses",
    sub: "Sensory Environments as Inputs to Human Biology and Behaviour",
    body: "Read the science behind sensory environments, the boundaries of current knowledge and the questions that guide Sagework's approach.",
  },
  closing: {
    title: "What are the conditions in your organisation asking of the people within it?",
    body: "Explore how sensory conditions can be assessed within your workplace, healthcare setting, educational institution or hospitality environment.",
  },
};
