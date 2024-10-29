import {
  Vector,
  SpriteSheet,
  Engine,
  Animation,
  Sprite,
  ImageSource,
} from 'excalibur';
import { Citizen } from './Citizen';
import { DIRECTIONS } from '../../../constants';

export class WolfkinKing extends Citizen {
  direction: DIRECTIONS;
  resources: ImageSource;
  constructor(
    pos: Vector,
    resources: ImageSource,
    name: string,
    direction?: DIRECTIONS
  ) {
    super(pos);
    this.pos = pos;
    this.resources = resources;
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
    const wolfkinKingSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 4,
        columns: 3,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: wolfkinKingSpriteSheet.getSprite(1, 0),
          duration: 150,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: wolfkinKingSpriteSheet.getSprite(1, 1) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: wolfkinKingSpriteSheet.getSprite(1, 2) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: wolfkinKingSpriteSheet.getSprite(1, 3) as Sprite,
          duration: 150,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);
  }
}
