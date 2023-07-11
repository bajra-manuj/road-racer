import { PLAYER_Y } from "./constants.js";
import Vehicle from "./Vehicle.js";
import Bullet from "./Bullet.js";
const BULLET_COUNT = 2;
const RELOAD_TIME = 100;

export default class Player extends Vehicle {
  constructor(lane, y, width, length) {
    super(lane, y, width, length);
    this.bulletCount = BULLET_COUNT;
    this.bullets = Bullet.generateBullets(this.bulletCount);
    this.health = 3;
    this.invincible = false;
    this.reloading = undefined;
    this.show = true;
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
  hasHitTarget(target) {
    let hit = false;
    this.bullets.forEach((bullet) => {
      if (bullet.show && bullet.isColliding(target)) {
        bullet.show = false;
        hit = true;
      }
    });
    return hit;
  }
}
