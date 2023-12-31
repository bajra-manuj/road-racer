import { Game } from "./Game.js";
import { GAME_WIDTH, GAME_HEIGHT, LANE_WIDTH } from "./constants.js";

const roadImage = new Image();
roadImage.src = "./road.jpg";

const canvas = document.getElementById("game");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const ctx = canvas.getContext("2d");

export function drawText(text, pos, align = "start", size = 24) {
  ctx.font = `${size}px Silkscreen`;
  ctx.textAlign = align;
  ctx.fillStyle = "white";
  ctx.fillText(text, pos.x, pos.y);
}
export const drawVehicle = (image) => (vehicle) => {
  ctx.drawImage(
    image,
    vehicle.lane * LANE_WIDTH + (LANE_WIDTH / 2 - vehicle.width / 2),
    vehicle.y,
    vehicle.width,
    vehicle.length
  );
};

const game = new Game();

const update = () => {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.fillStyle = "black";
  ctx.fillRect(GAME_WIDTH / 3 - 10, 0, 10, GAME_HEIGHT);
  ctx.fillRect((2 * GAME_WIDTH) / 3 - 10, 0, 10, GAME_HEIGHT);
  ctx.drawImage(roadImage, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.run();
  ctx.strokeRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  let id = requestAnimationFrame(update);
  if (game.isOver) {
    drawText(
      `GAME OVER`,
      {
        y: GAME_HEIGHT / 2 - 50,
        x: GAME_WIDTH / 2,
      },
      "center",
      36
    );
    drawText(
      `Press Enter to start/reset`,
      {
        y: GAME_HEIGHT / 2,
        x: GAME_WIDTH / 2,
      },
      "center"
    );
    cancelAnimationFrame(id);
  }
};
update();

document.addEventListener("keydown", (e) => {
  if (game.isOver) {
    if (e.key === "Enter") {
      game.reset();
      update();
    }
  }
  game.handleKeyboard(e.key);
});
