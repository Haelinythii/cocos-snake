import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HeaderSwapper')
export class HeaderSwapper extends Component {
    @property(Node)
    beforeClick?: Node | null;

    @property(Node)
    afterClick?: Node | null;

    start() {

    }

    swapToAfterClick() {
        if(this.beforeClick)
            this.beforeClick.active = false;

        if(this.afterClick)
            this.afterClick.active = true;
    }
}

