import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {SafeZone} from '../SafeZone';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps: 30, config: {damping: 200}});

  const count = Math.round(interpolate(frame, [0, 60], [0, 127], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

  const particles = Array.from({length: 12}).map((_, i) => {
    const offset = (i * 13) % 97;
    const y = -((frame * (0.3 + (i % 4) * 0.05) + offset) % 400);
    const left = 8 + (i * 6);
    const size = 12 + (i % 4) * 6;
    return {left, y, size, alpha: 0.12 + ((i % 3) * 0.06)};
  });

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{marginTop: 40, transform: `scale(${0.95 + entrance * 0.05})`}}>
              <button style={{background: '#22c55e', color: '#fff', fontFamily: 'Inter', fontWeight: 600, fontSize: 56, borderRadius: 14, padding: '18px 36px', border: 'none'}}>Shop HeartfeltCraftsCo</button>
          </div>

          <div style={{marginTop: 36, color: '#fff', fontFamily: 'Inter', fontWeight: 400, fontSize: 36}}>Reactions: <span style={{fontWeight: 800}}>{count}</span></div>
            <div style={{marginTop: 18, color: '#fff', fontFamily: 'Inter', fontWeight: 400, fontSize: 28}}>heartfeltcraftsco.com</div>

          {/* Particles */}
          <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
            {particles.map((p, i) => (
              <div key={i} style={{position: 'absolute', left: `${p.left}%`, transform: `translateY(${p.y}px)`, width: p.size, height: p.size, borderRadius: 50, background: `rgba(255,255,255,${p.alpha})`}} />
            ))}
          </div>
        </div>
      </SafeZone>
    </div>
  );
};
