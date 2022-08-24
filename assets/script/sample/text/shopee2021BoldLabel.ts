import { ShopeeLabel } from './../classes/shopeeLabel';
import { _decorator } from 'cc';
import { ASSET_KEY } from '../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('Shopee2021BoldLabel')
export class Shopee2021BoldLabel extends ShopeeLabel {
  constructor() {
    super('Shopee2021BoldLabel', ASSET_KEY.SHOPEE_2021_BOLD_FONT);
  }
}
