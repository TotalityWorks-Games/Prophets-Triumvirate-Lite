import {
  palaceInteriorScene,
  palaceInteriorSceneLoader,
} from './Interiors/IronclawPalace/Scene';
import {
  smallHouseInterior2Scene,
  smallHouseInterior2SceneLoader,
} from './Interiors/SmallHouse2/Scene';
import {
  ironclawThirstyPelikanSceneLoader,
  thirstyPelikanInteriorScene as ironclawPelikan,
} from './Interiors/ThirstyPelikan/Scene';
import { ironClawPortScene, ironClawPortSceneLoader } from './Scene';
import {
  templeInteriorScene as ironclawTempleInterior,
  templeInteriorSceneLoader as ironclawTempleInteriorLoader,
} from './Interiors/TempleOfBekna/Scene';
import {
  shopInteriorScene as ironclawShop,
  shopInteriorSceneLoader as ironclawShopLoader,
} from './Interiors/Shop/Scene';

export const allIronclawScenes = {
  // Ironclaw Scenes:
  ironClawExterior: {
    scene: ironClawPortScene,
    loader: ironClawPortSceneLoader,
  },
  ironClawPortTempleInterior: {
    scene: ironclawTempleInterior,
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
};
