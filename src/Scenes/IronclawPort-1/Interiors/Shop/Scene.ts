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
import { ShopInteriorResources } from './Resources';
import { Wolfkin1 } from '../../../../Actors/NPCs/Citizens/Wolfkin1';
import { DIRECTIONS, LOCATIONS, SCENE_STATE } from '../../../../constants';
import { uiManager } from '../../../../Managers/UIManager';
import { shopInteriorDialogues } from './Dialogues';
import { musicManager } from '../../../../Managers/MusicManager';

class ShopInterior extends Scene {
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
      vec(160, 270),
      ShopInteriorResources,
      DIRECTIONS.UP
    );
    engine.currentScene.add(player);
    engine.currentScene.camera.strategy.lockToActor(player);
    engine.currentScene.camera.zoom = 0.8;

    // add all npcs to game
    npcs.forEach((character) => {
      engine.add(character);
    });

    ShopInteriorResources.TiledMap.addToScene(engine.currentScene);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    if (this.game_container.className === SCENE_STATE.TALKING) {
      uiManager.displayDialogue(shopInteriorDialogues);
    }

    if (this.game_container.className !== SCENE_STATE.TALKING) {
      uiManager.cleanupDialogue();
    }
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    if (musicManager.location !== LOCATIONS.SHOP) {
      musicManager.updateLocation(LOCATIONS.SHOP);
      musicManager.startMusic(ShopInteriorResources);
    }
  }

  private setCameraBoundaries(engine: Engine) {
    // add map boundaries for camera
    const tilemap = ShopInteriorResources.TiledMap.getTileLayers()[0].tilemap;
    const tileWidth = ShopInteriorResources.TiledMap.getTileLayers()[0].width;
    const tileHeight = ShopInteriorResources.TiledMap.getTileLayers()[0].height;

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
      image: ShopInteriorResources.WolfkinSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 8,
        columns: 12,
      },
    });

    const buyNpc = new Wolfkin1(
      vec(240, 120),
      wolfkinSpriteSheet,
      'Wolfkin Citizen One'
    );

    const sellNpc = new Wolfkin1(
      vec(80, 120),
      wolfkinSpriteSheet,
      'Wolfkin Citizen One'
    );

    return [buyNpc, sellNpc];
  }
}

export const shopInteriorScene = new ShopInterior();

// loader
export const shopInteriorSceneLoader = new DefaultLoader();
for (let resource of Object.values(ShopInteriorResources)) {
  shopInteriorSceneLoader.addResource(resource);
}
