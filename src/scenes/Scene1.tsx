import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';
import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps: 30, config: {damping: 200}});
  const envelopeY = (1 - entrance) * 80; // enters from below
  const scale = 0.85 + entrance * 0.25;

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{transform: `translateY(${envelopeY}px) scale(${scale})`, willChange: 'transform'}}>
            {/* Simple envelope SVG */}
            <svg width={220} height={160} viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="20" width="220" height="120" rx="16" fill="#fff" />
              <path d="M0 20 L110 80 L220 20" fill="#ff6b6b" />
            </svg>
          </div>

          <h1 style={{color: '#fff', fontFamily: 'Inter', fontWeight: 800, fontSize: 72, marginTop: 24, textAlign: 'center'}}>
            Heartfelt Gifts
          </h1>

          <p style={{color: '#fff', fontFamily: 'Inter', fontWeight: 400, fontSize: 36, marginTop: 12, maxWidth: 700, textAlign: 'center'}}>
            A digital experience crafted with your photos, memories, and heartfelt messages.
          </p>
        </div>
      </SafeZone>
    </div>
  );
};
