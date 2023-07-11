import { getRandomInt } from "./utils.js";
import { GAME_HEIGHT, NO_OF_LANES, VEHICLE_WIDTH } from "./constants.js";

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
    if (this.y > GAME_HEIGHT || this.y + this.length < 0) {
      this.show = false;
    } else {
      this.show = true;
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
  draw(drawCallback) {
    if (this.show) {
      drawCallback(this);
    }
  }
}
