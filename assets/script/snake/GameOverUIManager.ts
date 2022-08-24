import { _decorator, Component, Node, director, Label, UIOpacity, tween, Vec3 } from 'cc';
import { SCENE_KEY } from '../sample/enum/scene';
import { PopupUI } from './PopupUI';
import { TransitionManager } from './TransitionManager';
const { ccclass, property } = _decorator;

@ccclass('GameOverUIManager')
export class GameOverUIManager extends PopupUI {
    
    @property(Label)
    scoreText: Label = null!;
    
    public setScoreText(score: number): void{
        this.scoreText.string = score.toString();
    }

    public playAgain(): void {
        TransitionManager.instance.startTransitionOut(SCENE_KEY.GAME);
        // director.loadScene(SCENE_KEY.GAME);
    }

    public cancel(): void {
        TransitionManager.instance.startTransitionOut(SCENE_KEY.TITLE);
        // director.loadScene(SCENE_KEY.TITLE);
    }
}

