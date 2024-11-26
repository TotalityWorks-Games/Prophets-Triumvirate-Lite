import {
  SceneActivationContext,
  Scene,
  vec,
  Actor,
  Engine,
  CoordPlane,
  EasingFunctions,
  Font,
  FontUnit,
  Color,
  BaseAlign,
  Text,
} from 'excalibur';
import { Cloud } from '../../Actors/Heavens/Cloud';
import {
  MainMenuResources,
  //  Title
} from './Resources';
import { LOCATIONS } from '../../constants';
import { musicManager } from '../../Managers/MusicManager';
import { StartLoader } from '../../Loaders/startLoader';

const SCALE = vec(3, 3);

export class StartScreen extends Scene {
  title!: Actor;
  instructions!: Actor;
  override onInitialize(engine: Engine): void {
    this.engine = engine;
    this.input.pointers.on('down', () => {
      musicManager.stopMusic();
      this.engine.goToScene('ironClawExterior');
    });
    this.input.keyboard.on('press', () => {
      musicManager.stopMusic();
      this.engine.goToScene('ironClawExterior');
    });

    this.add(new Cloud(vec(800, 0), MainMenuResources.Cloud1Png));
    this.add(new Cloud(vec(400, 300), MainMenuResources.Cloud1Png));
    this.add(new Cloud(vec(700, 700), MainMenuResources.Cloud1Png));

    this.title = new Actor({
      name: 'title',
      pos: vec(400, 400),
      coordPlane: CoordPlane.Screen,
    });
    this.title.scale = SCALE;
    // this.title.graphics.use(Title);
    this.title.actions.repeatForever((ctx) => {
      ctx
        .easeBy(vec(0, -30 * SCALE.y), 1000, EasingFunctions.EaseInOutQuad)
        .easeBy(vec(0, 30 * SCALE.y), 1000, EasingFunctions.EaseInOutQuad);
    });

    this.add(this.title);

    this.instructions = new Actor({
      name: 'instructions',
      pos: vec(400, 600),
      coordPlane: CoordPlane.Screen,
    });
    const font = new Font({
      family: 'notjamslab14',
      size: 32 * SCALE.x,
      unit: FontUnit.Px,
      color: Color.White,
      baseAlign: BaseAlign.Top,
      quality: 4,
      shadow: {
        offset: vec(10, 10).scale(SCALE),
        color: Color.Black,
      },
    });
    const text = new Text({
      text: 'Click to Play!',
      font: font,
    });
    this.instructions.graphics.use(text);
    this.instructions.actions.repeatForever((ctx) => {
      ctx.rotateTo(Math.PI / 32, 0.2);
      ctx.rotateTo(-Math.PI / 32, 0.2);
    });

    this.add(this.instructions);
    musicManager.startMusic(MainMenuResources);
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    if (musicManager.location !== LOCATIONS.MAINMENU) {
      musicManager.updateLocation(LOCATIONS.MAINMENU);
      musicManager.startMusic(MainMenuResources);
    }
  }
}

export const startScreen = new StartScreen();

// loader
export const startScreenLoader = new StartLoader();
for (let resource of Object.values(MainMenuResources)) {
  startScreenLoader.addResource(resource);
}
