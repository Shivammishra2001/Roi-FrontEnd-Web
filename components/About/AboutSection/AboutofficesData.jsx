'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const DEFAULT_OFFICES = [
  {
    id: 'about-office-dallas',
    city: 'Dallas, TX',
    tz: 'America/Chicago',
    image: '/images/about/about-office-dallas.webp',
    placeholder: 'DALLAS, TX · OFFICE EXTERIOR OR SKYLINE · 16:10',
  },
  {
    id: 'about-office-delhi',
    city: 'Delhi NCR',
    tz: 'Asia/Kolkata',
    image: '/images/about/about-office-delhi.webp',
    placeholder: 'DELHI NCR · OFFICE EXTERIOR OR SKYLINE · 16:10',
  },
];

function useClock(tz) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = () => {
      try {
        return new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: tz,
        }).format(new Date());
      } catch {
        return '--:-- --';
      }
    };

    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, [tz]);

  return time;
}

function OfficeItem({ id, city, tz, image, placeholder }) {
  const time = useClock(tz);
  const placeholderText =
    placeholder || `${city.toUpperCase()} · OFFICE EXTERIOR OR SKYLINE · 16:10`;

  return (
    <div className="office-item-section-area">
      <div className="office-pic-area">
        {image ? (
          <div className="office-pic-frame">
            <Image
              src={image}
              alt={`${city} Office`}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              className="office-image"
            />
          </div>
        ) : (
          <image-slot id={id} shape="rect" placeholder={placeholderText}>
            <div className="office-placeholder-frame">
              <div className="office-placeholder-empty">
                <svg
                  className="office-placeholder-icon"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>{placeholderText}</span>
              </div>
            </div>
          </image-slot>
        )}
      </div>
      <div className="office-city-area">{city}</div>
      <div className="office-time-area" suppressHydrationWarning>
        {time || '--:-- --'}
      </div>
    </div>
  );
}

export default function AboutofficesData(props) {
  const offices = props?.offices?.length ? props.offices : DEFAULT_OFFICES;

  return (
    <section className="about-offices-section">
      <div className="srcn-container">
        <div className="sec-head-rule">
          <div className="stats-eyebrow">
            <span className="arr">
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </span>
            Offices
          </div>
        </div>

        <div className="about-offices-box">
          {offices.map((office) => (
            <OfficeItem
              key={office.id || office.city}
              id={office.id || `about-office-${office.city}`}
              city={office.city}
              tz={office.tz || office.timeZone}
              image={office.image || (office.city.includes('Dallas') ? '/images/about/about-office-dallas.jpg' : '/images/about/about-office-delhi.jpg')}
              placeholder={office.placeholder}
            />
          ))}
        </div>
      </div>
    </section>
  );
}