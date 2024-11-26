import {
  Actor,
  Animation,
  CircleCollider,
  Collider,
  CollisionContact,
  CollisionType,
  Engine,
  ImageSource,
  Keys,
  Side,
  Sound,
  Sprite,
  SpriteSheet,
  vec,
  Vector,
} from 'excalibur';
import { DIRECTIONS, SCENE_STATE } from '../../constants';
import { Config } from '../../config';
import { uiManager } from '../../Managers/UIManager';
import { handleSceneExit, SceneNames } from '../../Scenes/allScenes';

const circle = new CircleCollider({
  radius: 11,
  offset: vec(0, 4),
});
export class MainGuy extends Actor {
  public playerState: SCENE_STATE;
  public nearToNPC: any;
  public nearToObject: any;
  public direction: DIRECTIONS;
  public resources: {
    HeroSpriteSheetPng: ImageSource;
    HeroRunningSpriteSheetPng: ImageSource;
    CollisionSound: Sound;
    WalkingSound: Sound;
    TalkingSound: Sound;
  };
  private engine: Engine | undefined;
  constructor(
    pos: Vector,
    resources: {
      HeroSpriteSheetPng: ImageSource;
      HeroRunningSpriteSheetPng: ImageSource;
      CollisionSound: Sound;
      WalkingSound: Sound;
      TalkingSound: Sound;
    },
    direction?: DIRECTIONS
  ) {
    super({
      pos,
      collider: circle,
      width: 32,
      height: 32,
      collisionType: CollisionType.Active,
    });

    this.z = 200;
    this.scale = new Vector(2, 2);
    this.direction = direction ?? DIRECTIONS.DOWN;
    this.resources = resources;
    this.playerState = SCENE_STATE.PLAYING;
    console.log('Player created');
  }

  onInitialize(engine: Engine): void {
    this.addAnimations();
    this.engine = engine;
  }

  onPreUpdate(engine: Engine, _elapsedMs: number): void {
    this.vel = Vector.Zero;

    this.graphics.use(`${this.direction}-idle`);

    if (this.playerState === SCENE_STATE.PLAYING) {
      this.playerMovement(engine);
    }
    this.playerInteract(engine);
    this.pauseGame(engine);
  }

  onPreCollisionResolve(
    _self: Collider,
    other: Collider,
    _side: Side,
    _contact: CollisionContact
  ): void {
    handleSceneExit(this.engine!, other.owner.name as SceneNames);

    if (other.owner.name === 'Collisions') {
      if (this.nearToObject === other.owner) {
        return;
      }
      this.resources.CollisionSound.play(0.1);
      this.nearToObject = other.owner;
      this.nearToNPC = null;
    } else {
      this.nearToNPC = other.owner;
      this.nearToObject = null;
    }
  }

  onCollisionEnd(_self: Collider, _other: Collider): void {
    console.log('collision ended');
  }

  addAnimations() {
    const playerSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.HeroSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 24,
        spriteHeight: 32,
        rows: 4,
        columns: 3,
      },
    });

    const playerRunningSpriteSheet = SpriteSheet.fromImageSource({
      image: this.resources.HeroRunningSpriteSheetPng as ImageSource,
      grid: {
        spriteWidth: 24,
        spriteHeight: 32,
        rows: 4,
        columns: 5,
      },
    });

    const downIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 0),
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('down-idle', downIdle);

    const leftIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 1) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('left-idle', leftIdle);

    const rightIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('right-idle', rightIdle);

    const upIdle = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('up-idle', upIdle);

    const rightWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 2) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('right-walk', rightWalk);

    const leftWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 1) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 1) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 1) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 1) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('left-walk', leftWalk);

    const upWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('up-walk', upWalk);

    const downWalk = new Animation({
      frames: [
        {
          graphic: playerSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
        {
          graphic: playerSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.PlayerFrameSpeed,
        },
      ],
    });
    this.graphics.add('down-walk', downWalk);

    const rightRun = new Animation({
      frames: [
        {
          graphic: playerRunningSpriteSheet.getSprite(0, 1) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(1, 1) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(2, 1) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(3, 1) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(4, 1) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('right-run', rightRun);

    const leftRun = new Animation({
      frames: [
        {
          graphic: playerRunningSpriteSheet.getSprite(0, 2) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(1, 2) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(2, 2) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(3, 2) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(4, 2) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('left-run', leftRun);

    const upRun = new Animation({
      frames: [
        {
          graphic: playerRunningSpriteSheet.getSprite(0, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(1, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(2, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(3, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(4, 3) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('up-run', upRun);

    const downRun = new Animation({
      frames: [
        {
          graphic: playerRunningSpriteSheet.getSprite(0, 0) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(1, 0) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(2, 0) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(3, 0) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
        {
          graphic: playerRunningSpriteSheet.getSprite(4, 0) as Sprite,
          duration: Config.PlayerRunningFrameSpeed,
        },
      ],
    });
    this.graphics.add('down-run', downRun);
  }

  pauseGame(engine: Engine) {
    if (engine.input.keyboard.wasPressed(Keys.Esc)) {
      if (this.playerState === SCENE_STATE.MENU) {
        this.playerState = SCENE_STATE.PLAYING;
        uiManager.update_state(SCENE_STATE.PLAYING);
      } else {
        this.playerState = SCENE_STATE.MENU;
        uiManager.update_state(SCENE_STATE.MENU);
      }
    }
  }

  playerInteract(engine: Engine) {
    // dialogue
    switch (this.playerState) {
      case SCENE_STATE.PLAYING:
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
          if (this.nearToNPC) {
            console.log(`dialogue with: ${this.nearToNPC.name}`);

            // update direction of NPC to mirror Player direction while talking
            switch (this.direction) {
              case DIRECTIONS.UP:
                this.nearToNPC.direction = DIRECTIONS.DOWN;
                break;
              case DIRECTIONS.DOWN:
                this.nearToNPC.direction = DIRECTIONS.UP;
                break;
              case DIRECTIONS.LEFT:
                this.nearToNPC.direction = DIRECTIONS.RIGHT;
                break;
              case DIRECTIONS.RIGHT:
                this.nearToNPC.direction = DIRECTIONS.LEFT;
                break;
              default:
                break;
            }
            this.playerState = SCENE_STATE.TALKING;
            uiManager.update_state(SCENE_STATE.TALKING);
            uiManager.dialogNPC(
              this.nearToNPC.name,
              this.resources.TalkingSound
            );
          }
          if (this.nearToObject) {
            // investigate
            console.log(`investigating: ${this.nearToObject.name}`);
            uiManager.update_state(SCENE_STATE.TALKING);
            this.playerState = SCENE_STATE.TALKING;
            // DO THING
          }
        }
        return;
      case SCENE_STATE.TALKING:
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
          this.playerState = SCENE_STATE.PLAYING;
          uiManager.update_state(SCENE_STATE.PLAYING);
          uiManager.dialogNPC(undefined);
        }
        return;
      default:
        return;
    }
  }

  playerMovement(engine: Engine) {
    const movePlayer = (
      x: number,
      y: number,
      direction: DIRECTIONS,
      speed: 'run' | 'walk'
    ) => {
      this.vel = vec(x, y);

      if (this.direction !== direction) {
        this.nearToNPC = null;
        this.nearToObject = null;
        this.direction = direction;
      }
      this.graphics.use(`${direction}-${speed}`);
    };

    function movementSounds(_sound: Sound, _speed: 'walk' | 'run') {
      // if (speed === 'walk') {
      //   while (speed === 'walk') {
      //     setTimeout(() => {
      //       sound.once();
      //     }, 2000);
      //   }
      // } else {
      //   sound.playbackRate = 0.2;
      //   sound.play(0.3);
      // }
    }

    // running
    if (engine.input.keyboard.isHeld(Keys.ShiftLeft)) {
      if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
        movementSounds(this.resources.WalkingSound, 'run');
        movePlayer(Config.PlayerRunningSpeed, 0, DIRECTIONS.RIGHT, 'run');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
        movementSounds(this.resources.WalkingSound, 'run');
        movePlayer(-Config.PlayerRunningSpeed, 0, DIRECTIONS.LEFT, 'run');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
        movementSounds(this.resources.WalkingSound, 'run');
        movePlayer(0, -Config.PlayerRunningSpeed, DIRECTIONS.UP, 'run');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
        movementSounds(this.resources.WalkingSound, 'run');
        movePlayer(0, Config.PlayerRunningSpeed, DIRECTIONS.DOWN, 'run');
      }
    } else {
      // walking
      if (engine.input.keyboard.isHeld(Keys.ArrowRight)) {
        movementSounds(this.resources.WalkingSound, 'walk');
        movePlayer(Config.PlayerSpeed, 0, DIRECTIONS.RIGHT, 'walk');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowLeft)) {
        movementSounds(this.resources.WalkingSound, 'walk');
        movePlayer(-Config.PlayerSpeed, 0, DIRECTIONS.LEFT, 'walk');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowUp)) {
        movementSounds(this.resources.WalkingSound, 'walk');
        movePlayer(0, -Config.PlayerSpeed, DIRECTIONS.UP, 'walk');
      }
      if (engine.input.keyboard.isHeld(Keys.ArrowDown)) {
        movementSounds(this.resources.WalkingSound, 'walk');
        movePlayer(0, Config.PlayerSpeed, DIRECTIONS.DOWN, 'walk');
      }
    }
  }
}
