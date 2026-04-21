import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps: 30, config: {damping: 200}});

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <div style={{width: 880, borderRadius: 20, background: 'rgba(255,255,255,0.04)', padding: 24, transform: `translateY(${(1 - entrance) * 40}px)`, opacity: entrance}}>
            <div style={{color: '#fff', fontFamily: 'Inter', fontWeight: 600, fontSize: 44}}>Message Formula</div>
            <ol style={{color: '#fff', fontFamily: 'Inter', fontWeight: 400, fontSize: 36, marginTop: 12}}>
              <li>Address them by name</li>
              <li>One specific memory or compliment</li>
              <li>Short sign-off + CTA</li>
            </ol>
          </div>

          <div style={{color: '#fff', fontFamily: 'Inter', fontWeight: 400, fontSize: 36, maxWidth: 700, textAlign: 'center', opacity: entrance}}>
            Example: "Alex — Remember our coffee-sunrise walk? You make mornings brighter. Happy Valentine's! — Sam"
          </div>
        </div>
      </SafeZone>
    </div>
  );
};
