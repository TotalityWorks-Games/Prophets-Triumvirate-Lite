import { ImageFiltering, ImageSource, Sound } from 'excalibur';

// import clouds
import cloud1Path from '../../../Resources/Backgrounds/cloud1.png?url';
import cloud2Path from '../../../Resources/Backgrounds/cloud2.png?url';
import cloud3Path from '../../../Resources/Backgrounds/cloud3.png?url';
import cloud4Path from '../../../Resources/Backgrounds/cloud4.png?url';
import cloud5Path from '../../../Resources/Backgrounds/cloud5.png?url';
import cloud6Path from '../../../Resources/Backgrounds/cloud6.png?url';
import cloud7Path from '../../../Resources/Backgrounds/cloud7.png?url';
import cloud8Path from '../../../Resources/Backgrounds/cloud8.png?url';

// import music
import themeMP3 from '../../../Resources/Sounds/Music/OST 5 - Theme.mp3';
import themeOgg from '../../../Resources/Sounds/Music/OST 5 - Theme.ogg';
import themeWav from '../../../Resources/Sounds/Music/OST 5 - Theme.wav';

export const MainMenuResources = {
  Cloud1Png: new ImageSource(cloud1Path, false, ImageFiltering.Pixel),
  Cloud2Png: new ImageSource(cloud2Path, false, ImageFiltering.Pixel),
  Cloud3Png: new ImageSource(cloud3Path, false, ImageFiltering.Pixel),
  Cloud4Png: new ImageSource(cloud4Path, false, ImageFiltering.Pixel),
  Cloud5Png: new ImageSource(cloud5Path, false, ImageFiltering.Pixel),
  Cloud6Png: new ImageSource(cloud6Path, false, ImageFiltering.Pixel),
  Cloud7Png: new ImageSource(cloud7Path, false, ImageFiltering.Pixel),
  Cloud8Png: new ImageSource(cloud8Path, false, ImageFiltering.Pixel),
  Music: new Sound(themeMP3, themeWav, themeOgg),
};
