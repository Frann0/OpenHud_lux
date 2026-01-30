import { Map, CSGO } from "csgogsi";

interface IProps {
  phase: CSGO["phase_countdowns"] | null;
  map: Map;
}

const Timeout = ({ phase, map }: IProps) => {
  const time = phase && Math.abs(Math.ceil(phase.phase_ends_in));
  const team = phase && phase.phase === "timeout_t" ? map.team_t : map.team_ct;

  return (
    <div
      className={` timeout_wrapper ${
        time &&
        time > 2 &&
        phase &&
        (phase.phase === "timeout_t" || phase.phase === "timeout_ct")
          ? "show"
          : ""
      } ${
        phase && (phase.phase === "timeout_t" || phase.phase === "timeout_ct")
          ? phase.phase.substring(8)
          : ""
      }`}
    >
      <div className="corner-box"></div>
      <div id={`timeout`}>
        <div className={team.side}>{team.name}&nbsp;</div>
        <div>TIME OUT</div>
      </div>

      <div className="corner-box right"></div>
    </div>
  );
};
export default Timeout;
