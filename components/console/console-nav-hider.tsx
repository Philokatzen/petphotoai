"use client";

import { useEffect } from "react";

export function ConsoleNavHider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hide the SiteHeader by adding a CSS rule
    const style = document.createElement("style");
    style.innerHTML = `
      header[data-site-header] {
        display: none !important;
      }
      footer[data-site-footer] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Clean up when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
}
