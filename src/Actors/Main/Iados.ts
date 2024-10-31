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
import { DIRECTIONS, RACES, SEXES } from '../../constants';

export class Iados extends Actor {
  direction: DIRECTIONS;
  resources: ImageSource;
  race: RACES;
  sex: SEXES;
  constructor(pos: Vector, resources: ImageSource, direction?: DIRECTIONS) {
    super({
      pos,
      radius: 10,
      width: 32,
      height: 32,
      collisionType: CollisionType.Fixed,
    });

    this.z = 100;
    this.scale = new Vector(2, 2);
    this.direction = direction ?? DIRECTIONS.DOWN;
    this.resources = resources;
    this.name = 'Iados';
    this.race = RACES.ACCURSED;
    this.sex = SEXES.MALE;
  }

  onInitialize(_engine: Engine): void {
    this.addAnimations();
  }

  onPreUpdate(_engine: Engine, _elapsedMs: number): void {
    this.graphics.use(`${this.direction}-idle`);
  }

  addAnimations() {
    const delsaranSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources as ImageSource,
      grid: {
        spriteWidth: 24,
        spriteHeight: 48,
        rows: 4,
        columns: 3,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: delsaranSpriteSheet.getSprite(1, 0),
          duration: 200,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: delsaranSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: delsaranSpriteSheet.getSprite(1, 2) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: delsaranSpriteSheet.getSprite(1, 3) as Sprite,
          duration: 200,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);
  }
}
