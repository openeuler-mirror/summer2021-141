
import { _decorator, Component, Node, EventTouch, UITransform, Vec3, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Drag')
export class Drag extends Component {
    @property({
        type: UITransform
    })
    uiTransform: UITransform = null!;
    camera: Camera = null!;
    onLoad() {
        this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.uiTransform = this.node.getComponent(UITransform)!;
    }

    start() {
        console.log(this.node.position);
        // [3]
    }
    public _onTouchMove(touchEvent: EventTouch) {
        let location = touchEvent.getLocation();
        
        console.log(location+"\\\\");
        this.node.position = this.uiTransform.convertToNodeSpaceAR(new Vec3(location.x, location.y, 0));
        console.log(this.node.position + "|||");
    }
    
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
