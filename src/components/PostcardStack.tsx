import React from 'react';
import {useCurrentFrame, spring, interpolate} from 'remotion';

const images = ['/product-1-hd.png', '/product-2-hd.png', '/product-3-hd.png'];

const PostcardStack: React.FC<{width?: number}> = ({width = 720}) => {
  const frame = useCurrentFrame();
  const fps = 30;

  // base entrance spring
  const entrance = spring({frame, fps, config: {damping: 200}});

  // small oscillation for a tactile feel
  const wobble = Math.sin(frame / 8) * 1.2;

  return (
    <div style={{width, height: Math.round((width * 4) / 3), position: 'relative', perspective: 1400}}>
      {images.map((src, i) => {
        const idx = images.length - 1 - i; // draw back-to-front
        const delay = i * 6;
        const t = Math.max(0, Math.min(1, (frame - delay) / 18));
        const s = 0.85 + entrance * 0.18 + (i === 0 ? 0.02 : 0);
        const rotate = interpolate(t, [0, 1], [12 - i * 6, -2 + i * 2]) + wobble * (i === 0 ? 0.6 : 0.3);
        const y = interpolate(t, [0, 1], [60 + i * 18, -6 - i * 3]);
        const x = i * 8;

        return (
          <img
            key={src}
            src={src}
            style={{
              position: 'absolute',
              left: `calc(50% - ${width / 2}px + ${x}px)`,
              top: `calc(50% - ${Math.round((width * 4) / 3) / 2}px + ${y}px)`,
              width: width,
              height: 'auto',
              objectFit: 'cover',
              borderRadius: 18,
              transform: `rotate(${rotate}deg) scale(${s})`,
              boxShadow: '0 30px 90px rgba(0,0,0,0.6)',
              willChange: 'transform, opacity',
              opacity: t * (i === 0 ? 1 : 0.95),
              zIndex: idx,
            }}
          />
        );
      })}
    </div>
  );
};

export default PostcardStack;
