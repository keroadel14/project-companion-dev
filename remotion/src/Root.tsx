import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { FlowVideo } from "./FlowVideo";

export const RemotionRoot = () => (
  <>
    <Composition
      id="main"
      component={MainVideo}
      durationInFrames={805}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="flow"
      component={FlowVideo}
      durationInFrames={920}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
