"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./Header.css";

function Header({
  logoDefault,
  logoScrolled,
  logoMobile,
  ctaLabel,
  ctaHref,
  ctaArrowGlyph,
  primaryNavItems,
  theThinkingSubmenuItems,
}) {
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
                    src={scrolled ? logoScrolled.url : logoDefault.url}
                    alt={scrolled ? logoScrolled.alt : logoDefault.alt}
                  />
                </Link>
              </div>
            </div>
            <div className="header__col__conter">
              <div className={`header__menu ${isMenuOpen ? "active" : ""}`}>
                <div className="header__logo__mobile">
                  <Link href="/" onClick={closeMenu}>
                    <img src={logoMobile.url} alt={logoMobile.alt} />
                  </Link>
                </div>
                <ul className="header__list">
                  {primaryNavItems.map((item, i) =>
                    item.hasSubmenu ? (
                      <li
                        key={i}
                        className={`header__item has-submenu ${openSubmenu === 'services' ? 'submenu-open' : ''}`}
                      >
                        <Link href={item.href} className="header__link" onClick={(e) => handleSubmenuClick(e, 'services')}>{item.label}</Link>
                        <ul className="header__submenu">
                          {theThinkingSubmenuItems.map((sub, j) => (
                            <li className="header__submenu-item" key={j}>
                              <Link href={sub.href} className="header__submenu-link" onClick={closeMenu}>{sub.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li key={i} className="header__item">
                        <Link href={item.href} className="header__link" onClick={closeMenu}>{item.label}</Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="header__col__right">
              <div className="header__btn-group">
                <Link href={ctaHref} className="btn btn--primary">
                  <span>{ctaLabel}</span>
                  <span className="arr">{ctaArrowGlyph}</span>
                </Link>
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
