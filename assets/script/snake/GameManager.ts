import { _decorator, Component, Node, sys, tween, Vec3 } from 'cc';
import { ShopeeAudio } from '../sample/classes/shopeeAudio';
import { GameOverUIManager } from './GameOverUIManager';
import { HeaderSwapper } from './HeaderSwapper';
import { InvalidPopupUIManager } from './InvalidPopupUIManager';
import { LevelConfig } from './LevelConfig';
import { ScoreUIManager } from './ScoreUIManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    static instance: GameManager = null!;

    @property(GameOverUIManager)
    gameOverManager: GameOverUIManager = null!;

    @property(InvalidPopupUIManager)
    invalidPopupManager: InvalidPopupUIManager = null!;

    @property(ScoreUIManager)
    scoreUIManager: ScoreUIManager = null!;

    @property(ShopeeAudio)
    eatAudio: ShopeeAudio = null!;

    @property(ShopeeAudio)
    crashAudio: ShopeeAudio = null!;

    @property(HeaderSwapper)
    headerSwapper: HeaderSwapper = null!;

    score: number = 0;

    levelConfig: LevelConfig = null!;

    readonly HIGHSCORE_KEY_STRING: string = 'highscore';
    highscore: number = 0;

    onLoad() {
        GameManager.instance = this;
        this.levelConfig = new LevelConfig();
    }

    start() {
        let highscoreJSON = sys.localStorage.getItem(this.HIGHSCORE_KEY_STRING);
        this.loadHighscore();
        this.scoreUIManager.setHighscoreScoreLabel(this.highscore);

        if(!this.levelConfig.checkIfLevelConfigIsValid()){
            this.invalidPopupManager.node.active = true;
        }
    }

    addandGetScore(): number {
        this.score++;
        this.scoreUIManager.setCurrentScoreLabel(this.score);

        if (this.checkIfScoreIsHighscore())
            this.scoreUIManager.setHighscoreScoreLabel(this.score);

        this.eatAudio.play();

        return this.score;
    }

    public snakeHitWallOrBody(): void {
        console.log('gameover');
        this.gameOverManager.node.active = true;
        this.gameOverManager.setScoreText(this.score);

        this.saveHighscore();

        this.crashAudio.play();
    }

    loadHighscore() {
        let highscoreJSON: string | null = sys.localStorage.getItem(this.HIGHSCORE_KEY_STRING);
        if (highscoreJSON) {
            this.highscore = JSON.parse(highscoreJSON);
        }
        else {
            sys.localStorage.setItem(this.HIGHSCORE_KEY_STRING, '0');
            this.highscore = 0;
        }
    }

    saveHighscore() {
        if (this.checkIfScoreIsHighscore())
            sys.localStorage.setItem(this.HIGHSCORE_KEY_STRING, JSON.stringify(this.score));
    }

    checkIfScoreIsHighscore(): boolean {
        return this.highscore < this.score;
    }

    getBoardConfigTiles() {
        // let boardConfigArray = this.levelConfig.getCurrentLevelConfig().boardConfig.tiles.slice();
        return this.levelConfig.getCurrentLevelConfig().boardConfig.tiles;
    }

    getSnakeConfig() {
        if (this.levelConfig.checkIfLevelConfigIsValid())
            return this.levelConfig.getCurrentLevelConfig().snakeConfig;
        return null;
    }

    swapHeader() {
        this.headerSwapper.swapToAfterClick();
    }
}

