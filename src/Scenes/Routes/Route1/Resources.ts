import { TiledResource } from '@excaliburjs/plugin-tiled';
import { ImageSource, ImageFiltering, Sound, Resource } from 'excalibur';

// import map
import route1 from '../../../../Resources/TMX/Route1.tmx?url';

// import music
import routeMP3 from '../../../../Resources/Sounds/Music/OST 5 - Descent into Darkness (Loopable).mp3';
import routeOgg from '../../../../Resources/Sounds/Music/OST 5 - Descent into Darkness (Loopable).ogg';
import routeWav from '../../../../Resources/Sounds/Music/OST 5 - Descent into Darkness (Loopable).wav';

// import sounds
import collisionSound from '../../../../Resources/Sounds/Effects/bump-dur2Short-pitch1Low.wav';
import walkingSound from '../../../../Resources/Sounds/Effects/Steps_carpet-013.ogg';
import talkingSound from '../../../../Resources/Sounds/Effects/bounce-dur2Short-pitch3High.wav';

// import spritesheets
import heroPath from '../../../../Resources/Sheets/Characters/Main/Player/Character006.png?url';
import heroRunningPath from '../../../../Resources/Sheets/Characters/Main/Player/Chara006.png?url';
import kingPath from '../../../../Resources/Sheets/Characters/Wolfkin/beast_hero_1.png?url';
import wolfkinPath from '../../../../Resources/Sheets/Characters/Wolfkin/beast_tribe_1.png?url';
import clMainLevelSetPath from '../../../../Resources/Sheets/Locations/CL_MainLev.png?url';
import shipsSetPath from '../../../../Resources/Sheets/Locations/Ships.png?url';
import propsBSetPath from '../../../../Resources/Sheets/Locations/propsB.png?url';
import waterSetPath from '../../../../Resources/Sheets/Locations/water.png?url';
import wetlandsDecProps2SetPath from '../../../../Resources/Sheets/Locations/Dec_props2.png?url';
// import tilesets
import clMainLevelTsxPath from '../../../../Resources/TSX/CL_MainLev.tsx?url';
import wetlandsDecProps2TsxPath from '../../../../Resources/TSX/Dec_props2?url';
import shipsTsxPath from '../../../../Resources/TSX/Ships.tsx?url';
import propsBTsxPath from '../../../../Resources/TSX/propsB.tsx?url';
import waterTsxPath from '../../../../Resources/TSX/water.tsx?url';

export const route1Resources = {
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
  KingSpriteSheetPng: new ImageSource(kingPath, false, ImageFiltering.Pixel),
  Music: new Sound(routeMP3, routeWav, routeOgg),
  CollisionSound: new Sound(collisionSound),
  WalkingSound: new Sound(walkingSound),
  TalkingSound: new Sound(talkingSound),
  TiledMap: new TiledResource(route1, {
    useTilemapCameraStrategy: true,
    pathMap: [
      { path: 'Route1.tmx', output: route1 }, // map
      { path: 'CL_MainLev.png', output: clMainLevelSetPath }, // spritesheet
      { path: 'Dec_Props2.png', output: wetlandsDecProps2SetPath }, // spritesheet
      { path: 'Ships.png', output: shipsSetPath }, // spritesheet
      { path: 'propsB.png', output: propsBSetPath }, // spritesheet
      { path: 'water.png', output: waterSetPath }, // spritesheet
      { path: 'CL_MainLev.tsx', output: clMainLevelTsxPath }, // tileset
      { path: 'Dec_Props2.tsx', output: wetlandsDecProps2TsxPath }, // tileset
      { path: 'Ships.tsx', output: shipsTsxPath }, // tileset
      { path: 'propsB.tsx', output: propsBTsxPath }, // tileset
      { path: 'water.tsx', output: waterTsxPath }, // tileset
    ],
  }),
  clMainLevelTsxResource: new Resource(clMainLevelTsxPath, 'text'),
  shipsTsxResource: new Resource(shipsTsxPath, 'text'),
  propsBTsxResource: new Resource(propsBTsxPath, 'text'),
  waterTsxResource: new Resource(waterTsxPath, 'text'),
  wetlandsDecProps2TsxResource: new Resource(wetlandsDecProps2TsxPath, 'text'),
} as const;
