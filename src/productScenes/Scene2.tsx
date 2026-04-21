import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';
import Logo from '../components/Logo';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps: 30, config: {damping: 200}});

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <div style={{transform: `scale(${3 - 2 * entrance})`, opacity: entrance}}>
            <Logo size={120} />
          </div>
          <div style={{marginTop: 18, color: '#fff', fontFamily: 'Inter', fontWeight: 400, fontSize: 36, textAlign: 'center'}}>
            Handmade digital gifts from your photos & memories.
          </div>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene2;
