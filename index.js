import { Game } from "./Game.js";
import { drawCar } from "./utils.js";
import { GAME_WIDTH, GAME_HEIGHT, LANE_WIDTH } from "./constants.js";

const roadImage = new Image();
roadImage.src = "./road.jpg";
let roadImageLoaded = false;
roadImage.onload = () => (roadImageLoaded = true);

const canvas = document.getElementById("game");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const ctx = canvas.getContext("2d");
function draw(vehicle, color) {
  drawCar(ctx, color, vehicle);
}
export function drawText(text, pos) {
  ctx.font = "24px arial";
  ctx.fillText(text, pos.x, pos.y);
}
export function drawVehicle(vehicle, image) {
  ctx.drawImage(
    image,
    vehicle.lane * LANE_WIDTH + (LANE_WIDTH / 2 - vehicle.width / 2),
    vehicle.y,
    vehicle.width,
    vehicle.length
  );
}
export function drawImageXY() {}
document.addEventListener("keydown", (e) => {
  game.movePlayer(e.key);
});

const game = new Game();

const update = () => {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.fillStyle = "black";
  ctx.fillRect(GAME_WIDTH / 3 - 10, 0, 10, GAME_HEIGHT);
  ctx.fillRect((2 * GAME_WIDTH) / 3 - 10, 0, 10, GAME_HEIGHT);
  if (roadImageLoaded) {
    ctx.drawImage(roadImage, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  game.run();
  ctx.strokeRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  let id = requestAnimationFrame(update);
  if (game.isOver) {
    cancelAnimationFrame(id);
  }
};
update();
