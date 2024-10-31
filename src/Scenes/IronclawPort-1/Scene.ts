import {
  BoundingBox,
  Engine,
  ImageSource,
  Loader,
  Scene,
  SceneActivationContext,
  SpriteSheet,
  vec,
} from 'excalibur';
import { gridCells } from '../../utils';
import { DIRECTIONS, LOCATIONS, SCENE_STATE } from '../../constants';

// import scene specific items
import { IronclawPortResources } from './Resources';
import { IronclawPortDialogues } from './Dialogues';

// import managers
import { uiManager } from '../../Managers/UIManager';
import { musicManager } from '../../Managers/MusicManager';

// import Actors
import { MainGuy } from '../../Actors/Main/Player';
import { Delsaran } from '../../Actors/Main/Delsaran';
import { Guard } from '../../Actors/NPCs/Guard';
import { Wolfkin1 } from '../../Actors/NPCs/Citizens/Wolfkin1';
import { Wolfkin2 } from '../../Actors/NPCs/Citizens/Wolfkin2';

class IronClawPort extends Scene {
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
      IronclawPortResources
    );
    engine.currentScene.add(player);
    engine.currentScene.camera.zoom = 0.8;
    musicManager.startMusic(IronclawPortResources);

    // add all npcs to game
    npcs.forEach((character) => {
      engine.add(character);
    });

    engine.currentScene.camera.strategy.lockToActor(player);
    IronclawPortResources.TiledMap.addToScene(engine.currentScene);
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    if (musicManager.location !== LOCATIONS.IRONCLAW_PORT) {
      musicManager.updateLocation(LOCATIONS.IRONCLAW_PORT);
      musicManager.startMusic(IronclawPortResources);
    }
  }

  onDeactivate(_context: SceneActivationContext): void {}

  onPreUpdate(_engine: Engine, _delta: number): void {
    if (this.game_container.className === SCENE_STATE.TALKING) {
      uiManager.displayDialogue(IronclawPortDialogues);
    }

    if (this.game_container.className !== SCENE_STATE.TALKING) {
      uiManager.cleanupDialogue();
    }
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap = IronclawPortResources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth = IronclawPortResources.TiledMap.getTileLayers()[0].width;
    const tileHeight = IronclawPortResources.TiledMap.getTileLayers()[0].height;

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
      image: IronclawPortResources.WolfkinSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 8,
        columns: 12,
      },
    });

    // Delsaran drinking in the harbor
    const delsaran = new Delsaran(
      vec(gridCells(2), gridCells(14)),
      IronclawPortResources.DelsaranSpriteSheetPng,
      DIRECTIONS.RIGHT
    );

    // guardOne and guardTwo block the exit to Ironclaw.
    // const guardOne = new Guard(
    //   vec(gridCells(17), gridCells(3)),
    //   wolfkinSpriteSheet,
    //   'Wolfkin Guard One'
    // );
    // const guardTwo = new Guard(
    //   vec(gridCells(19), gridCells(3)),
    //   wolfkinSpriteSheet,
    //   'Wolfkin Guard Two'
    // );

    // guardThree and guardFour watch over the Temple
    const guardThree = new Guard(
      vec(gridCells(1), gridCells(10)),
      wolfkinSpriteSheet,
      'Wolfkin Guard Three'
    );
    const guardFour = new Guard(
      vec(gridCells(7), gridCells(10)),
      wolfkinSpriteSheet,
      'Wolfkin Guard Four'
    );

    // guardThree and guardFour watch over the Temple
    const guardFive = new Guard(
      vec(gridCells(9), gridCells(10)),
      wolfkinSpriteSheet,
      'Wolfkin Guard Five'
    );
    const guardSix = new Guard(
      vec(gridCells(15), gridCells(10)),
      wolfkinSpriteSheet,
      'Wolfkin Guard Six'
    );

    const citizenOne = new Wolfkin1(
      vec(gridCells(29), gridCells(18)),
      wolfkinSpriteSheet,
      'Wolfkin Citizen One',
      DIRECTIONS.RIGHT
    );

    const citizenTwo = new Wolfkin2(
      vec(gridCells(14), gridCells(18)),
      wolfkinSpriteSheet,
      'Wolfkin Citizen Two',
      DIRECTIONS.RIGHT
    );

    const citizenThree = new Wolfkin2(
      vec(gridCells(25), gridCells(14)),
      wolfkinSpriteSheet,
      'Wolfkin Citizen Three',
      DIRECTIONS.RIGHT
    );

    return [
      delsaran,
      // guardOne,
      // guardTwo,
      guardThree,
      guardFour,
      guardFive,
      guardSix,
      citizenOne,
      citizenTwo,
      citizenThree,
    ];
  }
}

export const ironClawPortScene = new IronClawPort();

// loader
export const ironClawPortSceneLoader = new Loader();
for (let resource of Object.values(IronclawPortResources)) {
  ironClawPortSceneLoader.addResource(resource);
}
