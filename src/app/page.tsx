"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import "./landing-page.css";

/*
  Replace these numbers with the client's real number.

  WhatsApp number:
  Use country code without the plus symbol.

  Phone number:
  Use the plus symbol.
*/
const WHATSAPP_NUMBER = "923343868945";
const PHONE_NUMBER = "+923343868945";


type CarImage = {
  src: string;
  alt: string;
  category: string;
};

const carImages: CarImage[] = [
  {
    src: "/images/car/hero.webp",
    alt: "Front three-quarter view of Honda BR-V",
    category: "Exterior",
  },
  {
    src: "/images/car/exterior-front-left.webp",
    alt: "Front-left exterior view of Honda BR-V",
    category: "Exterior",
  },
  {
    src: "/images/car/exterior-front.webp",
    alt: "Straight front view of Honda BR-V",
    category: "Exterior",
  },
  {
    src: "/images/car/exterior-rear-left.webp",
    alt: "Rear-left exterior view of Honda BR-V",
    category: "Exterior",
  },
  {
    src: "/images/car/exterior-rear.webp",
    alt: "Straight rear view of Honda BR-V",
    category: "Exterior",
  },
  {
    src: "/images/car/exterior-rear-right.webp",
    alt: "Rear-right exterior view of Honda BR-V",
    category: "Exterior",
  },
  {
    src: "/images/car/interior-driver-side.webp",
    alt: "Driver-side interior of Honda BR-V",
    category: "Interior",
  },
  {
    src: "/images/car/interior-dashboard.webp",
    alt: "Dashboard and driving controls of Honda BR-V",
    category: "Interior",
  },
  {
    src: "/images/car/odometer.webp",
    alt: "Odometer photograph of Honda BR-V",
    category: "Mileage",
  },
];

const quickSpecifications = [
  {
    value: "103,000",
    label: "Kilometres driven",
  },
  {
    value: "1.5L",
    label: "i-VTEC engine",
  },
  {
    value: "Petrol",
    label: "Fuel type",
  },
  {
    value: "Family",
    label: "Usage",
  },
  {
    value: "G-10",
    label: "Islamabad location",
  },
];

const sellingPoints = [
  {
    number: "01",
    title: "Mechanically sound",
    description:
      "The engine, gearbox and air conditioning are all working properly.",
  },
  {
    number: "02",
    title: "Family-used car",
    description:
      "Used as a family vehicle and maintained for comfortable everyday driving.",
  },
  {
    number: "03",
    title: "Original condition",
    description:
      "Original paint with light cosmetic touch-ups as described by the seller.",
  },
  {
    number: "04",
    title: "Service records",
    description:
      "Full service history is available on request for serious buyers.",
  },
];

const vehicleDetails = [
  ["Make", "Honda"],
  ["Model", "BR-V"],
  ["Variant", "i-VTEC S"],
  ["Mileage", "103,000 km"],
  ["Engine", "1.5L i-VTEC"],
  ["Fuel type", "Petrol"],
  ["Usage", "Family used"],
  ["Paint condition", "Original paint with light touches"],
  ["Engine condition", "Working properly"],
  ["Gearbox condition", "Working properly"],
  ["Air conditioning", "Working properly"],
  ["Service history", "Available on request"],
  ["Location", "G-10, Islamabad"],
  ["Demand", "PKR 5,150,000"],
];

const faqs = [
  {
    question: "Is the Honda BR-V still available?",
    answer:
      "Availability can change quickly. Contact the seller on WhatsApp to confirm the current status.",
  },
  {
    question: "Where can I inspect the car?",
    answer:
      "The car is located in G-10, Islamabad. The exact location will be shared privately with serious buyers.",
  },
  {
    question: "Is the service history available?",
    answer:
      "Yes. Full service history is available on request for serious prospective buyers.",
  },
  {
    question: "Can I bring my own mechanic?",
    answer:
      "You can discuss an independent mechanical inspection with the seller before arranging your visit.",
  },
  {
    question: "What is the paint condition?",
    answer:
      "The seller describes the car as having original paint with light cosmetic touch-ups. Buyers should inspect and verify the condition.",
  },
  {
    question: "Is the price negotiable?",
    answer:
      "The current demand is PKR 5,150,000. Any negotiation should be discussed directly with the seller.",
  },
];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="button-icon"
    >
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.5 0 .16 5.34.16 11.92c0 2.1.55 4.16 1.6 5.97L.06 24l6.26-1.64a11.9 11.9 0 0 0 5.75 1.47h.01C18.66 23.83 24 18.49 24 11.91c0-3.18-1.24-6.18-3.48-8.43ZM12.08 21.8a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.85 9.85 0 0 1-1.52-5.27c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c-.01 5.45-4.44 9.88-9.89 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47a8.88 8.88 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="button-icon"
    >
      <path
        d="M7.32 2.5h-2.1A2.72 2.72 0 0 0 2.5 5.22C2.5 14.21 9.79 21.5 18.78 21.5a2.72 2.72 0 0 0 2.72-2.72v-2.1a1.5 1.5 0 0 0-1.03-1.42l-4.12-1.37a1.5 1.5 0 0 0-1.64.5l-.92 1.22a13.03 13.03 0 0 1-5.4-5.4l1.22-.92a1.5 1.5 0 0 0 .5-1.64L8.74 3.53A1.5 1.5 0 0 0 7.32 2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="arrow-icon"
    >
      <path
        d="M5 15 15 5M7 5h8v8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function trackEvent(eventName: string, buttonLocation: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", eventName, {
    event_category: "lead",
    event_label: buttonLocation,
  });
}

function getWhatsAppUrl(buttonLocation: string) {
  const message = `Hi, I am interested in the Honda BR-V i-VTEC S listed for PKR 5,150,000.

Is the car still available?

Enquiry source: ${buttonLocation}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const pageShouldBeLocked =
      mobileMenuOpen || activeImageIndex !== null;

    document.body.classList.toggle("no-scroll", pageShouldBeLocked);

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [mobileMenuOpen, activeImageIndex]);

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if (activeImageIndex === null) {
        return;
      }

      if (event.key === "Escape") {
        setActiveImageIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex(
          (activeImageIndex + 1) % carImages.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex(
          (activeImageIndex - 1 + carImages.length) %
            carImages.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [activeImageIndex]);

  function handleWhatsAppClick(
    event: MouseEvent<HTMLAnchorElement>,
    buttonLocation: string,
  ) {
    event.preventDefault();

    trackEvent("whatsapp_click", buttonLocation);

    window.open(
      getWhatsAppUrl(buttonLocation),
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handlePhoneClick(buttonLocation: string) {
    trackEvent("phone_click", buttonLocation);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function showPreviousImage() {
    if (activeImageIndex === null) {
      return;
    }

    setActiveImageIndex(
      (activeImageIndex - 1 + carImages.length) %
        carImages.length,
    );
  }

  function showNextImage() {
    if (activeImageIndex === null) {
      return;
    }

    setActiveImageIndex(
      (activeImageIndex + 1) % carImages.length,
    );
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#top"
            className="site-logo"
            aria-label="Honda BR-V listing homepage"
          >
            <span className="logo-symbol">H</span>

            <span className="logo-text">
              <strong>Honda BR-V</strong>
              <small>Private Sale</small>
            </span>
          </a>

          <nav
            className={`main-navigation ${
              mobileMenuOpen ? "is-open" : ""
            }`}
            aria-label="Main navigation"
          >
            <a href="#overview" onClick={closeMobileMenu}>
              Overview
            </a>

            <a href="#gallery" onClick={closeMobileMenu}>
              Gallery
            </a>

            <a href="#details" onClick={closeMobileMenu}>
              Details
            </a>

            <a href="#location" onClick={closeMobileMenu}>
              Location
            </a>

            <a
              href={getWhatsAppUrl("header")}
              className="header-whatsapp-button"
              onClick={(event) =>
                handleWhatsAppClick(event, "header")
              }
            >
              <WhatsAppIcon />
              <span>WhatsApp Seller</span>
            </a>
          </nav>

          <button
            type="button"
            className={`mobile-menu-button ${
              mobileMenuOpen ? "is-open" : ""
            }`}
            aria-label="Open navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen((currentValue) => !currentValue)
            }
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" id="overview">
          <div className="hero-decoration" />

          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-label">
                <span className="status-dot" />
                Private car for sale · Islamabad
              </div>

              <h1 className="hero-title">
                Honda BR-V
                <span>i-VTEC S</span>
              </h1>

              <p className="hero-description">
                A family-used Honda BR-V with service history
                available, located in G-10, Islamabad and ready for
                inspection.
              </p>

              <div className="hero-price">
                <span>Asking price</span>
                <strong>PKR 5,150,000</strong>
              </div>

              <div className="hero-buttons">
                <a
                  href={getWhatsAppUrl("hero")}
                  className="whatsapp-button"
                  onClick={(event) =>
                    handleWhatsAppClick(event, "hero")
                  }
                >
                  <WhatsAppIcon />
                  <span>Message on WhatsApp</span>
                  <ArrowIcon />
                </a>

                <a href="#gallery" className="outline-button">
                  View All Photos
                </a>
              </div>

              <div className="hero-location">
                <span className="round-check">✓</span>

                <p>
                  Located in G-10, Islamabad
                  <small>Available for physical inspection</small>
                </p>
              </div>
            </div>

            <div className="hero-image-area">
              <div className="hero-image-box">
                <Image
                  src="/images/car/hero.webp"
                  alt="Honda BR-V i-VTEC S for sale in Islamabad"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 56vw"
                  className="cover-image"
                />

                <div className="hero-image-badge">
                  <span>Private sale</span>
                  <strong>Family used</strong>
                </div>
              </div>

              <div className="mileage-card">
                <small>Mileage</small>
                <strong>103,000</strong>
                <span>Kilometres</span>
              </div>
            </div>
          </div>
        </section>

        <section className="quick-specs-section">
          <div className="page-container">
            <div className="quick-specs-grid">
              {quickSpecifications.map((specification) => (
                <div
                  className="quick-spec-item"
                  key={specification.label}
                >
                  <strong>{specification.value}</strong>
                  <span>{specification.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="page-container">
            <div className="section-heading-row">
              <div>
                <span className="section-label">Why this BR-V</span>

                <h2 className="section-title">
                  A family car that has been
                  <span>properly looked after.</span>
                </h2>
              </div>

              <p className="section-description">
                Clear information, actual vehicle photographs and
                direct contact with the seller help serious buyers
                make a faster decision.
              </p>
            </div>

            <div className="features-grid">
              {sellingPoints.map((sellingPoint) => (
                <article
                  className="feature-card"
                  key={sellingPoint.number}
                >
                  <div className="feature-card-top">
                    <span>{sellingPoint.number}</span>
                    <span>↗</span>
                  </div>

                  <div>
                    <h3>{sellingPoint.title}</h3>
                    <p>{sellingPoint.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="page-container">
            <div className="section-heading-row">
              <div>
                <span className="section-label">
                  Vehicle gallery
                </span>

                <h2 className="section-title">
                  See the actual car from every angle.
                </h2>
              </div>

              <p className="section-description">
                Select any photograph to open the full-screen
                vehicle gallery.
              </p>
            </div>

            <div className="gallery-grid">
              {carImages.slice(0, 5).map((image, index) => (
                <button
                  type="button"
                  className={`gallery-card ${
                    index === 0 ? "is-featured" : ""
                  }`}
                  key={image.src}
                  aria-label={`Open ${image.alt}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 767px) 100vw, 50vw"
                        : "(max-width: 767px) 50vw, 25vw"
                    }
                    className="cover-image gallery-image"
                  />

                  <span className="gallery-card-overlay">
                    <small>{image.category}</small>

                    <strong>
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(carImages.length).padStart(2, "0")}
                    </strong>
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="view-gallery-button"
              onClick={() => setActiveImageIndex(0)}
            >
              View All {carImages.length} Photos
              <ArrowIcon />
            </button>
          </div>
        </section>

        <section className="condition-section">
          <div className="page-container">
            <div className="condition-grid">
              <div className="condition-photo">
                <Image
                  src="/images/car/exterior-rear-left.webp"
                  alt="Rear-left view of Honda BR-V"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="cover-image"
                />

                <div className="condition-photo-label">
                  <span>Actual vehicle photo</span>
                  <strong>Inspect with confidence</strong>
                </div>
              </div>

              <div className="condition-content">
                <span className="section-label light-label">
                  Condition transparency
                </span>

                <h2 className="section-title light-title">
                  Important details
                  <span>before arranging a visit.</span>
                </h2>

                <p className="condition-description">
                  The seller has provided the main condition details
                  to help buyers understand the car before visiting.
                </p>

                <ul className="condition-list">
                  <li>
                    <span>✓</span>
                    Engine and gearbox working properly
                  </li>

                  <li>
                    <span>✓</span>
                    Air conditioning working properly
                  </li>

                  <li>
                    <span>✓</span>
                    Original paint with light cosmetic touches
                  </li>

                  <li>
                    <span>✓</span>
                    Full service history available on request
                  </li>

                  <li>
                    <span>✓</span>
                    Physical inspection available in Islamabad
                  </li>
                </ul>

                <a
                  href={getWhatsAppUrl("condition-section")}
                  className="whatsapp-button"
                  onClick={(event) =>
                    handleWhatsAppClick(
                      event,
                      "condition-section",
                    )
                  }
                >
                  <WhatsAppIcon />
                  <span>Ask About the Condition</span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="details-section" id="details">
          <div className="page-container">
            <div className="details-grid">
              <div className="details-introduction">
                <span className="section-label">
                  Vehicle information
                </span>

                <h2 className="section-title">
                  Essential details,
                  <span>all in one place.</span>
                </h2>

                <p>
                  Contact the seller for registration, ownership,
                  documents, token-tax and inspection information.
                </p>

                <a
                  href={getWhatsAppUrl("vehicle-details")}
                  className="text-link"
                  onClick={(event) =>
                    handleWhatsAppClick(event, "vehicle-details")
                  }
                >
                  <WhatsAppIcon />
                  <span>Request Complete Details</span>
                  <ArrowIcon />
                </a>
              </div>

              <div className="vehicle-details-table">
                {vehicleDetails.map(([label, value]) => (
                  <div className="vehicle-detail-row" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="interior-section">
          <div className="page-container">
            <div className="interior-heading">
              <span className="section-label">
                Interior and mileage
              </span>

              <h2 className="section-title">
                See the cabin and
                <span>odometer photograph.</span>
              </h2>
            </div>

            <div className="interior-grid">
              <button
                type="button"
                className="interior-photo interior-main-photo"
                onClick={() => setActiveImageIndex(7)}
              >
                <Image
                  src="/images/car/interior-dashboard.webp"
                  alt="Dashboard of Honda BR-V"
                  fill
                  sizes="(max-width: 767px) 100vw, 60vw"
                  className="cover-image"
                />

                <span className="photo-caption">
                  <small>Dashboard</small>
                  <strong>Driver-focused cabin</strong>
                </span>
              </button>

              <button
                type="button"
                className="interior-photo"
                onClick={() => setActiveImageIndex(6)}
              >
                <Image
                  src="/images/car/interior-driver-side.webp"
                  alt="Driver-side interior of Honda BR-V"
                  fill
                  sizes="(max-width: 767px) 100vw, 35vw"
                  className="cover-image"
                />

                <span className="photo-caption">
                  <small>Interior condition</small>
                  <strong>Driver-side cabin view</strong>
                </span>
              </button>

              <button
                type="button"
                className="interior-photo"
                onClick={() => setActiveImageIndex(8)}
              >
                <Image
                  src="/images/car/odometer.webp"
                  alt="Odometer photograph of Honda BR-V"
                  fill
                  sizes="(max-width: 767px) 100vw, 35vw"
                  className="cover-image"
                />

                <span className="photo-caption">
                  <small>Mileage</small>
                  <strong>Odometer photograph provided</strong>
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="price-section">
          <div className="price-decoration" />

          <div className="page-container price-inner">
            <div className="price-content">
              <span className="price-label">
                Current asking price
              </span>

              <h2>PKR 5,150,000</h2>

              <p>
                Serious buyers can contact the seller directly and
                arrange a physical inspection in G-10, Islamabad.
              </p>

              <div className="price-buttons">
                <a
                  href={getWhatsAppUrl("price-section")}
                  className="white-whatsapp-button"
                  onClick={(event) =>
                    handleWhatsAppClick(event, "price-section")
                  }
                >
                  <WhatsAppIcon />
                  <span>Discuss on WhatsApp</span>
                  <ArrowIcon />
                </a>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="white-outline-button"
                  onClick={() => handlePhoneClick("price-section")}
                >
                  <PhoneIcon />
                  <span>Call Seller</span>
                </a>
              </div>
            </div>

            <div className="price-summary">
              <div>
                <span>Vehicle</span>
                <strong>Honda BR-V i-VTEC S</strong>
              </div>

              <div>
                <span>Mileage</span>
                <strong>103,000 km</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>G-10, Islamabad</strong>
              </div>

              <div>
                <span>Sale type</span>
                <strong>Private sale</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="location-section" id="location">
          <div className="page-container">
            <div className="location-grid">
              <div className="location-content">
                <span className="section-label">
                  Inspection location
                </span>

                <h2 className="section-title">
                  View the car in
                  <span>G-10, Islamabad.</span>
                </h2>

                <p>
                  The exact location will be shared privately after
                  the seller confirms a suitable inspection time.
                </p>

                <div className="location-buttons">
                  <a
                    href={getWhatsAppUrl("location-section")}
                    className="whatsapp-button"
                    onClick={(event) =>
                      handleWhatsAppClick(
                        event,
                        "location-section",
                      )
                    }
                  >
                    <WhatsAppIcon />
                    <span>Arrange Inspection</span>
                    <ArrowIcon />
                  </a>

                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="call-button"
                    onClick={() =>
                      handlePhoneClick("location-section")
                    }
                  >
                    <PhoneIcon />
                    <span>Call Seller</span>
                  </a>
                </div>
              </div>

              <div className="location-map">
                <div className="map-grid-pattern" />
                <div className="map-road map-road-one" />
                <div className="map-road map-road-two" />
                <div className="map-road map-road-three" />

                <div className="map-pin">
                  <span />
                </div>

                <div className="map-information">
                  <small>Vehicle location</small>
                  <strong>G-10, Islamabad</strong>
                  <span>Exact address shared privately</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="page-container">
            <div className="faq-grid">
              <div className="faq-introduction">
                <span className="section-label">
                  Frequently asked questions
                </span>

                <h2 className="section-title">
                  Common questions from
                  <span>serious buyers.</span>
                </h2>

                <p>
                  Contact the seller directly when you need the
                  latest availability or vehicle information.
                </p>

                <a
                  href={getWhatsAppUrl("faq-section")}
                  className="text-link"
                  onClick={(event) =>
                    handleWhatsAppClick(event, "faq-section")
                  }
                >
                  <WhatsAppIcon />
                  <span>Ask Another Question</span>
                  <ArrowIcon />
                </a>
              </div>

              <div className="faq-list">
                {faqs.map((faq, index) => {
                  const faqIsOpen = activeFaqIndex === index;

                  return (
                    <article
                      className={`faq-item ${
                        faqIsOpen ? "is-open" : ""
                      }`}
                      key={faq.question}
                    >
                      <button
                        type="button"
                        aria-expanded={faqIsOpen}
                        onClick={() =>
                          setActiveFaqIndex((currentValue) =>
                            currentValue === index ? null : index,
                          )
                        }
                      >
                        <span>{faq.question}</span>
                        <span className="faq-plus">+</span>
                      </button>

                      <div className="faq-answer">
                        <div>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="page-container">
            <div className="contact-heading">
              <div>
                <span className="section-label light-label">
                  Contact the seller
                </span>

                <h2 className="section-title light-title">
                  Interested in
                  <span>this Honda BR-V?</span>
                </h2>
              </div>

              <p>
                Contact the seller directly to confirm availability,
                ask a question or arrange an inspection.
              </p>
            </div>

            <div className="contact-cards">
              <a
                href={getWhatsAppUrl("contact-section")}
                className="contact-card whatsapp-contact-card"
                onClick={(event) =>
                  handleWhatsAppClick(event, "contact-section")
                }
              >
                <span className="contact-icon">
                  <WhatsAppIcon />
                </span>

                <span className="contact-card-text">
                  <small>Fastest response</small>
                  <strong>Message on WhatsApp</strong>
                  <span>
                    Ask about availability or arrange an inspection.
                  </span>
                </span>

                <span className="contact-arrow">
                  <ArrowIcon />
                </span>
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="contact-card phone-contact-card"
                onClick={() =>
                  handlePhoneClick("contact-section")
                }
              >
                <span className="contact-icon">
                  <PhoneIcon />
                </span>

                <span className="contact-card-text">
                  <small>Direct contact</small>
                  <strong>Call the Seller</strong>
                  <span>{PHONE_NUMBER}</span>
                </span>

                <span className="contact-arrow">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-photo-strip">
          {carImages.map((image, index) => (
            <button
              type="button"
              className="footer-photo"
              key={image.src}
              aria-label={`Open ${image.alt}`}
              onClick={() => setActiveImageIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="150px"
                className="cover-image"
              />

              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="page-container">
          <div className="footer-main">
            <div>
              <a
                href="#top"
                className="footer-logo"
                aria-label="Go to the top"
              >
                <span className="logo-symbol">H</span>

                <span className="logo-text">
                  <strong>Honda BR-V</strong>
                  <small>Private Sale</small>
                </span>
              </a>

              <p>
                Honda BR-V i-VTEC S available for inspection in
                G-10, Islamabad.
              </p>
            </div>

            <div className="footer-buttons">
              <a
                href={getWhatsAppUrl("footer")}
                className="footer-whatsapp-button"
                onClick={(event) =>
                  handleWhatsAppClick(event, "footer")
                }
              >
                <WhatsAppIcon />
                <span>WhatsApp Seller</span>
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="footer-call-button"
                onClick={() => handlePhoneClick("footer")}
              >
                <PhoneIcon />
                <span>Call Seller</span>
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              This is a private vehicle listing. Buyers should
              independently inspect the car and verify its documents,
              registration, ownership and mechanical condition before
              payment.
            </p>

            <span>Demand: PKR 5,150,000</span>
          </div>
        </div>
      </footer>

      <div className="mobile-sticky-buttons">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="mobile-call-button"
          onClick={() => handlePhoneClick("mobile-sticky")}
        >
          <PhoneIcon />
          <span>Call</span>
        </a>

        <a
          href={getWhatsAppUrl("mobile-sticky")}
          className="mobile-whatsapp-button"
          onClick={(event) =>
            handleWhatsAppClick(event, "mobile-sticky")
          }
        >
          <WhatsAppIcon />
          <span>WhatsApp Now</span>
        </a>
      </div>

      {activeImageIndex !== null && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Vehicle image gallery"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            aria-label="Close image gallery"
            onClick={() => setActiveImageIndex(null)}
          >
            ×
          </button>

          <button
            type="button"
            className="lightbox-arrow lightbox-previous"
            aria-label="Previous photograph"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
          >
            ←
          </button>

          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="lightbox-image">
              <Image
                src={carImages[activeImageIndex].src}
                alt={carImages[activeImageIndex].alt}
                fill
                sizes="100vw"
                className="contain-image"
              />
            </div>

            <div className="lightbox-caption">
              <div>
                <small>
                  {carImages[activeImageIndex].category}
                </small>

                <strong>
                  {carImages[activeImageIndex].alt}
                </strong>
              </div>

              <span>
                {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                {String(carImages.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-arrow lightbox-next"
            aria-label="Next photograph"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}