import React from 'react';
import {useCurrentFrame, spring} from 'remotion';
import {SafeZone} from '../SafeZone';

const Icon: React.FC<{type: 'check' | 'bolt' | 'star'}> = ({type}) => {
  if (type === 'check') return <svg width={44} height={44} viewBox="0 0 24 24" fill="none"><circle cx={12} cy={12} r={12} fill="#22c55e" /><path d="M6 12.5l3 3 9-9" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (type === 'bolt') return <svg width={44} height={44} viewBox="0 0 24 24" fill="none"><circle cx={12} cy={12} r={12} fill="#f59e0b" /><path d="M13 3L4 14h7l-1 7 9-11h-7z" fill="#fff"/></svg>;
  return <svg width={44} height={44} viewBox="0 0 24 24" fill="none"><circle cx={12} cy={12} r={12} fill="#0ea5e9" /><path d="M12 7l1.9 3.9L18 12l-3 2.1L14 18l-2-1.1L10 18l-.9-3.9L6 12l4.1-1.1L12 7z" fill="#fff"/></svg>;
};

const FeatureLine: React.FC<{icon: 'check' | 'bolt' | 'star'; text: string; delay: number}> = ({icon, text, delay}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);
  const entrance = spring({frame: f, fps: 30, config: {damping: 200}});
  const translateX = (1 - entrance) * 160;
  return (
    <div style={{display: 'flex', alignItems: 'center', transform: `translateX(${translateX}px)`, opacity: entrance, marginBottom: 18}}>
      <div style={{width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
        <Icon type={icon} />
      </div>
      <div style={{color: '#fff', fontFamily: 'Inter', fontSize: 36, fontWeight: 600}}>{text}</div>
    </div>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  // image scales down to 40% and moves to top over first 20 frames
  const imgScale = 1 - spring({frame: Math.max(0, frame - 0), fps: 30, config: {damping: 200}}) * 0.6; // from 1 to 0.4
  const imgTop = 0; // anchored to top of safe zone

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920}}>
      <SafeZone>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{transform: `scale(${imgScale})`, width: 720, height: 480, borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)'}}>
            <img src={'/product-1.png'} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>

          <div style={{marginTop: 28, width: '100%', paddingLeft: 60, paddingRight: 60}}>
            <FeatureLine icon="check" text="Custom messages" delay={10} />
            <FeatureLine icon="bolt" text="Fast delivery" delay={20} />
            <FeatureLine icon="star" text="Handmade quality" delay={30} />
          </div>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene5;
