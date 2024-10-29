import { Vector, SpriteSheet, Engine, Animation, Sprite } from 'excalibur';
import { Citizen } from './Citizen';
import { Direction } from '../../../constants';

export class Wolfkin1 extends Citizen {
  direction: Direction;
  spriteSheet: SpriteSheet;
  constructor(
    pos: Vector,
    spriteSheet: SpriteSheet,
    name: string,
    direction?: Direction
  ) {
    super(pos);
    this.pos = pos;
    this.spriteSheet = spriteSheet;
    this.direction = direction ?? 'down';
    this.name = name;
  }

  onInitialize(_engine: Engine): void {
    this.addAnimations();
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.graphics.use(`${this.direction}-idle`);
  }

  private addAnimations() {
    /* wolfkin1 idle column is 1
        walk columns are 0,1,2
        direction rows are 
        down:0; left:1; right:2; up:3; */
    const downIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(1, 0), // downIdle is 1,0
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(1, 1) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(1, 2) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(1, 3) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);
  }
}
