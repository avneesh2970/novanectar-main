export default function Head() {
  return (
    <>
      {/* Font preloading */}
      <link
        rel="preload"
        href="/fonts/work-sans-latin-700-normal.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/dm-sans-latin-500-normal.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Preload critical CSS */}
      <link rel="preload" href="/globals.css" as="style" />

      {/* Preload critical images */}
      <link rel="preload" href="/assets/landing/icons/node.png" as="image" />
      <link rel="preload" href="/assets/landing/icons/js.png" as="image" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </>
  )
}
