import {
  GAME_HEIGHT,
  PLAYER_Y,
  ENEMIES_COUNT,
  BULLET_VELOCITY,
  ENEMY_VELOCITY,
  VEHICLE_WIDTH,
  GAME_WIDTH,
  PLAYER_VELOCITY,
} from "./constants.js";
import { drawVehicle, drawText } from "./index.js";
import Enemy from "./Vehicle.js";
import Player from "./Player.js";

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
    this.enemies = Enemy.GenerateVehicles(ENEMIES_COUNT);
    this.player = new Player(1, PLAYER_Y, VEHICLE_WIDTH, GAME_HEIGHT / 5);
    this.score = 0;
    this.isOver = false;
  }
  handleKeyboard(key) {
    if (key === "ArrowLeft") {
      this.player.goLeft();
    } else if (key === "ArrowRight") {
      this.player.goRight();
    } else if (key === "ArrowUp") {
      this.player.incY(-PLAYER_VELOCITY);
    } else if (key === "ArrowDown") {
      this.player.incY(PLAYER_VELOCITY);
    } else if (key === " ") {
      this.player.fire();
    }
  }
  reset() {
    this.enemies = Enemy.GenerateVehicles(ENEMIES_COUNT);
    this.player = new Player(1, PLAYER_Y, VEHICLE_WIDTH, GAME_HEIGHT / 5);
    this.score = 0;
    this.isOver = false;
  }
  draw() {
    this.player.draw(drawVehicle(playerCarImage));
    this.enemies.map((enemy) => enemy.draw(drawVehicle(enemyCarImage)));
    this.player.bullets.forEach((bullet) => {
      bullet.draw(drawVehicle(bulletImage));
    });
    drawText(`x${this.player.health}`, { y: 50, x: GAME_WIDTH - 20 }, "end");
    drawText(`score: ${this.score}`, { y: 80, x: GAME_WIDTH - 20 }, "end");
  }
  run() {
    this.player.bullets.forEach((bullet) => bullet.incY(BULLET_VELOCITY));
    this.enemies.forEach((enemy) => {
      enemy.incY(ENEMY_VELOCITY);
      // check bullet hit
      if (this.player.hasHitTarget(enemy)) {
        enemy.randomizePos();
        this.score += 1;
      }
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
    this.draw();
  }
}
