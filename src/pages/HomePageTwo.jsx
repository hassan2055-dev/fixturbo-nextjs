import React, { useEffect, useState } from "react";
import SEOHead from "../components/SEOHead";
import HeaderTwo from "../components/HeaderTwo";
import HeroTwo from "../components/HeroTwo";
import ServiceAreaTwo from "../components/ServiceAreaTwo";
import AboutTwo from "../components/AboutTwo";
import CounterTwo from "../components/CounterTwo";
import PortfolioTwo from "../components/PortfolioTwo";
import WhyChooseUsOne from "../components/WhyChooseUsOne";
import ProcessAreaTwo from "../components/ProcessAreaTwo";
import CTAAreaTwo from "../components/CTAAreaTwo";
import PricingPlanTwo from "../components/PricingPlanTwo";
import TeamAreaTwo from "../components/TeamAreaTwo";
import ClientAreaTwo from "../components/ClientAreaTwo";
import FaqAreaTwo from "../components/FaqAreaTwo";
import BlogAreaTwo from "../components/BlogAreaTwo";
import FooterAreaTwo from "../components/FooterAreaTwo";
import Preloader from "../helper/Preloader";

const HomePageTwo = () => {
  let [active, setActive] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setActive(false);
    }, 2000);
  }, []);
  return (
    <>
      {/* SEO Head */}
      <SEOHead 
        title="Car Check Store - #1 Vehicle History Reports & VIN Check Services | Instant Car Inspection Reports"
        description="Car Check Store provides instant, comprehensive vehicle history reports and car inspection services. Get detailed VIN checks, accident records, ownership history, and market value analysis. Your trusted car check store for used car buying decisions."
        keywords="car check store, VIN check, vehicle history report, car inspection report, VIN number lookup, vehicle inspection, car history check, auto report, VIN decoder, vehicle records, car buying report, accident history, title check, ownership records, vehicle verification, auto inspection"
        url="https://carcheck.store"
      />

      {/* Preloader */}
      {active === true && <Preloader />}

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

export default HomePageTwo;
