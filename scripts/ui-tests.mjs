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
  const head = await page.evaluate(() => ({
    links: document.querySelectorAll('header nav[aria-label="Primary"] a').length,
    tab: !!document.querySelector('a[class*="vertical-rl"]'),
  }));
  ok("S3 header shows seven links and the side tab on desktop", head.links === 7 && head.tab, JSON.stringify(head));

  const title = () => page.evaluate(() => document.querySelector('section[aria-roledescription="carousel"] [aria-live]')?.textContent.slice(0, 40));
  const t0 = await title();
  await page.click('button[aria-label="Next slide"]');
  await sleep(1300);
  const t1 = await title();
  ok("S3 hero next button changes the slide", t0 !== t1, `${t0} => ${t1}`);
  await page.mouse.move(700, 30);
  await sleep(8200);
  const t2 = await title();
  ok("S3 hero advances on its own after a click", t2 !== t1, `${t1} => ${t2}`);

  const svc = await page.evaluate(async () => {
    const btns = [...document.querySelectorAll("#work li > button[aria-expanded]")];
    btns[3].scrollIntoView({ block: "center", behavior: "instant" });
    btns[3].click();
    await new Promise((x) => setTimeout(x, 800));
    const link = btns[3].parentElement.querySelector('a[href^="mailto:"]');
    return {
      exp: btns.map((b) => b.getAttribute("aria-expanded")).join(","),
      label: link?.textContent.trim(),
      href: decodeURIComponent(link?.getAttribute("href") ?? ""),
    };
  });
  ok(
    "S3 services list opens one service with its own enquiry link",
    svc.exp === "false,false,false,true,false,false" && svc.label === "Discuss Education and Knowledge" && svc.href.includes("Enquiry: Education and Knowledge"),
    JSON.stringify(svc),
  );

  const sense = await page.evaluate(async () => {
    const d = document.querySelector("#senses details");
    d.scrollIntoView({ block: "center", behavior: "instant" });
    d.querySelector("summary").click();
    await new Promise((x) => setTimeout(x, 300));
    return { open: d.open, text: d.textContent };
  });
  ok("S3 sense card reveals its cited finding", sense.open && /Source:/.test(sense.text), sense.text.slice(0, 80));
  await scrollers(page, "S3 home");

  const pr = await page.evaluate(async () => {
    const next = document.querySelector('button[aria-label="Next principle"]');
    next.scrollIntoView({ block: "center", behavior: "instant" });
    const read = () => document.querySelector("figure blockquote")?.textContent;
    const before = read();
    next.click();
    await new Promise((x) => setTimeout(x, 1200));
    return [before, read()];
  });
  ok("S3 principles carousel steps to the next card", pr[0] && pr[1] && pr[0] !== pr[1], pr.join(" => "));

  const acc = await page.evaluate(async () => {
    const btns = [...document.querySelectorAll("#research ul > li > button[aria-expanded]")];
    btns[1].scrollIntoView({ block: "center", behavior: "instant" });
    btns[1].click();
    await new Promise((x) => setTimeout(x, 700));
    return btns.map((b) => b.getAttribute("aria-expanded")).join(",");
  });
  ok("S3 evidence accordion opens one item at a time", acc === "false,true,false", acc);

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
    active: document.querySelector('header a[aria-current="page"]')?.textContent.trim(),
    h1: document.querySelectorAll("h1").length,
  }));
  ok("S3 founder chapter anchors exist and header marks Founder", p.missing.length === 0 && p.active === "Founder" && p.h1 === 1, JSON.stringify(p));
  ok("S3 founder no runtime errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* ----------------------------- Sample 3 projects -------------------------- */
{
  const { page, errors } = await open("/3/projects");
  const c = await page.evaluate(async () => {
    const tabs = [...document.querySelectorAll('#browse [role="tab"]')];
    const out = [];
    for (const t of tabs) {
      t.scrollIntoView({ block: "center", behavior: "instant" });
      t.click();
      await new Promise((x) => setTimeout(x, 700));
      out.push(document.querySelectorAll("#browse article").length);
    }
    tabs[0].click();
    await new Promise((x) => setTimeout(x, 700));
    return out;
  });
  ok("S3 projects filters show 12, 5, 3, 3 and 1 projects", c.join(",") === "12,5,3,3,1", c.join(","));

  await into(page, "button[data-open]");
  await sleep(300);
  await page.click("button[data-open]");
  await sleep(900);
  const cap = () => page.evaluate(() => document.querySelector('[role="dialog"] [aria-live]')?.textContent);
  const v0 = await cap();
  await page.keyboard.press("ArrowRight");
  await sleep(700);
  const v1 = await cap();
  await page.evaluate(() => document.querySelectorAll('[role="dialog"] [role="group"] button')[3]?.click());
  await sleep(700);
  const v2 = await cap();
  const locked = await page.evaluate(() => document.body.style.overflow);
  await page.keyboard.press("Escape");
  await sleep(700);
  const closed = await page.evaluate(() => !document.querySelector('[role="dialog"]') && document.body.style.overflow === "");
  ok(
    "S3 project viewer opens, steps by arrow key and thumbnail, closes with Escape",
    v0 && v1 && v2 && v0 !== v1 && v1 !== v2 && locked === "hidden" && closed,
    `${v0} | ${v1} | ${v2} | closed:${closed}`,
  );

  const tn = await page.evaluate(async () => {
    const fig = [...document.querySelectorAll("figure")].find((f) => f.querySelector('[role="group"][aria-label$="then or now"]'));
    fig.scrollIntoView({ block: "center", behavior: "instant" });
    const label = () => fig.querySelector("figcaption [aria-live]")?.textContent;
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
