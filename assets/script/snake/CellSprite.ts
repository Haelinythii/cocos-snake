import { _decorator, Component, Node } from 'cc';
import { ShopeeSprite } from '../sample/classes/shopeeSprite';
import { ASSET_KEY } from '../sample/enum/asset';
const { ccclass, property } = _decorator;

@ccclass('CellSprite')
export class CellSprite extends ShopeeSprite {

    constructor(){
        super('CellSprite', ASSET_KEY.BACKGROUND_TILE_SPRITE, 0)
    }

    onLoad(){
        super.onLoad();
    }
}

