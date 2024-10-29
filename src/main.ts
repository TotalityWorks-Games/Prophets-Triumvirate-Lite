import './style.css';
import { Engine, Resolution } from 'excalibur';

import { uiManager } from './Managers/UIManager';
import { allScenes } from './Scenes/allScenes';

const game = new Engine({
  canvasElementId: 'game-canvas',
  pixelArt: true,
  pixelRatio: 2,
  resolution: Resolution.SNES,
  scenes: { ...allScenes },
});

game.start().then(() => {
  uiManager.init();
  game.goToScene('swamby');
});
