import { Sound } from 'excalibur';
import { LOCATIONS } from '../constants';

class MusicManager {
  public location: LOCATIONS;
  private currectSong?: Sound;
  constructor() {
    this.location = LOCATIONS.MAINMENU;
  }

  public updateLocation(location: LOCATIONS) {
    this.location = location;
  }

  public startMusic(resources: { Music: Sound }) {
    this.currectSong = resources.Music;
    console.log('music');
    this.currectSong.loop = true;
    this.currectSong.play(0.5);
  }

  public stopMusic() {
    this.currectSong?.stop();
  }
}

export const musicManager = new MusicManager();
