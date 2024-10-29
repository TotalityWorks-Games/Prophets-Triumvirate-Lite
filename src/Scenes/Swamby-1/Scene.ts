import {
  BoundingBox,
  Engine,
  ImageSource,
  Keys,
  Loader,
  Scene,
  SceneActivationContext,
  SpriteSheet,
  vec,
} from 'excalibur';
import { gridCells } from '../../utils';
import { DIRECTIONS, LOCATIONS, SCENE_STATE } from '../../constants';

// import scene specific items
import { SwambyResources } from './Resources';
import { SwambyDialogues } from './Dialogues';

// import managers
import { uiManager } from '../../Managers/UIManager';
import { musicManager } from '../../Managers/MusicManager';

// import Actors
import { MainGuy } from '../../Actors/Main/Player';
import { Wolfkin1 } from '../../Actors/NPCs/Citizens/Wolfkin1';

class Swamby extends Scene {
  game_container!: HTMLElement;
  constructor() {
    super();
  }

  onInitialize(engine: Engine): void {
    this.game_container = document.getElementById('game')!;

    this.setCameraBoundaries(engine);
    const npcs = this.setupNPCs();

    // add player character
    /* Default Player Location: pos: vec(2300, 2550), */
    const player = new MainGuy(
      vec(gridCells(16), gridCells(17)),
      SwambyResources
    );
    engine.currentScene.add(player);
    engine.currentScene.camera.zoom = 0.8;
    musicManager.startMusic(SwambyResources);

    // add all npcs to game
    npcs.forEach((character) => {
      engine.add(character);
    });

    engine.currentScene.camera.strategy.lockToActor(player);
    SwambyResources.TiledMap.addToScene(engine.currentScene);
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    if (musicManager.location !== LOCATIONS.IRONCLAW_PORT) {
      musicManager.updateLocation(LOCATIONS.IRONCLAW_PORT);
      musicManager.startMusic(SwambyResources);
    }
  }

  onDeactivate(_context: SceneActivationContext): void {}

  onPreUpdate(engine: Engine, _delta: number): void {
    if (engine.input.keyboard.isHeld(Keys.ShiftRight)) {
      engine.goToScene('swambySmallHouseInterior1');
    }

    if (this.game_container.className === SCENE_STATE.TALKING) {
      uiManager.displayDialogue(SwambyDialogues);
    }

    if (this.game_container.className !== SCENE_STATE.TALKING) {
      uiManager.cleanupDialogue();
    }
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap = SwambyResources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth = SwambyResources.TiledMap.getTileLayers()[0].width;
    const tileHeight = SwambyResources.TiledMap.getTileLayers()[0].height;

    const mapBounds = new BoundingBox({
      left: tilemap.pos.x,
      top: tilemap.pos.y,
      bottom: tilemap.pos.y + tileWidth * 90,
      right: tilemap.pos.y + tileHeight * 32,
    });
    engine.currentScene.camera.strategy.limitCameraBounds(mapBounds);
  }

  private setupNPCs() {
    const wolfkinSpriteSheet = SpriteSheet.fromImageSource({
      image: SwambyResources.WolfkinSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 8,
        columns: 12,
      },
    });

    const citizenOne = new Wolfkin1(
      vec(gridCells(3), gridCells(3)),
      wolfkinSpriteSheet,
      'Wolfkin Citizen One',
      DIRECTIONS.RIGHT
    );

    return [citizenOne];
  }
}

export const swambyScene = new Swamby();

// loader
export const swambySceneLoader = new Loader();
for (let resource of Object.values(SwambyResources)) {
  swambySceneLoader.addResource(resource);
}
