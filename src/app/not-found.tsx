import { Button, Eyebrow, Lead, Title, Wrap } from "@/components/site/ui";

export default function NotFound() {
  return (
    <section className="wash">
      <Wrap className="py-28 md:py-40">
        <Eyebrow>Page not found</Eyebrow>
        <Title as="h1" size="xl" className="mt-5">
          This page is not <em>here</em>
        </Title>
        <Lead className="mt-7 max-w-[34rem]">The address may have changed. The homepage links to every part of the site.</Lead>
        <Button href="/" className="mt-9">
          Back to the homepage
        </Button>
      </Wrap>
    </section>
  );
}
