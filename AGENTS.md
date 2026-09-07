# DESHNA AI Learning Hub - Agent Memory & Global Configuration

## Third-Party Analytics & Monetization Codes

The following services and account identifiers are permanently registered and implemented across the web application:

### 1. Google Tag Manager (GTM)
- **Container ID**: `GTM-WHVBGXZ9`
- **Head Script Location**: Placed in `<head>` of `/index.html` as high as possible.
  ```html
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WHVBGXZ9');</script>
  <!-- End Google Tag Manager -->
  ```
- **Body Fallback Location**: Placed immediately following the opening `<body>` tag in `/index.html`.
  ```html
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WHVBGXZ9"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  ```

### 2. Google Analytics 4 (GA4)
- **Measurement ID**: `G-TVRD39E593`
- **Head Script Location**: Placed in `<head>` of `/index.html`.
  ```html
  <!-- Google tag (gtag.js) - GA4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-TVRD39E593"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-TVRD39E593');
  </script>
  ```
- **SPA Tracking Helper**: `src/utils/analytics.ts` provides `trackPageView()` and `trackEvent()` / `trackLearningActivity()`.

### 3. Google AdSense
- **Publisher Client ID**: `ca-pub-2187579352834335`
- **Head Script Location**: Placed in `<head>` of `/index.html`.
  ```html
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2187579352834335" crossorigin="anonymous"></script>
  ```
- **AdSense Component**: `src/components/AdSenseBanner.tsx` renders responsive Google Ad units (`client="ca-pub-2187579352834335"`) cleanly in educational views without disrupting student focus.
