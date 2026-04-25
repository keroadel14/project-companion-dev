import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneProblem } from "./scenes/SceneProblem";
import { SceneSolution } from "./scenes/SceneSolution";
import { SceneFeatures } from "./scenes/SceneFeatures";
import { SceneListings } from "./scenes/SceneListings";
import { SceneTrust } from "./scenes/SceneTrust";
import { SceneOutro } from "./scenes/SceneOutro";

// Total math: 7 scenes, 6 transitions of 20 frames overlap each
// Scene durations: 120, 130, 130, 150, 140, 130, 140 = 940
// minus 6*20 = 120 overlap => 820. Use 780 in Composition for safety (transitions reduce duration).
// Actually: TransitionSeries total = sum(scenes) - sum(transitions). 940 - 120 = 820.
// Set Composition to 820.

export const MainVideo: React.FC = () => {
  const t = (d = 20) => ({ presentation: fade(), timing: linearTiming({ durationInFrames: d }) });
  return (
    <AbsoluteFill style={{ background: "#0F1535" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120}><SceneIntro /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })} />
        <TransitionSeries.Sequence durationInFrames={130}><SceneProblem /></TransitionSeries.Sequence>
        <TransitionSeries.Transition {...t(20)} />
        <TransitionSeries.Sequence durationInFrames={130}><SceneSolution /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })} />
        <TransitionSeries.Sequence durationInFrames={150}><SceneFeatures /></TransitionSeries.Sequence>
        <TransitionSeries.Transition {...t(20)} />
        <TransitionSeries.Sequence durationInFrames={140}><SceneListings /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 25 })} />
        <TransitionSeries.Sequence durationInFrames={130}><SceneTrust /></TransitionSeries.Sequence>
        <TransitionSeries.Transition {...t(20)} />
        <TransitionSeries.Sequence durationInFrames={140}><SceneOutro /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
