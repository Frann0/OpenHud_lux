import { Timer } from "../MatchBar/MatchBar";
import { Player } from "csgogsi";
import * as I from "../../assets/Icons";
import { MAX_TIMER } from "./Countdown";

interface IProps {
  timer: Timer | null;
  side: "right" | "left";
}

const getCaption = (type: "defusing" | "planting", player: Player | null) => {
  if (!player) return null;
  if (type === "defusing") {
    return (
      <>
        <I.Defuse height={22} width={22} fill="var(--color-new-ct)" />
        <div className="CT_Name">{player.name}&nbsp;</div>
        <div className={"CT"}>is defusing</div>
      </>
    );
  }
  return (
    <>
      <I.SmallBomb height={22} width={22} fill="var(--color-new-t)" />
      <div className="T_Name">{player.name}&nbsp;</div>
      <div className={"T"}> is planting</div>
    </>
  );
};
const Bomb = ({ timer, side }: IProps) => {
  if (!timer) return null;

  const maxTime =
    timer.type === "planting"
      ? MAX_TIMER.planting
      : timer.player?.state.defusekit
        ? MAX_TIMER.defuse_kit
        : MAX_TIMER.defuse_nokit;

  const progress = Math.min(timer.time / maxTime, 1);

  return (
    <div
      className={`defuse_plant_container ${side} ${
        timer.active ? "show" : "hide"
      } ${timer.type}`}
    >
      <div className="defuse_plant_caption">
        {getCaption(timer.type, timer.player)}
      </div>

      <div
        className="defuse_plant_bar"
        style={{
          ["--mask-progress" as any]: `${progress * 100}%`,
        }}
      />
    </div>
  );
};

export default Bomb;
