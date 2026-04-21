import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';
import {SafeZone} from '../SafeZone';

// prefer HD captures if available
const imageSrcs = ['/product-1-hd.png', '/product-2-hd.png', '/product-3-hd.png'];

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const duration = 150; // 5s at 30fps

  const hold = 45; // each image hold
  const total = hold * 3;
  const offset = Math.floor((duration - total) / 2);

  const img1Start = offset;
  const img2Start = offset + hold;
  const img3Start = offset + hold * 2;

  const progressFor = (start: number) => Math.max(0, Math.min(1, (frame - start) / hold));

  const p1 = progressFor(img1Start);
  const p2 = progressFor(img2Start);
  const p3 = progressFor(img3Start);

  // subtle entrance spring for each image
  const s1 = 0.9 + spring({frame: Math.max(0, frame - img1Start), fps, config: {damping: 200}}) * 0.12;
  const s2 = 0.9 + spring({frame: Math.max(0, frame - img2Start), fps, config: {damping: 200}}) * 0.12;
  const s3 = 0.9 + spring({frame: Math.max(0, frame - img3Start), fps, config: {damping: 200}}) * 0.12;

  // parallax translateY per image (px)
  const y1 = interpolate(p1, [0, 1], [24, -8]);
  const y2 = interpolate(p2, [0, 1], [32, -12]);
  const y3 = interpolate(p3, [0, 1], [40, -16]);

  const headlineForFrame = () => {
    if (frame >= img3Start) return 'Make it personal';
    if (frame >= img2Start) return 'Fast & easy';
    return 'Create in minutes';
  };

  const headline = headlineForFrame();

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920, overflow: 'hidden'}}>
      <SafeZone>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <div style={{color: '#fff', fontFamily: 'Inter', fontWeight: 700, fontSize: 56, marginBottom: 24, textAlign: 'center'}}>{headline}</div>

          <div style={{width: 980, height: 1280, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
            {/* Back-most layer (image 3) */}
            <img src={imageSrcs[2]} style={{position: 'absolute', width: 980, height: 'auto', maxHeight: 1280, objectFit: 'cover', borderRadius: 20, boxShadow: '0 30px 80px rgba(0,0,0,0.6)', transform: `translateY(${y3}px) scale(${s3})`, opacity: p3 > 0.05 ? Math.min(1, p3 * 1.2) : 0, willChange: 'transform, opacity'}} />

            {/* Middle layer (image 2) */}
            <img src={imageSrcs[1]} style={{position: 'absolute', width: 900, height: 'auto', maxHeight: 1200, objectFit: 'cover', borderRadius: 18, boxShadow: '0 26px 70px rgba(0,0,0,0.6)', transform: `translateY(${y2}px) scale(${s2})`, opacity: p2 > 0.05 ? Math.min(1, p2 * 1.2) : 0, willChange: 'transform, opacity'}} />

            {/* Front layer (image 1) */}
            <img src={imageSrcs[0]} style={{position: 'absolute', width: 820, height: 'auto', maxHeight: 1100, objectFit: 'cover', borderRadius: 16, boxShadow: '0 22px 60px rgba(0,0,0,0.6)', transform: `translateY(${y1}px) scale(${s1})`, opacity: p1 > 0.05 ? Math.min(1, p1 * 1.3) : 0, willChange: 'transform, opacity'}} />
          </div>
        </div>
      </SafeZone>
    </div>
  );
};

export default Scene4;
