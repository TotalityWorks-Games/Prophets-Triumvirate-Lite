import { Sound } from 'excalibur';
import { Dialogues, SCENE_STATE } from '../constants';

class UIManager {
  game_container!: HTMLElement;
  dialog_container!: HTMLElement;
  pause_menu!: HTMLElement;
  characterToDialogueWith: string | undefined;
  talkingSound: Sound | undefined;
  init() {
    this.linkUIReferences();
    this.createPauseMenuUI();
    this.createDialogueUI();
  }

  private linkUIReferences() {
    this.game_container = document.getElementById('game')!;
    this.dialog_container = document.getElementById('dialog_container')!;
    this.pause_menu = document.getElementById('pause_menu')!;

    // this.menu_items_container = document.getElementById('menu_items_container');
    // this.menu_window = document.getElementById('menu_window');
    // this.menu_icon = document.getElementById('menu_icon');
    // this.menu_close_btn = document.querySelectorAll('.menu_close');
  }

  private createPauseMenuUI() {
    const pause_menu = document.getElementById('pause_menu')!;
    pause_menu.innerHTML = `
<div id="menu_ingame" class="menu">
    <div class="menu_header">
      <p>Menu</p>
      <div class="menu_close">▲</div>
    </div>
    <ul id="menu_items_container"></ul>
  </div>
  <div id="menu_window" class="submenu">
    <div class="menu_header"></div>
    <div class="menu_content">
      <div class="collectives"></div>
      <div class="items"></div>
      <div class="map"></div>
      <div id="settings_container"></div>
    </div>
    <div class="menu_footer"></div>
  </div>        `;
  }

  private createDialogueUI() {
    const dialog_container = document.getElementById('dialog_container')!;
    dialog_container.innerHTML = `
        <div class="avatar"></div>
            <div class="content">
            <div class="text"></div>
        </div>
        `;
  }

  cleanupDialogue() {
    const text_container = this.dialog_container.querySelector(
      '.text'
    ) as HTMLElement;
    if (this.game_container.className !== SCENE_STATE.TALKING) {
      return (text_container.innerText = '');
    }
  }

  displayDialogue(dialogues: Dialogues) {
    const text_container = this.dialog_container.querySelector(
      '.text'
    ) as HTMLElement;

    if (this.game_container.className === SCENE_STATE.TALKING) {
      // filter through all dialogues for the one matching this.characterToDialogueWith
      let dialogue = dialogues.find((dialogue) => {
        return dialogue.actor === this.characterToDialogueWith;
      });

      if (dialogue?.isCharacter) {
        this.talkingSound?.play(0.3);
        setInterval(() => {
          this.talkingSound?.stop();
        }, 1000);
      }

      if (dialogue) {
        // then add this text
        return (text_container.innerText = dialogue!.text);
      } else {
        dialogue = dialogues.find((dialogue) => {
          return dialogue.actor === 'default';
        });

        // then add this text
        return (text_container.innerText = dialogue!.text);
      }
    }
  }

  dialogNPC(character?: string, talkingSound?: Sound) {
    this.characterToDialogueWith = character;
    this.talkingSound = talkingSound;
  }

  update_state(state: SCENE_STATE) {
    this.game_container.className = state;
  }
}

export const uiManager = new UIManager();
