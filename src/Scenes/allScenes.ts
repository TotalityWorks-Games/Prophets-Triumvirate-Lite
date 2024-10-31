import { Engine } from 'excalibur';
import { musicManager } from '../Managers/MusicManager';
import { LOCATIONS } from '../constants';

// import scenes and loaders
// import Ironclaw Scenes
import {
  ironClawPortScene,
  ironClawPortSceneLoader,
} from './IronclawPort-1/Scene';
import {
  templeInteriorScene as ironclawTermpleInterior,
  templeInteriorSceneLoader as ironclawTempleInteriorLoader,
} from './IronclawPort-1/Interiors/TempleOfBekna/Scene';
import {
  palaceInteriorScene,
  palaceInteriorSceneLoader,
} from './IronclawPort-1/Interiors/IronclawPalace/Scene';
// import Swamby scenes
import { swambyScene, swambySceneLoader } from './Swamby-1/Scene';
import {
  smallHouseInterior2Scene,
  smallHouseInterior2SceneLoader,
} from './IronclawPort-1/Interiors/SmallHouse2/Scene';
import {
  shopInteriorScene as ironclawShop,
  shopInteriorSceneLoader as ironclawShopLoader,
} from './IronclawPort-1/Interiors/Shop/Scene';
import {
  ironclawThirstyPelikanSceneLoader,
  thirstyPelikanInteriorScene as ironclawPelikan,
} from './IronclawPort-1/Interiors/ThirstyPelikan/Scene';

export const allScenes = {
  // Ironclaw Scenes:
  start: {
    scene: ironClawPortScene,
    loader: ironClawPortSceneLoader,
  },
  ironClawPortTempleInterior: {
    scene: ironclawTermpleInterior,
    loader: ironclawTempleInteriorLoader,
  },
  ironClawPlaceInterior: {
    scene: palaceInteriorScene,
    loader: palaceInteriorSceneLoader,
  },
  ironClawPortSmallHouseInterior2: {
    scene: smallHouseInterior2Scene,
    loader: smallHouseInterior2SceneLoader,
  },
  ironClawPortShopInterior: {
    scene: ironclawShop,
    loader: ironclawShopLoader,
  },
  ironClawPortThirstyPelikan: {
    scene: ironclawPelikan,
    loader: ironclawThirstyPelikanSceneLoader,
  },
  // Swamby Scenes:
  swamby: {
    scene: swambyScene,
    loader: swambySceneLoader,
  },
};

export enum SceneNames {
  // Ironclaw Scenes
  START = 'start',
  IRONCLAW_PORT_THIRSTY_PELIKAN = 'ironClawPortThirstyPelikan',
  IRONCLAW_PORT_TEMPLE_INTERIOR = 'ironClawPortTempleInterior',
  IRONCLAW_PORT_SHOP_INTERIOR = 'ironClawPortShopInterior',
  // IRONCLAW_PORT_SMALL_HOUSE_INTERIOR1 = 'ironClawPortSmallHouseInterior1',
  IRONCLAW_PORT_SMALL_HOUSE_INTERIOR2 = 'ironClawPortSmallHouseInterior2',
  IRONCLAW_PORT_PALACE_INTERIOR = 'ironClawPlaceInterior',
  // Swamby Scenes
  SWAMBY = 'swamby',
}

export const handleSceneExit = (engine: Engine, scene: SceneNames) => {
  console.log(scene);
  switch (scene) {
    // IRONCLAW SCENES START
    case SceneNames.START:
      if (musicManager.location !== LOCATIONS.IRONCLAW_PORT) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SceneNames.IRONCLAW_PORT_THIRSTY_PELIKAN:
      if (musicManager.location !== LOCATIONS.THIRSTY_PELIKAN) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SceneNames.IRONCLAW_PORT_SHOP_INTERIOR:
      if (musicManager.location !== LOCATIONS.SHOP) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SceneNames.IRONCLAW_PORT_TEMPLE_INTERIOR:
      if (musicManager.location !== LOCATIONS.TEMPLE) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SceneNames.IRONCLAW_PORT_PALACE_INTERIOR:
      if (musicManager.location !== LOCATIONS.PALACE) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    // case SceneNames.IRONCLAW_PORT_SMALL_HOUSE_INTERIOR1:
    case SceneNames.IRONCLAW_PORT_SMALL_HOUSE_INTERIOR2:
      engine.goToScene(scene);
      break;
    // IRONCLAW SCENES END
    //
    // SWAMBY SCENES START
    case SceneNames.SWAMBY:
      if (musicManager.location !== LOCATIONS.SWAMBY) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    // SWAMBY SCENES END
    default:
      break;
  }
};
