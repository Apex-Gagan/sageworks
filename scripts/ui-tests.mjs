// Interaction tests for the Sagework website.
// Usage: start the dev server, then `npm run test:ui`.
// BASE_URL and CHROME_PATH can be set in the environment.
import puppeteer from "puppeteer-core";

const base = process.argv[2] ?? process.env.BASE_URL ?? "http://localhost:3000";
const chrome =
  process.env.CHROME_PATH ??
  (process.platform === "win32"
    ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
    : process.platform === "darwin"
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : "/usr/bin/google-chrome");
const results = [];
const ok = (name, pass, detail = "") => results.push({ name, pass: !!pass, detail: String(detail).slice(0, 180) });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

async function open(path, width = 1440, height = 900) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error" && !/hmr|WebSocket|favicon/i.test(m.text())) errors.push(m.text());
  });
  await page.goto(base + path, { waitUntil: "networkidle2", timeout: 120000 });
  await sleep(900);
  return { page, errors };
}

const into = (page, sel) =>
  page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "center", behavior: "instant" }), sel);

/** Scroll the whole page slowly enough for every scroll-triggered reveal to fire. */
async function walk(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 450) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await sleep(1100);
}

const PAGES = ["/", "/discover", "/projects", "/founder", "/five-senses", "/simply-sage", "/research", "/work-with-sagework", "/contact", "/gallery"];

/* ------------------------- Every page: loads and holds the brand ------------------------- */
for (const path of PAGES) {
  const { page, errors } = await open(path);
  await walk(page);
  const info = await page.evaluate(() => {
    const header = document.querySelector("[data-site-header]");
    const logo = header?.querySelector("svg[aria-label='Sagework']");
    const footer = document.querySelector("[data-site-footer]");
    const hidden = [...document.querySelectorAll("main [style*='opacity']")].filter(
      // The hero film is left out: its photographs dissolve into one another all the time.
      (e) => getComputedStyle(e).opacity === "0" && e.getBoundingClientRect().height > 40 && !e.closest("[aria-hidden='true']") && !e.closest("[data-hero-film]"),
    ).length;
    return {
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      h1: document.querySelectorAll("h1").length,
      headerBg: header ? getComputedStyle(header).backgroundColor : "",
      logoFill: logo?.querySelector("path")?.getAttribute("fill"),
      logoPaths: logo?.querySelectorAll("path").length,
      footerBg: footer ? getComputedStyle(footer).backgroundColor : "",
      bodyFont: getComputedStyle(document.body).fontFamily,
      h1Style: getComputedStyle(document.querySelector("h1")).fontStyle,
      hidden,
      dashes: /[\u2013\u2014]/.test(document.querySelector("main").innerText),
      broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
    };
  });
  ok(`${path} loads with no runtime errors`, errors.length === 0, errors.join(" | "));
  ok(`${path} has no sideways overflow`, info.overflow <= 0, info.overflow);
  ok(`${path} has exactly one h1, set in italic`, info.h1 === 1 && info.h1Style === "italic", JSON.stringify([info.h1, info.h1Style]));
  ok(`${path} header is white with the green logo artwork`, /25[0-5], 25[0-5], 25[0-5]/.test(info.headerBg) && info.logoFill === "#9aca28" && info.logoPaths === 9, JSON.stringify([info.headerBg, info.logoFill, info.logoPaths]));
  ok(`${path} footer is Sage Green`, info.footerBg === "rgb(154, 202, 40)", info.footerBg);
  ok(`${path} leaves nothing hidden after scrolling`, info.hidden === 0, info.hidden);
  ok(`${path} has no em or en dashes in its text`, !info.dashes);
  ok(`${path} has no broken images`, info.broken === 0, info.broken);
  await page.close();
}

/* --------------------------------- Homepage --------------------------------- */
{
  const { page } = await open("/");
  const film = "[data-hero-film]";
  const first = await page.$eval(film, (e) => e.dataset.slide);
  await page.click('[data-film-lens="Behaviour"]');
  await sleep(500);
  const picked = await page.$eval(film, (e) => e.dataset.slide);
  ok("Home film: choosing a lens shows its photograph", picked === "2", `${first} -> ${picked}`);
  await page.mouse.move(5, 5);
  await sleep(7400);
  const moved = await page.$eval(film, (e) => e.dataset.slide);
  ok("Home film: moves on by itself after a click", moved !== "2", moved);
  const wide = await page.$eval(film, (e) => Math.round(e.getBoundingClientRect().width) === document.documentElement.clientWidth);
  ok("Home hero runs the full width of the screen", wide);
  const who = await page.evaluate(() => {
    const src = [...document.querySelectorAll("main img")].map((i) => decodeURIComponent(i.currentSrc || i.src));
    return { people: src.filter((x) => /\/images\/people\//.test(x)).length, founder: src.filter((x) => /\/images\/founder\//.test(x)).length, projects: src.filter((x) => /\/images\/(hospitals|academic|hospitality)\//.test(x)).length };
  });
  ok("Home shows her projects, with Dr Shruti in one photograph only", who.people === 0 && who.founder === 1 && who.projects >= 8, JSON.stringify(who));
  const feat = await page.$$eval("[data-home-project]", (a) => a.map((x) => x.getAttribute("href")));
  ok("Home: three projects link to their place on the Projects page", feat.length === 3 && feat.every((h) => /^\/projects#[a-z-]+$/.test(h)), feat.join(","));
  const pressed = await page.$$eval("[data-film-lens]", (b) => b.filter((x) => x.getAttribute("aria-pressed") === "true").length);
  ok("Home film: exactly one lens is marked as showing", pressed === 1, pressed);

  // The five questions of phase 1 label the page, in order.
  const order = await page.evaluate(() => ["who", "why", "what", "how", "get"].map((id) => Math.round(document.getElementById(id)?.getBoundingClientRect().top ?? -1)));
  ok("Home: the five phase 1 sections appear in order", order.every((v, i) => v > -1 && (i === 0 || v > order[i - 1])), order.join(","));

  await into(page, "[data-triad]");
  await sleep(500);
  await page.click('[data-lens="Environment"] button');
  await sleep(900);
  const tri = await page.evaluate(() => {
    const open = [...document.querySelectorAll("[data-lens]")].filter((l) => l.dataset.open === "true").map((l) => l.dataset.lens);
    const bg = getComputedStyle(document.querySelector('[data-lens="Environment"]')).backgroundColor;
    const amber = getComputedStyle(document.querySelector('[data-lens="Behaviour"]')).backgroundColor;
    const names = [...document.querySelectorAll("[data-lens] .display")].map((n) => n.scrollWidth <= n.clientWidth + 1);
    return { open, bg, amber, names };
  });
  ok("Home triad: one lens open at a time", tri.open.length === 1 && tri.open[0] === "Environment", tri.open.join(","));
  ok("Home triad: Environment is aqua and Behaviour is amber", tri.bg === "rgb(64, 180, 157)" && tri.amber === "rgb(237, 170, 31)", `${tri.bg} ${tri.amber}`);
  ok("Home triad: lens names are not cut off", tri.names.every(Boolean), tri.names.join(","));

  await into(page, "[data-senses]");
  await sleep(400);
  await page.click("#sense-tab-Sound");
  await sleep(900);
  const sound = await page.$eval("[data-sense-figure]", (e) => e.textContent.trim());
  await page.click("#sense-tab-Taste");
  await sleep(900);
  const taste = await page.$eval("[data-sense-figure]", (e) => e.textContent.trim());
  ok("Home senses: each sense leads with its own figure", sound === "8%" && taste === "11.5%", `${sound} ${taste}`);
  await page.focus("#sense-tab-Taste");
  await page.keyboard.press("ArrowRight");
  await sleep(700);
  const touch = await page.$eval('[role="tab"][aria-selected="true"]', (e) => e.textContent.trim());
  ok("Home senses: arrow keys move between tabs", touch === "Touch", touch);

  const notes = await page.$$eval("[data-note]", (n) => n.length);
  ok("Home: open content requests are marked in place", notes >= 3, notes);

  const svc = await page.$eval("[data-service-link]", (a) => a.getAttribute("href"));
  ok("Home: services link to their card on the work page", svc === "/work-with-sagework#consulting", svc);
  await page.close();
}

/* ------------------- Hero film: keeps moving, and after coming back ------------------- */
{
  const { page } = await open("/");
  const film = "[data-hero-film]";
  const slide = () => page.$eval(film, (e) => e.dataset.slide);
  // Sample the slide every 250ms and count the changes.
  const changes = async (ms) => {
    let last = await slide();
    let n = 0;
    for (let t = 0; t < ms; t += 250) {
      await sleep(250);
      const now = await slide();
      if (now !== last) n += 1;
      last = now;
    }
    return n;
  };

  await page.mouse.move(700, 300); // resting on the photograph itself
  await sleep(200);
  const resting = await changes(13500);
  ok("Hero film changes every 6 seconds, even with the pointer on the photograph", resting === 2, resting);

  const tab = await page.$('[data-film-lens="Environment"]');
  const box = await tab.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await sleep(300);
  const held = await changes(8000);
  const paused = await page.$eval(film, (e) => e.dataset.paused);
  ok("Hero film waits while the pointer is on the lens buttons", held === 0 && paused === "true", `${held} ${paused}`);

  // Leave the page with the film paused, then come back by the logo, as a visitor would.
  await page.keyboard.press("Tab");
  await page.evaluate(() => document.querySelector('[data-site-header] nav[aria-label="Main"] a[href="/projects"]').click());
  await page.waitForFunction(() => location.pathname === "/projects", { timeout: 20000 });
  await sleep(900);
  await page.mouse.move(120, 40);
  await page.click('[data-site-header] a[aria-label="Sagework, home"]');
  await page.waitForFunction(() => location.pathname === "/", { timeout: 20000 });
  await sleep(600);
  const back = await changes(13500);
  ok("Hero film is moving again after leaving and returning by the logo", back >= 2, back);

  // And after the browser's Back button.
  await page.evaluate(() => document.querySelector('[data-site-header] nav[aria-label="Main"] a[href="/founder"]').click());
  await page.waitForFunction(() => location.pathname === "/founder", { timeout: 20000 });
  await sleep(700);
  await page.goBack({ waitUntil: "networkidle2" });
  await sleep(600);
  const again = await changes(13500);
  ok("Hero film is moving again after the Back button", again >= 2, again);
  await page.close();
}

/* ------------------------ Hero: the white words can be read ------------------------ */
// Hides the words, photographs what sits behind them and measures white against it.
async function behindText(page, sel) {
  const box = await page.$eval(sel, (e) => {
    const r = e.getBoundingClientRect();
    return { x: Math.max(0, r.left), y: Math.max(0, r.top), width: r.width, height: r.height };
  });
  await page.addStyleTag({ content: "[data-hero-copy] *{color:transparent!important;text-shadow:none!important;background:transparent!important;border-color:transparent!important}" });
  await sleep(150);
  const b64 = await page.screenshot({ clip: box, encoding: "base64" });
  await page.evaluate(() => document.querySelectorAll("style").forEach((t) => t.textContent.includes("data-hero-copy") && t.remove()));
  return page.evaluate(async (data) => {
    const img = new Image();
    img.src = "data:image/png;base64," + data;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const g = c.getContext("2d");
    g.drawImage(img, 0, 0);
    const px = g.getImageData(0, 0, c.width, c.height).data;
    const lin = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    const L = [];
    for (let i = 0; i < px.length; i += 16) L.push(0.2126 * lin(px[i]) + 0.7152 * lin(px[i + 1]) + 0.0722 * lin(px[i + 2]));
    L.sort((x, y) => x - y);
    const avg = L.reduce((x, y) => x + y, 0) / L.length;
    return { avg: 1.05 / (avg + 0.05), worst: 1.05 / (L[Math.floor(L.length * 0.95)] + 0.05) };
  }, b64);
}
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const { page } = await open("/", w, h);
  for (const lens of ["Biology", "Environment", "Behaviour"]) {
    await page.click(`[data-film-lens="${lens}"]`);
    await sleep(2200);
    const head = await behindText(page, "[data-hero-copy] h1");
    const para = await behindText(page, "[data-hero-copy] p");
    // Large text needs 3 to 1 and body text 4.5 to 1; the brightest 5% of the picture must still pass.
    ok(
      `Hero ${w}px, ${lens}: headline and paragraph stay readable over the photograph`,
      head.avg >= 7 && head.worst >= 3 && para.avg >= 7 && para.worst >= 4.5,
      `headline ${head.avg.toFixed(1)} / ${head.worst.toFixed(1)}, paragraph ${para.avg.toFixed(1)} / ${para.worst.toFixed(1)}`,
    );
  }
  await page.close();
}

/* ------------------------------ Leaf behaviours ------------------------------ */
{
  const { page } = await open("/");
  await page.mouse.move(400, 300);
  await sleep(300);
  await page.mouse.move(520, 380, { steps: 6 });
  await sleep(700);
  const cur = await page.evaluate(() => {
    const c = document.querySelector("[data-leaf-cursor]");
    if (!c) return null;
    const r = c.getBoundingClientRect();
    return { op: getComputedStyle(c).opacity, x: Math.round(r.left), y: Math.round(r.top), pe: getComputedStyle(c).pointerEvents };
  });
  ok("Leaf follows the pointer and never blocks clicks", cur && Number(cur.op) > 0.5 && Math.abs(cur.x - 534) < 60 && cur.pe === "none", JSON.stringify(cur));
  await walk(page);
  await into(page, "[data-closing]");
  await sleep(2800);
  const drawn = await page.$eval("[data-closing] [data-leaf-draw]", (e) => e.dataset.leafDraw);
  ok("Closing leaf draws itself when it comes into view", drawn === "drawn", drawn);
  await page.close();
}

/* ------------------------------ Header and menu ------------------------------ */
{
  const { page } = await open("/", 390, 844);
  const closed = await page.$eval("#site-menu", (m) => m.hidden);
  await page.click('button[aria-controls="site-menu"]');
  await sleep(400);
  const opened = await page.evaluate(() => ({ hidden: document.getElementById("site-menu").hidden, links: document.querySelectorAll("#site-menu a").length }));
  ok("Phone menu opens with every page listed", closed && !opened.hidden && opened.links === 9, JSON.stringify(opened));
  await page.keyboard.press("Escape");
  await sleep(300);
  ok("Phone menu closes on Escape", await page.$eval("#site-menu", (m) => m.hidden));
  const fit = await page.evaluate(() => [...document.querySelectorAll("[data-film-lens]")].every((b) => b.scrollWidth <= b.clientWidth + 1));
  ok("Phone hero: lens buttons fit their labels", fit);
  await page.close();
}
{
  const { page } = await open("/founder");
  const cur = await page.$$eval('[data-site-header] nav[aria-label="Main"] a[aria-current="page"]', (a) => a.map((x) => x.textContent.trim()));
  ok("Header marks the current page", cur.length === 1 && cur[0] === "Founder", cur.join(","));
  const first = await page.$eval("[data-chapter] details", (d) => d.open);
  await page.click("[data-chapter] details summary");
  await sleep(300);
  ok("Founder chapters open on request", !first && (await page.$eval("[data-chapter] details", (d) => d.open)));
  ok("Founder has seven chapters", (await page.$$eval("[data-chapter]", (c) => c.length)) === 7);
  const cv = await page.$$eval("[data-cv] li", (l) => l.length);
  ok("Founder: experience and education from the CV are listed", cv === 11, cv);
  const research = await page.evaluate(() => ({
    links: [...document.querySelectorAll("#scientist [data-research-link]")].map((x) => ({ id: x.dataset.researchLink, href: x.href, blank: x.target === "_blank", rel: x.rel })),
    cv: [...document.querySelectorAll("[data-cv-link]")].map((x) => ({ href: x.href, row: x.closest("li").innerText.replace(/\s+/g, " ") })),
  }));
  ok(
    "Founder: the Scientist chapter links to the PhD thesis and the ResearchGate profile",
    research.links.length === 2 &&
      research.links[0].href === "https://hdl.handle.net/10603/677114" &&
      research.links[1].href === "https://www.researchgate.net/profile/Shruti-Pai-3" &&
      research.links.every((l) => l.blank && /noreferrer/.test(l.rel)),
    JSON.stringify(research.links),
  );
  ok(
    "Founder: the PhD row in the education list links to the thesis",
    research.cv.length === 1 && research.cv[0].href === "https://hdl.handle.net/10603/677114" && /^PhD /.test(research.cv[0].row),
    JSON.stringify(research.cv),
  );
  const portrait = await page.$eval("main img", (i) => decodeURIComponent(i.currentSrc || i.src));
  ok("Founder: the page opens on a portrait from the new shoot", /portrait-garden/.test(portrait), portrait.slice(-60));
  await page.close();
}

/* --------------------------- Research: papers and forms --------------------------- */
{
  const { page } = await open("/research");
  await into(page, "#human-adaptation-01");
  await sleep(300);
  await page.click("#human-adaptation-01 button");
  await sleep(700);
  const open1 = await page.$eval("#human-adaptation-01 button", (b) => b.getAttribute("aria-expanded"));
  await page.click("#human-adaptation-02 button");
  await sleep(700);
  const after = await page.evaluate(() => [document.querySelector("#human-adaptation-01 button").getAttribute("aria-expanded"), document.querySelector("#human-adaptation-02 button").getAttribute("aria-expanded")]);
  ok("Research: papers open one at a time", open1 === "true" && after[0] === "false" && after[1] === "true", `${open1} ${after}`);
  await page.click("#human-adaptation-02 [data-paper-request]");
  await sleep(300);
  await page.click("#human-adaptation-02 [data-paper-form] button[type=submit]");
  await sleep(300);
  const err = await page.$eval("#human-adaptation-02 [data-paper-form]", (f) => f.innerText);
  ok("Research: a paper request asks for name, occupation and email", /complete all three fields/.test(err) && /Occupation/.test(err), err.slice(0, 80));
  const counts = await page.evaluate(() => ({ ha: document.querySelectorAll("[id^='human-adaptation-0']").length, wise: document.querySelectorAll("[id^='wise-0']").length, pubs: document.querySelectorAll("[id^='publication-']").length / 2 }));
  ok("Research: 6 and 7 white papers, 5 publications", counts.ha >= 6 && counts.wise >= 7 && counts.pubs === 5, JSON.stringify(counts));
  const buttons = await page.$$eval("[data-research-buttons] a", (a) => a.map((x) => ({ text: x.textContent.trim(), href: x.href, blank: x.target === "_blank", rel: x.rel })));
  ok(
    "Research: the thesis and ResearchGate buttons lead to her records, in a new tab",
    buttons.length === 2 &&
      buttons[0].text === "Read the PhD Thesis" &&
      buttons[0].href === "https://hdl.handle.net/10603/677114" &&
      buttons[1].text === "View ResearchGate Profile" &&
      buttons[1].href === "https://www.researchgate.net/profile/Shruti-Pai-3" &&
      buttons.every((b) => b.blank && /noreferrer/.test(b.rel)),
    JSON.stringify(buttons),
  );
  await page.close();
}

/* -------------------------------- Contact form -------------------------------- */
{
  const { page } = await open("/contact?type=Board%20Strategy");
  const pre = await page.$eval("[data-contact-form] select", (s) => s.value);
  ok("Contact: the enquiry type from a service link is preselected", pre === "Board Strategy", pre);
  await page.click("[data-contact-form] button[type=submit]");
  await sleep(300);
  const first = await page.evaluate(() => ({
    errors: [...document.querySelectorAll("[data-contact-form] [role=alert]")].map((e) => e.textContent),
    focus: document.activeElement?.getAttribute("name"),
  }));
  ok("Contact: required fields are named when empty", first.errors.length === 3 && first.errors.every((e) => e === "Please complete this field.") && first.focus === "name", JSON.stringify(first));
  await page.type("[data-contact-form] input[name=name]", "Test Person");
  await page.type("[data-contact-form] input[name=email]", "not-an-email");
  await page.type("[data-contact-form] textarea", "A test message.");
  await page.click("[data-contact-form] button[type=submit]");
  await sleep(300);
  const second = await page.evaluate(() => ({
    errors: [...document.querySelectorAll("[data-contact-form] [role=alert]")].map((e) => e.textContent),
    kept: document.querySelector("[data-contact-form] textarea").value,
  }));
  ok("Contact: an invalid email is caught and typed text is kept", second.errors.length === 1 && /valid email/.test(second.errors[0]) && second.kept === "A test message.", JSON.stringify(second));
  const opts = await page.$$eval("[data-contact-form] select option", (o) => o.length);
  ok("Contact: nine enquiry types plus the prompt", opts === 10, opts);
  await page.close();
}

/* ----------------------------------- Gallery ----------------------------------- */
{
  const { page } = await open("/gallery");
  const filters = await page.$$eval("[data-gallery] button[aria-pressed]", (b) => b.map((x) => x.textContent.trim()));
  ok(
    "Gallery: the five project categories from the Visual Direction, then the teams",
    filters.join("|") === "Healthcare|Hospitality|Academic institutions|Kitchens|Offices|With teams on site|All",
    filters.join("|"),
  );
  const first = Number(await page.$eval("[data-gallery-count]", (e) => e.textContent));
  const pressed = await page.$eval('[data-gallery] button[aria-pressed="true"]', (b) => b.textContent.trim());
  ok("Gallery opens on Healthcare", pressed === "Healthcare" && first >= 10, `${pressed} ${first}`);
  const counts = {};
  for (const name of filters) {
    await page.evaluate((n) => [...document.querySelectorAll("[data-gallery] button[aria-pressed]")].find((b) => b.textContent.trim() === n).click(), name);
    await sleep(350);
    counts[name] = Number(await page.$eval("[data-gallery-count]", (e) => e.textContent));
  }
  ok("Gallery: every category has photographs", Object.values(counts).every((c) => c >= 3), JSON.stringify(counts));
  ok("Gallery stays small: fewer, stronger images", counts.All <= 60 && counts.All >= 40, counts.All);
  const srcs = await page.$$eval("[data-gallery-item] img", (i) => i.map((x) => decodeURIComponent(x.currentSrc || x.src)).join(" "));
  ok(
    "Gallery leaves out photographs she rejected",
    !/tree-of-life|playroom|wgsha-atrium|office-dining|msap-aerial-mist|birds-sun|valley-convocation|marena-render|portrait-/.test(srcs),
  );

  const journeys = await page.evaluate(() =>
    [...document.querySelectorAll("[data-journey]")].map((j) => [...j.querySelectorAll("[data-stage]")].map((x) => x.dataset.stage).join(" > ")),
  );
  ok(
    "Gallery: project journeys run from site or work in progress to completed",
    journeys.length === 3 && journeys.every((j) => j.endsWith("Completed")) && journeys.some((j) => j.startsWith("The site > Work in progress")),
    journeys.join(" | "),
  );

  await page.evaluate(() => [...document.querySelectorAll("[data-gallery] button[aria-pressed]")].find((b) => b.textContent.trim() === "Healthcare").click());
  await sleep(400);
  await into(page, "[data-gallery-item]");
  await sleep(300);
  await page.click("[data-gallery-item]");
  await sleep(500);
  const v1 = await page.$eval("[data-viewer-index]", (e) => e.textContent);
  const note = await page.$eval("[data-viewer-note]", (e) => e.textContent.trim());
  await page.keyboard.press("ArrowRight");
  await sleep(300);
  const v2 = await page.$eval("[data-viewer-index]", (e) => e.textContent);
  ok("Gallery viewer opens and the arrow key moves on", v1 === "1" && v2 === "2", `${v1} ${v2}`);
  ok("Gallery viewer shows her note for the photograph", /Earthen Symphony/.test(note), note.slice(0, 70));
  await page.keyboard.press("Escape");
  await sleep(300);
  ok("Gallery viewer closes on Escape", (await page.$("[data-gallery-viewer]")) === null);
  await page.click("[data-gallery-item]");
  await sleep(400);
  await page.goto(base + "/", { waitUntil: "networkidle2" });
  await page.goBack({ waitUntil: "networkidle2" });
  await sleep(600);
  ok("Gallery viewer is closed after leaving and coming back", (await page.$("[data-gallery-viewer]")) === null);
  await page.close();
}

/* ----------------------------------- Projects ----------------------------------- */
{
  const { page } = await open("/projects");
  const info = await page.evaluate(() => ({
    projects: document.querySelectorAll("[data-project]").length,
    chips: [...document.querySelectorAll("[data-kind]")].map((b) => b.textContent.replace(/\s+/g, " ").trim()),
    stats: [...document.querySelectorAll("[data-project-stats] dt")].map((d) => d.textContent.trim()),
    listed: document.querySelectorAll("[data-project-list] li").length,
    thin: [...document.querySelectorAll("[data-project]")].filter((p) => p.querySelectorAll("[data-project-photo]").length < 2).length,
  }));
  ok("Projects: fourteen projects, each with a lead photograph and more", info.projects === 14 && info.thin === 0, JSON.stringify([info.projects, info.thin]));
  ok("Projects: five kinds of place, each with its count", info.chips.length === 6 && /^All ?14$/.test(info.chips[0]) && info.chips.every((c) => /\d+$/.test(c)), info.chips.join(" | "));
  ok("Projects: the headline figure matches the full list", Number(info.stats[0]) === info.listed && info.listed >= 28, `${info.stats[0]} vs ${info.listed}`);
  const dots = await page.$$eval("[data-kind]", (b) => b.slice(1).map((x) => getComputedStyle(x.querySelector("span")).backgroundColor));
  ok("Projects: one colour per kind of place", new Set(dots).size === 5, dots.join(" "));

  await page.click('[data-kind="Kitchens"]');
  await sleep(500);
  const kitchens = await page.$$eval("[data-project]", (p) => p.map((x) => x.dataset.project));
  ok("Projects: the filter narrows the list", kitchens.join(",") === "wgsha,chef-on-wheels", kitchens.join(","));
  await page.click('[data-kind="All"]');
  await sleep(500);

  await into(page, '[data-project="mangalore"] [data-project-photo]');
  await sleep(600);
  await page.click('[data-project="mangalore"] [data-project-photo]');
  await sleep(500);
  const v = await page.evaluate(() => ({ idx: document.querySelector("[data-viewer-index]")?.textContent, label: document.querySelector("[data-project-viewer]")?.getAttribute("aria-label") }));
  await page.keyboard.press("ArrowLeft");
  await sleep(300);
  const wrapped = await page.$eval("[data-viewer-index]", (e) => e.textContent);
  ok("Projects viewer opens on the project and wraps around its own photographs", v.idx === "1" && /Mangalore/.test(v.label) && wrapped === "5", `${v.idx} ${v.label} ${wrapped}`);
  await page.keyboard.press("Escape");
  await sleep(300);
  ok("Projects viewer closes on Escape", (await page.$("[data-project-viewer]")) === null);

  await page.goto(base + "/projects#valley-view", { waitUntil: "networkidle2" });
  await sleep(3000); // the page scrolls smoothly to the project
  const top = await page.$eval('[data-project="valley-view"]', (e) => Math.round(e.getBoundingClientRect().top));
  ok("Projects: a link from the homepage lands on its project, clear of the header", top > 100 && top < 400, top);
  await page.close();
}

/* ------------------- Projects: outside stories and films, on request ------------------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  const outside = [];
  page.on("request", (r) => /instagram\.com|cdninstagram|fbcdn|earthensymphony/.test(r.url()) && outside.push(r.url()));
  await page.goto(base + "/projects", { waitUntil: "networkidle2", timeout: 120000 });
  await walk(page);

  const links = await page.$$eval("[data-project-link]", (a) =>
    a.map((x) => ({ kind: x.dataset.projectLink, href: x.href, blank: x.target === "_blank", rel: x.rel, project: x.closest("[data-project]").dataset.project })),
  );
  const stories = links.filter((l) => l.kind === "story");
  const filmLinks = links.filter((l) => l.kind === "film");
  ok(
    "Projects: three stories link to Earthen Symphony and three films to Instagram, each in a new tab",
    stories.length === 3 && filmLinks.length === 3 && stories.every((l) => /^https:\/\/earthensymphony\.com\/blogs\/articles\//.test(l.href)) && filmLinks.every((l) => /^https:\/\/www\.instagram\.com\/reel\//.test(l.href)) && links.every((l) => l.blank && /noreferrer/.test(l.rel)),
    JSON.stringify(links.map((l) => `${l.project}:${l.kind}`)),
  );
  ok(
    "Projects: each link sits on the project it belongs to",
    ["old-airport-road:story", "paediatric:story", "offices:story", "dwarka:film", "quiet-art:film", "bengaluru-campus:film"].every((want) => links.some((l) => `${l.project}:${l.kind}` === want)),
  );
  const facts = await page.evaluate(() => ({
    oar: document.querySelector('[data-project="old-airport-road"]').innerText,
    paed: document.querySelector('[data-project="paediatric"]').innerText,
    office: document.querySelector('[data-project="offices"]').innerText,
  }));
  ok(
    "Projects: facts follow the published stories",
    /Circle of life/.test(facts.oar) && /The Garden Above/.test(facts.paed) && /Paediatrics Department, Manipal Hospital Bengaluru/.test(facts.paed) && /poppies/i.test(facts.office),
  );

  const before = await page.evaluate(() => ({
    cards: document.querySelectorAll("[data-reel]").length,
    frames: document.querySelectorAll("iframe").length,
    play: document.querySelectorAll("[data-reel-play]").length,
    out: [...document.querySelectorAll("[data-reel-link]")].map((a) => a.href),
  }));
  ok("Films: three cards, and nothing is requested from outside until play is pressed", before.cards === 3 && before.frames === 0 && outside.length === 0, JSON.stringify([before.cards, before.frames, outside.slice(0, 2)]));
  ok("Films: the reel that cannot be embedded opens on Instagram instead", before.play === 2 && before.out.length === 1 && /reel\/C9wspE4y5mX/.test(before.out[0]), JSON.stringify(before.out));
  await into(page, "[data-reel-play]");
  await sleep(400);
  await page.click("[data-reel-play]");
  await sleep(600);
  const after = await page.evaluate(() => {
    const card = document.querySelector('[data-reel="DMhDizyimaV"]');
    const f = card.querySelector("iframe");
    return { src: f?.src, title: f?.title, playing: card.dataset.playing, others: document.querySelectorAll("iframe").length };
  });
  ok(
    "Films: pressing play loads that one reel in place",
    after.src === "https://www.instagram.com/reel/DMhDizyimaV/embed/" && after.playing === "true" && after.others === 1 && /Instagram/.test(after.title),
    JSON.stringify(after),
  );
  await page.close();
}

/* -------------------------- Simply Sage and Dr Gutsy; work -------------------------- */
{
  const { page } = await open("/simply-sage");
  const info = await page.evaluate(() => ({
    parts: ["simply-sage", "dr-gutsy"].every((id) => document.getElementById(id)),
    sides: document.querySelectorAll("[data-gutsy-side]").length,
    slots: document.querySelectorAll("[data-video-slots]").length,
    gutsyLogo: document.querySelector("#dr-gutsy svg[aria-label='Dr Gutsy'] path")?.getAttribute("fill"),
  }));
  ok("Education page has both parts, five characters and two video lists", info.parts && info.sides === 5 && info.slots === 2, JSON.stringify(info));
  ok("Dr Gutsy logo keeps its own greens", info.gutsyLogo === "#72a00d" || info.gutsyLogo === "#59750b", info.gutsyLogo);
  await page.close();
}
{
  const { page } = await open("/work-with-sagework");
  const info = await page.evaluate(() => ({
    cards: document.querySelectorAll("[data-service]").length,
    outputs: [...document.querySelectorAll("[data-service]")].every((c) => /Possible outputs/i.test(c.innerText)),
    link: document.querySelector("[data-service] a")?.getAttribute("href"),
    steps: document.querySelectorAll("[data-sage-os] li").length,
  }));
  ok("Work page: six services, each with its possible outputs", info.cards === 6 && info.outputs, JSON.stringify(info));
  ok("Work page: a service link carries its enquiry type to the form", info.link === "/contact?type=Consulting#enquiry", info.link);
  ok("Work page: SAGE OS has four steps", info.steps === 4, info.steps);
  await page.close();
}
{
  const { page } = await open("/dr-gutsy");
  ok("/dr-gutsy leads to the Dr Gutsy part of the education page", new URL(page.url()).pathname === "/simply-sage", page.url());
  await page.close();
}

await browser.close();
const failed = results.filter((r) => !r.pass);
for (const r of results) console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}${r.pass ? "" : `   [${r.detail}]`}`);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
