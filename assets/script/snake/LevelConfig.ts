import { _decorator, Component, Node, randomRangeInt, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelConfig')
export class LevelConfig {
    readonly levelConfigs = [
        // Classic
        {
            boardConfig: {
                tiles: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ]
            },
            snakeConfig: {
                parts: [
                    { x: 1, y: 7 },
                    { x: 1, y: 8 },
                    { x: 1, y: 9 },
                    { x: 1, y: 10 },
                ],
                interval: {
                    initial: 0.3,
                    accelerateMultiplier: 0.9,
                    accelerateEvery: 2,
                    minimum: 0.12,
                }
            }
        },
        // Bird-Eye
        {
            boardConfig: {
                tiles: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
                    [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
                    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
                    [0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
                    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0],
                    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ]
            },
            snakeConfig: {
                parts: [
                    { x: 9, y: 5 },
                    { x: 9, y: 4 },
                    { x: 10, y: 4 },
                    { x: 10, y: 3 },
                    { x: 10, y: 2 },
                    { x: 11, y: 2 },
                    { x: 11, y: 1 },
                ],
                interval: {
                    initial: 0.3,
                    accelerateMultiplier: 0.9,
                    accelerateEvery: 10,
                    minimum: 0.2,
                }
            }
        },
        // Naruto
        {
            boardConfig: {
                tiles: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ]
            },
            snakeConfig: {
                parts: [
                    { x: 4, y: 7 },
                    { x: 5, y: 7 },
                    { x: 5, y: 6 },
                    { x: 4, y: 6 },
                    { x: 3, y: 6 },
                    { x: 3, y: 7 },
                ],
                interval: {
                    initial: 0.3,
                    accelerateMultiplier: 0.9,
                    accelerateEvery: 5,
                    minimum: 0.2,
                }
            }
        },
        // Invalid level
        {
            boardConfig: {
                tiles: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ]
            },
            snakeConfig: {
                parts: [
                    { x: 1, y: 7 },
                    { x: 1, y: 8 },
                    { x: 1, y: 9 },
                    { x: 1, y: 9 },
                ],
                interval: {
                    initial: 0.3,
                    accelerateMultiplier: 0.9,
                    accelerateEvery: 2,
                    minimum: 0.12,
                }
            }
        }
    ];

    currentLevelConfig: number = -1;

    constructor() {
        this.randomizeLevelConfig();
    }

    randomizeLevelConfig() {
        this.currentLevelConfig = randomRangeInt(0, this.levelConfigs.length);
        // this.currentLevelConfig = 3;
    }

    getCurrentLevelConfig() {
        return this.levelConfigs[this.currentLevelConfig];
    }

    checkIfLevelConfigIsValid(): boolean {
        const boardConfig = this.levelConfigs[this.currentLevelConfig].boardConfig;
        const snakeConfig = this.levelConfigs[this.currentLevelConfig].snakeConfig;

        //Snake length < 3 (need to have head, body, tail)
        if (snakeConfig.parts.length < 3) return false;

        for (let i = 0; i < snakeConfig.parts.length; i++) {
            const currentPosition = snakeConfig.parts[i];

            //Snake occupy unwalkable tile (wall)
            if (boardConfig.tiles[currentPosition.y][currentPosition.x])
                return false;

            //Snake part is not 1 manhattan apart from each other
            if (i == snakeConfig.parts.length - 1) continue;

            const distanceToNextPart: { x: number, y: number } = {
                x: Math.abs(currentPosition.x - snakeConfig.parts[i + 1].x),
                y: Math.abs(currentPosition.y - snakeConfig.parts[i + 1].y),
            };

            if ((distanceToNextPart.x == 1 && distanceToNextPart.y == 1) ||
                (distanceToNextPart.x == 0 && distanceToNextPart.y == 0)) {
                return false;
            }
        }
        return true;
    }
}