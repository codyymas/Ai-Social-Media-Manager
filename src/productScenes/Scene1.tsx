import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps: 30, config: {damping: 200}});

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <div style={{transform: `scale(${2 - entrance})`, opacity: entrance, willChange: 'transform'}}>
            <div style={{color: '#fff', fontFamily: 'Inter', fontWeight: 800, fontSize: 72, textAlign: 'center'}}>Make their day — without the stress?</div>
          </div>
          <div style={{marginTop: 18, color: '#fff', fontFamily: 'Inter', fontWeight: 400, fontSize: 36, textAlign: 'center', maxWidth: 820}}>
            Create a heartfelt gift in minutes.
          </div>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene1;
