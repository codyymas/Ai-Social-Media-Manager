import React from 'react';

export const SAFE = {
  top: 150,
  bottom: 170,
  sides: 60,
};

export const SafeZone: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: SAFE.sides,
        top: SAFE.top,
        width: 1080 - SAFE.sides * 2,
        height: 1920 - SAFE.top - SAFE.bottom,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};
