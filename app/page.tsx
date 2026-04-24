export default function Home() {
  return (
    <>
      <main className="bagcase" id="home">
        <nav className="navbar" aria-label="Primary">
          <div className="navbar-inner">
            <div className="logo">
              <div className="logo-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
                  <path
                    d="M18 24h28l4 28H14l4-28zm6-6h16l3 6H21l3-6zm-2 34h20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-the">The</span>
                <span className="logo-name">BAGCASE</span>
                <span className="logo-tagline">EST. 2023 | EXQUISITE TRAVEL &amp; LIFESTYLE</span>
              </div>
            </div>
            <div className="nav-panel">
              <ul className="nav-links">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#new-arrivals">New Arrivals</a>
                </li>
                <li className="dropdown">
                  <button type="button" className="dropdown-toggle">
                    Collections
                    <span aria-hidden="true">▾</span>
                  </button>
                  <div className="dropdown-menu">
                    <a href="#collections">Trolley Case</a>
                    <a href="#collections">Travel Bag</a>
                    <a href="#collections">School Bag</a>
                    <a href="#collections">Brief Case</a>
                    <a href="#collections">Trolley Travel Bag</a>
                    <a href="#collections">Beauty Case</a>
                    <a href="#collections">School Trolley Bag</a>
                    <a href="#collections">Office Bag</a>
                    <a href="#collections">Pilot Case</a>
                    <a href="#collections">Shoulder Bag</a>
                    <a href="#collections">Waist Bag</a>
                    <a href="#collections">Accessories</a>
                  </div>
                </li>
                <li>
                  <a href="#our-story">Our Story</a>
                </li>
                <li>
                  <a href="#warranty">Warranty</a>
                </li>
                <li>
                  <a href="#where-to-buy">Where to Buy</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
              <a className="btn btn-dark nav-whatsapp" href="https://wa.me/8801410221201" target="_blank" rel="noreferrer">
                WhatsApp Us ↗
              </a>
            </div>
            <button className="menu-toggle" aria-label="Toggle menu" type="button">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>

        <section className="hero" aria-label="Hero" id="hero">
          <div className="hero-rings" aria-hidden="true">
            <span className="ring ring-one"></span>
            <span className="ring ring-two"></span>
            <span className="ring ring-three"></span>
          </div>
          <div className="hero-slider">
            <div className="slide active">
              <div className="slide-content">
                <p className="slide-label">Luxury Travel Essentials</p>
                <p className="slide-the">T H E</p>
                <h1 className="slide-title">BAGCASE</h1>
                <p className="slide-tagline">EST. 2023 | EXQUISITE TRAVEL &amp; LIFESTYLE</p>
                <p className="slide-description">
                  Crafted for globetrotters who demand elegance, durability, and unmistakable style in every journey.
                </p>
                <div className="slide-actions">
                  <a className="btn btn-gold" href="#collections">
                    Explore Collections
                  </a>
                  <a className="btn btn-outline" href="https://wa.me/8801410221201" target="_blank" rel="noreferrer">
                    WhatsApp Us
                  </a>
                </div>
              </div>
              <div className="slide-media">
                <img src="https://picsum.photos/800/600?random=101" alt="Signature luggage collection" loading="eager" />
              </div>
            </div>
            <div className="slide">
              <div className="slide-content">
                <p className="slide-label">Designed in Bangladesh</p>
                <p className="slide-the">T H E</p>
                <h1 className="slide-title">BAGCASE</h1>
                <p className="slide-tagline">EST. 2023 | EXQUISITE TRAVEL &amp; LIFESTYLE</p>
                <p className="slide-description">
                  Premium luggage crafted with refined textures, smart compartments, and timeless silhouettes.
                </p>
                <div className="slide-actions">
                  <a className="btn btn-gold" href="#collections">
                    Explore Collections
                  </a>
                  <a className="btn btn-outline" href="https://wa.me/8801410221201" target="_blank" rel="noreferrer">
                    WhatsApp Us
                  </a>
                </div>
              </div>
              <div className="slide-media">
                <img src="https://picsum.photos/800/600?random=102" alt="Premium travel bags" loading="lazy" />
              </div>
            </div>
            <div className="slide">
              <div className="slide-content">
                <p className="slide-label">Travel in Signature Style</p>
                <p className="slide-the">T H E</p>
                <h1 className="slide-title">BAGCASE</h1>
                <p className="slide-tagline">EST. 2023 | EXQUISITE TRAVEL &amp; LIFESTYLE</p>
                <p className="slide-description">
                  Explore curated collections made for business, leisure, and lifestyle experiences.
                </p>
                <div className="slide-actions">
                  <a className="btn btn-gold" href="#collections">
                    Explore Collections
                  </a>
                  <a className="btn btn-outline" href="https://wa.me/8801410221201" target="_blank" rel="noreferrer">
                    WhatsApp Us
                  </a>
                </div>
              </div>
              <div className="slide-media">
                <img src="https://picsum.photos/800/600?random=103" alt="Luxury carry essentials" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="slider-dots" role="tablist" aria-label="Hero slides">
            <button className="slider-dot active" type="button" aria-label="Slide 1"></button>
            <button className="slider-dot" type="button" aria-label="Slide 2"></button>
            <button className="slider-dot" type="button" aria-label="Slide 3"></button>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        <section className="section" id="categories">
          <div className="section-header">
            <span className="section-label">Browse by type</span>
            <h2>Our Collections</h2>
            <div className="section-underline"></div>
          </div>
          <div className="grid categories-grid">
            {[
              "Trolley Case",
              "Travel Bag",
              "School Bag",
              "Brief Case",
              "Trolley Travel Bag",
              "Beauty Case",
              "School Trolley Bag",
              "Office Bag",
              "Pilot Case",
              "Shoulder Bag",
              "Waist Bag",
              "Accessories",
            ].map((category) => (
              <div className="category-card" key={category}>
                <div className="category-icon" aria-hidden="true">
                  <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
                    <rect x="16" y="20" width="32" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M24 20v-4h16v4" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M24 34h16" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <p className="category-name">{category}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        <section className="section" id="new-arrivals">
          <div className="section-header">
            <span className="section-label">Just landed</span>
            <h2>New Arrivals</h2>
            <div className="section-underline"></div>
          </div>
          <div className="grid products-grid">
            {[
              { name: "Aurora Trolley", price: "৳12,500" },
              { name: "Voyager Travel Duffel", price: "৳8,200" },
              { name: "Capitol Brief Case", price: "৳9,800" },
              { name: "Luxe Vanity Beauty Case", price: "৳7,600" },
              { name: "Metro Office Bag", price: "৳6,900" },
              { name: "Pilot Pro Carry", price: "৳11,200" },
              { name: "Starlight Shoulder Bag", price: "৳5,400" },
              { name: "Heritage Waist Bag", price: "৳3,900" },
            ].map((product, index) => (
              <div className="product-card" key={product.name}>
                <span className="badge">In Stock</span>
                <div className="product-image">
                  <img src={`https://picsum.photos/300/300?random=${index + 1}`} alt={product.name} loading="lazy" />
                </div>
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <button className="btn btn-outline" type="button">
              Show More ↓
            </button>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        <section className="story" id="our-story">
          <div className="story-content">
            <span className="section-label">About us</span>
            <h2>Exquisite Travel &amp; Lifestyle Since 2023</h2>
            <p>
              The BagCase celebrates the art of travel through thoughtful craftsmanship, premium materials, and an
              unwavering focus on sophisticated mobility. From busy city days to international departures, our collections
              are designed to elevate every journey.
            </p>
          </div>
          <div className="story-action">
            <a className="btn btn-outline" href="#our-story">
              Read Our Story ↗
            </a>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        <section className="section" id="collections">
          <div className="section-header">
            <span className="section-label">Signature range</span>
            <h2>Our Collections</h2>
            <div className="section-underline"></div>
          </div>
          <div className="grid products-grid">
            {[
              { name: "Elite Trolley Case", price: "৳14,900" },
              { name: "Voyage Travel Bag", price: "৳9,400" },
              { name: "Academy School Bag", price: "৳4,800" },
              { name: "Executive Brief Case", price: "৳10,500" },
              { name: "Trolley Travel Duo", price: "৳13,600" },
              { name: "Vanity Beauty Case", price: "৳6,700" },
              { name: "School Trolley Pro", price: "৳5,900" },
              { name: "Office Luxe Bag", price: "৳7,800" },
              { name: "Pilot Cabin Case", price: "৳12,200" },
              { name: "Shoulder Signature", price: "৳5,600" },
              { name: "Waist Urban Bag", price: "৳3,700" },
              { name: "Travel Accessories", price: "৳2,400" },
            ].map((product, index) => (
              <div className="product-card" key={product.name}>
                <span className="badge">In Stock</span>
                <div className="product-image">
                  <img src={`https://picsum.photos/300/300?random=${index + 21}`} alt={product.name} loading="lazy" />
                </div>
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <button className="btn btn-outline" type="button">
              Show More ↓
            </button>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true"></div>

        <section className="contact-strip" id="contact">
          <div className="contact-grid" id="where-to-buy">
            <div>
              <span className="contact-label">Visit Us</span>
              <p className="contact-value">Baitul Mukarram Market, Topkhana Road, Paltan, Dhaka-1000, Bangladesh</p>
            </div>
            <div>
              <span className="contact-label">Phone &amp; WhatsApp</span>
              <p className="contact-value">+880 1410-221201</p>
            </div>
            <div>
              <span className="contact-label">Email</span>
              <p className="contact-value">thebagcase@gmail.com</p>
            </div>
            <div>
              <span className="contact-label">Messenger</span>
              <p className="contact-value">The BagCase</p>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-grid">
            <div className="footer-brand" id="warranty">
              <div className="footer-logo">
                <span className="footer-logo-top">The</span>
                <span className="footer-logo-main">BAGCASE</span>
              </div>
              <p className="footer-tagline">EST. 2023 | EXQUISITE TRAVEL &amp; LIFESTYLE</p>
              <p>
                Elevated travel essentials crafted in Bangladesh for discerning journeys around the world.
              </p>
            </div>
            <div>
              <h4>Collections</h4>
              <ul>
                <li>Trolley Case</li>
                <li>Travel Bag</li>
                <li>School Bag</li>
                <li>Brief Case</li>
                <li>Accessories</li>
              </ul>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li>Our Story</li>
                <li>Warranty</li>
                <li>Where to Buy</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4>Get in Touch</h4>
              <ul>
                <li>+880 1410-221201</li>
                <li>thebagcase@gmail.com</li>
                <li>Messenger: The BagCase</li>
                <li>Baitul Mukarram Market, Dhaka</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">© 2026 The BagCase · All Rights Reserved · Exquisite Travel &amp; Lifestyle</div>
        </footer>

        <a className="whatsapp-float" href="https://wa.me/8801410221201" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
              d="M16 3C9.4 3 4 8.2 4 14.7c0 2.6.9 5.1 2.4 7.1L5 29l7.4-1.9c2 1.1 4.2 1.6 6.5 1.6 6.6 0 12-5.2 12-11.7S22.6 3 16 3z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M22.5 19.3c-.3-.2-1.7-.9-1.9-1s-.4-.2-.6.1-.7.9-.9 1.1-.3.2-.6.1-1.2-.5-2.3-1.5c-.9-.8-1.5-1.7-1.7-2s0-.5.1-.7c.1-.1.3-.4.4-.5.1-.2.1-.3.2-.5.1-.2 0-.4 0-.6s-.6-1.4-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.2-1 1-.9 2.5 0 1.5 1 2.9 1.1 3.1.1.2 2 3 5 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.2-.2-.5-.4z"
              fill="currentColor"
            />
          </svg>
        </a>
      </main>

      <style>{`
        :root {
          --cream: #f2ede4;
          --navy: #0d2a52;
          --gold: #b89a4a;
          --light-cream: #e8e1d4;
          --text-muted: #4a5568;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: var(--cream);
          color: var(--navy);
        }

        a {
          color: inherit;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        button {
          font-family: inherit;
          transition: all 0.2s ease;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
        }

        img {
          max-width: 100%;
          display: block;
        }

        .bagcase {
          position: relative;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--cream);
          border-bottom: 1px solid rgba(13, 42, 82, 0.1);
          transition: all 0.2s ease;
        }

        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .navbar.is-scrolled .navbar-inner {
          padding: 12px 24px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          color: var(--gold);
        }

        .logo-icon svg {
          width: 100%;
          height: 100%;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .logo-the {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--navy);
        }

        .logo-name {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 26px;
          letter-spacing: 0.2em;
          color: var(--navy);
        }

        .logo-tagline {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--gold);
        }

        .menu-toggle {
          display: none;
          margin-left: auto;
          width: 36px;
          height: 28px;
          padding: 0;
          justify-content: center;
          gap: 6px;
        }

        .menu-toggle span {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--navy);
        }

        .nav-panel {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-links {
          list-style: none;
          display: flex;
          flex: 1;
          justify-content: center;
          gap: 20px;
          margin: 0;
          padding: 0;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.18em;
        }

        .nav-whatsapp {
          white-space: nowrap;
        }

        .nav-links a,
        .dropdown-toggle {
          color: var(--navy);
        }

        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.18em;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 220px;
          background: #fff;
          border: 1px solid rgba(184, 154, 74, 0.4);
          padding: 12px;
          display: grid;
          gap: 6px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(8px);
          transition: all 0.2s ease;
          z-index: 10;
        }

        .dropdown:hover .dropdown-menu,
        .dropdown:focus-within .dropdown-menu {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .dropdown-menu a {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--navy);
        }

        .btn {
          padding: 12px 20px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          border-radius: 2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
        }

        .btn-dark {
          background: var(--navy);
          color: #fff;
        }

        .btn-gold {
          background: var(--gold);
          color: #fff;
        }

        .btn-outline {
          border-color: var(--gold);
          color: var(--gold);
          background: transparent;
        }

        .btn:hover,
        .category-card:hover,
        .product-card:hover {
          transform: translateY(-2px);
        }

        .hero {
          position: relative;
          background: var(--navy);
          color: #fff;
          padding: 80px 24px 70px;
          overflow: hidden;
        }

        .hero-rings .ring {
          position: absolute;
          border: 1px solid rgba(184, 154, 74, 0.25);
          border-radius: 50%;
        }

        .ring-one {
          width: 320px;
          height: 320px;
          top: -120px;
          left: -60px;
        }

        .ring-two {
          width: 420px;
          height: 420px;
          bottom: -200px;
          right: -120px;
        }

        .ring-three {
          width: 220px;
          height: 220px;
          top: 80px;
          right: 80px;
        }

        .hero-slider {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          min-height: 420px;
        }

        .slide {
          opacity: 0;
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 40px;
          align-items: center;
          transition: opacity 0.6s ease;
          pointer-events: none;
        }

        .slide.active {
          opacity: 1;
          position: relative;
          pointer-events: auto;
        }

        .slide-content {
          max-width: 620px;
        }

        .slide-media img {
          width: 100%;
          border: 1px solid rgba(184, 154, 74, 0.4);
        }

        .slide-label {
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
        }

        .slide-the {
          font-size: 14px;
          letter-spacing: 0.8em;
          text-transform: uppercase;
          margin: 0 0 8px;
        }

        .slide-title {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 52px;
          margin: 0 0 8px;
          letter-spacing: 0.1em;
        }

        .slide-tagline {
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin: 0 0 16px;
          color: rgba(255, 255, 255, 0.8);
        }

        .slide-description {
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.6;
          margin: 0 0 24px;
        }

        .slide-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
        }

        .slider-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid var(--gold);
          background: transparent;
        }

        .slider-dot.active {
          background: var(--gold);
        }

        .section-divider {
          height: 1px;
          background: rgba(184, 154, 74, 0.18);
        }

        .section {
          padding: 70px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-label {
          font-size: 9px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--gold);
          display: block;
          margin-bottom: 10px;
        }

        .section-header h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 36px;
          margin: 0 0 12px;
          color: var(--navy);
        }

        .section-underline {
          width: 36px;
          height: 2px;
          margin: 0 auto;
          background: var(--gold);
        }

        .grid {
          display: grid;
          gap: 24px;
        }

        .categories-grid {
          grid-template-columns: repeat(4, 1fr);
        }

        .category-card {
          background: #fff;
          border: 1px solid var(--light-cream);
          padding: 24px;
          text-align: center;
          transition: all 0.2s ease;
        }

        .category-card:hover {
          border-color: var(--gold);
        }

        .category-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 12px;
          color: var(--gold);
        }

        .category-name {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--navy);
        }

        .products-grid {
          grid-template-columns: repeat(4, 1fr);
        }

        .product-card {
          background: #fff;
          border: 1px solid var(--light-cream);
          padding: 20px;
          position: relative;
          transition: all 0.2s ease;
        }

        .product-card:hover {
          border-color: var(--gold);
        }

        .badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--light-cream);
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 6px 10px;
        }

        .product-image {
          overflow: hidden;
          margin-bottom: 16px;
        }

        .product-image img {
          transition: transform 0.2s ease;
        }

        .product-card:hover img {
          transform: translateY(-4px) scale(1.04);
        }

        .product-card h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          margin: 0 0 8px;
        }

        .price {
          color: var(--gold);
          font-size: 14px;
          letter-spacing: 0.1em;
        }

        .section-cta {
          margin-top: 28px;
          text-align: center;
        }

        .story {
          background: var(--navy);
          color: #fff;
          padding: 70px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .story-content {
          max-width: 640px;
        }

        .story h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 36px;
          margin: 0 0 16px;
        }

        .story p {
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.7;
        }

        .contact-strip {
          background: #fff;
          border-top: 1px solid rgba(184, 154, 74, 0.5);
          padding: 40px 24px;
        }

        .contact-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .contact-label {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          display: block;
          margin-bottom: 6px;
        }

        .contact-value {
          font-weight: 600;
          color: var(--navy);
          margin: 0;
        }

        .site-footer {
          background: var(--navy);
          color: rgba(255, 255, 255, 0.7);
          padding: 60px 24px 30px;
        }

        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .footer-grid h4 {
          color: var(--gold);
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin: 0 0 16px;
        }

        .footer-grid ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 8px;
          font-size: 14px;
        }

        .footer-brand p {
          margin: 10px 0 0;
          line-height: 1.6;
        }

        .footer-logo {
          font-family: Georgia, "Times New Roman", serif;
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .footer-logo-top {
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .footer-logo-main {
          font-size: 26px;
          letter-spacing: 0.2em;
          color: #fff;
        }

        .footer-tagline {
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .whatsapp-float {
          position: fixed;
          right: 24px;
          bottom: 24px;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--navy);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(13, 42, 82, 0.25);
          z-index: 60;
        }

        .whatsapp-float svg {
          width: 30px;
          height: 30px;
        }

        @media (max-width: 1024px) {
          .nav-panel {
            gap: 16px;
          }

          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .contact-grid,
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 820px) {
          .navbar-inner {
            padding: 16px 20px;
          }

          .menu-toggle {
            display: flex;
            flex-direction: column;
          }

          .nav-panel {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--cream);
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 20px;
            border-bottom: 1px solid rgba(13, 42, 82, 0.1);
            display: none;
            z-index: 40;
          }

          .nav-panel.open {
            display: flex;
          }

          .nav-links {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .nav-links a,
          .dropdown-toggle {
            font-size: 11px;
          }

          .dropdown-menu {
            position: static;
            opacity: 1;
            pointer-events: auto;
            transform: none;
            border: none;
            padding: 0;
            background: transparent;
          }

          .dropdown-menu a {
            font-size: 10px;
          }

          .nav-whatsapp {
            width: 100%;
          }

          .slide-title {
            font-size: 40px;
          }

          .slide {
            grid-template-columns: 1fr;
          }

          .slide-media {
            order: 2;
          }

          .story {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .logo-name {
            font-size: 22px;
          }

          .hero {
            padding: 60px 20px;
          }

          .section {
            padding: 60px 20px;
          }

          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .contact-grid,
          .footer-grid {
            grid-template-columns: 1fr;
          }

          .slider-dots {
            margin-top: 30px;
          }
        }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function () {
            const SLIDER_INTERVAL_MS = 4000;
            const SCROLL_THRESHOLD = 40;
            const navbar = document.querySelector('.navbar');
            const toggle = document.querySelector('.menu-toggle');
            const navPanel = document.querySelector('.nav-panel');
            const slides = Array.from(document.querySelectorAll('.slide'));
            const dots = Array.from(document.querySelectorAll('.slider-dot'));
            let activeIndex = 0;
            let intervalId;

            const setSlide = (index) => {
              if (index < 0 || index >= slides.length) {
                return;
              }
              slides.forEach((slide, idx) => {
                slide.classList.toggle('active', idx === index);
                if (dots[idx]) {
                  dots[idx].classList.toggle('active', idx === index);
                }
              });
              activeIndex = index;
            };

            const nextSlide = () => {
              const nextIndex = (activeIndex + 1) % slides.length;
              setSlide(nextIndex);
            };

            const startSlider = () => {
              intervalId = window.setInterval(nextSlide, SLIDER_INTERVAL_MS);
            };

            const resetSlider = () => {
              if (intervalId) {
                window.clearInterval(intervalId);
              }
              startSlider();
            };

            if (slides.length) {
              startSlider();
            }

            dots.forEach((dot, index) => {
              dot.addEventListener('click', () => {
                setSlide(index);
                resetSlider();
              });
            });

            if (toggle && navPanel) {
              toggle.addEventListener('click', () => {
                navPanel.classList.toggle('open');
                toggle.classList.toggle('open');
              });
            }

            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach((link) => {
              link.addEventListener('click', () => {
                if (navPanel && navPanel.classList.contains('open')) {
                  navPanel.classList.remove('open');
                }
              });
            });

            window.addEventListener('scroll', () => {
              if (!navbar) return;
              if (window.scrollY > SCROLL_THRESHOLD) {
                navbar.classList.add('is-scrolled');
              } else {
                navbar.classList.remove('is-scrolled');
              }
            });
          })();
        `,
        }}
      />
    </>
  );
}
