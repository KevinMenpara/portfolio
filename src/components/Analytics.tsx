"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    goatcounter?: { count: (opts: { path: string }) => void };
  }
}

/**
 * GoatCounter counts the first page load itself; this also counts pages
 * opened through in-app navigation. Button clicks are tracked through
 * data-goatcounter-click attributes.
 */
export function Analytics({ code }: { code: string }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.goatcounter?.count({ path: pathname });
  }, [pathname]);

  return (
    <script data-goatcounter={`https://${code}.goatcounter.com/count`} async src="https://gc.zgo.at/count.js" />
  );
}
