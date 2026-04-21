import React from 'react';

export const Logo: React.FC<{size?: number}> = ({size = 32}) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
      {/* simple red heart SVG */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 20s-7.5-4.8-9.2-7.1C0.9 9.9 4 6 7.8 6c1.9 0 3.1 1.2 4.2 2.4C12.9 7.2 14.1 6 16 6 19.8 6 22.9 9.9 21.2 12.9 19.5 15.2 12 20 12 20z" fill="#ff4d4d" />
      </svg>
      <div style={{color: '#fff', fontFamily: 'Inter', fontWeight: 600, fontSize: 28}}>HeartfeltCraftsCo</div>
    </div>
  );
};

export default Logo;
