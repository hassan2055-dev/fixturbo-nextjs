import React, { useEffect, useState } from "react";
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Static imports for above-the-fold components
import HeaderTwo from "../src/components/HeaderTwo";
import HeroTwo from "../src/components/HeroTwo";
import Preloader from "../src/helper/Preloader";

// Dynamic imports for below-the-fold components
const ServiceAreaTwo = dynamic(() => import("../src/components/ServiceAreaTwo"), { ssr: true });
const AboutTwo = dynamic(() => import("../src/components/AboutTwo"), { ssr: true });
const CounterTwo = dynamic(() => import("../src/components/CounterTwo"), { ssr: true });
const PortfolioTwo = dynamic(() => import("../src/components/PortfolioTwo"), { ssr: true });
const WhyChooseUsOne = dynamic(() => import("../src/components/WhyChooseUsOne"), { ssr: true });
const ProcessAreaTwo = dynamic(() => import("../src/components/ProcessAreaTwo"), { ssr: true });
const CTAAreaTwo = dynamic(() => import("../src/components/CTAAreaTwo"), { ssr: true });
const PricingPlanTwo = dynamic(() => import("../src/components/PricingPlanTwo"), { ssr: true });
const AppointmentAreaTwo = dynamic(() => import("../src/components/AppointmentAreaTwo"), { ssr: true });
const TeamAreaTwo = dynamic(() => import("../src/components/TeamAreaTwo"), { ssr: true });
const ClientAreaTwo = dynamic(() => import("../src/components/ClientAreaTwo"), { ssr: true });
const FaqAreaTwo = dynamic(() => import("../src/components/FaqAreaTwo"), { ssr: true });
const BlogAreaTwo = dynamic(() => import("../src/components/BlogAreaTwo"), { ssr: true });
const FooterAreaTwo = dynamic(() => import("../src/components/FooterAreaTwo"), { ssr: true });

// Dynamically import ScrollToTop to avoid SSR issues
const ScrollToTop = dynamic(() => import('react-scroll-to-top'), {
  ssr: false
});

const HomePage = () => {
  let [active, setActive] = useState(true);
  
  useEffect(() => {
    setTimeout(function () {
      setActive(false);
    }, 800); // Reduced from 2000ms to 800ms for faster loading
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://carcheck.store/#organization",
        "name": "Car Check Store",
        "alternateName": ["CarCheckStore", "Car Check", "Vehicle Check Store"],
        "url": "https://carcheck.store",
        "logo": {
          "@type": "ImageObject",
          "url": "https://carcheck.store/assets/img/logo.svg",
          "width": 300,
          "height": 100
        },
        "description": "Car Check Store is the leading provider of instant vehicle history reports and VIN check services.",
        "foundingDate": "2024",
        "knowsAbout": ["Vehicle History Reports", "VIN Check", "Car Inspection", "Auto Reports", "Vehicle Verification"],
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "serviceType": "Vehicle History Reports"
      },
      {
        "@type": "WebSite",
        "@id": "https://carcheck.store/#website",
        "url": "https://carcheck.store",
        "name": "Car Check Store",
        "description": "Get instant vehicle history reports and VIN checks",
        "publisher": {
          "@id": "https://carcheck.store/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://carcheck.store/?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Car Check Store - #1 Vehicle History Reports & VIN Check Services | Instant Car Inspection Reports</title>
        <meta 
          name="description" 
          content="Car Check Store provides instant, comprehensive vehicle history reports and car inspection services. Get detailed VIN checks, accident records, ownership history, and market value analysis. Your trusted car check store for used car buying decisions." 
        />
        <meta 
          name="keywords" 
          content="car check store, VIN check, vehicle history report, car inspection report, VIN number lookup, vehicle inspection, car history check, auto report, VIN decoder, vehicle records, car buying report, accident history, title check, ownership records, vehicle verification, auto inspection" 
        />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Car Check Store - #1 Vehicle History Reports & VIN Check Services" />
        <meta property="og:description" content="Car Check Store provides instant, comprehensive vehicle history reports and car inspection services. Get detailed VIN checks, accident records, ownership history, and market value analysis." />
        <meta property="og:image" content="https://carcheck.store/card.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Car Check Store - Vehicle History Reports and VIN Check Services" />
        <meta property="og:url" content="https://carcheck.store" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Car Check Store" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Car Check Store - #1 Vehicle History Reports & VIN Check Services" />
        <meta name="twitter:description" content="Car Check Store provides instant, comprehensive vehicle history reports and car inspection services. Get detailed VIN checks, accident records, ownership history, and market value analysis." />
        <meta name="twitter:image" content="https://carcheck.store/card.png" />
        <meta name="twitter:image:alt" content="Car Check Store - Vehicle History Reports and VIN Check Services" />
        <meta name="twitter:site" content="@carcheckstore" />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Car Check Store" />
        <link rel="canonical" href="https://carcheck.store/" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      {/* Preloader */}
      {active === true && <Preloader />}

      {/* Scroll To Top */}
      <ScrollToTop smooth color="#0066CC" />

      {/* Header Two */}
      <HeaderTwo />

      {/* Hero Two */}
      <HeroTwo />

      {/* Service Area Two */}
      <ServiceAreaTwo />

      {/* About Two */}
      <div className="about-area-2 bg-smoke">
        <AboutTwo />
      </div>

      {/* Counter Two */}
      <CounterTwo />

      {/* Portfolio Two */}
      <PortfolioTwo />

      {/* Why Choose Us One */}
      <WhyChooseUsOne />

      {/* Process Area Two */}
      <ProcessAreaTwo />

      {/* CTA Area Two */}
      <CTAAreaTwo />

      {/* Pricing Plan Two */}
      <PricingPlanTwo />

      {/* Appointment Area Two */}
      <AppointmentAreaTwo />

      {/* Team Area Two */}
      <TeamAreaTwo />

      {/* Client Area Two */}
      <ClientAreaTwo />

      {/* Faq Area Two */}
      <FaqAreaTwo />

      {/* Blog Area Two */}
      <BlogAreaTwo />

      {/* Footer Area Two */}
      <FooterAreaTwo />
    </>
  );
};

export default HomePage;
