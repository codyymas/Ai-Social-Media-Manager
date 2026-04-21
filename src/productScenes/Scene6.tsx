import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {SafeZone} from '../SafeZone';

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const count = Math.round(interpolate(frame, [0, 60], [0, 1200], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

  return (
    <div style={{position:'absolute', width:1080, height:1920}}>
      <SafeZone>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%'}}>
          <div style={{color:'#fff', fontFamily:'Inter', fontWeight:800, fontSize:72}}>{count.toLocaleString()} happy customers</div>
          <div style={{marginTop:20}}>
            <button style={{background:'#22c55e', color:'#fff', fontFamily:'Inter', fontWeight:600, fontSize:56, borderRadius:14, padding:'18px 36px', border:'none'}}>Shop HeartfeltCraftsCo</button>
          </div>
          <div style={{marginTop:12, color:'#fff', fontSize:28}}>https://www.heartfeltcraftsco.com/?utm_source=video&utm_campaign=launch</div>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene6;
