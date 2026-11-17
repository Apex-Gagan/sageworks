import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/site/Forms";
import { Eyebrow, Lead, Note, Section, Title, Wrap } from "@/components/site/ui";
import { contactPage as c } from "@/content/pages";
import { contactEmail, routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: c.lead,
};

/**
 * Contact (content master, Page 8): a short hero, then the form on the left with
 * direct contact and "What happens next" on the right. Quieter than the service page.
 */
export default function Contact() {
  return (
    <>
      <section className="wash">
        <Wrap className="pb-12 pt-14 md:pb-16 md:pt-20">
          <div className="max-w-[46rem]">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <Title as="h1" size="xl" className="mt-5">
              Start a conversation with <em>Sagework</em>
            </Title>
            <Lead className="mt-7">{c.lead}</Lead>
            <p className="mt-4">{c.welcome}</p>
          </div>
        </Wrap>
      </section>

      <Section tight>
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div>
            <Title size="md">{c.formTitle}</Title>
            <p className="mt-4 max-w-[40rem]">{c.formLead}</p>
            <div className="mt-8">
              <Suspense fallback={<p className="text-ink-soft">Loading the form.</p>}>
                <ContactForm copy={c} to={contactEmail} />
              </Suspense>
            </div>
            <Note
              label="Before launch"
              className="mt-8 max-w-[40rem]"
              why="the content master asks for submissions to reach the approved monitored inbox, with spam protection, and for the Privacy Notice to be linked beside the button."
            >
              Confirm the inbox that receives enquiries and supply the Privacy Notice. The form will then send directly instead of
              opening an email.
            </Note>
          </div>

          <aside className="space-y-10 lg:pt-2">
            <div className="leafcut-sm bg-paper p-7">
              <h2 className="display text-[1.7rem]">{c.next.title}</h2>
              <p className="mt-3 text-[15.5px]">{c.next.body}</p>
            </div>
            <div>
              <h2 className="display text-[1.7rem]">{c.direct.title}</h2>
              <p className="mt-3 text-[15.5px]">
                {c.direct.body}{" "}
                <a href={`mailto:${contactEmail}`} className="font-semibold text-sage-ink underline underline-offset-4">
                  {contactEmail}
                </a>
                .
              </p>
              <p className="mt-4 text-[15.5px]">
                For public health education, explore{" "}
                <Link href={`${routes.education}#dr-gutsy`} className="font-semibold text-sage-ink underline underline-offset-4">
                  Dr Gutsy
                </Link>
                . For publications and supporting sources, visit{" "}
                <Link href={routes.research} className="font-semibold text-sage-ink underline underline-offset-4">
                  Research and evidence
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
