import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const items = ['Funny', 'Romantic', 'Friendly', 'Playful'];

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, justifyItems: 'center'}}>
          {items.map((t, i) => {
            const f = frame - i * 8; // stagger per item
            const entrance = spring({frame: Math.max(0, f), fps: 30, config: {damping: 200}});
            const translateY = (1 - entrance) * 40;
            const opacity = entrance;
            return (
              <div key={t} style={{width: 420, height: 220, borderRadius: 20, background: 'rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateY(${translateY}px)`, opacity}}>
                <svg width={64} height={64}><circle cx={32} cy={32} r={28} fill="#fff" opacity={0.12} /></svg>
                <div style={{color: '#fff', fontFamily: 'Inter', fontWeight: 600, fontSize: 44, marginTop: 12}}>{t}</div>
              </div>
            );
          })}
        </div>
      </SafeZone>
    </div>
  );
};
