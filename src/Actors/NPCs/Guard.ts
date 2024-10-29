import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  Sprite,
  SpriteSheet,
  Vector,
} from 'excalibur';
import { Direction } from '../../constants';

export class Guard extends Actor {
  direction: Direction;
  spriteSheet: SpriteSheet;
  constructor(
    pos: Vector,
    spriteSheet: SpriteSheet,
    name: string,
    direction?: Direction
  ) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Fixed,
    });

    this.z = 100;
    this.scale = new Vector(1.8, 1.8);
    this.direction = direction ?? 'down';
    this.spriteSheet = spriteSheet;
    this.name = name;
  }

  onInitialize(_engine: Engine): void {
    this.addAnimations();
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.graphics.use(`${this.direction}-idle`);
  }

  private addAnimations() {
    const downIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 0), // downIdle is
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 1) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(10, 2) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: this.spriteSheet.getSprite(1, 7) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);
  }
}
