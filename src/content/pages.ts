/**
 * Copy for the inner pages that is not already in home.ts, founder.ts, discover.ts or
 * senses.ts. Everything here is from "Sagework | Website Content Master" (Pages 3 to 8)
 * or the Dr Gutsy brand playbook, with em dashes replaced by plain punctuation.
 */

/* ----------------------------- Page 3: Discover ----------------------------- */

export const discoverPage = {
  eyebrow: "Discover Sagework",
  title: "Designing Human Systems for Health, Resilience and Performance",
  lead: "Sagework is an evidence-led advisory and design practice working across biology, environment and behaviour.",
  body: "We advise leaders, institutions and organisations on how environments, systems and everyday practices influence how people feel, function, recover and perform, then translate that understanding into strategy, design and action.",
  pull: "The conditions around us become part of the conditions within us.",
  need: {
    eyebrow: "The present need",
    body: [
      "Artificial light extends the day. Digital systems compete for attention. Food environments prioritise convenience. Buildings can disconnect people from movement, nature and restorative rhythms. Work and education often demand continuous performance without creating the conditions that sustain it.",
      "This mismatch is associated with disrupted sleep, fatigue, persistent stress, reduced concentration, poorer metabolic health and slower recovery.",
    ],
    silos:
      "People do not live in silos. Nutrition cannot be separated from the environment in which people eat. Behaviour cannot be separated from the biological, social and structural conditions that make it possible. Space is not simply a backdrop. It is an active input into how people feel, behave and recover.",
    close: "Sagework reconnects these parts through science, systems thinking and design.",
  },
  approach: {
    eyebrow: "Our approach",
    title: "The SAGE Triad",
    sub: "One human system. Three connected forces.",
    lead: "Human health is shaped by the ongoing relationship between what happens within us, what happens around us and what becomes possible in everyday life.",
    lenses: [
      {
        name: "Biology",
        question: "Understanding what is happening within us",
        body: "The body's internal systems shape how we feel and function. Sagework draws on clinical nutrition, gut microbiome science, metabolism, sleep, circadian rhythms, stress physiology and preventive health to understand how the body responds and functions.",
      },
      {
        name: "Environment",
        question: "Understanding what is happening around us",
        body: "The body is constantly responding to light, sound, air, food, space, nature, movement and sensory experience. These conditions can influence attention, stress, appetite, sleep, behaviour, recovery and the way people experience a place or system.",
      },
      {
        name: "Behaviour",
        question: "Understanding what people are enabled to do repeatedly",
        body: "Knowledge becomes meaningful when it can be lived. Habits do not develop in isolation. Relationships, culture, routines, incentives, purpose and the environment around us influence what becomes possible, practical and repeatable in everyday life.",
      },
    ],
    close: "Biology responds to its environment. Behaviour shapes what we repeat. Health emerges from their interaction.",
  },
  does: {
    eyebrow: "What we do",
    title: "Turning evidence into systems change",
    body: "Sagework advises leaders who recognise that health, resilience and performance are shaped by systems, not information alone. We assess the conditions people move through, identify gaps and translate evidence across biology, environment and behaviour into strategy, design and action.",
  },
  why: {
    eyebrow: "Why Sagework",
    title: "Scientific authority backed by cross sector execution",
    body: [
      "Sagework is founded and led by Dr Shruti Pai, a clinical nutrition and gut microbiome scientist, entrepreneur and human systems designer whose work spans healthcare, education, food, hospitality and the built environment.",
      "The practice brings together peer-reviewed research, preventive health, design expertise and more than two decades of experience leading and shaping real-world organisations and environments.",
      "This combination enables Sagework to move from evidence to execution, connecting biological understanding with the decisions that shape places, services, institutions and everyday life.",
    ],
  },
  sageOsFoot: "SAGE OS provides a consistent method for asking better questions, seeing the whole system and directing practical change.",
};

/* ------------------------------ Page 5: Dr Gutsy ----------------------------- */

export const gutsyPage = {
  title: "Stay curious. Ask better questions.",
  lead: "Health information is everywhere. Understanding what to trust, and what it means for everyday life, is harder.",
  body: [
    "Dr Gutsy is Sagework's public education platform, founded by Dr Shruti Pai.",
    "It brings curiosity, scientific rigour and clear communication to questions about the gut microbiome, nutrition, human biology and the conditions that shape how we live.",
  ],
  promise: {
    title: "Clear explanations. Everyday relevance. No fear or judgement.",
    body: "Dr Gutsy begins with the questions people ask about their bodies and daily lives. It makes complex health science easier to understand, connects evidence with familiar experiences and helps people recognise useful next steps, without shame, alarm or promises of a quick fix.",
  },
  character: {
    title: "Meet the character behind the questions",
    body: [
      "Dr Gutsy is a character created by Dr Shruti Pai to bring health education to life.",
      "Curious, empathetic and occasionally witty, Dr Gutsy listens to everyday questions, investigates the evidence and turns complex explanations into stories people can follow.",
    ],
    /** From the Dr Gutsy brand playbook: "Five Sides of Dr Gutsy". */
    sidesTitle: "One curious mind, five ways to make health better.",
    sides: [
      { name: "The Listener", drive: "Driven by empathy and compassion.", image: "listener" },
      { name: "The Scientist", drive: "Driven by evidence-based science.", image: "scientist" },
      { name: "The Investigator", drive: "Driven by curiosity and emerging science.", image: "investigator" },
      { name: "The Sage", drive: "Driven by truth and reflection.", image: "sage" },
      { name: "The Problem Solver", drive: "Driven by happiness.", image: "problem-solver" },
    ],
  },
  questionsTitle: "Explore the questions",
  questions: [
    {
      topic: "The gut microbiome",
      question: "What can the organisms living within us tell us about nutrition, development and health?",
      body: "Explore how researchers study the gut microbiome, what their findings can establish and why context matters when interpreting claims about “gut health.”",
    },
    {
      topic: "Food and nutrition",
      question: "How do we move from nutrition information to a clearer understanding of food?",
      body: "Explore nutrients, dietary patterns, food environments and the questions behind everyday recommendations, without reducing eating to a list of rules.",
    },
    {
      topic: "Early-life biology",
      question: "How do nutrition, feeding and development interact during the beginning of life?",
      body: "Explore questions about maternal and infant health, breastfeeding, growth and the developing gut microbiome, with attention to the evidence and the population being studied.",
    },
    {
      topic: "The body and its environment",
      question: "How do the conditions around us become part of our daily experience?",
      body: "Explore light, sound, sensory environments, sleep and everyday rhythms through the connected lenses of biology, environment and behaviour.",
    },
    {
      topic: "Health across life stages",
      question: "How do health questions change as we grow, age and move through different stages of life?",
      body: "Explore topics relevant to different experiences and life stages, recognising that needs differ and research findings must be understood in context.",
    },
    {
      topic: "Health claims under the microscope",
      question: "What makes a claim convincing, and what makes it credible?",
      body: "Examine popular explanations, emerging findings and familiar assumptions by looking at their sources, limitations and relevance.",
    },
  ],
  method: {
    title: "How Dr Gutsy approaches a question",
    steps: [
      { name: "Listen", body: "Begin with a question or experience people recognise, taking its context seriously rather than rushing to an explanation." },
      { name: "Investigate", body: "Examine the evidence, question assumptions and distinguish what is established from what remains uncertain." },
      { name: "Explain", body: "Use clear language, relatable stories and visual explanations to make the science understandable without losing its meaning." },
      { name: "Connect", body: "Show what the evidence may mean in everyday life, what it does not establish and when a question needs qualified professional care." },
    ],
  },
  boundaries: {
    title: "Clear science. Honest boundaries.",
    body: [
      "Dr Gutsy is grounded in evidence-led science. We explain what research supports, where uncertainty remains and why findings may not apply equally to everyone.",
      "The platform provides health education. It does not diagnose conditions, prescribe treatment or replace individual medical care.",
    ],
  },
  part: {
    title: "Public understanding. Practical application.",
    body: "The two share a scientific foundation while serving different purposes: public understanding through Dr Gutsy, and organisational advisory and design through Sagework.",
  },
  sign: "Stay curious. Stay evidence-led. Stay gutsy.",
};

/* ------------------------- Page 6: Research & evidence ------------------------ */

export const researchPage = {
  eyebrow: "Research and evidence",
  title: "The research behind the perspective",
  lead: "Sagework brings together academic research, evidence synthesis and systems thinking to examine the conditions that shape human health, resilience and performance.",
  academic: {
    eyebrow: "Dr Shruti Pai's academic research",
    title: "From early-life biology to a connected understanding of health",
    body: [
      "Dr Shruti Pai's academic work focuses on clinical nutrition, the maternal and infant gut microbiome, early-life growth and body composition.",
      "Her doctoral research examined the relationship between the maternal and infant gut microbiome, infant growth and body composition during the first year of life. This work informs her wider interest in how biological, environmental and behavioural conditions interact.",
    ],
  },
  publications: {
    title: "Published research and original sources",
    items: [
      {
        title: "Temporal burden of WHO Critical-priority Enterobacteriaceae in the infant gut during early life influenced by maternal postpartum antibiotic exposure",
        journal: "Indian Journal of Medical Microbiology",
        year: "2025",
        body: "Research examining the burden of critical-priority Enterobacteriaceae in the infant gut in relation to maternal postpartum antibiotic exposure.",
      },
      {
        title: "Exclusive Breastfeeding and Body Composition in Indian Infants: A Prospective Study",
        journal: "Indian Pediatrics",
        year: "2025",
        body: "A prospective study examining exclusive breastfeeding and body composition in Indian infants.",
      },
      {
        title: "Comparison of growth patterns in the first year of life between term small for gestational age and appropriate for gestational age South Indian infants",
        journal: "BMJ Paediatrics Open",
        year: "2024",
        body: "Research comparing growth patterns during the first year of life in term infants born small or appropriate for gestational age.",
      },
      {
        title: "Comparison of Anthropometry and Body Composition Using Air Displacement Plethysmography in Term Small for Gestational Age and Appropriate for Gestational Age Neonates",
        journal: "Indian Pediatrics",
        year: "2023",
        body: "A study comparing anthropometry and body composition in term newborns using air displacement plethysmography.",
      },
      {
        title: "Intraindividual double burden of malnutrition: The contribution of the infant gut microbiome",
        journal: "Asia Pacific Journal of Clinical Nutrition",
        year: "2022",
        body: "A review examining the infant gut microbiome's potential contribution to the coexistence of different forms of malnutrition within an individual.",
      },
    ],
  },
  preprints: {
    title: "Scholarly manuscripts and evidence synthesis",
    note: "Preprints are distinguished from peer-reviewed journal publications. Links to the repository records provide access to manuscript versions, publication details and subsequent updates.",
    items: [
      {
        title: "The Gut Microbiome as a Metabolic Signalling Organ in Obesity: From Energy Harvest to Immune Regulation",
        body: "A manuscript exploring the gut microbiome as a metabolic signalling organ in obesity.",
      },
      {
        title: "Modulating the Gut Microbiome in Obesity",
        body: "A narrative review examining microbiome-targeted interventions for obesity prevention and treatment.",
      },
      {
        title: "The Gut Microbiome and Ocular Health",
        body: "A manuscript exploring the relationship between the gut microbiome and ocular health through the gut and eye axis.",
      },
    ],
  },
  papers: {
    eyebrow: "Sagework white papers",
    title: "Connecting evidence with human systems",
    body: "Sagework's white papers bring scientific research into a connected examination of biology, environment and behaviour. They develop focused questions, synthesise relevant evidence and consider its implications for everyday life, institutions and the conditions surrounding health.",
    series: [
      {
        id: "human-adaptation",
        name: "Human Adaptation Series",
        line: "Understanding the relationship between human biology and contemporary life",
        papers: [
          { code: "01", title: "The Human Adaptation Gap", question: "What has changed between human biology and contemporary life?" },
          { code: "02", title: "The Biology of the Five Senses", question: "What is the environment repeatedly communicating to the human system?" },
          { code: "03", title: "The Gut and Brain Axis", question: "How do external inputs and behaviour become internal biological signals?" },
          { code: "04", title: "Circadian Biology", question: "When are inputs occurring, and are biological and social time aligned?" },
          { code: "05", title: "Sleep by Design", question: "Does the system permit sufficient and restorative recovery?" },
          { code: "06", title: "Stress, Safety & Human Regulation", question: "Does repeated demand consume adaptive capacity or support resilient function?" },
        ],
        foot: "One connected progression: adaptation, sensory input, biological translation, timing, recovery, resilience.",
      },
      {
        id: "wise",
        name: "WISE: Women's Health",
        line: "An Integrated Systems Perspective Across the Female Life Course",
        papers: [
          { code: "01", title: "The Perimenopause Gap", question: "Understanding the transition and the gaps between women's experiences, available information and appropriate support." },
          { code: "02", title: "Puberty, Periods & PCOS", question: "Examining the questions facing girls and young women, with attention to development, menstrual health and the distinctions between different conditions and experiences." },
          { code: "03", title: "Fertility, Choice & the Reproductive Years", question: "Exploring reproductive agency, fertility and infertility within the realities of individual lives and healthcare systems." },
          { code: "04", title: "Mother to Child", question: "Considering maternal biology and the first human environment, connecting maternal health with the conditions surrounding early development." },
          { code: "05", title: "The First 1,000 Days", question: "Examining early human development and the biological, nutritional and environmental conditions surrounding the beginning of life." },
          { code: "06", title: "Menopause & The Years Beyond", question: "Examining what women can meaningfully act on: what works, what may work and what remains unsupported or overstated." },
          { code: "07", title: "Designing the Future of Women's Health", question: "Considering what science, healthcare systems, technology and capital should address next, and how evidence can inform those priorities." },
        ],
        foot: "Each paper addresses a defined subject while remaining connected to the wider life course.",
      },
    ],
  },
  library: {
    title: "Follow the sources behind the ideas",
    topics: [
      "Clinical nutrition and food systems",
      "Gut microbiome and gut and brain communication",
      "Maternal, infant and early-life biology",
      "Women's health across the life course",
      "Sensory biology and environmental conditions",
      "Circadian rhythms and sleep",
      "Stress, recovery and human regulation",
      "Behaviour and everyday practices",
    ],
  },
  more: [
    {
      title: "Articles and perspectives",
      sub: "Bringing research into the wider conversation",
      body: "Articles, explainers and perspectives connect scientific questions with everyday experience, institutional decisions and public discussion.",
    },
    {
      title: "Books and long-form work",
      sub: "Space to explore the connections",
      body: "Books and extended writing offer room for deeper explanation, narrative and illustration.",
    },
  ],
};

/* ------------------------- Page 7: Work with Sagework ------------------------- */

export const workPage = {
  eyebrow: "Work with Sagework",
  title: "Build health and performance into the way your organisation works",
  lead: "Sagework helps leaders and institutions turn scientific evidence into practical decisions about people, places and everyday practices, working across biology, environment and behaviour.",
  begin: "We begin with your challenge, the people your organisation serves and what you want to improve.",
  audience: {
    title: "Who we work with",
    items: [
      "Healthcare and care settings",
      "Schools and universities",
      "Workplaces and leadership teams",
      "Architects and built-environment teams",
      "Food, hospitality and community organisations",
      "Health founders and research partners",
    ],
  },
  ways: {
    title: "Ways to work with Sagework",
    body: "Choose the service that best matches your need: a defined project, ongoing leadership advice, an assessment, learning, board-level strategy or selective collaboration. Services can be combined, with scope and deliverables agreed at the outset.",
  },
  services: [
    {
      name: "Consulting",
      body: "For a defined project that needs practical solutions. We help shape programmes, environments, food systems and operating practices, translating evidence into a clear design brief and plan for action.",
      outputs: "A project brief, design recommendations, a programme or environment strategy, or an implementation roadmap.",
    },
    {
      name: "Strategic Advisory",
      body: "For leaders who need ongoing advice as decisions evolve. We act as an independent sounding board on health, wellbeing and human performance, helping you assess options and refine priorities over time.",
      outputs: "Regular advisory discussions, decision briefs, evidence reviews or a phased strategic plan.",
    },
    {
      name: "Evaluation and Audit",
      body: "For organisations that need to understand what is working and where gaps remain. We assess an existing environment, service or programme through biology, environment and behaviour, identifying priorities for improvement.",
      outputs: "A current-state assessment, gap analysis, prioritised action plan or evaluation framework.",
    },
    {
      name: "Education and Knowledge",
      body: "For teams that need to understand and use the science. We translate relevant research into learning and evidence resources for leadership teams, staff and professional audiences.",
      outputs: "Workshops, talks, leadership briefings, evidence reviews, white papers or learning programmes.",
    },
    {
      name: "Board Strategy",
      body: "For boards making decisions about organisational direction, oversight and long-term resilience. We bring a human-health and evidence perspective to strategy, innovation and responsible growth, rather than day-to-day project delivery.",
      outputs: "A board briefing, facilitated board strategy discussion or strategic review of a proposed health initiative.",
    },
    {
      name: "Investments and Partnerships",
      body: "For founders, researchers and organisations exploring a shared opportunity. We assess strategic fit and potential contributions to evidence-led health ideas, including advisory, research and other collaborative relationships.",
      outputs: "An exploration of strategic fit, an evidence review or a proposed advisory or research collaboration. Any investment is considered separately and selectively.",
    },
  ],
  shape: {
    title: "How an engagement can take shape",
    items: [
      "A focused project can address a defined question, assessment or design brief.",
      "An ongoing advisory relationship can support decisions over time.",
      "A workshop or leadership session can build shared understanding around a specific need.",
      "Partnerships are shaped around an agreed purpose and contribution.",
    ],
    foot: "The format, timeline, deliverables and fees are agreed after an initial discussion of the scope.",
  },
  process: {
    title: "Our working process",
    lead: "SAGE OS provides the structure for the work. The SAGE Triad keeps biology, environment and behaviour connected throughout.",
    steps: [
      { name: "Scan", body: "Understand the people, setting, purpose and current conditions." },
      { name: "Analyse", body: "Examine the evidence and identify the relationships and gaps that matter." },
      { name: "Generate", body: "Develop feasible options and agree priorities with the people responsible for delivery." },
      { name: "Execute", body: "Support implementation within the agreed scope, review progress and refine the approach." },
    ],
    foot: "The measures of progress are chosen for the question and setting. They may concern experience, operating practices or implementation, with health and performance outcomes assessed where the evaluation supports them.",
  },
  closing: {
    title: "Start with the challenge you want to address",
    body: "Tell us about your organisation, the people it serves and what you would like to change. We will review your enquiry and identify whether a further conversation would be useful. Where there is a fit, the next step is an agreed scope of work.",
  },
};

/* ------------------------------ Page 8: Contact ------------------------------ */

export const contactPage = {
  eyebrow: "Contact us",
  title: "Start a conversation with Sagework",
  lead: "Have a project, challenge or collaboration in mind? Tell us what you are working on and where Sagework could help.",
  welcome: "We welcome enquiries from leaders, institutions, founders, researchers and organisations.",
  formTitle: "Tell us what you have in mind",
  formLead: "Tell us what you are working on, whom it is for and what you want to achieve. If you are unsure which service fits, choose General enquiry.",
  required: "Fields marked with an asterisk (*) are required.",
  types: [
    "Consulting",
    "Strategic Advisory",
    "Evaluation and Audit",
    "Education and Knowledge",
    "Board Strategy",
    "Investments and Partnerships",
    "Research collaboration",
    "Speaking or media",
    "General enquiry",
  ],
  messageHelp: "What are you working on, who is it for and what would you like to achieve? Include timing if relevant; timing is optional.",
  emailHelp: "Use the address where you would like us to reply.",
  below: "Please share project information only. Avoid including medical records or confidential personal information.",
  privacy: "For information about how your enquiry and contact details are handled, please read our Privacy Notice.",
  submit: "Send Enquiry",
  messages: {
    success: "Thank you for contacting Sagework. Your enquiry has been received. We will review your message and respond by email.",
    required: "Please complete this field.",
    email: "Please enter a valid email address.",
    failed: "Your enquiry could not be sent. Please try again or email us directly using the address on this page.",
  },
  next: {
    title: "What happens next",
    body: "We will review your message and respond by email. If the enquiry is a fit for Sagework, we can arrange a conversation to clarify the opportunity and next steps.",
  },
  direct: {
    title: "Connect directly",
    body: "Prefer to email? Write to",
    more: "For public health education, explore Dr Gutsy. For publications and supporting sources, visit Research and evidence.",
  },
};
