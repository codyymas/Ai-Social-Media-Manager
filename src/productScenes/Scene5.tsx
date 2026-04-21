import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';

const FeatureLine: React.FC<{icon:string; text:string; delay:number}> = ({icon, text, delay}) => {
  const frame = useCurrentFrame();
  const entrance = spring({frame: Math.max(0, frame - delay), fps:30, config:{damping:200}});
  const translate = (1 - entrance) * 200;
  return (
    <div style={{display:'flex', alignItems:'center', gap:12, transform:`translateX(${translate}px)`, opacity:entrance}}>
      <svg width={40} height={40} viewBox="0 0 24 24"><circle cx={12} cy={12} r={10} fill="#22c55e" /></svg>
      <div style={{color:'#fff', fontSize:36}}>{text}</div>
    </div>
  );
};

export const Scene5: React.FC = () => {
  return (
    <div style={{position:'absolute', width:1080, height:1920}}>
      <SafeZone>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:20}}>
          <div style={{width:420, height:420, borderRadius:12, background:'#111', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{color:'#fff', fontSize:36}}>Product Image</div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            <FeatureLine icon="check" text="Personalized keepsakes in minutes" delay={0} />
            <FeatureLine icon="bolt" text="Upload photos & memories" delay={10} />
            <FeatureLine icon="star" text="Share instantly or print" delay={20} />
          </div>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene5;
