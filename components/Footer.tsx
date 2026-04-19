import Link from "next/link";
import { FiFacebook, FiInstagram, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-navy text-cream">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="logo-shimmer font-serif text-2xl">THE BAGCASE</p>
          <p className="mt-3 text-sm text-cream/75">EST. 2023 | EXQUISITE TRAVEL & LIFESTYLE</p>
        </div>
        <div>
          <h3 className="font-serif text-lg text-gold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg text-gold">Contact</h3>
          <p className="mt-3 text-sm text-cream/80">Baitul Mukarram Market, Topkhana Road, Paltan, Dhaka-1000, Bangladesh</p>
          <p className="mt-2 text-sm">+880 1410-221201</p>
          <p className="text-sm">thebagcase@gmail.com</p>
        </div>
        <div>
          <h3 className="font-serif text-lg text-gold">Follow</h3>
          <div className="mt-3 flex gap-3 text-xl">
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="mailto:thebagcase@gmail.com" aria-label="Email"><FiMail /></a>
          </div>
        </div>
      </div>
      <p className="border-t border-gold/20 py-4 text-center text-xs text-cream/70">
        © 2024 The BagCase. All rights reserved.
      </p>
    </footer>
  );
}
