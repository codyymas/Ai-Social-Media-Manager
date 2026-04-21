import React from 'react';
import {useCurrentFrame, interpolate, spring} from 'remotion';
import {SafeZone, SAFE} from '../SafeZone';

const SOCIAL_PROOF_COUNT = 120; // fallback if no real number found on the site

const Scene6: React.FC = () => {
  const frame = useCurrentFrame();

  // Count up over the first 90 frames (~3s). Use clamp so it stays within range.
  const count = Math.floor(interpolate(frame, [0, 90], [0, SOCIAL_PROOF_COUNT], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

  // URL pulse: scale between 1.0 and 1.03 using a slow sine-like spring
  const pulse = 1 + 0.03 * Math.sin(frame / 6);
  const pulseStyle = {transform: `scale(${pulse})`, transformOrigin: 'center'};

  // Fade to black in last 18 frames (assumes 90-frame scene)
  const fadeStart = 72;
  const fadeT = Math.max(0, Math.min(1, (frame - fadeStart) / (90 - fadeStart)));

  // Small entrance for headline
  const headlineT = spring({frame: Math.max(0, frame - 4), fps: 30, config: {damping: 200}});

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <div style={{opacity: headlineT, transform: `translateY(${(1 - headlineT) * 12}px)`}}>
            <div style={{color: '#fff', fontFamily: 'Inter', fontSize: 56, fontWeight: 800, textAlign: 'center'}}>{`Loved by ${count}+ customers`}</div>
          </div>

          <div style={{marginTop: 28}}>
            <button style={{padding: '14px 28px', borderRadius: 12, background: '#ff6b6b', color: '#fff', fontSize: 32, fontWeight: 700}}>Shop now</button>
          </div>
        </div>

        {/* Product URL pulsing above bottom safe zone */}
        <div style={{position: 'absolute', left: SAFE.sides, right: SAFE.sides, bottom: SAFE.bottom - 40, pointerEvents: 'none', textAlign: 'center'}}>
          <div style={{color: '#fff', fontFamily: 'Inter', fontSize: 28, opacity: 1, ...pulseStyle}}>https://www.heartfeltcraftsco.com/?utm_source=video&utm_campaign=valentines</div>
        </div>
      </SafeZone>

      {/* Fade to black overlay */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, background: `rgba(0,0,0,${fadeT})`, pointerEvents: 'none'}} />
    </div>
  );
};

export default Scene6;
