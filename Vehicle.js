import { getRandomInt } from "./utils.js";
import { GAME_HEIGHT, NO_OF_LANES, PLAYER_Y } from "./constants.js";

export default class Vehicle {
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
  }
  incY(y) {
    if (y > 0) {
      this.y = Math.min(this.y + y, PLAYER_Y);
      return;
    }
    this.y = Math.max(this.y + y, this.length);
  }
}
