import type React from "react"
import "./globals.css"
import "../node_modules/comicBubbles/dist/cbbl.min.css"
import ClientLayout from "@/components/client-layout"

const base = '';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Ling Lu</title>
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