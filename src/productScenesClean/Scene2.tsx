import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';
import PostcardStack from '../components/PostcardStack';

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps: 30, config: {damping: 200}});

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column'}}>
          <div style={{marginBottom: 28, opacity: entrance}}>
            <div style={{fontFamily: 'Inter', fontWeight: 800, fontSize: 56, color: '#fff', textAlign: 'center'}}>Send a living postcard</div>
            <div style={{marginTop: 8, color: '#fff', fontFamily: 'Inter', fontSize: 32, textAlign: 'center'}}>Videos, photos, and your message — all in one beautiful digital card.</div>
          </div>

          <div style={{opacity: entrance}}>
            <PostcardStack width={720} />
          </div>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene2;
