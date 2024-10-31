import { TiledResource } from '@excaliburjs/plugin-tiled';
import { ImageSource, ImageFiltering, Sound, Resource } from 'excalibur';

// import map
import thirstyPelikanInterior from '../../../../../Resources/TMX/ironclawPort-Thirsty-Pelikan.tmx?url';

// import music
import thirstyPelikanMP3 from '../../../../../Resources/Sounds/Music/OST 1 - Tandaradei (Loopable).mp3';
import thirstyPelikanOgg from '../../../../../Resources/Sounds/Music/OST 1 - Tandaradei (Loopable).ogg';
import thirstyPelikanWav from '../../../../../Resources/Sounds/Music/OST 1 - Tandaradei (Loopable).wav';

// import sounds
import collisionSound from '../../../../../Resources/Sounds/Effects/bump-dur2Short-pitch1Low.wav';
import walkingSound from '../../../../../Resources/Sounds/Effects/Steps_carpet-013.ogg';
import talkingSound from '../../../../../Resources/Sounds/Effects/bounce-dur2Short-pitch3High.wav';

// import spritesheets
import heroPath from '../../../../../Resources/Sheets/Characters/Main/Player/Character006.png?url';
import heroRunningPath from '../../../../../Resources/Sheets/Characters/Main/Player/Chara006.png?url';
import wolfkinPath from '../../../../../Resources/Sheets/Characters/Wolfkin/beast_tribe_1.png?url';
import clBuildingsSetPath from '../../../../../Resources/Sheets/Locations/CL_Buildings.png?url';
import clCraftingSetPath from '../../../../../Resources/Sheets/Locations/CL_Crafting.png?url';
import waterSetPath from '../../../../../Resources/Sheets/Locations/water.png?url';

// import tilesets
import clBuildingsTsxPath from '../../../../../Resources/TSX/CL_Buildings.tsx?url';
import cltBuildingsTsxPath from '../../../../../Resources/TSX/CLT_Buildings.tsx?url';
import clCraftingTsxPath from '../../../../../Resources/TSX/CL_Crafting.tsx?url';
import waterTsxPath from '../../../../../Resources/TSX/water.tsx?url';

export const ThirstyPelikanInteriorResources = {
  HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  HeroRunningSpriteSheetPng: new ImageSource(
    heroRunningPath,
    false,
    ImageFiltering.Pixel
  ),
  WolfkinSpriteSheetPng: new ImageSource(
    wolfkinPath,
    false,
    ImageFiltering.Pixel
  ),
  Music: new Sound(thirstyPelikanMP3, thirstyPelikanWav, thirstyPelikanOgg),
  CollisionSound: new Sound(collisionSound),
  WalkingSound: new Sound(walkingSound),
  TalkingSound: new Sound(talkingSound),
  TiledMap: new TiledResource(thirstyPelikanInterior, {
    useTilemapCameraStrategy: true,
    pathMap: [
      {
        path: 'IronclawPort-Thirsty-Pelikan-Interior.tmx',
        output: thirstyPelikanInterior,
      }, // map
      { path: 'CL_Buildings.png', output: clBuildingsSetPath }, // spritesheet
      { path: 'CL_Crafting.png', output: clCraftingSetPath }, // spritesheet
      { path: 'water.png', output: waterSetPath }, // spritesheet
      { path: 'CL_Buildings.tsx', output: clBuildingsTsxPath }, // tileset
      { path: 'CLT_Buildings.tsx', output: cltBuildingsTsxPath }, // tileset
      { path: 'CL_Crafting.tsx', output: clCraftingTsxPath }, // tileset
      { path: 'water.tsx', output: waterTsxPath }, // tileset
    ],
  }),
  clBuildingsTsxResource: new Resource(clBuildingsTsxPath, 'text'),
  clCraftingTsxResource: new Resource(clCraftingTsxPath, 'text'),
  waterTsxResource: new Resource(waterTsxPath, 'text'),
} as const;
