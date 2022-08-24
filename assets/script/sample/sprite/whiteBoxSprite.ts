import { ShopeeSprite } from './../classes/shopeeSprite';
import { _decorator } from 'cc';
import { ASSET_KEY } from '../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('WhiteBoxSprite')
export class WhiteBoxSprite extends ShopeeSprite {
  constructor() {
    super('WhiteBoxSprite', ASSET_KEY.WHITE_BOX_SPRITE);
  }
}
