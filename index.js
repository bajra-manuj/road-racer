import Vehicle, { Player } from "./Vehicle.js";
import { drawCar, getRandomInt } from "./utils.js";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  ENEMIES_COUNT,
  PLAYER_Y,
  VEHICLE_WIDTH,
  BULLET_VELOCITY,
  PLAYER_VELOCITY,
  ENEMY_VELOCITY,
  LANE_WIDTH,
} from "./constants.js";

const playerCarImage = new Image();
playerCarImage.src = "./player.png";
let isImageLoaded = false;
playerCarImage.onload = () => (isImageLoaded = true);
const enemyCarImage = new Image();
enemyCarImage.src = "./enemy.png";
let enemyCarLoaded = false;
enemyCarImage.onload = () => (enemyCarLoaded = true);
const bulletImage = new Image();
bulletImage.src = "./bullet.png";
let bulletImgLoaded = false;
bulletImage.onload = () => (bulletImgLoaded = true);
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
function drawImage(vehicle, image) {
  ctx.drawImage(
    image,
    vehicle.lane * LANE_WIDTH + (LANE_WIDTH / 2 - vehicle.width / 2),
    vehicle.y,
    vehicle.width,
    vehicle.length
  );
  // image.src = "./player.png";
}
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    player.goLeft();
  } else if (e.key === "ArrowRight") {
    player.goRight();
  } else if (e.key === "ArrowUp") {
    player.incY(-PLAYER_VELOCITY);
  } else if (e.key === "ArrowDown") {
    player.incY(PLAYER_VELOCITY);
  } else if (e.key === " ") {
    player.fire();
  }
});

const enemies = [];
const player = new Player(1, PLAYER_Y, VEHICLE_WIDTH, GAME_HEIGHT / 5);
for (let i = 0; i < ENEMIES_COUNT; i++) {
  enemies.push(
    new Vehicle(getRandomInt(3), -i * 500, VEHICLE_WIDTH, GAME_HEIGHT / 5)
  );
}
let isOver = false;
let score = 0;
let level = 1;
const update = () => {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.fillStyle = "black";
  ctx.fillRect(GAME_WIDTH / 3 - 10, 0, 10, GAME_HEIGHT);
  ctx.fillRect((2 * GAME_WIDTH) / 3 - 10, 0, 10, GAME_HEIGHT);
  if (roadImageLoaded) {
    ctx.drawImage(roadImage, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  enemies.forEach((enemy) => {
    enemy.incY(ENEMY_VELOCITY);
    if (!player.isInvinsible() && enemy.isColliding(player)) {
      if (player.incHealth(-1) === 0) {
        isOver = true;
      } else {
        player.setInvincible();
      }
    }
    if (enemyCarLoaded) {
      drawImage(enemy, enemyCarImage);
    } else {
      draw(enemy, "green");
    }
  });
  if (isImageLoaded) {
    if (player.isInvinsible()) {
      playerCarImage.src = "./player_invinsible.png";
    } else {
      playerCarImage.src = "./player.png";
    }
    drawImage(player, playerCarImage);
  } else {
    draw(player, player.isInvinsible() ? "gray" : "red");
  }
  player.bullets.forEach((bullet) => {
    bullet.incY(BULLET_VELOCITY);
    enemies.forEach((enemy) => {
      if (bullet.show && bullet.isColliding(enemy)) {
        enemy.randomizePos();
        bullet.show = false;
        score += 1;
      }
    });
    if (bullet.show) {
      if (bulletImgLoaded) {
        drawImage(bullet, bulletImage);
      } else {
        draw(bullet, "blue");
      }
    }
  });
  ctx.strokeRect(0, 0, GAME_WIDTH + 100, GAME_HEIGHT);
  let id = requestAnimationFrame(update);
  if (isOver) {
    cancelAnimationFrame(id);
  }
};
update();
