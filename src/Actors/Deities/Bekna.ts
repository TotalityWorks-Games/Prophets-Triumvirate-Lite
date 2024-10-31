import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  ImageSource,
  Sprite,
  SpriteSheet,
  Vector,
} from 'excalibur';
import { DIRECTIONS } from '../../constants';

export class Bekna extends Actor {
  direction: DIRECTIONS;
  resources: ImageSource;
  idol: boolean | undefined;
  constructor(pos: Vector, resources: ImageSource, idol?: boolean) {
    super({
      pos,
      width: 32,
      height: 32,
      collisionType: CollisionType.Fixed,
    });

    this.z = 100;
    this.scale = new Vector(2, 2);
    this.direction = DIRECTIONS.DOWN;
    this.resources = resources;
    this.name = 'Bekna';
    this.idol = idol;
  }

  onInitialize(_engine: Engine): void {
    this.addAnimations();
    if (this.idol) {
      this.scale = new Vector(1, 1);
    }
  }

  onPreUpdate(_engine: Engine, _elapsedMs: number): void {
    this.graphics.use(`${this.direction}-idle`);
  }

  addAnimations() {
    const beknaSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources as ImageSource,
      grid: {
        spriteWidth: 24,
        spriteHeight: 32,
        rows: 4,
        columns: 3,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: beknaSpriteSheet.getSprite(1, 0),
          duration: 200,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: beknaSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: beknaSpriteSheet.getSprite(1, 2) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: beknaSpriteSheet.getSprite(1, 3) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);
  }
}
