"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./Header.css";

function Header({ navbar }) {
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

  const navItems = navbar?.primaryNavItems || [];
  const submenuItems = navbar?.theThinkingSubmenuItems || [];
  const logo = scrolled ? navbar?.logoScrolled : navbar?.logoDefault;
  const mobileLogo = navbar?.logoMobile || navbar?.logoScrolled;
  const externalProps = (isExternal) => (isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {});

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="srcn-container">
          <div className="header__inner">
            <div className="header__col__lift">
              <div className="header__logo">
                <Link href="/">
                  {logo?.url && <img src={logo.url} alt={logo.alt} />}
                </Link>
              </div>
            </div>
            <div className="header__col__conter">
              <div className={`header__menu ${isMenuOpen ? "active" : ""}`}>
                <div className="header__logo__mobile">
                  <Link href="/" onClick={closeMenu}>
                    {mobileLogo?.url && <img src={mobileLogo.url} alt={mobileLogo.alt} />}
                  </Link>
                </div>
                <ul className="header__list">
                  {navItems.map((item, index) => {
                    const menuKey = `menu-${index}`;

                    if (item.hasSubmenu && submenuItems.length > 0) {
                      return (
                        <li
                          key={menuKey}
                          className={`header__item has-submenu ${openSubmenu === menuKey ? "submenu-open" : ""}`}
                        >
                          <Link href={item.href} className="header__link" onClick={(e) => handleSubmenuClick(e, menuKey)}>{item.label}</Link>
                          <ul className="header__submenu">
                            {submenuItems.map((sub, subIndex) => (
                              <li className="header__submenu-item" key={subIndex}>
                                <Link href={sub.href} className="header__submenu-link" onClick={closeMenu} {...externalProps(sub.isExternal)}>{sub.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    }

                    return (
                      <li className="header__item" key={menuKey}>
                        <Link href={item.href} className="header__link" onClick={closeMenu} {...externalProps(item.isExternal)}>{item.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="header__col__right">
              <div className="header__btn-group">
                {navbar?.ctaLabel && (
                  <Link href={navbar.ctaHref} className="btn btn--primary work-buttons">
                    <span>{navbar.ctaLabel}</span>
                    <span className="arr"><i className="fa fa-long-arrow-right"></i></span>
                  </Link>
                )}
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
