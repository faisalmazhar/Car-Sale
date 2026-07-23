"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./landing-page.css";

/* Replace these with the client’s actual contact details. */
const WHATSAPP_NUMBER = "923001234567";
const PHONE_NUMBER = "+923001234567";

/* Leave empty to hide PakWheels links. */
const PAKWHEELS_URL = "";

const CAR_PRICE = "PKR 4,98,0000";
const CAR_MILEAGE = "103,000 km";

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
  ["Mileage", CAR_MILEAGE],
  ["Engine", "1.5L i-VTEC"],
  ["Fuel type", "Petrol"],
  ["Usage", "Family used"],
  ["Paint condition", "Original paint with light touches"],
  ["Engine condition", "Working properly"],
  ["Gearbox condition", "Working properly"],
  ["Air conditioning", "Working properly"],
  ["Service history", "Available on request"],
  ["Location", "G-10, Islamabad"],
  ["Asking price", CAR_PRICE],
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
      "The current asking price is PKR 4,98,0000. Any negotiation should be discussed directly with the seller.",
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
  const message = `Hi, I am interested in the Honda BR-V i-VTEC S listed for ${CAR_PRICE}.

Is the car still available?

Enquiry source: ${buttonLocation}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;
}

export default function HomePage() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(
    null,
  );

  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const [showMobileSticky, setShowMobileSticky] = useState(true);

  const pakWheelsAvailable = PAKWHEELS_URL.trim().length > 0;

  useEffect(() => {
    document.body.classList.toggle(
      "no-scroll",
      activeImageIndex !== null,
    );

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [activeImageIndex]);

  useEffect(() => {
    function handleKeyboard(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveImageIndex(null);
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  /* Preload the selected, previous and next lightbox images. */
  useEffect(() => {
    if (activeImageIndex === null) {
      return;
    }

    const previousIndex =
      (activeImageIndex - 1 + carImages.length) % carImages.length;

    const nextIndex =
      (activeImageIndex + 1) % carImages.length;

    [activeImageIndex, previousIndex, nextIndex].forEach(
      (imageIndex) => {
        const preloadImage = new window.Image();
        preloadImage.src = carImages[imageIndex].src;
      },
    );
  }, [activeImageIndex]);

  /* Hide mobile sticky CTA when a section CTA is visible. */
  useEffect(() => {
    const ctaAreas = document.querySelectorAll<HTMLElement>(
      "[data-hide-mobile-sticky]",
    );

    const visibleCtaAreas = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleCtaAreas.add(entry.target);
          } else {
            visibleCtaAreas.delete(entry.target);
          }
        });

        setShowMobileSticky(visibleCtaAreas.size === 0);
      },
      {
        threshold: 0.15,
        rootMargin: "-5% 0px -12% 0px",
      },
    );

    ctaAreas.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

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

  function handlePakWheelsClick(buttonLocation: string) {
    trackEvent("pakwheels_click", buttonLocation);
  }

  return (
    <>
      <main id="top">
        <section className="hero-section" id="overview">
          <div className="hero-decoration" />

          <div className="hero-inner">
            <div className="hero-copy">
              <h1 className="hero-title">
                Honda BR-V
                <span>i-VTEC S</span>
              </h1>

              <div className="hero-details">
                <p className="hero-description">
                  A family-used Honda BR-V with service history
                  available, located in G-10, Islamabad and ready for
                  inspection.
                </p>

                <div className="hero-price">
                  <span>Asking price</span>
                  <strong>{CAR_PRICE}</strong>
                </div>

                <div
                  className="hero-buttons"
                  data-hide-mobile-sticky
                >
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

                {pakWheelsAvailable && (
                  <a
                    href={PAKWHEELS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pakwheels-link"
                    onClick={() => handlePakWheelsClick("hero")}
                  >
                    Also listed on PakWheels.com
                    <ArrowIcon />
                  </a>
                )}
              </div>
            </div>

            <div className="hero-slider-area">
              <Swiper
                className="hero-swiper"
                modules={[Navigation, Pagination, Keyboard, A11y]}
                navigation
                pagination={{
                  clickable: true,
                }}
                keyboard={{
                  enabled: true,
                }}
                loop
                grabCursor
                watchOverflow
                speed={450}
                spaceBetween={12}
                slidesPerView={1}
              >
                {carImages.map((image, index) => (
                  <SwiperSlide key={image.src}>
                    <button
                      type="button"
                      className="hero-slide"
                      aria-label={`Open ${image.alt}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        preload={index === 0}
                        sizes="(max-width: 900px) 100vw, 56vw"
                        className="cover-image"
                      />

                      <span className="hero-slide-overlay" />

                      <span className="hero-slide-information">
                        <span>
                          <small>{image.category}</small>
                          <strong>{image.alt}</strong>
                        </span>

                        <span className="hero-slide-number">
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {String(carImages.length).padStart(2, "0")}
                        </span>
                      </span>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="hero-mobile-location">
              <span className="round-check">✓</span>

              <p>
                Located in G-10, Islamabad
                <small>Available for physical inspection</small>
              </p>
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
                direct contact with the seller help serious buyers make
                a faster decision.
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
                Swipe or use the arrows to view every photograph.
                Select any image to open the full-screen gallery.
              </p>
            </div>

            <Swiper
              className="gallery-swiper"
              modules={[Navigation, Pagination, Keyboard, A11y]}
              navigation
              pagination={{
                clickable: true,
              }}
              keyboard={{
                enabled: true,
              }}
              grabCursor
              watchOverflow
              speed={450}
              spaceBetween={14}
              slidesPerView={1.08}
              breakpoints={{
                560: {
                  slidesPerView: 1.7,
                },
                768: {
                  slidesPerView: 2.2,
                },
                1100: {
                  slidesPerView: 3.1,
                },
              }}
            >
              {carImages.map((image, index) => (
                <SwiperSlide key={image.src}>
                  <button
                    type="button"
                    className="gallery-slide"
                    aria-label={`Open ${image.alt}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 767px) 92vw, 34vw"
                      className="cover-image gallery-image"
                    />

                    <span className="gallery-slide-overlay" />

                    <span className="gallery-slide-caption">
                      <span>
                        <small>{image.category}</small>
                        <strong>{image.alt}</strong>
                      </span>

                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="condition-section">
          <div className="page-container">
            <div className="condition-grid">
              <button
                type="button"
                className="condition-photo"
                onClick={() => setActiveImageIndex(3)}
                aria-label="Open rear-left Honda BR-V photograph"
              >
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
              </button>

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

                <div data-hide-mobile-sticky>
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

                <div data-hide-mobile-sticky>
                  <a
                    href={getWhatsAppUrl("vehicle-details")}
                    className="text-link"
                    onClick={(event) =>
                      handleWhatsAppClick(
                        event,
                        "vehicle-details",
                      )
                    }
                  >
                    <WhatsAppIcon />
                    <span>Request Complete Details</span>
                    <ArrowIcon />
                  </a>
                </div>

                {pakWheelsAvailable && (
                  <a
                    href={PAKWHEELS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pakwheels-details-link"
                    onClick={() =>
                      handlePakWheelsClick("vehicle-details")
                    }
                  >
                    View PakWheels Listing
                    <ArrowIcon />
                  </a>
                )}
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

              <h2>{CAR_PRICE}</h2>

              <p>
                Serious buyers can contact the seller directly and
                arrange a physical inspection in G-10, Islamabad.
              </p>

              <div
                className="price-buttons"
                data-hide-mobile-sticky
              >
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
                <strong>{CAR_MILEAGE}</strong>
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

                <div
                  className="location-buttons"
                  data-hide-mobile-sticky
                >
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
                  Contact the seller directly when you need the latest
                  availability or vehicle information.
                </p>

                <div data-hide-mobile-sticky>
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

            <div
              className="contact-cards"
              data-hide-mobile-sticky
            >
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
              <div className="footer-brand">
                <span className="logo-symbol">H</span>

                <span className="logo-text">
                  <strong>Honda BR-V</strong>
                  <small>Private Sale</small>
                </span>
              </div>

              <p>
                Honda BR-V i-VTEC S available for inspection in
                G-10, Islamabad.
              </p>
            </div>

            <div
              className="footer-buttons"
              data-hide-mobile-sticky
            >
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

              {pakWheelsAvailable && (
                <a
                  href={PAKWHEELS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-pakwheels-button"
                  onClick={() => handlePakWheelsClick("footer")}
                >
                  <span>View on PakWheels</span>
                  <ArrowIcon />
                </a>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              This is a private vehicle listing. Buyers should
              independently inspect the car and verify its documents,
              registration, ownership and mechanical condition before
              payment.
            </p>

            <span>Asking price: {CAR_PRICE}</span>
          </div>
        </div>
      </footer>

      <div
        className={`mobile-sticky-buttons ${
          showMobileSticky ? "is-visible" : "is-hidden"
        }`}
      >
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

          <div
            className="lightbox-slider-container"
            onClick={(event) => event.stopPropagation()}
          >
            <Swiper
              key={`lightbox-${activeImageIndex}`}
              className="lightbox-swiper"
              modules={[Navigation, Pagination, Keyboard, A11y]}
              initialSlide={activeImageIndex}
              navigation
              pagination={{
                clickable: true,
              }}
              keyboard={{
                enabled: true,
              }}
              grabCursor
              watchOverflow
              observer
              observeParents
              speed={400}
              spaceBetween={20}
              slidesPerView={1}
            >
              {carImages.map((image, index) => (
                <SwiperSlide key={image.src}>
                  <div className="lightbox-slide">
                    <div className="lightbox-image">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="lightbox-full-image"
                        loading={
                          index === activeImageIndex ? "eager" : "lazy"
                        }
                        decoding="async"
                        fetchPriority={
                          index === activeImageIndex ? "high" : "auto"
                        }
                      />
                    </div>

                    <div className="lightbox-caption">
                      <div>
                        <small>{image.category}</small>
                        <strong>{image.alt}</strong>
                      </div>

                      <span>
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(carImages.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}