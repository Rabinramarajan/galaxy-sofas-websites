import Script from "next/script";
import { site } from "@/constants/site";

/**
 * Google Analytics 4.
 *
 * Nothing is loaded until a measurement ID exists, so the site ships zero
 * third-party JavaScript by default. To switch it on, set NEXT_PUBLIC_GA_ID
 * (e.g. "G-XXXXXXXXXX") in the hosting environment, or paste the ID into
 * `gaMeasurementId` in src/constants/site.ts. Loading is deferred with
 * `afterInteractive` so it never competes with LCP.
 */
export function Analytics() {
  const id = site.gaMeasurementId;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
