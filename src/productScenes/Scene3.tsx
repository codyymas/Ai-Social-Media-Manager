import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {SafeZone} from '../SafeZone';

const Cursor: React.FC<{x:number,y:number}> = ({x,y}) => (
  <div style={{position:'absolute', left:x, top:y, width:12, height:12, borderRadius:6, background:'rgba(255,255,255,0.95)', boxShadow:'0 6px 12px rgba(0,0,0,0.12)'}} />
);

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = spring({frame, fps:30, config:{damping:200}});

  // cursor path simulation (simple keyframes for this mock)
  const cursorX = interpolate(frame, [0, 30, 90, 140], [120, 120, 120, 120], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const cursorY = interpolate(frame, [0, 30, 90, 140], [600, 700, 820, 920], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});

  const typedCount = Math.min(28, Math.floor(interpolate(frame, [40, 100], [0, 28], {extrapolateLeft:'clamp', extrapolateRight:'clamp'})));
  const sampleText = 'Happy anniversary — your smile makes every day brighter.';
  const typed = sampleText.slice(0, typedCount);

  return (
    <div style={{position:'absolute', width:1080, height:1920}}>
      <SafeZone>
        <div style={{width:960, margin:'0 auto', display:'flex', flexDirection:'column', gap:20}}>
          <div style={{height:120, borderRadius:12, background:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', padding:'16px 20px', fontSize:36, color:'#fff'}}>
            <div style={{flex:1}}>{typed}</div>
          </div>

          <div style={{height:64, borderRadius:12, background:'#22c55e', display:'flex', alignItems:'center', justifyContent:'center', fontSize:40, fontWeight:700}}>
            Create
          </div>

          <div style={{height:320, borderRadius:12, background:'rgba(255,255,255,0.03)', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{color:'#fff', fontSize:36}}>Result cards appear here</div>
          </div>

          {/* cursor */}
          <Cursor x={cursorX} y={cursorY} />
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene3;
