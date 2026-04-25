import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneHome } from "./scenes/flow/SceneHome";
import { SceneListings } from "./scenes/flow/SceneListings";
import { SceneProperty } from "./scenes/flow/SceneProperty";
import { SceneChat } from "./scenes/flow/SceneChat";
import { SceneReview } from "./scenes/flow/SceneReview";
import { SceneFlowOutro } from "./scenes/flow/SceneFlowOutro";

// Scenes: 140, 130, 130, 200, 300, 110 = 1010
// Transitions: 5 fades * 18 = 90
// Total: 920
export const FlowVideo: React.FC = () => {
  const t = (d = 18) => ({ presentation: fade(), timing: linearTiming({ durationInFrames: d }) });
  return (
    <AbsoluteFill style={{ background: "#0F1535" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={140}><SceneHome /></TransitionSeries.Sequence>
        <TransitionSeries.Transition {...t()} />
        <TransitionSeries.Sequence durationInFrames={130}><SceneListings /></TransitionSeries.Sequence>
        <TransitionSeries.Transition {...t()} />
        <TransitionSeries.Sequence durationInFrames={130}><SceneProperty /></TransitionSeries.Sequence>
        <TransitionSeries.Transition {...t()} />
        <TransitionSeries.Sequence durationInFrames={200}><SceneChat /></TransitionSeries.Sequence>
        <TransitionSeries.Transition {...t()} />
        <TransitionSeries.Sequence durationInFrames={300}><SceneReview /></TransitionSeries.Sequence>
        <TransitionSeries.Transition {...t()} />
        <TransitionSeries.Sequence durationInFrames={110}><SceneFlowOutro /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
