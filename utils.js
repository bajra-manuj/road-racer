import { LANE_WIDTH } from "./constants.js";

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export const drawCar = (ctx, color, car) => {
  ctx.fillStyle = color;
  ctx.fillRect((car.lane + 0.25) * LANE_WIDTH, car.y, car.width, car.length);
};
