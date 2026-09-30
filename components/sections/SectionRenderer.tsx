import type { ComponentType } from 'react';
import type { Section } from '../../types/strapi';

/**
 * Maps a Strapi dynamic-zone `__component` to the React component that
 * renders it. Each page passes its own registry (components/sections/
 * registry/*) instead of one global map: Next.js bundles the CSS a component
 * imports into every route that imports the component, so a shared map
 * would leak e.g. Contact.css onto /blog and change its layout.
 *
 * The registry necessarily erases each component's specific prop type
 * (they're heterogeneous, keyed by a runtime string) — the one deliberate `any`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SectionRegistry = Record<string, ComponentType<any>>;

export default function SectionRenderer({ sections, components }: { sections: Section[]; components: SectionRegistry }) {
  return (
    <>
      {sections.map((section, index) => {
        const Component = components[section.__component];

        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            throw new Error(
              `SectionRenderer: no component mapped for __component "${section.__component}" on this page. ` +
                "Add it to the page's registry in components/sections/registry/."
            );
          }
          return null;
        }

        return <Component key={`${section.__component}-${index}`} {...section} />;
      })}
    </>
  );
}
