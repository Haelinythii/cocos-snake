import { _decorator, Component, Node } from 'cc';
import { SCENE_KEY } from '../sample/enum/scene';
import { PopupUI } from './PopupUI';
import { TransitionManager } from './TransitionManager';
const { ccclass, property } = _decorator;

@ccclass('InvalidPopupUIManager')
export class InvalidPopupUIManager extends PopupUI {
    returnToTitleScreen(){
        TransitionManager.instance.startTransitionOut(SCENE_KEY.TITLE);
    }
}

