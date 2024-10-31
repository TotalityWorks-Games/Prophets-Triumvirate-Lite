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
import { Wolfkin1 } from '../../../../Actors/NPCs/Citizens/Wolfkin1';
import { DIRECTIONS, LOCATIONS, SCENE_STATE } from '../../../../constants';
import { uiManager } from '../../../../Managers/UIManager';
import { PalaceInteriorDialogues } from './Dialogues';
import { musicManager } from '../../../../Managers/MusicManager';
import { WolfkinKing } from '../../../../Actors/NPCs/Citizens/WolfkinKing';

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
      vec(320, 85),
      PalaceInteriorResources.KingSpriteSheetPng,
      'King Ironclaw'
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

    const citizenOne = new Wolfkin1(
      vec(50, 150),
      wolfkinSpriteSheet,
      'Wolfkin Citizen One'
    );

    return [citizenOne, kingIronclaw];
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
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
