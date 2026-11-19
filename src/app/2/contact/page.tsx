import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/site/Forms";
import { Note } from "@/components/site/ui";
import { H, PageTop, W } from "@/components/two/kit";
import { contactPage as c } from "@/content/pages";
import { contactEmail } from "@/content/site";
import { r2 } from "@/content/two";

export const metadata: Metadata = {
  title: "Contact us",
  description: c.lead,
};

/**
 * Contact (content master, Page 8), in the Design 2 layout: what happens next and the
 * direct address stay in view on the left while the form is filled in on the right.
 */
export default function ContactTwo() {
  return (
    <>
      <PageTop
        n="08"
        label={c.eyebrow}
        title={
          <>
            Start a conversation with <em>Sagework</em>
          </>
        }
        lead={c.lead}
      >
        <p className="text-[15.5px] text-ink-soft">{c.welcome}</p>
      </PageTop>

      <section className="pb-20 md:pb-28">
        <W className="grid gap-x-14 gap-y-12 border-t border-ink/25 pt-12 lg:grid-cols-12">
          <aside className="space-y-10 lg:sticky lg:top-44 lg:col-span-4 lg:self-start">
            <div>
              <p className="eyebrow">01</p>
              <h2 className="display mt-3 text-[1.8rem]">{c.next.title}</h2>
              <p className="mt-3 text-[15.5px]">{c.next.body}</p>
            </div>
            <div className="border-t border-line pt-8">
              <p className="eyebrow">02</p>
              <h2 className="display mt-3 text-[1.8rem]">{c.direct.title}</h2>
              <p className="mt-3 text-[15.5px]">{c.direct.body}</p>
              <a href={`mailto:${contactEmail}`} className="mt-1 block text-[1.2rem] font-semibold text-sage-ink underline underline-offset-4">
                {contactEmail}
              </a>
              <p className="mt-5 text-[15px] text-ink-soft">
                For public health education, explore{" "}
                <Link href={`${r2.education}#dr-gutsy`} className="font-semibold text-sage-ink underline underline-offset-4">
                  Dr Gutsy
                </Link>
                . For publications and supporting sources, visit{" "}
                <Link href={r2.research} className="font-semibold text-sage-ink underline underline-offset-4">
                  Research and evidence
                </Link>
                .
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="border border-line p-6 md:p-10">
              <H size="md">{c.formTitle}</H>
              <p className="mt-4 max-w-[44rem]">{c.formLead}</p>
              <div className="mt-8">
                <Suspense fallback={<p className="text-ink-soft">Loading the form.</p>}>
                  <ContactForm copy={c} to={contactEmail} />
                </Suspense>
              </div>
            </div>
            <Note
              label="Before launch"
              className="mt-6"
              why="the content master asks for submissions to reach the approved monitored inbox, with spam protection, and for the Privacy Notice to be linked beside the button."
            >
              Confirm the inbox that receives enquiries and supply the Privacy Notice. The form will then send directly instead of opening
              an email.
            </Note>
          </div>
        </W>
      </section>
    </>
  );
}
