import { _decorator, Component, Node, Graphics, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoundRectangleGraphics')
export class RoundRectangleGraphics extends Component {

    @property(Graphics)
    graphic: Graphics | null = null;

    uiTransform?: UITransform | null;

    onLoad() {
        this.graphic = this.node.getComponent(Graphics);
        this.uiTransform = this.node.getComponent(UITransform);
    }

    start() {
        const { uiTransform } = this;
        if (!uiTransform) return;
        const { width, height } = uiTransform;
        const { x, y } = this.node.getPosition();

        this.graphic?.roundRect(
            x - width / 2,
            y - height / 2,
            width,
            height,
            Math.min(width, height) * 0.1
        );
        this.graphic?.fill();
    }
}

