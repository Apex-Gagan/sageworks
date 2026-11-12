// Interaction tests for the Sagework samples.
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
const ok = (name, pass, detail = "") => results.push({ name, pass: !!pass, detail: String(detail).slice(0, 160) });
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

async function scrollers(page, label) {
  const out = await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const res = [];
    for (const r of document.querySelectorAll('[role="region"][aria-label]')) {
      r.scrollIntoView({ block: "center", behavior: "instant" });
      await wait(500);
      const fwd = r.parentElement.querySelector('button[aria-label$="forward"]');
      const back = r.parentElement.querySelector('button[aria-label$="back"]');
      const max = r.scrollWidth - r.clientWidth;
      if (!fwd) {
        res.push({ name: r.getAttribute("aria-label"), fits: max <= 4, max });
        continue;
      }
      const a = r.scrollLeft;
      fwd.click();
      await wait(1300);
      const b = r.scrollLeft;
      back.click();
      await wait(1300);
      res.push({ name: r.getAttribute("aria-label"), moved: Math.abs(b - a) > 100, back: Math.abs(r.scrollLeft - b) > 100, max });
    }
    return res;
  });
  for (const s of out) ok(`${label} slider "${s.name}"`, s.fits ?? (s.moved && s.back), JSON.stringify(s));
}

/* ------------------------------ Sample 2 home ----------------------------- */
{
  const { page, errors } = await open("/2");
  // triad circles
  await into(page, 'button[aria-label^="Environment"]');
  await sleep(400);
  await page.click('button[aria-label^="Environment"]');
  await sleep(900);
  const t = await page.evaluate(() => ({
    pressed: document.querySelector('button[aria-label^="Environment"]').getAttribute("aria-pressed"),
    heading: [...document.querySelectorAll("h3")].some((h) => h.textContent.trim() === "Environment"),
  }));
  ok("S2 home triad circle selects Environment", t.pressed === "true" && t.heading, JSON.stringify(t));

  // auto ribbon drifts (pointer parked away from it, since hover pauses it)
  await page.mouse.move(4, 4);
  const drift = await page.evaluate(async () => {
    const r = document.querySelector('[role="region"][aria-label="selected environments"]');
    r.scrollIntoView({ block: "center", behavior: "instant" });
    await new Promise((x) => setTimeout(x, 600));
    const a = r.scrollLeft;
    await new Promise((x) => setTimeout(x, 1500));
    return r.scrollLeft - a;
  });
  ok("S2 home project ribbon drifts on its own", drift > 15, drift);
  await scrollers(page, "S2 home");

  // senses
  const s = await page.evaluate(async () => {
    const btns = [...document.querySelectorAll("#senses ul button[aria-expanded]")];
    btns[2].scrollIntoView({ block: "center", behavior: "instant" });
    btns[2].click();
    await new Promise((x) => setTimeout(x, 500));
    return btns.map((b) => b.getAttribute("aria-expanded")).join(",");
  });
  ok("S2 home senses list opens third sense", s === "false,false,true,false,false", s);

  // question rotator
  const q = await page.evaluate(async () => {
    const dots = [...document.querySelectorAll("#gutsy button[aria-pressed]")];
    const before = document.querySelector("#gutsy [aria-live] p")?.textContent;
    dots[1].click();
    await new Promise((x) => setTimeout(x, 1700));
    return [before?.slice(0, 20), document.querySelector("#gutsy [aria-live] p")?.textContent.slice(0, 20), dots[1].getAttribute("aria-pressed")];
  });
  ok("S2 home Dr Gutsy question changes", q[0] !== q[1] && q[2] === "true", q.join(" => "));

  const anchors = await page.evaluate(() =>
    ["about", "work", "senses", "gutsy", "research"].filter((id) => !document.getElementById(id)),
  );
  ok("S2 home nav anchors exist", anchors.length === 0, anchors.join(","));
  ok("S2 home no runtime errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* ----------------------------- Sample 2 founder --------------------------- */
{
  const { page, errors } = await open("/2/founder");
  await scrollers(page, "S2 founder");
  const p = await page.evaluate(async () => {
    const ids = ["business-leader", "scientist", "designer", "writer", "dr-gutsy", "global", "lived"];
    const missing = ids.filter((id) => !document.getElementById(id));
    document.getElementById("global").scrollIntoView({ block: "start", behavior: "instant" });
    await new Promise((x) => setTimeout(x, 900));
    const active = document.querySelector('nav[aria-label="Chapters"] a[aria-current]')?.textContent;
    const nav = document.querySelector('nav[aria-label="Chapters"]').getBoundingClientRect();
    return { missing, active, navTop: Math.round(nav.top) };
  });
  ok("S2 founder chapter anchors exist", p.missing.length === 0, p.missing.join(","));
  ok("S2 founder chapter pills follow and stay pinned", p.active === "Global Perspective" && p.navTop > 60 && p.navTop < 130, JSON.stringify(p));
  await into(page, 'button[aria-label^="Behaviour"]');
  await page.click('button[aria-label^="Behaviour"]');
  await sleep(800);
  const l = await page.evaluate(() => document.querySelector('button[aria-label^="Behaviour"]').getAttribute("aria-pressed"));
  ok("S2 founder lens circle selects Behaviour", l === "true", l);
  ok("S2 founder no runtime errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* ----------------------------- Sample 2 projects -------------------------- */
{
  const { page, errors } = await open("/2/projects");
  const f = await page.evaluate(async () => {
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    const out = [];
    for (const t of tabs) {
      t.click();
      await new Promise((x) => setTimeout(x, 400));
      out.push(document.querySelectorAll('button[aria-label^="Open photograph"]').length);
    }
    tabs[0].click();
    await new Promise((x) => setTimeout(x, 400));
    return out;
  });
  ok("S2 projects gallery filters change the wall", f[0] > f[1] && f[1] > 0 && f[2] > 0 && f[3] > 0 && f[4] > 0, f.join(","));
  await into(page, 'button[aria-label^="Open photograph"]');
  await page.click('button[aria-label^="Open photograph"]');
  await sleep(700);
  const lb1 = await page.evaluate(() => document.querySelector('[role="dialog"]')?.getAttribute("aria-label"));
  await page.keyboard.press("ArrowRight");
  await sleep(600);
  const lb2 = await page.evaluate(() => document.querySelector('[role="dialog"]')?.getAttribute("aria-label"));
  await page.keyboard.press("Escape");
  await sleep(600);
  const lb3 = await page.evaluate(() => !!document.querySelector('[role="dialog"]'));
  ok("S2 projects lightbox opens, steps with arrow key, closes with Escape", lb1 && lb2 && lb1 !== lb2 && !lb3, `${lb1} | ${lb2} | open:${lb3}`);

  const rows = await page.$$("li > button[aria-expanded]");
  await rows[3].evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
  await sleep(300);
  await rows[3].click();
  await sleep(900);
  const ex = await page.evaluate(() => [...document.querySelectorAll("li > button[aria-expanded]")].map((b) => b.getAttribute("aria-expanded")).join(","));
  ok("S2 projects list opens one project note at a time", ex.split(",").filter((v) => v === "true").length === 1 && ex.split(",")[3] === "true", ex);
  const box = await rows[6].boundingBox();
  await page.mouse.move(box.x + 300, box.y + box.height / 2);
  await sleep(700);
  const pv = await page.evaluate(() => {
    const el = document.querySelector('div[aria-hidden="true"].arch');
    return el ? getComputedStyle(el).opacity : "none";
  });
  ok("S2 projects pointer preview appears on hover", pv === "1", pv);
  await scrollers(page, "S2 projects");
  ok("S2 projects no runtime errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* ------------------------------ Sample 3 home ----------------------------- */
{
  const { page, errors } = await open("/3");
  const side = await page.evaluate(() => {
    const a = document.querySelector("aside");
    return { shown: a && getComputedStyle(a).display !== "none", links: a?.querySelectorAll("nav a").length };
  });
  ok("S3 side rail shows seven links on desktop", side.shown && side.links === 7, JSON.stringify(side));

  const cap0 = await page.evaluate(() => document.querySelector("section [aria-live] p")?.textContent);
  await page.click('button[aria-label="Next photograph"]');
  await sleep(500);
  const cap1 = await page.evaluate(() => document.querySelector("section [aria-live] p")?.textContent);
  ok("S3 hero next button changes the photograph", cap0 !== cap1, `${cap0} => ${cap1}`);
  await page.mouse.move(120, 520);
  await sleep(6600);
  const cap2 = await page.evaluate(() => document.querySelector("section [aria-live] p")?.textContent);
  ok("S3 hero advances on its own", cap2 !== cap1, `${cap1} => ${cap2}`);

  await into(page, "#triad-tab-1");
  await page.click("#triad-tab-1");
  await sleep(700);
  await page.keyboard.press("ArrowRight");
  await sleep(700);
  const tabs = await page.evaluate(() => ({
    sel: [...document.querySelectorAll('[id^="triad-tab-"]')].map((t) => t.getAttribute("aria-selected")).join(","),
    line: document.querySelector("#triad-panel em")?.textContent,
  }));
  ok("S3 triad tabs respond to click and arrow keys", tabs.sel === "false,false,true" && /repeatedly/.test(tabs.line ?? ""), JSON.stringify(tabs));

  const svc = await page.evaluate(async () => {
    const btns = [...document.querySelectorAll("#work ul button[aria-pressed]")];
    btns[4].scrollIntoView({ block: "center", behavior: "instant" });
    btns[4].click();
    await new Promise((x) => setTimeout(x, 900));
    const cta = document.querySelector('#work a[href^="mailto:"][class*="bg-fg"]');
    return { h3: document.querySelector("#work h3")?.textContent, cta: cta?.textContent.trim(), href: decodeURIComponent(cta?.getAttribute("href") ?? "") };
  });
  ok("S3 service selector shows Board Strategy with its own enquiry link", svc.h3 === "Board Strategy" && svc.cta === "Discuss Board Strategy" && svc.href.includes("Enquiry: Board Strategy"), JSON.stringify(svc));

  const sen = await page.evaluate(async () => {
    const btns = [...document.querySelectorAll("#senses button[aria-pressed]")];
    btns[1].scrollIntoView({ block: "center", behavior: "instant" });
    btns[1].click();
    await new Promise((x) => setTimeout(x, 900));
    return document.querySelector("#senses [aria-live]")?.textContent;
  });
  ok("S3 senses sheet shows the cited finding for Sound", /WHO-commissioned/.test(sen ?? "") && /pubmed/.test(sen ?? ""), sen);

  const anchors = await page.evaluate(() =>
    ["about", "work", "senses", "gutsy", "research"].filter((id) => !document.getElementById(id)),
  );
  ok("S3 home nav anchors exist", anchors.length === 0, anchors.join(","));
  ok("S3 home no runtime errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* ----------------------------- Sample 3 founder --------------------------- */
{
  const { page, errors } = await open("/3/founder");
  const p = await page.evaluate(() => ({
    missing: ["business-leader", "scientist", "designer", "writer", "dr-gutsy", "global", "lived"].filter((id) => !document.getElementById(id)),
    active: document.querySelector('aside a[aria-current="page"]')?.textContent.trim(),
  }));
  ok("S3 founder chapter anchors exist and rail marks Founder", p.missing.length === 0 && p.active === "Founder", JSON.stringify(p));
  await into(page, "#lens-tab-2");
  await page.click("#lens-tab-2");
  await sleep(700);
  const l = await page.evaluate(() => document.querySelector("#lens-panel em")?.textContent);
  ok("S3 founder lens tabs switch", /repeatedly/.test(l ?? ""), l);
  ok("S3 founder no runtime errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* ----------------------------- Sample 3 projects -------------------------- */
{
  const { page, errors } = await open("/3/projects");
  const c = await page.evaluate(async () => {
    const tabs = [...document.querySelectorAll('#catalogue [role="tab"]')];
    const out = [];
    for (const t of tabs) {
      t.click();
      await new Promise((x) => setTimeout(x, 900));
      out.push(document.querySelectorAll("#cat-panel article").length + ":" + document.querySelector("#cat-panel h2")?.textContent.slice(0, 12));
    }
    tabs[0].click();
    await new Promise((x) => setTimeout(x, 900));
    return out;
  });
  ok("S3 projects category tabs show 5, 3, 3 and 1 projects", c.map((v) => v.split(":")[0]).join(",") === "5,3,3,1", c.join(" | "));
  const th = await page.evaluate(async () => {
    const art = document.querySelector("#cat-panel article");
    art.scrollIntoView({ block: "center", behavior: "instant" });
    const cap = () => art.querySelector("p.text-muted")?.textContent;
    const before = cap();
    art.querySelectorAll('button[aria-label^="Show photograph"]')[2].click();
    await new Promise((x) => setTimeout(x, 900));
    return [before, cap()];
  });
  ok("S3 projects thumbnail changes the large photograph", th[0] !== th[1], th.join(" => "));
  const tn = await page.evaluate(async () => {
    const fig = [...document.querySelectorAll("figure")].find((f) => f.querySelector('[role="group"][aria-label$="then or now"]'));
    fig.scrollIntoView({ block: "center", behavior: "instant" });
    const label = () => fig.querySelector("[aria-live]")?.textContent;
    const before = label();
    fig.querySelector('button[aria-pressed="false"]').click();
    await new Promise((x) => setTimeout(x, 800));
    return [before, label()];
  });
  ok("S3 projects then/now toggle switches", tn[0] !== tn[1], tn.join(" => "));
  await scrollers(page, "S3 projects");
  ok("S3 projects no runtime errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* --------------------------- Sample 1 regression -------------------------- */
for (const path of ["/1", "/1/founder", "/1/projects", "/"]) {
  const { page, errors } = await open(path);
  if (path !== "/" && path !== "/1/founder") await scrollers(page, `S1 ${path}`);
  ok(`${path} loads with no runtime errors`, errors.length === 0, errors.join(" | "));
  await page.close();
}

/* ------------------------------ Sample switcher --------------------------- */
{
  const { page } = await open("/2/founder");
  const hrefs = await page.evaluate(() => [...document.querySelectorAll('nav[aria-label="Design samples"] a')].map((a) => a.getAttribute("href")).join(","));
  ok("Switcher keeps the same page across samples", hrefs === "/,/1/founder,/3/founder", hrefs);
  await page.close();
}

/* ---------------------------------- Mobile -------------------------------- */
for (const path of ["/", "/1", "/1/founder", "/1/projects", "/2", "/2/founder", "/2/projects", "/3", "/3/founder", "/3/projects"]) {
  const { page, errors } = await open(path, 390, 844);
  const over = await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 60));
    }
    return document.documentElement.scrollWidth - window.innerWidth;
  });
  ok(`mobile ${path} has no sideways overflow`, over <= 0, over);
  ok(`mobile ${path} no runtime errors`, errors.length === 0, errors.join(" | "));
  if (path === "/3" || path === "/2") {
    const n = path === "/3" ? "three" : "two";
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.click(`button[aria-controls="nav-${n}-menu"]`);
    await sleep(400);
    const links = await page.evaluate((id) => document.querySelectorAll(`#${id} a`).length, `nav-${n}-menu`);
    await page.click(`#nav-${n}-menu a`);
    await sleep(700);
    const closed = await page.evaluate((id) => !document.getElementById(id) && document.body.style.overflow === "", `nav-${n}-menu`);
    ok(`mobile ${path} menu opens with 8 links and closes on tap`, links === 8 && closed, `${links} closed:${closed}`);
  }
  await page.close();
}

await browser.close();
const failed = results.filter((r) => !r.pass);
for (const r of results) console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}${r.pass ? "" : "  -> " + r.detail}`);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
