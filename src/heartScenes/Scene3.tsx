import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {SafeZone} from '../SafeZone';

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps: 30, config: {damping: 200}});
  const translateY = (1 - entrance) * 40;

  const count = Math.floor(interpolate(frame, [0, 90], [0, 5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{transform: `translateY(${translateY}px)`, opacity: entrance}}>
            <h2 style={{color: '#fff', fontFamily: 'Inter', fontWeight: 700, fontSize: 56}}>The formula</h2>
            <div style={{marginTop: 12, color: '#fff', fontFamily: 'Inter', fontSize: 36}}>Photo + Message + Surprise = Perfect Gift</div>
          </div>

          <div style={{marginTop: 28, color: '#fff', fontFamily: 'Inter', fontSize: 44}}>
            {Array.from({length: count}).map((_, i) => (
              <span key={i} style={{marginRight: 8}}>💌</span>
            ))}
          </div>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene3;
