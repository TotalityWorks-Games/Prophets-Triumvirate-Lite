// enums
export enum LOCATIONS {
  // common interiors
  THIRSTY_PELIKAN = 'THIRSTY_PELIKAN',
  SHOP = 'SHOP',
  TEMPLE = 'TEMPLE',
  PALACE = 'PALACE',
  // cities:
  IRONCLAW_PORT = 'IRONCLAW_PORT',
  SWAMBY = 'SWAMBY',
  // routes:
  ROUTE1 = 'ROUTE1',
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
