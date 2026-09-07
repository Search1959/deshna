/**
 * Google Tag Manager, GA4 & AdSense Integration Utility
 * Configured IDs:
 * - GTM Container: GTM-WHVBGXZ9
 * - GA4 Measurement ID: G-TVRD39E593
 * - AdSense Publisher: ca-pub-2187579352834335
 */

export const GA_MEASUREMENT_ID = 'G-TVRD39E593';
export const GTM_ID = 'GTM-WHVBGXZ9';
export const ADSENSE_CLIENT_ID = 'ca-pub-2187579352834335';

/**
 * Send a custom event to Google Analytics (GA4) and Google Tag Manager (dataLayer)
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, unknown> = {}
) {
  try {
    // 1. Google Analytics 4 (gtag)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }

    // 2. Google Tag Manager (dataLayer)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...eventParams,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.debug('[Analytics] Event tracking error:', err);
  }
}

/**
 * Track page or view transition (useful for SPA navigation)
 */
export function trackPageView(pageTitle: string, pagePath: string = window.location.pathname) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath,
      });
    }

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'virtual_page_view',
        page_title: pageTitle,
        page_path: pagePath,
      });
    }
  } catch (err) {
    console.debug('[Analytics] PageView tracking error:', err);
  }
}

/**
 * Track specific student learning actions across the app
 */
export function trackLearningActivity(
  activityType: 'mock_test' | 'chapter_quiz' | 'reading_session' | 'ai_tutor_doubt' | 'spaced_revision',
  details: Record<string, unknown> = {}
) {
  trackEvent(`student_${activityType}`, {
    category: 'education',
    ...details,
  });
}
