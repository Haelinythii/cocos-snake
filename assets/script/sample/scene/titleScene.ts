import { _decorator, Component, director, Canvas } from 'cc';
import ShopeeWebBridge from 'db://shopee-web-bridge/shopeeWebBridge.js';
import { TransitionManager } from '../../snake/TransitionManager';
import { SCENE_KEY } from '../enum/scene';
const { ccclass, property } = _decorator;

@ccclass('TitleScene')
export class TitleScene extends Component {
  onLoad() {
    ShopeeWebBridge.instance.configurePage({
      showNavbar: false,
    });
  }

  start() {

  }

  playGame() {
    TransitionManager.instance.startTransitionOut(SCENE_KEY.GAME);
    // director.loadScene(SCENE_KEY.GAME);
  }
}
