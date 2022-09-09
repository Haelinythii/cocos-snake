import { _decorator, Component, Node, Vec2, Vec3, instantiate, CCInteger, Prefab, UITransform, randomRangeInt, math } from 'cc';
import { ShopeeSprite } from '../sample/classes/shopeeSprite';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('BoardSpawner')
export class BoardSpawner extends Component {

    static readonly CELL_COUNT_WIDTH: number = 12;
    static readonly CELL_COUNT_HEIGHT: number = 13;

    // grid: Node[] = [];
    boardConfigs: CellConfig[][] = []; //-> playing field, 0 is tile, 1 is wall

    @property(Prefab)
    cellPrefab: Prefab = null!;
    @property(Prefab)
    wallPrefab: Prefab = null!;

    @property(Prefab)
    applePrefab: Prefab = null!;

    apple: Node = null!;

    start() {
        console.log(GameManager.instance.getBoardConfigTiles());
        this.createGridData();
    }


    createGridData() {
        let colorToggler = false;
        let boardTemplate = GameManager.instance.getBoardConfigTiles();

        if(!boardTemplate) return;

        for (let i = 0; i < BoardSpawner.CELL_COUNT_WIDTH; i++) {
            let newColumn: CellConfig[] = [];
            for (let j = 0; j < BoardSpawner.CELL_COUNT_HEIGHT; j++) {
                let cell: Node;

                if(boardTemplate[BoardSpawner.CELL_COUNT_HEIGHT - 1 - j][i] == 0){
                    cell = instantiate(this.cellPrefab);
                    cell.getComponent(ShopeeSprite)?.setFrame(colorToggler ? 0 : 1);
                }
                else{
                    cell = instantiate(this.wallPrefab);
                }

                let cellWidth: number = cell.getComponent(UITransform)?.contentSize.x!;
                let cellHeight: number = cell.getComponent(UITransform)?.contentSize.y!;

                let positionX: number = cellWidth * (i - Math.round(BoardSpawner.CELL_COUNT_WIDTH / 2));
                let positionY: number = cellHeight * (j - Math.round(BoardSpawner.CELL_COUNT_HEIGHT / 2));

                let curCelllConfig: CellConfig = {
                    cellNode: cell,
                    type: boardTemplate[BoardSpawner.CELL_COUNT_HEIGHT- 1 - j][i],
                    worldPosition: this.node.getPosition().add(new Vec3(positionX, positionY, 0)),
                };

                newColumn.push(curCelllConfig);

                this.node.addChild(cell);
                cell.setPosition(positionX, positionY, 0);

                colorToggler = !colorToggler;
                // console.log(j+1 == this.CELL_COUNT_HEIGHT);

            }

            this.boardConfigs.push(newColumn);

        }
        this.boardConfigs?.forEach(b => console.log(b));

        setTimeout(() => {
            this.spawnApple();
        }, 0.1);
    }

    snakeEatApple() {
        this.spawnApple();
    }

    spawnApple() {
        let availableCell: CellConfig = this.getRandomAvailableCell();

        availableCell.type = cellType.food;

        if (!this.apple) {
            this.apple = instantiate(this.applePrefab);
            this.node.addChild(this.apple);
        }
        this.apple.setPosition(availableCell.cellNode.getPosition());
    }

    getRandomAvailableCell(): CellConfig {
        let randomX: number, randomY: number;
        while (true) {
            randomX = randomRangeInt(0, BoardSpawner.CELL_COUNT_WIDTH);
            randomY = randomRangeInt(0, BoardSpawner.CELL_COUNT_HEIGHT);

            if (this.checkIfCellIsAvailable(randomX, randomY))
                break;
        }

        return this.boardConfigs[randomX][randomY];
    }

    checkIfCellIsAvailable(x: number, y: number): boolean {
        if (this.boardConfigs[x][y].type == cellType.walkable)
            return true;
        return false;
    }

    getCellConfigFromIndex(x: number, y: number): CellConfig | null {
        if (x < 0 || x > BoardSpawner.CELL_COUNT_WIDTH - 1 || y < 0 || y > BoardSpawner.CELL_COUNT_HEIGHT - 1)
            return null
        return this.boardConfigs[x][y];
    }

    setCellTypeFromIndex(x: number, y: number, _type: cellType) {
        this.boardConfigs[x][y].type = _type;
    }
}

export interface CellConfig {
    cellNode: Node;
    type: cellType;
    worldPosition: Vec3;
};

export enum cellType {
    walkable, nonwalkable, food
}