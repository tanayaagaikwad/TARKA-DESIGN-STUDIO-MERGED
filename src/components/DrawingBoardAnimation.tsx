
const orbitAngles = [0, 45, 90, 135, 180, 225, 270, 315];

export default function DrawingBoardAnimation() {
  return (
    <div
      className="drawing-board-art"
      role="img"
      aria-label="A revolving circular composition of orbital rings and teal and burgundy nodes"
    >
      <div className="drawing-board-frame">
        <span className="drawing-board-label drawing-board-label-top" aria-hidden="true">
          TARKA / IDEAS IN MOTION
        </span>

        <span className="drawing-board-label drawing-board-label-bottom" aria-hidden="true">
          DESIGN · THINK · BUILD
        </span>

        <div className="world-orbit world-orbit-outer" aria-hidden="true">
          <span className="orbit-node orbit-node-one" />
          <span className="orbit-node orbit-node-two" />
        </div>

        <div className="world-orbit world-orbit-middle" aria-hidden="true">
          <span className="orbit-node orbit-node-three" />
          <span className="orbit-node orbit-node-four" />
        </div>

        <div className="world-orbit world-orbit-inner" aria-hidden="true">
          {orbitAngles.map((angle) => (
            <span
              key={angle}
              className="orbit-spoke"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span className="orbit-spoke-node" />
            </span>
          ))}
        </div>

        <div className="world-orbit-core" aria-hidden="true">
          <span className="world-core-ring" />
          <span className="world-core-dot" />
        </div>
      </div>
    </div>
  );
}
