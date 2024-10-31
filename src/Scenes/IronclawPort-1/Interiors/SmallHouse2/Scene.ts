import {
  // BoundingBox,
  DefaultLoader,
  Engine,
  ImageSource,
  Scene,
  SpriteSheet,
  vec,
} from 'excalibur';
import { MainGuy } from '../../../../Actors/Main/Player';
import { SmallHouseInterior2Resources } from './Resources';
import { Wolfkin1 } from '../../../../Actors/NPCs/Citizens/Wolfkin1';
import { DIRECTIONS, SCENE_STATE } from '../../../../constants';
import { uiManager } from '../../../../Managers/UIManager';
import { SmallHouseInterior2Dialogues } from './Dialogues';
import { gridCells } from '../../../../utils';

class SmallHouse2 extends Scene {
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
      SmallHouseInterior2Resources,
      DIRECTIONS.UP
    );
    engine.currentScene.add(player);
    engine.currentScene.camera.strategy.lockToActor(player);
    engine.currentScene.camera.zoom = 0.8;

    // add all npcs to game
    npcs.forEach((character) => {
      engine.add(character);
    });

    SmallHouseInterior2Resources.TiledMap.addToScene(engine.currentScene);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    if (this.game_container.className === SCENE_STATE.TALKING) {
      uiManager.displayDialogue(SmallHouseInterior2Dialogues);
    }

    if (this.game_container.className !== SCENE_STATE.TALKING) {
      uiManager.cleanupDialogue();
    }
  }

  private setCameraBoundaries(_engine: Engine) {
    // add map boundaries for camera
    // const tilemap =
    //   SmallHouseInterior2Resources.TiledMap.getTileLayers()[0].tilemap;
    // const tileWidth =
    //   SmallHouseInterior2Resources.TiledMap.getTileLayers()[0].width;
    // const tileHeight =
    //   SmallHouseInterior2Resources.TiledMap.getTileLayers()[0].height;
    // const mapBounds = new BoundingBox({
    //   left: tilemap.pos.x,
    //   top: tilemap.pos.y,
    //   bottom: tilemap.pos.y + tileWidth * 35,
    //   right: tilemap.pos.y + tileHeight * 35,
    // });
    // engine.currentScene.camera.strategy.limitCameraBounds(mapBounds);
  }

  private setupNPCs() {
    // add NPCs
    const wolfkinSpriteSheet = SpriteSheet.fromImageSource({
      image: SmallHouseInterior2Resources.WolfkinSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 26,
        spriteHeight: 36,
        rows: 8,
        columns: 12,
      },
    });

    const citizenOne = new Wolfkin1(
      vec(gridCells(2), gridCells(6)),
      wolfkinSpriteSheet,
      'Wolfkin Citizen One'
    );

    return [citizenOne];
  }
}

export const smallHouseInterior2Scene = new SmallHouse2();

// loader
export const smallHouseInterior2SceneLoader = new DefaultLoader();
for (let resource of Object.values(SmallHouseInterior2Resources)) {
  smallHouseInterior2SceneLoader.addResource(resource);
}
