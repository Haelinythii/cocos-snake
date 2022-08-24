import { _decorator, Component, Node, instantiate, Prefab, Vec3, macro, tween, Color, Sprite } from 'cc';
import { ShopeeAudio } from '../sample/classes/shopeeAudio';
import { ShopeeSprite } from '../sample/classes/shopeeSprite';
import { BoardSpawner, CellConfig, cellType } from './BoardSpawner';
import { GameManager } from './GameManager';
import { InputHandler } from './InputHandler';
import { SnakeUtils } from './SnakeUtils';
const { ccclass, property } = _decorator;

@ccclass('SnakeConfig')
export class SnakeConfig extends Component {

    head: Part = null!;
    tail: Part = null!;
    body: Part[] = [];

    @property(Prefab)
    headPrefabs: Prefab = null!;

    @property(Prefab)
    bodyPrefabs: Prefab = null!;

    @property(Prefab)
    tailPrefabs: Prefab = null!;

    @property(BoardSpawner)
    board: BoardSpawner = null!;

    @property(ShopeeAudio)
    turnAudio: ShopeeAudio = null!;

    lastMovementDirection?: Direction = Direction.NONE;

    gameOver: boolean = false;
    onTheWayFoodCount: number = 0;

    snakeConfig: {
        parts: Array<Part>; //-> Indicate the indexes of each snake part on the board
        interval: {
            initial: number; //-> The initial update interval, 0.3 means snake moves every 0.3 seconds
            accelerateMultiplier: number; //-> The acceleration, 0.9 means multiply interval by 0.9 every time it accelerates (e.g. 0.3s becomes 0.3s * 0.9 = 0.27s after first acceleration)
            accelerateEvery: number; //-> How many fruits the snake have to eat before it accelerates
            minimum: number; //-> Minimum interval (a.k.a speed cap), update interval can't accelerate below this number
        }
    } = {
            parts: [],
            interval: {
                initial: 0.3,
                accelerateMultiplier: 0.9,
                accelerateEvery: 5,
                minimum: 0.1,
            }
        };

    currentInterval: number = 0;

    inputHandler: InputHandler | null = null;

    foodCallbacks: { (): void; }[] = [];

    start() {
        if(!GameManager.instance.getSnakeConfig()) return;

        this.inputHandler = this.node.getComponent(InputHandler);
        this.makeInitialSnake();

        this.node.on('playerInputPressed', () => {
            this.startSnakeMovement();
            this.startSnakeMovementSchedule();
        }, this);
    }

    startSnakeMovementSchedule() {
        this.schedule(this.startSnakeMovement, this.currentInterval, macro.REPEAT_FOREVER, 0);
    }

    startSnakeMovement() {
        if (this.gameOver || !this.inputHandler?.playerHasPressedInput) return;

        let newDirection = this.inputHandler?.getInputWithLastMovementDirection(this.lastMovementDirection);

        this.moveSnake(newDirection);
    }

    makeInitialSnake() {
        const snakeConfig = GameManager.instance.getSnakeConfig();
        if (!snakeConfig) return;

        this.snakeConfig.interval = snakeConfig.interval;
        this.currentInterval = this.snakeConfig.interval.initial;

        let snakePartsTemplate = snakeConfig.parts;
        let offset: number = BoardSpawner.CELL_COUNT_HEIGHT - 1;
        //head
        this.makeIndividualPart(this.headPrefabs, PartType.HEAD, snakePartsTemplate[0].x, offset - snakePartsTemplate[0].y);
        this.head = this.snakeConfig.parts[0];

        for (let i = 1; i < snakePartsTemplate.length; i++) {
            if (snakePartsTemplate.length - 1 == i) {
                this.makeIndividualPart(this.tailPrefabs, PartType.TAIL, snakePartsTemplate[i].x, offset - snakePartsTemplate[i].y);
                continue;
            }

            this.makeIndividualPart(this.bodyPrefabs, PartType.BODY, snakePartsTemplate[i].x, offset - snakePartsTemplate[i].y);

        }

        // this.makeIndividualPart(this.bodyPrefabs, PartType.BODY, 5, 4);
        // this.makeIndividualPart(this.bodyPrefabs, PartType.BODY, 5, 3);
        // this.makeIndividualPart(this.bodyPrefabs, PartType.BODY, 5, 2);
        // this.makeIndividualPart(this.tailPrefabs, PartType.TAIL, 5, 1);

        this.setupHeadDirection();
    }

    setupHeadDirection() {
        let initialDirection: Direction = SnakeUtils.convertPositionToDirection(this.snakeConfig.parts[0].curIndexPosition, this.snakeConfig.parts[1].curIndexPosition);
        this.lastMovementDirection = initialDirection;
        this.rotateSnakePart(this.snakeConfig.parts[0], this.lastMovementDirection, true);
    }

    makeIndividualPart(prefab: Prefab, partType: PartType, x: number, y: number, nextX?: number, nextY?: number): Part {
        let cell: CellConfig = this.board.getCellConfigFromIndex(x, y)!;

        let newPartNode: Node = instantiate(prefab);
        this.node.addChild(newPartNode);
        newPartNode.setPosition(cell.worldPosition);

        let newPart: Part = {
            partNode: newPartNode,
            partType: partType,
            curIndexPosition: {
                x: x, y: y
            },
            nextIndexPosition: {
                x: nextX ? nextX : x, y: nextY ? nextY : y
            }
        };

        if (this.snakeConfig.parts.length != 0) {
            let initialPartDirection = SnakeUtils.convertPositionToDirection(this.snakeConfig.parts[this.snakeConfig.parts.length - 1].curIndexPosition, newPart.curIndexPosition);
            this.rotateSnakePart(newPart, initialPartDirection, true);
        }

        this.snakeConfig.parts.push(newPart);

        this.changeCellType(cellType.nonwalkable, newPart.curIndexPosition);
        return newPart;
    }

    moveSnake(moveDirection?: Direction) {
        this.setNextCellIndex(this.snakeConfig.parts[0], moveDirection);
        if (this.lastMovementDirection != moveDirection) {
            this.lastMovementDirection = moveDirection;
            this.turnAudio.play();
        }

        for (let i = 1; i < this.snakeConfig.parts.length; i++) {
            let bodyDirection = SnakeUtils.convertPositionToDirection(this.snakeConfig.parts[i - 1].curIndexPosition, this.snakeConfig.parts[i].curIndexPosition);
            this.setNextCellIndex(this.snakeConfig.parts[i], bodyDirection);
        }

        //set head to nonwalkable & tail to walkable
        this.changeCellType(cellType.nonwalkable, this.snakeConfig.parts[0].curIndexPosition);
        this.changeCellType(cellType.walkable, this.snakeConfig.parts[this.snakeConfig.parts.length - 1].curIndexPosition);

        this.checkHeadNextPosition(this.snakeConfig.parts[0].nextIndexPosition);

        for (let j = 0; j < this.snakeConfig.parts.length; j++) {
            let curPart: Part = this.snakeConfig.parts[j];

            //rotate part first then move it
            this.rotateSnakePart(curPart);

            let nextTargetPosition: Vec3 | undefined = this.getCellNextPositionFromPart(curPart);
            if (!nextTargetPosition) return;

            // curPart.partNode.setPosition(nextTargetPosition);
            tween(curPart.partNode)
                .to(this.currentInterval, { position: nextTargetPosition })
                .start();
            curPart.curIndexPosition = {
                x: curPart.nextIndexPosition.x,
                y: curPart.nextIndexPosition.y
            };
        }
    }

    setNextCellIndex(part: Part, moveDirection?: Direction) {
        switch (moveDirection) {
            case Direction.UP:
                part.nextIndexPosition.y += 1;
                break;
            case Direction.DOWN:
                part.nextIndexPosition.y -= 1;
                break;
            case Direction.LEFT:
                part.nextIndexPosition.x -= 1;
                break;
            case Direction.RIGHT:
                part.nextIndexPosition.x += 1;
                break;
            default:
                break;
        }
    }

    checkHeadNextPosition(nextHeadPosition: { x: number, y: number }) {
        let cellConfig: CellConfig | null = this.board.getCellConfigFromIndex(nextHeadPosition.x, nextHeadPosition.y);

        if (!cellConfig) {
            this.gameOver = true;
            GameManager.instance.snakeHitWallOrBody();
            return;
        }

        switch (cellConfig?.type) {
            case cellType.nonwalkable:
                this.gameOver = true;
                GameManager.instance.snakeHitWallOrBody();
                break;
            case cellType.food:
                this.board.snakeEatApple();
                this.setupEatingFoodSchedule();
                let totalScore = GameManager.instance.addandGetScore();
                this.calculateSnakeInterval(totalScore);
                break;
            default:
                break;
        }
    }

    calculateSnakeInterval(score: number): void {
        if (score == 0) return;

        let interval = this.snakeConfig.interval;
        if (score % interval.accelerateEvery != 0) return;

        this.currentInterval = Math.max(this.snakeConfig.interval.minimum, this.currentInterval * this.snakeConfig.interval.accelerateMultiplier);
        this.rescheduleAllSchedule();
    }

    rescheduleAllSchedule() {
        // this.unscheduleAllCallbacks();
        // this.onTheWayFoodCount = 0;
        this.startSnakeMovementSchedule();

        this.foodCallbacks.forEach((c) => {
            // this.animateEatingFood(s);
            this.schedule(c, this.currentInterval);
        })
    }

    setupEatingFoodSchedule(_bodyIndex?: number, _tailDirection?: Direction) {
        let animatedPart = this.snakeConfig.parts.slice(1, this.snakeConfig.parts.length - 1);
        // let bodyIndex: number = _bodyIndex ? _bodyIndex : 1;
        // let newTailDirection: Direction = tailDirection ? tailDirection : this.lastMovementDirection!;

        let foodScheduleProperty: FoodScheduleProperty = {
            bodyIndex: _bodyIndex ? _bodyIndex : 1,
            tailDirection: _tailDirection ? _tailDirection : this.lastMovementDirection!,
            animatedBodyCount: animatedPart.length,
            lastPosition: this.snakeConfig.parts[this.snakeConfig.parts.length - 1].curIndexPosition
        };

        this.animateEatingFood(foodScheduleProperty);
    }

    animateEatingFood(foodScheduleProperty: FoodScheduleProperty) {
        // let lastPosition: { x: number, y: number };
        foodScheduleProperty.animatedBodyCount = this.snakeConfig.parts.length - 2;

        let callback = () => {
            if (foodScheduleProperty.bodyIndex < this.snakeConfig.parts.length - 1) {
                tween(this.snakeConfig.parts[foodScheduleProperty.bodyIndex].partNode)
                    .to(this.currentInterval / 2, { scale: new Vec3(2, 1, 1) })
                    .then(tween().to(this.currentInterval / 2, { scale: new Vec3(1, 1, 1) }))
                    .start();

                tween(this.snakeConfig.parts[foodScheduleProperty.bodyIndex].partNode.getComponent(Sprite))
                    .to(0, { color: new Color(0, 255, 60) })
                    .delay(this.currentInterval)
                    .then(tween().to(0, { color: new Color(255, 255, 255) }))
                    .start();

                foodScheduleProperty.lastPosition = this.snakeConfig.parts[this.snakeConfig.parts.length - 1].curIndexPosition;
            }

            // let animatedPart = this.snakeConfig.parts.slice(1, this.snakeConfig.parts.length - 1);
            foodScheduleProperty.bodyIndex++;

            if (foodScheduleProperty.bodyIndex == this.snakeConfig.parts.length) {
                let tail: Part = this.snakeConfig.parts[this.snakeConfig.parts.length - 1];
                tail.partType = PartType.BODY;
                tail.partNode.getComponent(ShopeeSprite)?.setFrame(3);

                let newTail: Part = this.makeIndividualPart(this.tailPrefabs, PartType.TAIL, foodScheduleProperty.lastPosition.x, foodScheduleProperty.lastPosition.y);
                this.rotateSnakePart(newTail, foodScheduleProperty.tailDirection, true);
                newTail.partNode.setScale(0, 0);

                tween(newTail.partNode)
                    .to(this.currentInterval, { scale: new Vec3(1, 1, 1) })
                    .start();

                this.onTheWayFoodCount--;
                this.foodCallbacks.shift();
            }
        };

        this.schedule(callback, this.currentInterval, foodScheduleProperty.animatedBodyCount - (foodScheduleProperty.bodyIndex - 1) + this.onTheWayFoodCount, 0);
        this.foodCallbacks.push(callback);
        this.onTheWayFoodCount++;
    }

    getCellNextPositionFromPart(part: Part): Vec3 | undefined {
        let nextTargetPosition: Vec3 | undefined = Vec3.ZERO;
        nextTargetPosition = this.board.getCellConfigFromIndex(part.nextIndexPosition.x, part.nextIndexPosition.y)?.worldPosition;
        return nextTargetPosition;
    }

    rotateSnakePart(part: Part, manualDirection?: Direction, forceRotate: boolean = false) {
        let partDirection: Direction | undefined;
        if (manualDirection)
            partDirection = manualDirection;
        else {
            partDirection = part.partType == PartType.HEAD ? this.lastMovementDirection : SnakeUtils.convertPositionToDirection(part.nextIndexPosition, part.curIndexPosition);
            if (partDirection == Direction.NONE) return;
        }

        let degree = SnakeUtils.convertDirectionToAngleInDegree(partDirection);
        let curAngle: number = Math.sign(part.partNode.angle) * Math.round(Math.abs(part.partNode.angle));
        let angleDif = (degree - curAngle) % 360;
        let targetAngle = curAngle + (angleDif > 90 || angleDif < -90 ? -Math.sign(angleDif) * 90 : angleDif);

        if (!forceRotate) {
            tween(part.partNode)
                .to(this.currentInterval * this.snakeConfig.interval.accelerateMultiplier, { angle: targetAngle })
                .start();
        }
        else {
            part.partNode.angle = degree;
        }

        part.partNode.angle = Math.sign(part.partNode.angle) * (Math.abs(part.partNode.angle) % 360);
    }

    changeCellType(type: cellType, cellIndex: { x: number, y: number }) {
        this.board.setCellTypeFromIndex(cellIndex.x, cellIndex.y, type);
    }
}

type Part = {
    partNode: Node,
    partType: PartType,
    curIndexPosition: {
        x: number, y: number,
    }
    nextIndexPosition: {
        x: number, y: number
    }
}

type FoodScheduleProperty = {
    bodyIndex: number,
    tailDirection: Direction,
    animatedBodyCount: number,
    lastPosition: { x: number, y: number }
}

export enum Direction {
    NONE, UP, DOWN, LEFT, RIGHT
}

enum PartType {
    HEAD, BODY, TAIL
}