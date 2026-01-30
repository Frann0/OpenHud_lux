import { MAX_TIMER, useBombTimer } from "./Countdown";
import { C4 } from "../../assets/Icons";
import "./Bomb.scss";
import { useEffect, useState } from "react";
/*
const Bomb = () => {
  const bombData = useBombTimer();
  const show = bombData.state === "planted" || bombData.state === "defusing";

  return (
    <div id={`bomb_container`}>
      <div
        className={`bomb_timer ${show ? "show" : "hide"}`}
        style={{ height: `${(bombData.bombTime * 100) / MAX_TIMER.bomb}%` }}
      ></div>
      <div className={`bomb_icon ${show ? "show" : "hide"}`}>
        <C4 fill="white" />
      </div>
    </div>
  );
};
*/

const useSmoothValue = (target: number, speed = 0.12) => {
  const [value, setValue] = useState(target);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      setValue((prev) => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.0005) return target;
        return prev + diff * speed;
      });
      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [target, speed]);

  return value;
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));

const Bomb = () => {
  const bombData = useBombTimer();
  const show = bombData.state === "planted" || bombData.state === "defusing";

  const RADIUS = 24;
  const STROKE = 3;
  const SIZE = 64;
  const CENTER = SIZE / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  // ---- Raw progress
  const rawProgress = clamp(bombData.bombTime / MAX_TIMER.bomb);

  // ---- Smooth it
  const smoothProgress = useSmoothValue(rawProgress);

  const progress = Math.max(0, Math.min(1, bombData.bombTime / MAX_TIMER.bomb));

  const bombColor =
    bombData.state === "defusing"
      ? "#3FA9F5"
      : bombData.bombTime <= 10
        ? "#E74C3C"
        : bombData.bombTime <= 20
          ? "#F5A623"
          : "#D4AF37";

  return (
    <div id="bomb_container" className={show ? "show" : "hide"}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={`bomb_radial ${
          bombData.bombTime <= 5 ? "bomb_critical" : ""
        }`}
      >
        {/* Background ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="#13263D"
          strokeWidth={STROKE}
        />

        {/* Countdown ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={bombColor}
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          strokeLinecap="round"
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
          style={{
            transition: "stroke 0.2s ease",
          }}
        />

        {/* Icon in center */}
        <foreignObject x="17" y="17" width="32" height="32">
          <div className="bomb_icon_inner">
            <C4
              fill={
                bombData.bombTime <= 10
                  ? "#E74C3C"
                  : bombData.bombTime <= 20
                    ? "#F5A623"
                    : "#D4AF37"
              }
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default Bomb;
