import { TiledResource } from '@excaliburjs/plugin-tiled';
import { ImageSource, ImageFiltering, Sound, Resource } from 'excalibur';

// import map
import route1 from '../../../../Resources/TMX/Route1.tmx?url';

// import music
import swambyMP3 from '../../../../Resources/Sounds/Music/OST 2 - Golden Horizon (Loopable).mp3';
import swambyOgg from '../../../../Resources/Sounds/Music/OST 2 - Golden Horizon (Loopable).ogg';
import swambyWav from '../../../../Resources/Sounds/Music/OST 2 - Golden Horizon (Loopable).wav';

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
import propsBSetPath from '../../../../Resources/Sheets/Locations/propsB.png?url';
import wetlandsDecProps2SetPath from '../../../../Resources/Sheets/Locations/Dec_props2.png?url';

// import tilesets
import clMainLevelTsxPath from '../../../../Resources/TSX/CL_MainLev.tsx?url';
import wetlandsDecProps2TsxPath from '../../../../Resources/TSX/Dec_props2?url';
import propsBTsxPath from '../../../../Resources/TSX/propsB.tsx?url';

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
  Music: new Sound(swambyMP3, swambyWav, swambyOgg),
  CollisionSound: new Sound(collisionSound),
  WalkingSound: new Sound(walkingSound),
  TalkingSound: new Sound(talkingSound),
  TiledMap: new TiledResource(route1, {
    useTilemapCameraStrategy: true,
    pathMap: [
      { path: 'Route1.tmx', output: route1 }, // map
      { path: 'CL_MainLev.png', output: clMainLevelSetPath }, // spritesheet
      { path: 'Dec_Props2.png', output: wetlandsDecProps2SetPath }, // spritesheet
      { path: 'propsB.png', output: propsBSetPath }, // spritesheet
      { path: 'CL_MainLev.tsx', output: clMainLevelTsxPath }, // tileset
      { path: 'Dec_Props2.tsx', output: wetlandsDecProps2TsxPath }, // tileset
      { path: 'propsB.tsx', output: propsBTsxPath }, // tileset
    ],
  }),
  clMainLevelTsxResource: new Resource(clMainLevelTsxPath, 'text'),
  propsBTsxResource: new Resource(propsBTsxPath, 'text'),
  wetlandsDecProps2TsxResource: new Resource(wetlandsDecProps2TsxPath, 'text'),
} as const;
