import { getRandomInt } from "./utils.js";
import {
  GAME_HEIGHT,
  NO_OF_LANES,
  PLAYER_Y,
  PLAYER_VELOCITY,
  VEHICLE_WIDTH,
} from "./constants.js";
const BULLET_COUNT = 2;
const RELOAD_TIME = 100;

export default class Vehicle {
  constructor(lane, y, width, length) {
    this.lane = lane;
    this.y = y;
    this.length = length;
    this.width = width;
  }
  static GenerateVehicles(count) {
    const enemies = [];
    for (let i = 0; i < count; i++) {
      enemies.push(
        new Vehicle(getRandomInt(3), -i * 500, VEHICLE_WIDTH, GAME_HEIGHT / 5)
      );
    }
    return enemies;
  }
  incY(y) {
    this.y += y;
    if (this.y > this.length + GAME_HEIGHT) {
      this.randomizePos();
    }
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
  isColliding(vehicle) {
    if (this.lane != vehicle.lane) {
      return false;
    } else if (
      vehicle.y > this.y + this.length ||
      this.y > vehicle.y + vehicle.length
    ) {
      return false;
    }
    return true;
  }
}

export class Player extends Vehicle {
  constructor(lane, y, width, length) {
    super(lane, y, width, length);
    this.bulletCount = BULLET_COUNT;
    this.bullets = Bullet.generateBullets(this.bulletCount);
    this.health = 3;
    this.invincible = false;
    this.reloading = undefined;
  }
  incY(y) {
    if (y > 0) {
      this.y = Math.min(this.y + y, PLAYER_Y);
      return;
    }
    this.y = Math.max(this.y + y, this.length);
  }
  setInvincible() {
    this.invincible = true;
    setTimeout(() => (this.invincible = false), 2000);
  }
  isInvinsible() {
    return this.invincible;
  }
  incHealth(count) {
    this.health += count;
    return this.health;
  }
  move(key) {
    if (key === "ArrowLeft") {
      this.goLeft();
    } else if (key === "ArrowRight") {
      this.goRight();
    } else if (key === "ArrowUp") {
      this.incY(-PLAYER_VELOCITY);
    } else if (key === "ArrowDown") {
      this.incY(PLAYER_VELOCITY);
    } else if (key === " ") {
      this.fire();
    }
  }
  fire() {
    // this.bulletCount -= 1;
    // if (this.bulletCount <= 0) {
    //   if (!this.reloading) {
    //     this.reloading = setTimeout(() => {
    //       this.bulletCount = 2;
    //       clearTimeout(this.reloading);
    //       this.reloading = undefined;
    //     }, RELOAD_TIME);
    //   }
    //   return;
    // }
    for (let bullet of this.bullets) {
      if (!bullet.show) {
        bullet.fire(this.lane, this.y);
        break;
      }
    }
  }
}

class Bullet extends Vehicle {
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
class Heart extends Vehicle {
  constructor(lane = 0, y = 0, width = 50, length = 50) {
    super(lane, y, width, length);
  }
}
