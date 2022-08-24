import { _decorator, Component, Node, Vec3, director, math, toDegree } from 'cc';
import { Direction } from './SnakeConfig';
const { ccclass, property } = _decorator;

@ccclass('SnakeUtils')
export class SnakeUtils extends Component {
    static convertDirectionToAngleInDegree(direction?: Direction): number {
        let degree: number;

        switch (direction) {
            case Direction.UP:
                degree = 0;
                break;
            case Direction.DOWN:
                degree = 180;
                break;
            case Direction.LEFT:
                degree = 90;
                break;
            case Direction.RIGHT:
                degree = 270;
                break;
            default:
                degree = 0;
                break;
        }

        return degree;
    }

    // static convertTwoPosToAngleInDegree(curPos1: {x: number, y: number}, curPos2: {x: number, y: number}): number{
    //     let curPosDistance: Vec3 = new Vec3(curPos1.x - curPos2.x, curPos1.y - curPos2.y);
    //     let angleInRadian = Math.atan2(curPosDistance.y, curPosDistance.x);
    //     return toDegree(angleInRadian);
    // }

    static convertPositionToDirection(positionA: {x: number, y: number}, positionB: {x: number, y: number}): Direction {
        let positionDif: {x: number, y: number} = { x: positionA.x - positionB.x, y: positionA.y - positionB.y};

        let direction: Direction = Direction.NONE;

        if(positionDif.x == 0){
            if(positionDif.y == 1){
                direction = Direction.UP;
            }
            else if(positionDif.y == -1){
                direction = Direction.DOWN;
            }
        }
        else if(positionDif.y == 0){
            if(positionDif.x == 1){
                direction = Direction.RIGHT;
            }
            else if(positionDif.x == -1){
                direction = Direction.LEFT;
            }
        }

        return direction;
    }
}

