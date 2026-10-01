'use client';

import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    const loader = document.getElementById('loader');
    const timeoutId = window.setTimeout(() => {
      if (loader) {
        loader.classList.add('gone');
        window.setTimeout(() => {
          if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
        }, 700);
      }
      document.body.classList.add('intro-done');
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
