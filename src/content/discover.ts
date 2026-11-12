import type { ImageKey } from "./captions";

/**
 * Supporting copy from the content master, Pages 3, 4, 6 and 7
 * (Discover Sagework, The Five Senses, Research and Work with Sagework).
 * Used where a sample shows more than the homepage copy.
 */

export const presentNeed = {
  title: "Modern systems are changing faster than human biology",
  body: "Artificial light extends the day. Digital systems compete for attention. Food environments prioritise convenience. Buildings can disconnect people from movement, nature and restorative rhythms.",
  gap: "Sagework examines this as the Human Adaptation Gap: the distance between what modern systems demand from people and what human biology needs to function well.",
  close: "Many health solutions focus on the individual after the effects appear. Sagework begins with the system itself.",
};

export const sageOs = {
  title: "A disciplined framework from diagnosis to action",
  body: "SAGE OS is Sagework's framework for assessing and redesigning the conditions that influence human health, resilience and performance. It connects biology, environment and behaviour in a disciplined process that moves from observation to execution.",
  steps: [
    {
      name: "Scan",
      line: "Observe the system",
      body: "Examine the people, purpose, setting, experience and conditions shaping everyday life.",
    },
    {
      name: "Analyse",
      line: "Understand what is influencing the system",
      body: "Identify patterns, relationships and gaps across biology, environment and behaviour, and understand what may be driving the problem.",
    },
    {
      name: "Generate",
      line: "Design integrated possibilities",
      body: "Develop practical ideas and strategies, grounded in evidence, that respond to the system as a whole.",
    },
    {
      name: "Execute",
      line: "Translate insight into practice",
      body: "Implement, test and refine decisions in real-world settings.",
    },
  ],
  close: "Learning runs through every stage. Measurement, feedback, reflection and evolving evidence inform the next scan of the system.",
};

export const applies = {
  title: "Health is shaped wherever people spend their lives",
  lead: "The context changes, but the principle remains the same: design for people as whole human systems.",
  items: [
    {
      name: "Healthcare and care settings",
      body: "Supporting patient experience, staff wellbeing, recovery environments and healthier care systems.",
      image: "hospitals/whitefield-lobby-rings",
    },
    {
      name: "Schools and universities",
      body: "Designing healthier conditions for attention, learning, movement, nourishment and everyday wellbeing.",
      image: "academic/msap-courtyard",
    },
    {
      name: "Workplaces and leadership teams",
      body: "Examining how environments, rhythms and organisational practices influence stress, energy, focus and performance.",
      image: "academic/boardroom-skylight",
    },
    {
      name: "Architecture and the built environment",
      body: "Bringing human biology and sensory experience into decisions about light, air, sound, movement, nature and space.",
      image: "academic/msap-exterior",
    },
    {
      name: "Food, hospitality and community systems",
      body: "Rethinking the conditions around how people eat, gather, connect and experience care.",
      image: "hospitality/valley-rangoli-restaurant",
    },
    {
      name: "Health founders and organisations",
      body: "Strengthening evidence, strategy and systems thinking around emerging products, services and models of health.",
      image: "founder/team-table",
    },
  ] satisfies { name: string; body: string; image: ImageKey }[],
};

/** One cited finding per sense, from the Five Senses page. Keyed by sense name. */
export const senseEvidence: Record<string, { finding: string; source: string }> = {
  Sight: {
    finding:
      "An international expert consensus published in PLOS Biology provides separate recommendations for daytime, evening and night-time light exposure in healthy adults. It supports treating light as a timed biological input.",
    source: "journals.plos.org",
  },
  Sound: {
    finding:
      "A WHO-commissioned systematic review found an 8% higher relative risk of developing ischaemic heart disease for each 10 dB increase in long-term road-traffic noise exposure. This population-level association is specific to that exposure and outcome.",
    source: "pubmed.ncbi.nlm.nih.gov",
  },
  Smell: {
    finding:
      "Richard Axel and Linda Buck received the 2004 Nobel Prize in Physiology or Medicine for discoveries explaining odour receptors and the organisation of the olfactory system.",
    source: "nobelprize.org",
  },
  Taste: {
    finding:
      "In a randomised trial across 19 workplace cafeterias, changing food availability and portion sizes reduced calories purchased from targeted food categories by 11.5%. The study measured purchases, not consumption or weight loss.",
    source: "journals.plos.org",
  },
  Touch: {
    finding:
      "The 2021 Nobel Prize recognised David Julius and Ardem Patapoutian's discoveries concerning temperature and touch receptors.",
    source: "nobelprize.org",
  },
};

export const wisePapers = {
  title: "WISE: Women's Health",
  line: "An integrated systems perspective across the female life course",
  papers: [
    { code: "01", title: "The Perimenopause Gap" },
    { code: "02", title: "Puberty, Periods & PCOS" },
    { code: "03", title: "Fertility, Choice & the Reproductive Years" },
    { code: "04", title: "Mother to Child" },
    { code: "05", title: "The First 1,000 Days" },
    { code: "06", title: "Menopause & The Years Beyond" },
    { code: "07", title: "Designing the Future of Women's Health" },
  ],
};

/** Mail link that opens with the matching enquiry type as the subject. */
export function discussHref(email: string, service: string) {
  return `mailto:${email}?subject=${encodeURIComponent(`Enquiry: ${service}`)}`;
}
