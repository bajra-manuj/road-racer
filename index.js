import Vehicle, { Player } from "./Vehicle.js";
import { drawCar, getRandomInt } from "./utils.js";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  NO_OF_LANES,
  ENEMIES_COUNT,
  LANE_WIDTH,
  PLAYER_Y,
  VEHICLE_WIDTH,
} from "./constants.js";

const canvas = document.getElementById("game");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const ctx = canvas.getContext("2d");
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    player.goLeft();
  } else if (e.key === "ArrowRight") {
    player.goRight();
  } else if (e.key === "ArrowUp") {
    player.incY(-15);
  } else if (e.key === "ArrowDown") {
    player.incY(15);
  }
});

const enemies = [];
const player = new Player(1, PLAYER_Y, VEHICLE_WIDTH, GAME_HEIGHT / 5);
for (let i = 0; i < ENEMIES_COUNT; i++) {
  enemies.push(
    new Vehicle(getRandomInt(3), -i * 500, VEHICLE_WIDTH, GAME_HEIGHT / 5)
  );
}
console.log({ player });
let isOver = false;
const update = () => {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.fillStyle = "black";
  ctx.fillRect(GAME_WIDTH / 3 - 10, 0, 10, GAME_HEIGHT);
  ctx.fillRect((2 * GAME_WIDTH) / 3 - 10, 0, 10, GAME_HEIGHT);
  enemies.forEach((enemy) => {
    enemy.incY(3);
    if (enemy.isColliding(player)) {
      isOver = true;
    }
    drawCar(ctx, "green", enemy);
  });
  drawCar(ctx, "red", player);
  ctx.strokeRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  if (isOver) {
    cancelAnimationFrame(id);
  }
  let id = requestAnimationFrame(update);
};
update();
