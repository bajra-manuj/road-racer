import { getRandomInt } from "./utils.js";
import {
  GAME_HEIGHT,
  PLAYER_Y,
  ENEMIES_COUNT,
  BULLET_VELOCITY,
  ENEMY_VELOCITY,
  VEHICLE_WIDTH,
  GAME_WIDTH,
} from "./constants.js";
import { drawVehicle, drawText } from "./index.js";
import Vehicle, { Player } from "./Vehicle.js";

const playerCarImage = new Image();
playerCarImage.src = "./player.png";
const enemyCarImage = new Image();
enemyCarImage.src = "./enemy.png";
const bulletImage = new Image();
bulletImage.src = "./bullet.png";
const heartImage = new Image();
heartImage.src = "./heart.png";
export class Game {
  constructor() {
    this.enemies = Vehicle.GenerateVehicles(ENEMIES_COUNT);
    this.player = new Player(1, PLAYER_Y, VEHICLE_WIDTH, GAME_HEIGHT / 5);
    this.score = 0;
    this.isOver = false;
  }
  movePlayer(key) {
    this.player.move(key);
  }
  run() {
    this.player.bullets.forEach((bullet) => bullet.incY(BULLET_VELOCITY));
    this.enemies.forEach((enemy) => {
      enemy.incY(ENEMY_VELOCITY);
      drawVehicle(enemy, enemyCarImage);
      // check bullet hit
      this.player.bullets.forEach((bullet) => {
        if (bullet.show && bullet.isColliding(enemy)) {
          enemy.randomizePos();
          bullet.show = false;
          this.score += 1;
        }
        if (bullet.show) {
          drawVehicle(bullet, bulletImage);
        }
      });
      // check collision with this.player
      if (!this.player.isInvinsible() && enemy.isColliding(this.player)) {
        if (this.player.incHealth(-1) === 0) {
          this.isOver = true;
        } else {
          this.player.setInvincible();
        }
      }
    });
    if (this.player.isInvinsible()) {
      playerCarImage.src = "./player_invinsible.png";
    } else {
      playerCarImage.src = "./player.png";
    }
    drawVehicle(this.player, playerCarImage);

    drawText(`x${this.player.health}`, { y: 50, x: GAME_WIDTH - 100 });
  }
}
