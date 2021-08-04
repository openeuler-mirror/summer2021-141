
import { _decorator, Component, Node, CCBoolean, CCInteger, math, labelAssembler, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemStatus')
export class ItemStatus extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({
        type: Node,
    })
    bagLayOut: Node = null!;

    @property(
        { type: Node }
    )
    player: Node = null!;

    @property(
        { type: Node }
    )
    info: Node = null!;
    @property(
        { type: Label }
    )
    infoc: Label = null!;
    @property(
        { type: Node }
    )
    message: Node = null!;
    @property({
        type: CCInteger,
    })
    useTimes: number = 0;

    isPicked: boolean = false;

    public PickUp() {
        if (!this.isPicked) {
            let s = Math.sqrt((this.player.position.x - this.node.position.x) ^ 2 + (this.player.position.y - this.node.position.y) ^ 2);
            console.log(this.isPicked);
            if (s <= 5) {
                this.node.parent = this.bagLayOut;
                this.isPicked = true;
            }
            else {
                this.info.active = !this.info.active;
            }
        }
        else {
            let temp = this.message.getComponent(Label);
            if (temp != null) temp.string = this.infoc.string;
        }
    }
    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
