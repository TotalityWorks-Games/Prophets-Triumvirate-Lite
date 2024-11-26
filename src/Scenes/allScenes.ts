import { Engine } from 'excalibur';
import { musicManager } from '../Managers/MusicManager';
import { LOCATIONS, SCENE_NAMES } from '../constants';

// import scenes and loaders
// import Ironclaw Scenes
import { allIronclawScenes } from './IronclawPort-1/allScenes';
// import Swamby scenes
import { swambyScene, swambySceneLoader } from './Swamby-1/Scene';
// import Routes scenes
import { route1Scene, route1SceneLoader } from './Routes/Route1/Scene';
import { startScreen, startScreenLoader } from './MainMenu/Scene';

export const allScenes = {
  // Main Menu
  start: {
    scene: startScreen,
    loader: startScreenLoader,
  },
  // Route Scenes:
  route1: {
    scene: route1Scene,
    loader: route1SceneLoader,
  },
  /*
  ALL CITY SCENES WITH INTERIORS
  */
  // Ironclaw Scenes:
  ...allIronclawScenes,
  // Swamby Scenes:
  swamby: {
    scene: swambyScene,
    loader: swambySceneLoader,
  },
};

export const handleSceneExit = (engine: Engine, scene: SCENE_NAMES) => {
  console.log(scene);
  switch (scene) {
    // Main Menu
    case SCENE_NAMES.START:
      if (musicManager.location !== LOCATIONS.MAINMENU) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    // ROUTES START
    case SCENE_NAMES.ROUTE1:
      if (musicManager.location !== LOCATIONS.ROUTES) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    // IRONCLAW SCENES START
    case SCENE_NAMES.IRONCLAW_EXTERIOR:
      if (musicManager.location !== LOCATIONS.IRONCLAW_PORT) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SCENE_NAMES.IRONCLAW_PORT_THIRSTY_PELIKAN:
      if (musicManager.location !== LOCATIONS.THIRSTY_PELIKAN) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SCENE_NAMES.IRONCLAW_PORT_SHOP_INTERIOR:
      if (musicManager.location !== LOCATIONS.SHOP) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SCENE_NAMES.IRONCLAW_PORT_TEMPLE_INTERIOR:
      if (musicManager.location !== LOCATIONS.TEMPLE) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    case SCENE_NAMES.IRONCLAW_PORT_PALACE_INTERIOR:
      if (musicManager.location !== LOCATIONS.PALACE) {
        musicManager.stopMusic();
      }
      engine.goToScene(scene);
      break;
    // case SCENE_NAMES.IRONCLAW_PORT_SMALL_HOUSE_INTERIOR1:
    case SCENE_NAMES.IRONCLAW_PORT_SMALL_HOUSE_INTERIOR2:
      engine.goToScene(scene);
      break;
    // IRONCLAW SCENES END
    //
    // SWAMBY SCENES START
    case SCENE_NAMES.SWAMBY:
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
