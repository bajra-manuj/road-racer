import Vehicle from "./Vehicle.js";

export default class Bullet extends Vehicle {
  constructor(lane = 0, y = 0, width = 50, length = 50) {
    super(lane, y, width, length);
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
