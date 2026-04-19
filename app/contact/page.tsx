"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto mt-20 w-full max-w-7xl px-4 py-12 md:px-8" data-theme="light">
      <ScrollReveal>
        <h1 className="font-serif text-5xl">Contact Us</h1>
      </ScrollReveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <ScrollReveal>
          <div className="rounded-2xl border border-gold/25 bg-white p-6 text-sm text-navy/85">
            <p><strong>Address:</strong> Baitul Mukarram Market, Topkhana Road, Paltan, Dhaka-1000, Bangladesh</p>
            <p className="mt-3"><strong>Phone & WhatsApp:</strong> +880 1410-221201</p>
            <p className="mt-3"><strong>Email:</strong> thebagcase@gmail.com</p>
            <p className="mt-3"><strong>Messenger:</strong> The BagCase</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <form
            className="space-y-4 rounded-2xl border border-gold/25 bg-white p-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input required placeholder="Full name" className="w-full rounded-lg border border-gold/30 px-3 py-2" />
            <input required type="email" placeholder="Email" className="w-full rounded-lg border border-gold/30 px-3 py-2" />
            <textarea required placeholder="Your message" className="h-32 w-full rounded-lg border border-gold/30 px-3 py-2" />
            <button className="rounded-full border border-gold bg-navy px-7 py-3 font-medium text-cream transition hover:bg-gold hover:text-navy">
              Send Message
            </button>
            {submitted && <p className="text-sm text-emerald-700">Thanks! We will contact you shortly.</p>}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
