import { Actor, CollisionType, Engine, Vector } from 'excalibur';

export class Citizen extends Actor {
  constructor(pos: Vector) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Fixed,
    });

    this.z = 100;
    this.scale = new Vector(1.8, 1.8);
  }

  onInitialize(_engine: Engine): void {
    // typeTwo idle column is 1 -- walk columns are 0,1,2 -- direction rows are down:4; left:5; right:6; up:7;
    // typeThree idle column is 4 -- walk columns are 3,4,5 -- direction rows are down:0; left:1; right:2; up:3;
    // typeFour idle column is 7 -- walk columns are 6,7,8 -- direction rows are down:4; left:5; right:6; up:7;
  }
}
