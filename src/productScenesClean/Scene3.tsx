import React from 'react';
import {useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {SafeZone} from '../SafeZone';

const CursorDot: React.FC<{x: number; y: number; opacity?: number}> = ({x, y, opacity = 1}) => {
  return (
    <div style={{position: 'absolute', left: x - 8, top: y - 8, width: 16, height: 16, borderRadius: 8, background: '#fff', opacity, boxShadow: '0 6px 18px rgba(255,255,255,0.08)'}} />
  );
};

const Ripple: React.FC<{x: number; y: number; progress: number}> = ({x, y, progress}) => {
  const size = 40 + progress * 240;
  const alpha = 1 - progress;
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: size / 2, background: `rgba(255,255,255,${0.12 * alpha})`, transform: `scale(${1})`, pointerEvents: 'none'}} />
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Layout positions (within safe zone)
  const safeLeft = 60;
  const safeRight = 60;
  const safeTop = 150;
  const safeBottom = 170;
  const contentWidth = 1080 - safeLeft - safeRight; // 960
  const centerX = 540;
  const centerY = 960;

  // Element sizes
  const inputWidth = contentWidth;
  const inputHeight = 72;
  const inputX = safeLeft + 0;
  const inputY = centerY - 120;

  const buttonWidth = contentWidth;
  const buttonHeight = 64;
  const buttonX = safeLeft + 0;
  const buttonY = inputY + inputHeight + 28;

  // Timeline
  const tMoveToInputStart = 5;
  const tMoveToInputEnd = 25;
  const tClickInput = 30;
  const tTypeStart = 40;
  const tTypeEnd = 120;
  const tMoveToButtonStart = 130;
  const tMoveToButtonEnd = 150;
  const tClickButton = 155;
  const tLoadingStart = 160;
  const tLoadingEnd = 175; // 0.5s spinner
  const tResultsStart = 176;

  // Cursor position
  const offscreenX = -40;
  const offscreenY = inputY + inputHeight / 2;

  const toInputT = spring({frame: Math.max(0, frame - tMoveToInputStart), fps, config: {damping: 15}});
  const cursorToInputX = offscreenX + (inputX + 24 - offscreenX) * toInputT;
  const cursorToInputY = offscreenY + (inputY + inputHeight / 2 - offscreenY) * toInputT;

  const toButtonT = spring({frame: Math.max(0, frame - tMoveToButtonStart), fps, config: {damping: 15}});
  const cursorToButtonX = (inputX + 24) + (buttonX + 24 - (inputX + 24)) * toButtonT;
  const cursorToButtonY = (inputY + inputHeight / 2) + (buttonY + buttonHeight / 2 - (inputY + inputHeight / 2)) * toButtonT;

  // Ripple progress
  const inputRippleProgress = frame >= tClickInput ? Math.min(1, (frame - tClickInput) / 18) : 0;
  const buttonRippleProgress = frame >= tClickButton ? Math.min(1, (frame - tClickButton) / 18) : 0;

  // Typing
  const totalChars = 24;
  const typedCount = Math.floor(interpolate(frame, [tTypeStart, tTypeEnd], [0, totalChars], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const typedText = 'Send love 💌';
  const displayText = typedText.slice(0, Math.min(typedCount, typedText.length));

  // Loading spinner visibility
  const loadingVisible = frame >= tLoadingStart && frame <= tLoadingEnd;

  // Results animation - staggered springs
  const result1T = spring({frame: Math.max(0, frame - tResultsStart - 4), fps, config: {damping: 20}});
  const result2T = spring({frame: Math.max(0, frame - tResultsStart - 12), fps, config: {damping: 20}});
  const result3T = spring({frame: Math.max(0, frame - tResultsStart - 20), fps, config: {damping: 20}});

  return (
    <div style={{position: 'absolute', width: 1080, height: 1920, background: 'transparent'}}>
      <SafeZone>
        <div style={{position: 'relative', width: contentWidth, marginLeft: safeLeft, marginTop: safeTop}}>
          {/* Input field */}
          <div style={{position: 'absolute', left: inputX - safeLeft, top: inputY - safeTop, width: inputWidth, height: inputHeight, borderRadius: 12, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', paddingLeft: 24}}>
            <div style={{color: '#fff', fontFamily: 'Inter', fontSize: 36}}>{displayText}</div>
          </div>

          {/* Button */}
          <div style={{position: 'absolute', left: buttonX - safeLeft, top: buttonY - safeTop, width: buttonWidth, height: buttonHeight}}>
            <div style={{width: '100%', height: '100%', borderRadius: 12, background: '#ff6b6b', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: frame >= tClickButton ? 'scale(0.95)' : 'scale(1)', transition: 'transform 120ms'}}>
              <div style={{color: '#fff', fontFamily: 'Inter', fontWeight: 700, fontSize: 36}}>Generate</div>
            </div>
          </div>

          {/* Loading spinner */}
          {loadingVisible && (
            <div style={{position: 'absolute', left: centerX - 24, top: buttonY + buttonHeight + 20, width: 48, height: 48, borderRadius: 24, border: '4px solid rgba(255,255,255,0.12)', borderTopColor: '#fff', animation: 'spin 0.5s linear infinite'}} />
          )}

          {/* Results */}
          <div style={{position: 'absolute', left: 0, top: buttonY + buttonHeight + 120, width: '100%'}}>
            <div style={{transform: `translateY(${(1 - result1T) * 40}px)`, opacity: result1T, marginBottom: 12}}>
              <div style={{background: 'rgba(255,255,255,0.04)', padding: 20, borderRadius: 12}}>
                <div style={{color: '#fff', fontFamily: 'Inter', fontSize: 36}}>Your personalized card is ready</div>
              </div>
            </div>
            <div style={{transform: `translateY(${(1 - result2T) * 40}px)`, opacity: result2T, marginBottom: 12}}>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 12}}>
                <div style={{color: '#fff', fontFamily: 'Inter', fontSize: 36}}>Share instantly via DM or story</div>
              </div>
            </div>
            <div style={{transform: `translateY(${(1 - result3T) * 40}px)`, opacity: result3T}}>
              <div style={{background: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 12}}>
                <div style={{color: '#fff', fontFamily: 'Inter', fontSize: 36}}>Handmade touch, digital speed</div>
              </div>
            </div>
          </div>

          {/* Cursor and ripples (absolute on top) */}
          {/* cursor position chooses between moving to input or button */}
          <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}}>
            {frame <= tMoveToButtonStart ? (
              <>
                <CursorDot x={cursorToInputX} y={cursorToInputY} opacity={1} />
                {inputRippleProgress > 0 && <Ripple x={inputX + 40 - safeLeft} y={inputY + inputHeight / 2 - safeTop} progress={inputRippleProgress} />}
              </>
            ) : (
              <>
                <CursorDot x={cursorToButtonX} y={cursorToButtonY} opacity={1} />
                {buttonRippleProgress > 0 && <Ripple x={buttonX + buttonWidth / 2 - safeLeft} y={buttonY + buttonHeight / 2 - safeTop} progress={buttonRippleProgress} />}
              </>
            )}
          </div>
        </div>
      </SafeZone>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

export default Scene3;
