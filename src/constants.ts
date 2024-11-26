// enums
export enum LOCATIONS {
  // Menu
  MAINMENU = 'MAINMENU',
  // common interiors
  THIRSTY_PELIKAN = 'THIRSTY_PELIKAN',
  SHOP = 'SHOP',
  TEMPLE = 'TEMPLE',
  PALACE = 'PALACE',
  // cities:
  IRONCLAW_PORT = 'IRONCLAW_PORT',
  SWAMBY = 'SWAMBY',
  // routes:
  ROUTES = 'ROUTES',
}
export enum SCENE_NAMES {
  // Route Scenes
  ROUTE1 = 'route1',
  // Ironclaw Scenes
  START = 'start',
  IRONCLAW_EXTERIOR = 'ironClawExterior',
  IRONCLAW_PORT_THIRSTY_PELIKAN = 'ironClawPortThirstyPelikan',
  IRONCLAW_PORT_TEMPLE_INTERIOR = 'ironClawPortTempleInterior',
  IRONCLAW_PORT_SHOP_INTERIOR = 'ironClawPortShopInterior',
  // IRONCLAW_PORT_SMALL_HOUSE_INTERIOR1 = 'ironClawPortSmallHouseInterior1',
  IRONCLAW_PORT_SMALL_HOUSE_INTERIOR2 = 'ironClawPortSmallHouseInterior2',
  IRONCLAW_PORT_PALACE_INTERIOR = 'ironClawPlaceInterior',
  // Swamby Scenes
  SWAMBY = 'swamby',
}
export enum DIRECTIONS {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}
export enum SCENE_STATE {
  LOADING = 'SCENE_STATE_LOADING',
  READY = 'SCENE_STATE_READY',
  PLAYING = 'SCENE_STATE_PLAYING',
  TALKING = 'SCENE_STATE_TALKING',
  MENU = 'SCENE_STATE_MENU',
  PAUSED = 'SCENE_STATE_PAUSED',
  COMPLETED = 'SCENE_STATE_COMPLETED',
  GAMEOVER = 'SCENE_STATE_GAMEOVER',
  ERROR = 'SCENE_STATE_ERROR',
}
export enum SEXES {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export enum RACES {
  ACCURSED = 'ACCURSED',
  ELF = 'ELF',
  HALF_ELF = 'HALF_ELF',
  HUMAN = 'HUMAN',
  NIX_FORGED = 'NIX_FORGED',
}
export enum CLASSES {
  CLERIC = 'CLERIC',
  THIEF = 'THIEF',
  WARRIOR = 'WARRIOR',
  WIZARD = 'WIZARD',
}

// types
export type Dialogues = {
  actor: string;
  text: string;
  isCharacter?: boolean;
}[];

export type AbilityScores = {
  strength: number;
  dexterity: number;
  constitution: number;
  wisdom: number;
  intelligence: number;
  charisma: number;
};
