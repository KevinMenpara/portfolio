import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/Analytics";
import { profile, siteUrl } from "@/content/profile";
import "./globals.css";

const title = `${profile.name}, ${profile.role.toLowerCase()}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl + "/"),
  title: { default: title, template: `%s | ${profile.name}` },
  description: profile.promise,
  authors: [{ name: profile.name }],
  openGraph: {
    title,
    description: profile.promise,
    type: "website",
    siteName: profile.name,
    images: [{ url: "og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description: profile.promise, images: ["og.png"] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1015" },
  ],
};

// Runs before paint so the saved or system theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        {profile.analytics.goatcounter && <Analytics code={profile.analytics.goatcounter} />}
      </body>
    </html>
  );
}
