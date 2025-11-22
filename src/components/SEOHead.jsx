import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "Car Check Store - #1 Vehicle History Reports & VIN Check Services | Instant Car Inspection Reports",
  description = "Car Check Store provides instant, comprehensive vehicle history reports and car inspection services. Get detailed VIN checks, accident records, ownership history, and market value analysis. Your trusted car check store for used car buying decisions.",
  keywords = "car check store, VIN check, vehicle history report, car inspection report, VIN number lookup, vehicle inspection, car history check, auto report, VIN decoder, vehicle records, car buying report, accident history, title check, ownership records, vehicle verification, auto inspection",
  image = "https://carcheck.store/card.png",
  url = "https://carcheck.store",
  type = "website",
  structuredData = null
}) => {
  const defaultStructuredData = {
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
        "description": "Car Check Store is the leading provider of instant vehicle history reports and VIN check services. Get comprehensive car inspection reports, accident history, and vehicle verification.",
        "foundingDate": "2024",
        "knowsAbout": ["Vehicle History Reports", "VIN Check", "Car Inspection", "Auto Reports", "Vehicle Verification"],
        "areaServed": [
          {
            "@type": "Country",
            "name": "United States"
          },
          {
            "@type": "Country", 
            "name": "Canada"
          },
          {
            "@type": "Country",
            "name": "United Kingdom"
          }
        ],
        "serviceType": ["Vehicle History Reports", "VIN Check Services", "Car Inspection Reports", "Auto Verification"],
        "sameAs": [
          "https://facebook.com/carcheckstore",
          "https://twitter.com/carcheckstore",
          "https://linkedin.com/company/carcheckstore"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-800-CAR-CHECK",
          "contactType": "customer service",
          "availableLanguage": ["English", "Spanish"]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "2847",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://carcheck.store/#website",
        "url": "https://carcheck.store",
        "name": "Car Check Store",
        "description": "Car Check Store - Your trusted source for instant vehicle history reports and comprehensive car inspection services",
        "publisher": {
          "@id": "https://carcheck.store/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://carcheck.store/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Service",
        "@id": "https://carcheck.store/#service",
        "name": "Car Check Store Vehicle History Reports",
        "description": "Comprehensive vehicle history reports and VIN check services from Car Check Store",
        "provider": {
          "@id": "https://carcheck.store/#organization"
        },
        "areaServed": [
          {
            "@type": "Country",
            "name": "United States"
          },
          {
            "@type": "Country",
            "name": "Canada"
          }
        ],
        "category": "Automotive Services",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Car Check Store Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Basic VIN Check",
                "description": "Essential vehicle information and basic history check"
              },
              "price": "9.99",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Detailed Vehicle History Report",
                "description": "Comprehensive history including accidents, ownership, and market value"
              },
              "price": "24.99",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Premium Car Inspection Report",
                "description": "Complete inspection with photos, mechanical assessment, and market analysis"
              },
              "price": "49.99",
              "priceCurrency": "USD"
            }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://carcheck.store/#localbusiness",
        "name": "Car Check Store",
        "image": "https://carcheck.store/assets/img/logo.svg",
        "telephone": "+1-800-CAR-CHECK",
        "url": "https://carcheck.store",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Auto Street",
          "addressLocality": "Car City",
          "addressRegion": "CA",
          "postalCode": "90210",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "34.0522",
          "longitude": "-118.2437"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday"],
            "opens": "09:00",
            "closes": "17:00"
          }
        ],
        "priceRange": "$9.99 - $49.99"
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Car Check Store" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Car Check Store" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@carcheckstore" />
      <meta name="twitter:creator" content="@carcheckstore" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#0066CC" />
      <meta name="msapplication-TileColor" content="#0066CC" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      
      {/* Additional Rich Snippets for FAQ */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a VIN check?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A VIN check is a comprehensive report that provides detailed information about a vehicle's history using its unique 17-character Vehicle Identification Number (VIN). Our VIN check reveals accident history, ownership records, title information, and more."
              }
            },
            {
              "@type": "Question",
              "name": "How much does a car history report cost?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Car Check Store offers vehicle history reports starting from $9.99 for basic VIN checks, $24.99 for detailed reports, and $49.99 for premium inspection reports with comprehensive analysis."
              }
            },
            {
              "@type": "Question",
              "name": "Is Car Check Store reliable?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Car Check Store is a trusted provider with over 2,800 satisfied customers and a 4.8-star rating. We source data from government databases, insurance companies, and automotive industry partners."
              }
            },
            {
              "@type": "Question",
              "name": "How quickly do I get my vehicle report?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All Car Check Store reports are delivered instantly after purchase. You'll receive your comprehensive vehicle history report via email within minutes of completing your order."
              }
            }
          ]
        })}
      </script>
      
      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://carcheck.store/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "VIN Check Services",
              "item": "https://carcheck.store/services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Vehicle History Reports",
              "item": "https://carcheck.store/reports"
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
