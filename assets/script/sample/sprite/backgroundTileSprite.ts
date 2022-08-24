import { _decorator, Component, Node } from 'cc';
import { ShopeeSprite } from '../classes/shopeeSprite';
import { ASSET_KEY } from '../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('backgroundTileSprite')
export class backgroundTile extends ShopeeSprite {
    constructor(){
        super('backgroundTile', ASSET_KEY.BACKGROUND_TILE_SPRITE);
    }
}

