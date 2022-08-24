import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Director, Event, Button } from 'cc';
import { GameManager } from './GameManager';
import { Direction } from './SnakeConfig';
const { ccclass, property } = _decorator;

@ccclass('InputHandler')
export class InputHandler extends Component {

    lastKeyPressed: Direction = Direction.UP;
    playerHasPressedInput: boolean = false;

    @property(Button)
    buttonUp: Button = null!;
    @property(Button)
    buttonDown: Button = null!
    @property(Button)
    buttonRight: Button = null!
    @property(Button)
    buttonLeft: Button = null!

    @property(Node)
    headerSwapper: Node = null!;

    start() {
        this.handleKeyboardInput();
    }

    handleKeyboardInput() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.buttonUp.node.on('click', () => {
            this.onKeyDown(new EventKeyboard(KeyCode.ARROW_UP, Input.EventType.KEY_DOWN));
        }, this);
        this.buttonDown.node.on('click', () => {
            this.onKeyDown(new EventKeyboard(KeyCode.ARROW_DOWN, Input.EventType.KEY_DOWN));
        }, this);
        this.buttonRight.node.on('click', () => {
            this.onKeyDown(new EventKeyboard(KeyCode.ARROW_RIGHT, Input.EventType.KEY_DOWN));
        }, this);
        this.buttonLeft.node.on('click', () => {
            this.onKeyDown(new EventKeyboard(KeyCode.ARROW_LEFT, Input.EventType.KEY_DOWN));
        }, this);
    }



    onKeyDown(event: EventKeyboard) {

        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
                this.lastKeyPressed = Direction.UP;
                break;
            case KeyCode.ARROW_DOWN:
                this.lastKeyPressed = Direction.DOWN;
                break;
            case KeyCode.ARROW_LEFT:
                this.lastKeyPressed = Direction.LEFT;
                break;
            case KeyCode.ARROW_RIGHT:
                this.lastKeyPressed = Direction.RIGHT;
                break;

            default:
                break;
        }

        if(this.playerHasPressedInput == false)
        {
            this.playerHasPressedInput = true;
            this.node.dispatchEvent( new Event('playerInputPressed', false) );
            GameManager.instance.swapHeader();
        }
    }

    public getLastKeyPressed(): Direction {
        return this.lastKeyPressed;
    }

    public getInputWithLastMovementDirection(lastMovementDirection?: Direction): Direction | undefined {
        if((this.lastKeyPressed == Direction.UP && lastMovementDirection != Direction.DOWN) ||
            (this.lastKeyPressed == Direction.DOWN && lastMovementDirection != Direction.UP) ||
            (this.lastKeyPressed == Direction.LEFT && lastMovementDirection != Direction.RIGHT) ||
            (this.lastKeyPressed == Direction.RIGHT && lastMovementDirection != Direction.LEFT) )
            return this.lastKeyPressed;
        else
            return lastMovementDirection;
    }
}

