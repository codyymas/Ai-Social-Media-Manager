import React from 'react';
import {Composition, Sequence, AbsoluteFill, useCurrentFrame} from 'remotion';
import {captions} from './captions';
import Logo from './components/Logo';
import {SAFE} from './SafeZone';
import ProductScene1 from './productScenesClean/Scene1';
import ProductScene2 from './productScenesClean/Scene2';
import ProductScene3 from './productScenesClean/Scene3';
import ProductScene4 from './productScenesClean/Scene4';
import ProductScene5 from './productScenesClean/Scene5';
import ProductScene6 from './productScenesClean/Scene6';
import HeartScene1 from './heartScenes/Scene1';
import HeartScene2 from './heartScenes/Scene2';
import HeartScene3 from './heartScenes/Scene3';
import HeartScene4 from './heartScenes/Scene4';
import HeartScene5 from './heartScenes/Scene5';

const TRANSITION_FRAMES = 12;

// Product scenes durations (25s total at 30fps)
const productSceneDurations = [90, 90, 240, 150, 90, 90];

// Heartfelt composition original scene durations (kept for backwards compatibility)
const heartSceneDurations = [169, 169, 169, 169, 272]; // frames per scene (total 900)

const SceneContainer: React.FC<{Component: React.FC; frames: number}> = ({Component, frames}) => {
  const frame = useCurrentFrame();
  // fade in over first TRANSITION_FRAMES, fade out over last TRANSITION_FRAMES
  const fadeIn = Math.max(0, Math.min(1, (frame) / Math.max(1, TRANSITION_FRAMES)));
  const fadeOut = Math.max(0, Math.min(1, (frames - frame) / Math.max(1, TRANSITION_FRAMES)));
  const opacity = Math.min(fadeIn === 0 ? 1 : fadeIn, fadeOut === 0 ? 1 : fadeOut);

  return (
    <div style={{width: 1080, height: 1920, opacity}}>
      <Component />
    </div>
  );
};

export const HeartfeltVideo: React.FC = () => {
  const fps = 30; // fixed fps for the composition; avoid calling useVideoConfig outside a registered component

  // compute start times for heartfelt composition with overlap
  const heartStarts: number[] = [];
  let cursor = 0;
  for (let i = 0; i < heartSceneDurations.length; i++) {
    heartStarts.push(cursor);
    cursor += heartSceneDurations[i] - TRANSITION_FRAMES;
  }

  return (
    <>
      <Composition
        id="HeartfeltVideo"
        component={() => {
          const frame = useCurrentFrame();
          return (
            <AbsoluteFill style={{background: '#FCE4EC'}}>
                {/* Top-left logo inside safe zone */}
                <div style={{position: 'absolute', left: SAFE.sides + 8, top: SAFE.top + 8}}>
                  <Logo size={36} />
                </div>
              {/* audio placeholder: add src/audio/voiceover.mp3 to include audio */}

              {/* Heartfelt Scenes */}
              <Sequence from={heartStarts[0]} durationInFrames={heartSceneDurations[0]}>
                <SceneContainer Component={HeartScene1} frames={heartSceneDurations[0]} />
              </Sequence>

              <Sequence from={heartStarts[1]} durationInFrames={heartSceneDurations[1]}>
                <SceneContainer Component={HeartScene2} frames={heartSceneDurations[1]} />
              </Sequence>

              <Sequence from={heartStarts[2]} durationInFrames={heartSceneDurations[2]}>
                <SceneContainer Component={HeartScene3} frames={heartSceneDurations[2]} />
              </Sequence>

              <Sequence from={heartStarts[3]} durationInFrames={heartSceneDurations[3]}>
                <SceneContainer Component={HeartScene4} frames={heartSceneDurations[3]} />
              </Sequence>

              <Sequence from={heartStarts[4]} durationInFrames={heartSceneDurations[4]}>
                <SceneContainer Component={HeartScene5} frames={heartSceneDurations[4]} />
              </Sequence>

              {/* Captions overlay */}
              <div style={{position: 'absolute', left: SAFE.sides, right: SAFE.sides, bottom: SAFE.bottom + 10, pointerEvents: 'none'}}>
                {captions.map((c, i) => {
                  const visible = frame >= c.start && frame <= c.end;
                  return (
                    <div key={i} style={{color: '#fff', fontFamily: 'Inter', fontSize: 36, textAlign: 'center', opacity: visible ? 1 : 0, transition: 'opacity 120ms'}}>
                      {c.text}
                    </div>
                  );
                })}
              </div>

              {/* Persistent branded URL line (above bottom safe zone) */}
              <div style={{position: 'absolute', left: SAFE.sides, right: SAFE.sides, bottom: SAFE.bottom - 40, pointerEvents: 'none', textAlign: 'center'}}>
                <div style={{color: '#fff', fontFamily: 'Inter', fontSize: 28}}>https://www.heartfeltcraftsco.com/?utm_source=video&utm_campaign=valentines</div>
              </div>
            </AbsoluteFill>
          );
        }}
        width={1080}
        height={1920}
        fps={fps}
        durationInFrames={900}
      />
      {/* Product demo 25s composition */}
      <Composition
        id="ProductDemo25s"
        component={() => {
          const frame = useCurrentFrame();

          // compute start times for product scenes
          const productStarts: number[] = [];
          let pCursor = 0;
          for (let i = 0; i < productSceneDurations.length; i++) {
            productStarts.push(pCursor);
            pCursor += productSceneDurations[i] - TRANSITION_FRAMES;
          }

          return (
            <AbsoluteFill style={{background: '#FCE4EC'}}>
              <div style={{position: 'absolute', left: SAFE.sides + 8, top: SAFE.top + 8}}>
                <Logo size={36} />
              </div>
              {/* audio placeholder: add src/audio/voiceover.mp3 to include audio */}

              <Sequence from={productStarts[0]} durationInFrames={productSceneDurations[0]}>
                <SceneContainer Component={ProductScene1} frames={productSceneDurations[0]} />
              </Sequence>
              <Sequence from={productStarts[1]} durationInFrames={productSceneDurations[1]}>
                <SceneContainer Component={ProductScene2} frames={productSceneDurations[1]} />
              </Sequence>
              <Sequence from={productStarts[2]} durationInFrames={productSceneDurations[2]}>
                <SceneContainer Component={ProductScene3} frames={productSceneDurations[2]} />
              </Sequence>
              <Sequence from={productStarts[3]} durationInFrames={productSceneDurations[3]}>
                <SceneContainer Component={ProductScene4} frames={productSceneDurations[3]} />
              </Sequence>
              <Sequence from={productStarts[4]} durationInFrames={productSceneDurations[4]}>
                <SceneContainer Component={ProductScene5} frames={productSceneDurations[4]} />
              </Sequence>
              <Sequence from={productStarts[5]} durationInFrames={productSceneDurations[5]}>
                <SceneContainer Component={ProductScene6} frames={productSceneDurations[5]} />
              </Sequence>

              {/* Persistent URL */}
              <div style={{position: 'absolute', left: SAFE.sides, right: SAFE.sides, bottom: SAFE.bottom - 40, pointerEvents: 'none', textAlign: 'center'}}>
                <div style={{color: '#fff', fontFamily: 'Inter', fontSize: 28}}>https://www.heartfeltcraftsco.com/?utm_source=video&utm_campaign=valentines</div>
              </div>
            </AbsoluteFill>
          );
        }}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={750}
      />
    </>
  );
};

export default HeartfeltVideo;
