import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';

const PlaceholderImage: React.FC<{index:number}> = ({index}) => (
  <div style={{width:900, height:1200, borderRadius:16, boxShadow:'0 20px 40px rgba(0,0,0,0.4)', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', background:'#111'}}>
    <svg width={820} height={1080} viewBox="0 0 820 1080" xmlns="http://www.w3.org/2000/svg">
      <rect width="820" height="1080" rx="12" fill="#222" />
      <text x="50%" y="50%" fill="#fff" fontSize="48" fontFamily="Inter" fontWeight="600" textAnchor="middle">Product Image {index}</text>
    </svg>
  </div>
);

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const t1 = Math.max(0, Math.min(1, (frame) / 18));
  const t2 = Math.max(0, Math.min(1, (frame - 45) / 18));
  const t3 = Math.max(0, Math.min(1, (frame - 90) / 18));

  return (
    <div style={{position:'absolute', width:1080, height:1920}}>
      <SafeZone>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%'}}>
          <div style={{opacity: t1, transform:`scale(${0.9 + 0.1 * t1})`, transition:'transform 200ms'}}>
            <PlaceholderImage index={1} />
          </div>
          {/* crossfades to next images are handled by sequencing in the composition */}
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene4;
