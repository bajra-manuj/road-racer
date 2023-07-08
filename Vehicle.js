import { getRandomInt } from "./utils.js";
import { GAME_HEIGHT, NO_OF_LANES, PLAYER_Y } from "./constants.js";

export default class Entity {
  constructor(lane, y, width, length) {
    this.lane = lane;
    this.y = y;
    this.length = length;
    this.width = width;
  }
  incY(y) {
    this.y += y;
    if (this.y > this.length + GAME_HEIGHT) {
      this.randomizePos();
    }
  }
  incLane(lane) {
    this.lane += lane;
  }
  goRight() {
    this.lane = Math.min(this.lane + 1, NO_OF_LANES - 1);
  }
  goLeft() {
    this.lane = Math.max(this.lane - 1, 0);
  }
  randomizePos() {
    this.y = -Math.random() * GAME_HEIGHT - GAME_HEIGHT / 10;
    this.lane = getRandomInt(NO_OF_LANES);
  }
  isColliding(entity) {
    if (this.lane != entity.lane) {
      return false;
    } else if (
      entity.y > this.y + this.length ||
      this.y > entity.y + entity.length
    ) {
      return false;
    }
    return true;
  }
}

export class Player extends Entity {
  constructor(lane, y, width, length) {
    super(lane, y, width, length);
    this.bulletCount = 2;
    this.bullets = Bullet.generateBullets(this.bulletCount);
  }
  incY(y) {
    if (y > 0) {
      this.y = Math.min(this.y + y, PLAYER_Y);
      return;
    }
    this.y = Math.max(this.y + y, this.length);
  }
  fire() {
    for (let bullet of this.bullets) {
      if (!bullet.show) {
        bullet.fire(this.lane, this.y);
        break;
      }
    }
  }
}

class Bullet extends Entity {
  constructor(lane = 0, y = 0, width = 50, length = 50) {
    super(lane, y, width, length);
    this.show = false;
  }
  static generateBullets(count) {
    let bullets = [];
    for (let i = 0; i < count; i++) {
      bullets.push(new Bullet());
    }
    return bullets;
  }
  fire(lane, y) {
    this.lane = lane;
    this.y = y;
    this.show = true;
  }
  incY(y) {
    this.y -= y;
    if (this.y < 0) {
      this.show = false;
    }
  }
}
