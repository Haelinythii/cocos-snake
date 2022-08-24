import { ShopeeAudio } from './../classes/shopeeAudio';
import { _decorator } from 'cc';
import { ASSET_KEY } from '../enum/asset';
const { ccclass } = _decorator;

@ccclass('BackgroundMusic')
export class BackgroundMusic extends ShopeeAudio {
  // set loop from audio source component
  constructor() {
    super('BackgroundMusic', ASSET_KEY.BG_MUSIC, 1);
  }
}
