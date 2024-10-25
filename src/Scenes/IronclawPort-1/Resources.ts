import { TiledResource } from '@excaliburjs/plugin-tiled';
import { ImageSource, ImageFiltering, Sound, Resource } from 'excalibur';

// import map
import ironclawPortMapPath from '../../../Resources/TMX/IronClawPort.tmx?url';

// import music
import harborMP3 from '../../../Resources/Sounds/Music/Harbor 1 - Treasure Island (Loopable).mp3';
import harborOgg from '../../../Resources/Sounds/Music/Harbor 1 - Treasure Island (Loopable).ogg';
import harborWav from '../../../Resources/Sounds/Music/Harbor 1 - Treasure Island (Loopable).wav';

// import sounds
import collisionSound from '../../../Resources/Sounds/Effects/bump-dur2Short-pitch1Low.wav';
import walkingSound from '../../../Resources/Sounds/Effects/Steps_carpet-013.ogg';
import talkingSound from '../../../Resources/Sounds/Effects/bounce-dur2Short-pitch3High.wav';

// import spritesheets
import heroPath from '../../../Resources/Sheets/Characters/Main/Player/Character006.png?url';
import heroRunningPath from '../../../Resources/Sheets/Characters/Main/Player/Chara006.png?url';
import delsaranPath from '../../../Resources/Sheets/Characters/Main/Delsaran/Character041.png?url';
import campGravesSetPath from '../../../Resources/Sheets/Locations/Camp_Graves.png?url';
import clBuildingsSetPath from '../../../Resources/Sheets/Locations/CL_Buildings.png?url';
import clMainLevelSetPath from '../../../Resources/Sheets/Locations/CL_MainLev.png?url';
import furnituresSetPath from '../../../Resources/Sheets/Locations/furnitures.png?url';
import harborSetPath from '../../../Resources/Sheets/Locations/Harbor.png?url';
import housesOutsideSetPath from '../../../Resources/Sheets/Locations/houses_outside.png?url';
import lantern1SetPath from '../../../Resources/Sheets/Locations/Lantern1.png?url';
import lantern2SetPath from '../../../Resources/Sheets/Locations/Lantern2.png?url';
import propsBSetPath from '../../../Resources/Sheets/Locations/propsB.png?url';
import shipsSetPath from '../../../Resources/Sheets/Locations/Ships.png?url';
import smallObjectsSetPath from '../../../Resources/Sheets/Locations/smallobj.png?url';
import waterSetPath from '../../../Resources/Sheets/Locations/water.png?url';

// import tilesets
import campGravesTsxPath from '../../../Resources/TSX/Camp_Graves.tsx?url';
import clBuildingsTsxPath from '../../../Resources/TSX/CL_Buildings.tsx?url';
import clMainLevelTsxPath from '../../../Resources/TSX/CL_MainLev.tsx?url';
import furnituresTsxPath from '../../../Resources/TSX/furnitures.tsx?url';
import harborTsxPath from '../../../Resources/TSX/Harbor.tsx?url';
import housesOutsideTsxPath from '../../../Resources/TSX/houses_outside.tsx?url';
import lantern1TsxPath from '../../../Resources/TSX/Lantern1.tsx?url';
import lantern2TsxPath from '../../../Resources/TSX/Lantern2.tsx?url';
import propsBTsxPath from '../../../Resources/TSX/propsB.tsx?url';
import shipsTsxPath from '../../../Resources/TSX/Ships.tsx?url';
import smallObjectsTsxPath from '../../../Resources/TSX/smallobj.tsx?url';
import waterTsxPath from '../../../Resources/TSX/water.tsx?url';

export const IronclawPortResources = {
  HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  HeroRunningSpriteSheetPng: new ImageSource(
    heroRunningPath,
    false,
    ImageFiltering.Pixel
  ),
  DelsaranSpriteSheetPng: new ImageSource(
    delsaranPath,
    false,
    ImageFiltering.Pixel
  ),
  Music: new Sound(harborMP3, harborWav, harborOgg),
  CollisionSound: new Sound(collisionSound),
  WalkingSound: new Sound(walkingSound),
  TalkingSound: new Sound(talkingSound),
  TiledMap: new TiledResource(ironclawPortMapPath, {
    useTilemapCameraStrategy: true,
    pathMap: [
      { path: 'IronClawPort.tmx', output: ironclawPortMapPath }, // map
      { path: 'Camp_Graves.png', output: campGravesSetPath }, // spritesheet
      { path: 'CL_Buildings.png', output: clBuildingsSetPath }, // spritesheet
      { path: 'CL_MainLev.png', output: clMainLevelSetPath }, // spritesheet
      { path: 'furnitures.png', output: furnituresSetPath }, // spritesheet
      { path: 'Harbor.png', output: harborSetPath }, // spritesheet
      { path: 'houses_outside.png', output: housesOutsideSetPath }, // spritesheet
      { path: 'Lantern1.png', output: lantern1SetPath }, // spritesheet
      { path: 'Lantern2.png', output: lantern2SetPath }, // spritesheet
      { path: 'propsB.png', output: propsBSetPath }, // spritesheet
      { path: 'Ships.png', output: shipsSetPath }, // spritesheet
      { path: 'smallobj.png', output: smallObjectsSetPath }, // spritesheet
      { path: 'water.png', output: waterSetPath }, // spritesheet
      { path: 'Camp_Graves.tsx', output: campGravesTsxPath }, // tileset
      { path: 'CL_Buildings.tsx', output: clBuildingsTsxPath }, // tileset
      { path: 'CL_MainLev.tsx', output: clMainLevelTsxPath }, // tileset
      { path: 'furnitures.tsx', output: furnituresTsxPath }, // tileset
      { path: 'Harbor.tsx', output: harborTsxPath }, // tileset
      { path: 'houses_outside.tsx', output: housesOutsideTsxPath }, // tileset
      { path: 'Lantern1.tsx', output: lantern1TsxPath }, // tileset
      { path: 'Lantern2.tsx', output: lantern2TsxPath }, // tileset
      { path: 'propsB.tsx', output: propsBTsxPath }, // tileset
      { path: 'Ships.tsx', output: shipsTsxPath }, // tileset
      { path: 'smallobj.tsx', output: smallObjectsTsxPath }, // tileset
      { path: 'water.tsx', output: waterTsxPath }, // tileset
    ],
  }),
  campGravesTsxResource: new Resource(campGravesTsxPath, 'text'),
  clBuildingsTsxResource: new Resource(clBuildingsTsxPath, 'text'),
  clMainLevelTsxResource: new Resource(clMainLevelTsxPath, 'text'),
  furnituresTsxResource: new Resource(furnituresTsxPath, 'text'),
  harborTsxResource: new Resource(harborTsxPath, 'text'),
  housesOutsideTsxResource: new Resource(housesOutsideTsxPath, 'text'),
  lantern1TsxResource: new Resource(lantern1TsxPath, 'text'),
  lantern2TsxResource: new Resource(lantern2TsxPath, 'text'),
  propsBTsxResource: new Resource(propsBTsxPath, 'text'),
  shipsTsxResource: new Resource(shipsTsxPath, 'text'),
  smallObjectsTsxResource: new Resource(smallObjectsTsxPath, 'text'),
  waterTsxResource: new Resource(waterTsxPath, 'text'),
} as const;
