import React, { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT_ID } from '../utils/analytics';

interface AdSenseBannerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  label?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotId = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Advertisement',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef<boolean>(false);

  useEffect(() => {
    // Only push once per mounted ins element
    if (pushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch (err) {
      // Ignore adsbygoogle errors (such as multiple pushes or blockers)
      console.debug('[AdSense] Banner init caught:', err);
    }
  }, []);

  return (
    <div
      className={`my-4 flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-amber-50/50 p-2 sm:p-3 border border-amber-200/60 transition-all ${className}`}
    >
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
        {label}
      </div>
      <div className="w-full flex items-center justify-center min-h-[90px] overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
};
