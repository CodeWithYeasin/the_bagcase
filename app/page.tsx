import Hero3D from "@/components/Hero3D";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero3D />
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8" data-theme="light">
        <ScrollReveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm tracking-[0.2em] text-gold">CURATED COLLECTION</p>
              <h2 className="font-serif text-4xl">Featured Pieces</h2>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid-cols-2 lg:grid-cols-3 lg:overflow-visible">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="min-w-[280px] snap-start lg:min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
