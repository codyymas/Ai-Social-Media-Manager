import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps: 30, config: {damping: 200}});

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{opacity: entrance}}>
            <h2 style={{color: '#fff', fontFamily: 'Inter', fontSize: 64, fontWeight: 800}}>Make it personal</h2>
            <p style={{color: '#fff', fontFamily: 'Inter', fontSize: 36}}>Add a message, pick a template, and we do the rest.</p>
          </div>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene5;
