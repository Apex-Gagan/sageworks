"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

/*
 * Forms. No mail service is connected yet, so a valid submission opens the visitor's
 * email app with the enquiry written out, addressed to Sagework. The fields, labels,
 * validation and messages follow the content master (Page 8); swapping the last step
 * for a real delivery service does not change the form.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const field =
  "mt-2 block w-full border border-ink/25 bg-white px-4 py-3 text-[16px] text-ink placeholder:text-ink-soft/70 focus:border-sage-ink focus:outline-none focus:ring-2 focus:ring-sage/50 aria-[invalid=true]:border-[#cc4267]";

function Field({
  label,
  required,
  help,
  error,
  children,
  id,
}: {
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[15px] font-semibold text-ink">
        {label}
        {required ? <span className="text-[#cc4267]"> *</span> : null}
      </label>
      {children}
      {help && !error ? (
        <p id={`${id}-help`} className="mt-1.5 text-[13.5px] text-ink-soft">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[13.5px] font-medium text-[#cc4267]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function mailto(to: string, subject: string, lines: [string, string][]) {
  const body = lines
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type ContactCopy = {
  required: string;
  types: string[];
  messageHelp: string;
  emailHelp: string;
  below: string;
  privacy: string;
  submit: string;
  messages: { success: string; required: string; email: string; failed: string };
};

/** The enquiry form (content master, Page 8). `?type=` preselects the enquiry type. */
export function ContactForm({ copy, to }: { copy: ContactCopy; to: string }) {
  const uid = useId();
  const params = useSearchParams();
  const wanted = params.get("type") ?? "";
  const initial = copy.types.find((t) => t.toLowerCase() === wanted.toLowerCase()) ?? "";

  const [v, setV] = useState({ name: "", email: "", org: "", role: "", country: "", type: initial, message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sent" | "failed">("idle");

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!v.name.trim()) er.name = copy.messages.required;
    if (!v.email.trim()) er.email = copy.messages.required;
    else if (!EMAIL.test(v.email.trim())) er.email = copy.messages.email;
    if (!v.type) er.type = copy.messages.required;
    if (!v.message.trim()) er.message = copy.messages.required;
    setErrors(er);
    if (Object.keys(er).length) {
      setState("idle");
      const first = Object.keys(er)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    try {
      window.location.href = mailto(to, `Enquiry: ${v.type}`, [
        ["Full name", v.name],
        ["Email address", v.email],
        ["Organisation", v.org],
        ["Role", v.role],
        ["Country or region", v.country],
        ["Enquiry type", v.type],
        ["Message", v.message],
      ]);
      setState("sent");
    } catch {
      // Everything the visitor typed stays in the form.
      setState("failed");
    }
  };

  const aria = (k: string, help?: boolean) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-error` : help ? `${uid}-${k}-help` : undefined,
  });

  return (
    <form id="enquiry" data-contact-form noValidate onSubmit={submit} className="scroll-mt-28">
      <p className="text-[14px] text-ink-soft">{copy.required}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Full name" required error={errors.name}>
          <input id={`${uid}-name`} name="name" autoComplete="name" className={field} value={v.name} onChange={set("name")} {...aria("name")} />
        </Field>
        <Field id={`${uid}-email`} label="Email address" required help={copy.emailHelp} error={errors.email}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={field}
            value={v.email}
            onChange={set("email")}
            {...aria("email", true)}
          />
        </Field>
        <Field id={`${uid}-org`} label="Organisation">
          <input id={`${uid}-org`} name="organisation" autoComplete="organization" className={field} value={v.org} onChange={set("org")} />
        </Field>
        <Field id={`${uid}-role`} label="Role">
          <input id={`${uid}-role`} name="role" autoComplete="organization-title" className={field} value={v.role} onChange={set("role")} />
        </Field>
        <Field id={`${uid}-country`} label="Country or region">
          <input id={`${uid}-country`} name="country" autoComplete="country-name" className={field} value={v.country} onChange={set("country")} />
        </Field>
        <Field id={`${uid}-type`} label="Enquiry type" required error={errors.type}>
          <select id={`${uid}-type`} name="type" className={field} value={v.type} onChange={set("type")} {...aria("type")}>
            <option value="">Select one</option>
            {copy.types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-6">
        <Field id={`${uid}-message`} label="Your message" required help={copy.messageHelp} error={errors.message}>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={6}
            className={field}
            value={v.message}
            onChange={set("message")}
            {...aria("message", true)}
          />
        </Field>
        <p className="mt-3 text-[13.5px] text-ink-soft">{copy.below}</p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-sage px-7 py-3.5 text-[15px] font-semibold text-ink-deep transition-colors hover:bg-sage-deep"
        >
          {copy.submit}
          <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <p className="max-w-[26rem] text-[13.5px] text-ink-soft">{copy.privacy}</p>
      </div>

      <div aria-live="polite" className="mt-6">
        {state === "sent" ? (
          <p data-form-status="sent" className="flex items-start gap-3 bg-mint p-4 text-[15px] text-ink-deep">
            <CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-sage-ink" />
            <span>
              Your email app has opened with this enquiry written out. Send it from there to reach Sagework. Once a mail service is
              connected, this message will read: &ldquo;{copy.messages.success}&rdquo;
            </span>
          </p>
        ) : null}
        {state === "failed" ? (
          <p data-form-status="failed" role="alert" className="bg-[#fbe6ec] p-4 text-[15px] text-[#8f2443]">
            {copy.messages.failed}
          </p>
        ) : null}
      </div>
    </form>
  );
}

/**
 * White-paper access (questionnaire, Q28): the summary is open, and the full paper is
 * sent after the reader leaves a few details. Opens in place under the paper.
 */
export function PaperRequest({ paper, to }: { paper: string; to: string }) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [v, setV] = useState({ name: "", occupation: "", email: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!v.name.trim() || !v.occupation.trim() || !v.email.trim()) return setError("Please complete all three fields.");
    if (!EMAIL.test(v.email.trim())) return setError("Please enter a valid email address.");
    setError("");
    window.location.href = mailto(to, `White paper request: ${paper}`, [
      ["Full name", v.name],
      ["Occupation", v.occupation],
      ["Email address", v.email],
      ["Paper requested", paper],
    ]);
    setSent(true);
  };

  if (!open) {
    return (
      <button
        type="button"
        data-paper-request
        onClick={() => setOpen(true)}
        className="rounded-full border border-ink/25 px-4 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-sage-ink hover:text-sage-ink"
      >
        Request the full paper
      </button>
    );
  }
  return (
    <form data-paper-form noValidate onSubmit={submit} className="mt-1 grid gap-3 bg-paper p-4 sm:grid-cols-3">
      {(
        [
          ["name", "Full name", "name", "text"],
          ["occupation", "Occupation", "organization-title", "text"],
          ["email", "Email address", "email", "email"],
        ] as const
      ).map(([k, label, auto, type]) => (
        <div key={k}>
          <label htmlFor={`${uid}-${k}`} className="text-[13.5px] font-semibold">
            {label} <span className="text-[#cc4267]">*</span>
          </label>
          <input
            id={`${uid}-${k}`}
            type={type}
            autoComplete={auto}
            className={`${field} !mt-1 !py-2 !text-[15px]`}
            value={v[k]}
            onChange={(e) => setV((p) => ({ ...p, [k]: e.target.value }))}
          />
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-3 sm:col-span-3">
        <button type="submit" className="rounded-full bg-sage px-5 py-2.5 text-[14px] font-semibold text-ink-deep hover:bg-sage-deep">
          Send me the paper
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-[14px] font-semibold text-ink-soft underline underline-offset-4">
          Cancel
        </button>
        <p aria-live="polite" className="text-[13.5px]">
          {error ? <span className="font-medium text-[#cc4267]">{error}</span> : null}
          {sent ? <span data-paper-sent className="text-sage-ink">Your email app has opened with the request. Send it to receive the paper.</span> : null}
        </p>
      </div>
    </form>
  );
}

/** Sign-up for white papers and the newsletter (questionnaire, Q28 and Q29). */
export function Subscribe({ to }: { to: string }) {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) return setMsg({ ok: false, text: "Please enter a valid email address." });
    window.location.href = mailto(to, "Subscribe: white papers and newsletter", [["Email address", email]]);
    setMsg({ ok: true, text: "Your email app has opened with the request. Send it to subscribe." });
  };
  return (
    <form data-subscribe noValidate onSubmit={submit}>
      <label htmlFor={`${uid}-sub`} className="text-[15px] font-semibold">
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={`${uid}-sub`}
          type="email"
          autoComplete="email"
          className={`${field} !mt-0 sm:max-w-[22rem]`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="rounded-full bg-sage px-6 py-3 text-[15px] font-semibold text-ink-deep hover:bg-sage-deep">
          Subscribe
        </button>
      </div>
      <p aria-live="polite" className={`mt-2 text-[13.5px] ${msg?.ok ? "text-sage-ink" : "font-medium text-[#cc4267]"}`}>
        {msg?.text}
      </p>
    </form>
  );
}
