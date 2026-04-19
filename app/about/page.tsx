import ScrollReveal from "@/components/ScrollReveal";

const milestones = [
  { year: "2023", text: "The BagCase launched in Dhaka with a focus on premium leather goods." },
  { year: "2024", text: "Expanded into travel accessories and artisanal lifestyle pieces." },
  { year: "2025", text: "Introduced custom monogram line for modern professionals and travelers." },
];

export default function AboutPage() {
  return (
    <section className="mx-auto mt-20 w-full max-w-7xl px-4 py-12 md:px-8" data-theme="light">
      <ScrollReveal>
        <h1 className="font-serif text-5xl">Our Story</h1>
        <p className="mt-4 max-w-3xl text-navy/80">
          The BagCase is an exquisite travel & lifestyle house inspired by heritage craftsmanship and modern movement.
        </p>
      </ScrollReveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <ScrollReveal>
          <div className="rounded-2xl border border-gold/25 bg-white p-6">
            <h2 className="font-serif text-3xl">Milestones</h2>
            <div className="mt-5 space-y-5">
              {milestones.map((item) => (
                <div key={item.year} className="border-l-2 border-gold pl-4">
                  <p className="text-sm tracking-[0.2em] text-gold">{item.year}</p>
                  <p className="mt-1 text-sm text-navy/80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="h-full min-h-72 overflow-hidden rounded-2xl border border-gold/25">
            <iframe
              title="The BagCase location"
              src="https://www.google.com/maps?q=Baitul%20Mukarram%20Market,%20Topkhana%20Road,%20Paltan,%20Dhaka-1000,%20Bangladesh&output=embed"
              className="h-full min-h-72 w-full"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
