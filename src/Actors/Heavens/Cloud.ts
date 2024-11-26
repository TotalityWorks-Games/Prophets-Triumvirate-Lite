import { Sprite, ImageSource, Actor, randomInRange, vec } from 'excalibur';

export class Cloud extends Actor {
  cloudSprite!: Sprite;
  resources: ImageSource;
  constructor(pos: ex.Vector, resources: ImageSource) {
    super({
      name: 'cloud',
      pos,
      vel: vec(randomInRange(-30, -100), 0),
      width: 100,
      height: 100,
    });
    this.resources = resources;
  }
  override onInitialize(_engine: ex.Engine): void {
    this.cloudSprite = this.resources.toSprite();
    this.cloudSprite.scale = vec(3, 3);
    this.graphics.use(this.cloudSprite);
  }
  override onPostUpdate(engine: ex.Engine, _delta: number): void {
    if (this.pos.x + this.cloudSprite.width < 0) {
      this.pos.x = engine.screen.contentArea.right + this.cloudSprite.width;
    }
  }
}
