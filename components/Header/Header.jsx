"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./Header.css";

function Header() {
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
                    src={scrolled ? "/images/logo-img2.svg" : "/images/logo-img.svg"}
                    alt="ROI MANTRA"
                  />
                </Link>
              </div>
            </div>
            <div className="header__col__conter">
              <div className={`header__menu ${isMenuOpen ? "active" : ""}`}>
                <div className="header__logo__mobile">
                  <Link href="/" onClick={closeMenu}>
                    <img src="/images/logo-img2.svg" alt="ROI MANTRA" />
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

                  <li className="header__item">
                    <Link href="/case-studies" className="header__link" onClick={closeMenu}>Case Studies</Link>
                  </li>
                  <li className="header__item">
                    <Link href="/blog" className="header__link" onClick={closeMenu}>Blog</Link>
                  </li>
                  <li className="header__item">
                    <Link href="/contact" className="header__link" onClick={closeMenu}>Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="header__col__right">
              <div className="header__btn-group">
                <Link href="/contact" className="btn btn--primary work-buttons">
                  <span>Start a conversation </span>
                  <span className="arr"><i className="fa fa-long-arrow-right"></i></span>
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