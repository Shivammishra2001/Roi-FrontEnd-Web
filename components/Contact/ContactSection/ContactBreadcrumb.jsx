'use client';

import Link from 'next/link';
import '../Contact.css';

export default function ContactBreadcrumb() {
  return (
    <nav className="contact-breadcrumb" aria-label="Breadcrumb">
      <Link href="/" className="breadcrumb-link">Home</Link>
      <span className="breadcrumb-sep">&gt;</span>
      <span className="breadcrumb-current">Get in touch</span>
    </nav>
  );
}
