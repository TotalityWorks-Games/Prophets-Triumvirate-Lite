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
import { ThirstyPelikanInteriorResources } from './Resources';
import { Wolfkin1 } from '../../../../Actors/NPCs/Citizens/Wolfkin1';
import { DIRECTIONS, LOCATIONS, SCENE_STATE } from '../../../../constants';
import { uiManager } from '../../../../Managers/UIManager';
import { ThirstyPelikanInteriorDialogues } from './Dialogues';
import { musicManager } from '../../../../Managers/MusicManager';

class ThirstyPelikan extends Scene {
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
      vec(330, 580),
      ThirstyPelikanInteriorResources,
      DIRECTIONS.UP
    );
    engine.currentScene.add(player);
    engine.currentScene.camera.strategy.lockToActor(player);
    engine.currentScene.camera.zoom = 0.8;

    // add all npcs to game
    npcs.forEach((character) => {
      engine.add(character);
    });

    ThirstyPelikanInteriorResources.TiledMap.addToScene(engine.currentScene);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    if (this.game_container.className === SCENE_STATE.TALKING) {
      uiManager.displayDialogue(ThirstyPelikanInteriorDialogues);
    }

    if (this.game_container.className !== SCENE_STATE.TALKING) {
      uiManager.cleanupDialogue();
    }
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    if (musicManager.location !== LOCATIONS.PALACE) {
      musicManager.updateLocation(LOCATIONS.PALACE);
      musicManager.startMusic(ThirstyPelikanInteriorResources);
    }
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap =
      ThirstyPelikanInteriorResources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth =
      ThirstyPelikanInteriorResources.TiledMap.getTileLayers()[0].width;
    const tileHeight =
      ThirstyPelikanInteriorResources.TiledMap.getTileLayers()[0].height;

    const mapBounds = new BoundingBox({
      left: tilemap.pos.x,
      top: tilemap.pos.y,
      bottom: tilemap.pos.y + tileWidth * 35,
      right: tilemap.pos.y + tileHeight * 35,
    });
    engine.currentScene.camera.strategy.limitCameraBounds(mapBounds);
  }

  private setupNPCs() {
    // add NPCs
    const wolfkinSpriteSheet = SpriteSheet.fromImageSource({
      image:
        ThirstyPelikanInteriorResources.WolfkinSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 8,
        columns: 12,
      },
    });

    const citizenOne = new Wolfkin1(
      vec(250, 250),
      wolfkinSpriteSheet,
      'Wolfkin Citizen One'
    );

    return [citizenOne];
  }
}

export const thirstyPelikanInteriorScene = new ThirstyPelikan();

// loader
export const ironclawThirstyPelikanSceneLoader = new DefaultLoader();
for (let resource of Object.values(ThirstyPelikanInteriorResources)) {
  ironclawThirstyPelikanSceneLoader.addResource(resource);
}
