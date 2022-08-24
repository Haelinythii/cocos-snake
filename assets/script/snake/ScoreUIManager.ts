import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreUIManager')
export class ScoreUIManager extends Component {
    
    @property(Label)
    currentScore: Label = null!;

    @property(Label)
    highScore: Label = null!;

    setCurrentScoreLabel(score: number){
        this.currentScore.string = score.toString();
    }

    setHighscoreScoreLabel(score: number){
        this.highScore.string = score.toString();
    }
}

