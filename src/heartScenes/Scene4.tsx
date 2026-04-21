import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps: 30, config: {damping: 200}});
  const translateX = (1 - entrance) * 40;

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{width: 420, height: 700, background: 'rgba(255,255,255,0.06)', borderRadius: 20, transform: `translateX(${translateX}px)`, opacity: entrance}}>
            <div style={{padding: 24, color: '#fff', fontFamily: 'Inter'}}>
              <h3 style={{fontSize: 48, fontWeight: 700}}>Mobile-friendly</h3>
              <p style={{fontSize: 32}}>Designs that look great on any screen.</p>
            </div>
          </div>

          <div style={{marginLeft: 24, color: '#fff', fontFamily: 'Inter', fontSize: 36}}>Perfect for sharing in DMs and stories.</div>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene4;
