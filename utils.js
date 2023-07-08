import { LANE_WIDTH } from "./constants.js";

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export const drawCar = (ctx, color, car) => {
  ctx.fillStyle = color;
  ctx.fillRect(
    car.lane * LANE_WIDTH + (LANE_WIDTH / 2 - car.width / 2),
    car.y,
    car.width,
    car.length
  );
};
