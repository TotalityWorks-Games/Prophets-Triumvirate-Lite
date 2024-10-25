import { Engine } from 'excalibur';
import { musicManager } from '../Managers/MusicManager';
import { LOCATIONS } from '../constants';

// import scenes and loaders
import {
  ironClawPortScene,
  ironClawPortSceneLoader,
} from './IronclawPort-1/Scene';

export const allScenes = {
  start: {
    scene: ironClawPortScene,
    loader: ironClawPortSceneLoader,
  },
};

export enum SceneNames {
  START = 'start',
  IRONCLAW_PORT_THIRSTY_PELIKAN = 'ironClawPortThirstyPelikan',
  IRONCLAW_PORT_TEMPLE_INTERIOR = 'ironClawPortTempleInterior',
  IRONCLAW_PORT_SHOP_INTERIOR = 'ironClawPortShopInterior',
  IRONCLAW_PORT_SMALL_HOUSE_INTERIOR1 = 'ironClawPortSmallHouseInterior1',
  IRONCLAW_PORT_SMALL_HOUSE_INTERIOR2 = 'ironClawPortSmallHouseInterior2',
  IRONCLAW_PORT_PALACE_INTERIOR = 'ironClawPlaceInterior',
}

export const handleSceneExit = (engine: Engine, scene: SceneNames) => {
  console.log(scene);
  switch (scene) {
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
    case SceneNames.IRONCLAW_PORT_SMALL_HOUSE_INTERIOR1:
    case SceneNames.IRONCLAW_PORT_SMALL_HOUSE_INTERIOR2:
      engine.goToScene(scene);
      break;
    default:
      break;
  }
};
