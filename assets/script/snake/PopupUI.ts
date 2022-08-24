import { _decorator, Component, Node, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PopupUI')
export class PopupUI extends Component {
    @property(Node)
    gameOverPanel: Node = null!;

    @property(UIOpacity)
    darkBackground: UIOpacity = null!;

    onEnable(){
        tween(this.gameOverPanel)
            .to(0.5, {scale: new Vec3(1, 1, 1)})
            .start();
        
        tween(this.darkBackground)
            .to(0.5, {opacity: 255})
            .start();
    }
}

