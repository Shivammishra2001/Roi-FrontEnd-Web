'use client';
import '../Contact.css';

const TRUSTED_BRANDS = [
  { name: 'EaseMyTrip', logo: '/images/easemytrip-logo.png' },
  { name: 'Nikon', logo: '/images/nikon-logo.png' },
  { name: 'PVR', logo: '/images/pvr-logo.png' },
  { name: 'Whirlpool', logo: '/images/whirlpool-logo.png' },
  { name: 'JK Cement', logo: '/images/jkcement-logo.png' },
  { name: 'Emaar', logo: '/images/emaar-logo.png' },
];

export default function TrustedBrandsSection() {
  return (
    <div className="trusted-brands-block">
      <h3 className="trusted-brands-title">Trusted by Global Brands</h3>
      <div className="brands-slider-container">
        <div className="brands-slider-track">
          {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="brand-logo-pill"
              title={brand.name}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="brand-logo-img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
