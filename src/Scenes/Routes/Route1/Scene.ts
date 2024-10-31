import {
  BoundingBox,
  DefaultLoader,
  Engine,
  ImageSource,
  Scene,
  SceneActivationContext,
  SpriteSheet,
  vec,
} from 'excalibur';
import { gridCells } from '../../../utils';
import { DIRECTIONS, LOCATIONS, SCENE_STATE } from '../../../constants';

// import scene specific items
import { route1Resources } from './Resources';
import { Route1Dialogues } from './Dialogues';

// import managers
import { uiManager } from '../../../Managers/UIManager';
import { musicManager } from '../../../Managers/MusicManager';

// import Actors
import { MainGuy } from '../../../Actors/Main/Player';
import { Wolfkin1 } from '../../../Actors/NPCs/Citizens/Wolfkin1';
import { WolfkinKing } from '../../../Actors/NPCs/Citizens/WolfkinKing';
import { Wolfkin2 } from '../../../Actors/NPCs/Citizens/Wolfkin2';
import { Guard } from '../../../Actors/NPCs/Guard';

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
      vec(gridCells(10), gridCells(58)),
      route1Resources,
      DIRECTIONS.UP
    );
    engine.currentScene.add(player);
    engine.currentScene.camera.zoom = 0.8;
    musicManager.startMusic(route1Resources);

    // add all npcs to game
    npcs.forEach((character) => {
      engine.add(character);
    });

    // engine.currentScene.camera.strategy.lockToActor(npcs[3]);
    engine.currentScene.camera.strategy.lockToActor(player);
    route1Resources.TiledMap.addToScene(engine.currentScene);
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    if (musicManager.location !== LOCATIONS.ROUTES) {
      musicManager.updateLocation(LOCATIONS.ROUTES);
      musicManager.startMusic(route1Resources);
    }
  }

  onDeactivate(_context: SceneActivationContext): void {}

  onPreUpdate(_engine: Engine, _delta: number): void {
    if (this.game_container.className === SCENE_STATE.TALKING) {
      uiManager.displayDialogue(Route1Dialogues);
    }

    if (this.game_container.className !== SCENE_STATE.TALKING) {
      uiManager.cleanupDialogue();
    }
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap = route1Resources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth = route1Resources.TiledMap.getTileLayers()[0].width;
    const tileHeight = route1Resources.TiledMap.getTileLayers()[0].height;

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
      image: route1Resources.WolfkinSpriteSheetPng as ImageSource,
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

    const citizenTwo = new Wolfkin2(
      vec(gridCells(10), gridCells(6)),
      wolfkinSpriteSheet,
      'Wolfkin Citizen Two'
    );

    const citizenThree = new Wolfkin1(
      vec(gridCells(19), gridCells(12)),
      wolfkinSpriteSheet,
      'Wolfkin Citizen Three',
      DIRECTIONS.LEFT
    );

    const citizenFour = new Wolfkin1(
      vec(gridCells(19), gridCells(3)),
      wolfkinSpriteSheet,
      'Wolfkin Citizen Four',
      DIRECTIONS.UP
    );

    const warriorOne = new Guard(
      vec(gridCells(17), gridCells(15)),
      wolfkinSpriteSheet,
      'Wolfkin Warrior One',
      DIRECTIONS.DOWN
    );

    const chieftanValour = new WolfkinKing(
      vec(gridCells(12), gridCells(14)),
      route1Resources.KingSpriteSheetPng,
      'Chieftan Valour',
      DIRECTIONS.LEFT
    );

    return [
      citizenOne,
      citizenTwo,
      citizenThree,
      citizenFour,
      warriorOne,
      chieftanValour,
    ];
  }
}

export const route1Scene = new Swamby();

// loader
export const route1SceneLoader = new DefaultLoader();
for (let resource of Object.values(route1Resources)) {
  route1SceneLoader.addResource(resource);
}
