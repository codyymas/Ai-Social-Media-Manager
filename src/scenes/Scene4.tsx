import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {SafeZone} from '../SafeZone';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const drawProgress = interpolate(frame, [0, 40], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <div style={{width: 520, height: 900, borderRadius: 36, background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', padding: 20}}>
            <div style={{color: '#fff', fontFamily: 'Inter', fontWeight: 600, fontSize: 44}}>Mobile-first design</div>
            <div style={{marginTop: 18}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <svg width={40} height={40} viewBox="0 0 24 24" fill="none" style={{overflow: 'visible'}}>
                  <path d="M4 12l4 4L20 4" stroke="#22c55e" strokeWidth={2} strokeDasharray={100} strokeDashoffset={100 * drawProgress} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{color: '#fff', fontSize: 36}}>Fonts: 56 / 36 / 28</div>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 12}}>
                <svg width={40} height={40} viewBox="0 0 24 24" fill="none" style={{overflow: 'visible'}}>
                  <path d="M4 12l4 4L20 4" stroke="#fff" strokeWidth={2} strokeDasharray={100} strokeDashoffset={100 * drawProgress} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{color: '#fff', fontSize: 36}}>Safe zone enforced</div>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 12}}>
                <svg width={40} height={40} viewBox="0 0 24 24" fill="none" style={{overflow: 'visible'}}>
                  <path d="M4 12l4 4L20 4" stroke="#fff" strokeWidth={2} strokeDasharray={100} strokeDashoffset={100 * drawProgress} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{color: '#fff', fontSize: 36}}>Delivery: DM, Story, Post</div>
              </div>
            </div>
          </div>
        </div>
      </SafeZone>
    </div>
  );
};
