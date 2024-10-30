import { TiledResource } from '@excaliburjs/plugin-tiled';
import { ImageSource, ImageFiltering, Sound, Resource } from 'excalibur';

// import map
import templeInterior from '../../../../../Resources/TMX/IronclawPort-Temple-Interior.tmx?url';

// import music
import templeMP3 from '../../../../../Resources/Sounds/Music/RPG Medieval Fantasy - Winged Swords of Mercy (Bonus Vocals) (Loopable).mp3';
import templeOgg from '../../../../../Resources/Sounds/Music/RPG Medieval Fantasy - Winged Swords of Mercy (Bonus Vocals) (Loopable).ogg';
import templeWav from '../../../../../Resources/Sounds/Music/RPG Medieval Fantasy - Winged Swords of Mercy (Bonus Vocals) (Loopable).wav';

// import sounds
import collisionSound from '../../../../../Resources/Sounds/Effects/bump-dur2Short-pitch1Low.wav';
import walkingSound from '../../../../../Resources/Sounds/Effects/Steps_carpet-013.ogg';
import talkingSound from '../../../../../Resources/Sounds/Effects/bounce-dur2Short-pitch3High.wav';

// import spritesheets
import heroPath from '../../../../../Resources/Sheets/Characters/Main/Player/Character006.png?url';
import heroRunningPath from '../../../../../Resources/Sheets/Characters/Main/Player/Chara006.png?url';
import beknaPath from '../../../../../Resources/Sheets/Characters/Deities/Character032.png?url';
import wolfkinPath from '../../../../../Resources/Sheets/Characters/Wolfkin/beast_tribe_1.png?url';
import clBuildingsSetPath from '../../../../../Resources/Sheets/Locations/CL_Buildings.png?url';
import cltBuildingsSetPath from '../../../../../Resources/Sheets/Locations/CLT_Buildings.png?url';
import clCraftingSetPath from '../../../../../Resources/Sheets/Locations/CL_Crafting.png?url';
import furnituresSetPath from '../../../../../Resources/Sheets/Locations/furnitures.png?url';

// import tilesets
import clBuildingsTsxPath from '../../../../../Resources/TSX/CL_Buildings.tsx?url';
import cltBuildingsTsxPath from '../../../../../Resources/TSX/CLT_Buildings.tsx?url';
import clCraftingTsxPath from '../../../../../Resources/TSX/CL_Crafting.tsx?url';
import furnituresTsxPath from '../../../../../Resources/TSX/furnitures.tsx?url';

export const TempleInteriorResources = {
  HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  HeroRunningSpriteSheetPng: new ImageSource(
    heroRunningPath,
    false,
    ImageFiltering.Pixel
  ),
  BeknaSpriteSheetPng: new ImageSource(beknaPath, false, ImageFiltering.Pixel),
  WolfkinSpriteSheetPng: new ImageSource(
    wolfkinPath,
    false,
    ImageFiltering.Pixel
  ),
  Music: new Sound(templeMP3, templeWav, templeOgg),
  CollisionSound: new Sound(collisionSound),
  WalkingSound: new Sound(walkingSound),
  TalkingSound: new Sound(talkingSound),
  TiledMap: new TiledResource(templeInterior, {
    useTilemapCameraStrategy: true,
    pathMap: [
      {
        path: 'IronclawPort-Temple-Interior.tmx',
        output: templeInterior,
      }, // map
      { path: 'CL_Buildings.png', output: clBuildingsSetPath }, // spritesheet
      { path: 'CLT_Buildings.png', output: cltBuildingsSetPath }, // spritesheet
      { path: 'CL_Crafting.png', output: clCraftingSetPath }, // spritesheet
      { path: 'furnitures.png', output: furnituresSetPath }, // spritesheet
      { path: 'CL_Buildings.tsx', output: clBuildingsTsxPath }, // tileset
      { path: 'CLT_Buildings.tsx', output: cltBuildingsTsxPath }, // tileset
      { path: 'CL_Crafting.tsx', output: clCraftingTsxPath }, // tileset
      { path: 'furnitures.tsx', output: furnituresTsxPath }, // tileset
    ],
  }),
  clBuildingsTsxResource: new Resource(clBuildingsTsxPath, 'text'),
  clCraftingTsxResource: new Resource(clCraftingTsxPath, 'text'),
  furnituresTsxResource: new Resource(furnituresTsxPath, 'text'),
} as const;
