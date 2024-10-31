import { Actor, CollisionType, Vector } from 'excalibur';

export class Citizen extends Actor {
  constructor(pos: Vector) {
    super({
      pos,
      radius: 10,
      width: 32,
      height: 32,
      collisionType: CollisionType.Fixed,
    });

    this.z = 100;
    this.scale = new Vector(1.8, 1.8);
  }
}
