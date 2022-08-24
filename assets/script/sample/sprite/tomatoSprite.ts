import { ShopeeSprite } from './../classes/shopeeSprite';
import { _decorator } from 'cc';
import { ASSET_KEY } from '../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('TomatoSprite')
export class TomatoSprite extends ShopeeSprite {
  constructor() {
    super('TomatoSprite', ASSET_KEY.TOMATO_SPRITE);
  }
}
