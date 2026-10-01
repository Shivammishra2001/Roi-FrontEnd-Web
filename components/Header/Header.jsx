"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CmsLink from "../common/CmsLink";
import { text, list, href, mediaUrl, mediaAlt } from "../../lib/cms";
import "./Header.css";

const DEFAULT_NAV = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function Header({ navbar }) {
  const nav = navbar || {};
  const logoDefault = mediaUrl(nav.logoDefault, "/images/logo-img.svg");
  const logoScrolled = mediaUrl(nav.logoScrolled, "/images/logo-img2.svg");
  const logoMobile = mediaUrl(nav.logoMobile, "/images/logo-img2.svg");
  const logoAlt = mediaAlt(nav.logoDefault, "ROI MANTRA");
  const navItems = list(nav.primaryNavItems, DEFAULT_NAV).filter((item) => item && text(item.label));
  const submenuItems = list(nav.theThinkingSubmenuItems).filter((item) => item && text(item.label));
  const ctaLabel = text(nav.ctaLabel, "Start a conversation ");
  const ctaHref = href(nav.ctaHref, "/contact");

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSubmenu("");
  };

  const handleSubmenuClick = (e, menu) => {
    if (window.innerWidth <= 11000) {
      e.preventDefault();
      setOpenSubmenu(openSubmenu === menu ? "" : menu);
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="srcn-container">
          <div className="header__inner">
            <div className="header__col__lift">
              <div className="header__logo">
                <Link href="/">
                  <img
                    src={scrolled ? logoScrolled : logoDefault}
                    alt={logoAlt}
                  />
                </Link>
              </div>
            </div>
            <div className="header__col__conter">
              <div className={`header__menu ${isMenuOpen ? "active" : ""}`}>
                <div className="header__logo__mobile">
                  <Link href="/" onClick={closeMenu}>
                    <img src={logoMobile} alt={mediaAlt(nav.logoMobile, logoAlt)} />
                  </Link>
                </div>
                <ul className="header__list">
                  {/* <li className="header__item">
                    <Link href="/case-studies" className="header__link" onClick={closeMenu}>The Work</Link>
                  </li> */}
                  {/* <li className={`header__item has-submenu ${openSubmenu === 'services' ? 'submenu-open' : ''}`}>
                    <Link href="/the-thinking" className="header__link" onClick={(e) => handleSubmenuClick(e, 'services')}>The Thinking</Link>
                    <ul className="header__submenu">
                      <li className="header__submenu-item">
                        <Link href="/hr-management" className="header__submenu-link" onClick={closeMenu}>HR Management</Link>
                      </li>
                      <li className="header__submenu-item">
                        <Link href="/payroll-management" className="header__submenu-link" onClick={closeMenu}>Payroll Management</Link>
                      </li>
                      <li className="header__submenu-item">
                        <Link href="/attendance-management" className="header__submenu-link" onClick={closeMenu}>Attendance Management</Link>
                      </li>
                      <li className="header__submenu-item">
                        <Link href="/leave-management" className="header__submenu-link" onClick={closeMenu}>Leave Management</Link>
                      </li>
                      <li className="header__submenu-item">
                        <Link href="/employee-management" className="header__submenu-link" onClick={closeMenu}>Employee Management</Link>
                      </li>
                    </ul>
                  </li> */}

                  {navItems.map((item, i) => {
                    const hasSubmenu = item.hasSubmenu && submenuItems.length > 0;
                    const key = `nav-${i}`;
                    return (
                      <li
                        key={key}
                        className={`header__item${hasSubmenu ? " has-submenu" : ""}${hasSubmenu && openSubmenu === key ? " submenu-open" : ""}`}
                      >
                        <CmsLink
                          href={href(item.href, DEFAULT_NAV[i]?.href)}
                          isExternal={item.isExternal}
                          className="header__link"
                          onClick={hasSubmenu ? (e) => handleSubmenuClick(e, key) : closeMenu}
                        >
                          {item.label}
                        </CmsLink>
                        {hasSubmenu && (
                          <ul className="header__submenu">
                            {submenuItems.map((sub, j) => (
                              <li className="header__submenu-item" key={`${key}-${j}`}>
                                <CmsLink
                                  href={href(sub.href)}
                                  isExternal={sub.isExternal}
                                  aria-label={sub.ariaLabel || undefined}
                                  className="header__submenu-link"
                                  onClick={closeMenu}
                                >
                                  {sub.label}
                                </CmsLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="header__col__right">
              <div className="header__btn-group">
                <CmsLink href={ctaHref} className="btn btn--primary work-buttons">
                  <span>{ctaLabel}</span>
                  <span className="arr">
                    {text(nav.ctaArrowGlyph) || <i className="fa fa-long-arrow-right"></i>}
                  </span>
                </CmsLink>
              </div>
              <div className="header__toggle_btn">
                <button className="toggle-btn" id="toggle-btn" onClick={toggleMenu} aria-expanded={isMenuOpen}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}
    </>
  );
}

export default Header;