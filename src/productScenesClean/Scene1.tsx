import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {SafeZone} from '../SafeZone';

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps: 30, config: {damping: 200}});
  const scale = 0.96 + entrance * 0.08;
  const headlineY = interpolate(frame, [0, 15], [40, 0]);

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920, overflow: 'hidden'}}>
      {/* full-bleed product image background */}
      <img src="/product-1-1440x2560.png" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) scale(1.02)', width: 'auto', height: '120%', objectFit: 'cover', filter: 'saturate(1.05) contrast(1.03)'}} />

      {/* dark overlay for legibility */}
      <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.48))'}} />

      <SafeZone>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <h1 style={{color: '#fff', fontFamily: 'Inter', fontWeight: 800, fontSize: 72, marginBottom: 12, transform: `translateY(${headlineY}px) scale(${scale})`, textAlign: 'center', textShadow: '0 6px 18px rgba(0,0,0,0.4)'}}>Make their day — without the stress</h1>
          <p style={{color: '#fff', fontFamily: 'Inter', fontWeight: 400, fontSize: 36, maxWidth: 820, textAlign: 'center', opacity: entrance}}>Create a heartfelt gift in minutes — photos, messages, and finishes that feel personal.</p>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene1;
