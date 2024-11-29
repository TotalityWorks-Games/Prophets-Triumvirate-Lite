import {
  BoundingBox,
  Engine,
  ImageSource,
  DefaultLoader,
  Scene,
  SpriteSheet,
  vec,
  SceneActivationContext,
} from 'excalibur';
import { MainGuy } from '../../../../Actors/Main/Player';
import { PalaceInteriorResources } from './Resources';
import { DIRECTIONS, LOCATIONS, SCENE_STATE } from '../../../../constants';
import { uiManager } from '../../../../Managers/UIManager';
import { PalaceInteriorDialogues } from './Dialogues';
import { musicManager } from '../../../../Managers/MusicManager';
import { WolfkinKing } from '../../../../Actors/NPCs/Citizens/WolfkinKing';
import { gridCells } from '../../../../utils';
import { Guard } from '../../../../Actors/NPCs/Guard';
import { Wolfkin2 } from '../../../../Actors/NPCs/Citizens/Wolfkin2';
import { Iados } from '../../../../Actors/Main/Iados';

class Palace extends Scene {
  game_container!: HTMLElement;
  constructor() {
    super();
  }

  onInitialize(engine: Engine): void {
    this.game_container = document.getElementById('game')!;

    this.setCameraBoundaries(engine);
    const npcs = this.setupNPCs();

    // add player character
    const player = new MainGuy(
      vec(320, 590),
      PalaceInteriorResources,
      DIRECTIONS.UP
    );
    engine.currentScene.add(player);
    engine.currentScene.camera.strategy.lockToActor(player);
    engine.currentScene.camera.zoom = 0.8;

    // add all npcs to game
    npcs.forEach((character) => {
      engine.add(character);
    });

    // engine.currentScene.camera.strategy.lockToActor(npcs[5]);
    PalaceInteriorResources.TiledMap.addToScene(engine.currentScene);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    if (this.game_container.className === SCENE_STATE.TALKING) {
      uiManager.displayDialogue(PalaceInteriorDialogues);
    }

    if (this.game_container.className !== SCENE_STATE.TALKING) {
      uiManager.cleanupDialogue();
    }
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap = PalaceInteriorResources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth = PalaceInteriorResources.TiledMap.getTileLayers()[0].width;
    const tileHeight =
      PalaceInteriorResources.TiledMap.getTileLayers()[0].height;

    const mapBounds = new BoundingBox({
      left: tilemap.pos.x,
      top: tilemap.pos.y,
      bottom: tilemap.pos.y + tileWidth * 35,
      right: tilemap.pos.y + tileHeight * 35,
    });
    engine.currentScene.camera.strategy.limitCameraBounds(mapBounds);
  }

  private setupNPCs() {
    // add king
    const kingIronclaw = new WolfkinKing(
      vec(gridCells(10), gridCells(5)),
      PalaceInteriorResources.KingSpriteSheetPng,
      'King Ironclaw'
    );

    // Zephyrius drinking in the Thirsty Pelikan
    const iados = new Iados(
      vec(gridCells(18), gridCells(9)),
      PalaceInteriorResources.IadosSpriteSheetPng,
      DIRECTIONS.LEFT
    );

    // add NPCs
    const wolfkinSpriteSheet = SpriteSheet.fromImageSource({
      image: PalaceInteriorResources.WolfkinSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 8,
        columns: 12,
      },
    });

    const guardOne = new Guard(
      vec(gridCells(10), gridCells(13)),
      wolfkinSpriteSheet,
      'Wolfkin Guard One'
    );

    const guardTwo = new Guard(
      vec(gridCells(7), gridCells(18)),
      wolfkinSpriteSheet,
      'Wolfkin Guard Two',
      DIRECTIONS.UP
    );

    const guardThree = new Guard(
      vec(gridCells(13), gridCells(18)),
      wolfkinSpriteSheet,
      'Wolfkin Guard Three',
      DIRECTIONS.UP
    );

    const citizenOne = new Wolfkin2(
      vec(gridCells(3), gridCells(12)),
      wolfkinSpriteSheet,
      'Wolfkin Citizen One',
      DIRECTIONS.RIGHT
    );

    return [guardOne, guardTwo, guardThree, citizenOne, kingIronclaw, iados];
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    uiManager.update_state(SCENE_STATE.PLAYING);

    if (musicManager.location !== LOCATIONS.PALACE) {
      musicManager.updateLocation(LOCATIONS.PALACE);
      musicManager.startMusic(PalaceInteriorResources);
    }
  }
}

export const palaceInteriorScene = new Palace();

// loader
export const palaceInteriorSceneLoader = new DefaultLoader();
for (let resource of Object.values(PalaceInteriorResources)) {
  palaceInteriorSceneLoader.addResource(resource);
}
