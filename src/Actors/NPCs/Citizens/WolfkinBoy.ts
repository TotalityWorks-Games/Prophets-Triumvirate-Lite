import { Vector, SpriteSheet, Engine, Animation, Sprite } from 'excalibur';
import { Citizen } from './Citizen';
import { DIRECTIONS } from '../../../constants';

export class WolfkinBoy extends Citizen {
  direction: DIRECTIONS;
  spriteSheet: SpriteSheet;
  constructor(
    pos: Vector,
    spriteSheet: SpriteSheet,
    name: string,
    direction?: DIRECTIONS
  ) {
    super(pos);
    this.pos = pos;
    this.spriteSheet = spriteSheet;
    this.direction = direction ?? DIRECTIONS.DOWN;
    this.name = name;
  }

  onInitialize(_engine: Engine): void {
    this.addAnimations();
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.graphics.use(`${this.direction}-idle`);
  }

  private addAnimations() {
    /* wolfkin1 idle column is 7
        walk columns are 3,4,5
        direction rows are 
        down:4; left:5; right:6; up:7; */
    const downIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(7, 4), // downIdle is 1,0
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(7, 5) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(7, 6) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(7, 7) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);
  }
}
