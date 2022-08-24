import { _decorator, Component, Node, Label, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleHighscoreManager')
export class TitleHighscoreManager extends Component {
    readonly HIGHSCORE_KEY_STRING: string = 'highscore';

    @property(Label)
    highscoreLabel: Label = null!;

    start() {
        this.loadHighscore();
    }

    loadHighscore(): void {
        let highScoreJSON = sys.localStorage.getItem(this.HIGHSCORE_KEY_STRING);
        if(highScoreJSON){
            this.highscoreLabel.string = JSON.parse(highScoreJSON);
        }
        else{
            this.highscoreLabel.string = '0';
        }
    }
}

