import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "../node_modules/comicBubbles/dist/cbbl.min.css"
import ClientLayout from "@/components/client-layout"

const base = '';

// Without these, link previews fall back to the favicon and render it blown up.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.fishlooker.com"),
  title: "Ling Lu",
  description: "Illustration, risograph prints and comics by Ling Lu / fishlooker.",
  openGraph: {
    title: "Ling Lu",
    description: "Illustration, risograph prints and comics by Ling Lu / fishlooker.",
    url: "https://www.fishlooker.com",
    siteName: "fishlooker",
    type: "website",
    images: [
      {
        url: "/images/product_photos/banner.png",
        width: 756,
        height: 754,
        alt: "A spread of risograph prints by Ling Lu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ling Lu",
    description: "Illustration, risograph prints and comics by Ling Lu / fishlooker.",
    images: ["/images/product_photos/banner.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Title and icon come from the metadata export above; declaring <title>
          here as well would produce two competing tags. */}
      <head>
        <link rel="icon" href={`${base}/favicon.ico`} />
      </head>
      <body className="bg-white text-gray-900 font-mono text-lg overflow-hidden">
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'pixelOp';
              src: url('${base}/fonts/PixelOperator.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
          `
        }} />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}