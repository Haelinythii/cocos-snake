import { _decorator, Component, Sprite, tween, Color, UIOpacity, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TransitionManager')
export class TransitionManager extends Component {

    static instance: TransitionManager;

    uiOpacity?: UIOpacity | null;

    onLoad() {
        TransitionManager.instance = this;
    }

    start() {
        this.uiOpacity = this.node.getComponent(UIOpacity);

        this.startTransitionIn();
    }

    startTransitionIn() {
        tween(this.uiOpacity)
            .to(0.5, { opacity: 0 })
            .start();
    }

    startTransitionOut(sceneName: string) {
        tween(this.uiOpacity)
            .to(0.5, { opacity: 255 })
            .call(() => {
                director.loadScene(sceneName);
            })
            .start();
    }

}

