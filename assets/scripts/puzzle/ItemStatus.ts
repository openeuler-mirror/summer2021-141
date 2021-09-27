
import { _decorator, Component, Node, CCBoolean, CCInteger, math, labelAssembler, Label } from 'cc';
import { BagManager } from './BagManager';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('ItemStatus')
export class ItemStatus extends Component {
    @property({
        type: UIManager
    })
    public uiManager: UIManager = null!;
    @property({
        type: Boolean
    })
    public isInBag = false;
    @property({
        type: Boolean
    })
    public synGet = false;
    @property({
        type: Boolean
    })
    public canUse = false;
    @property({
        type: Boolean
    })
    public canSyn = false;
    @property({
        type: Boolean
    })
    public isSelect = false;
    @property({
        type: Boolean
    })
    public isItem = false;
    @property({
        type: CCInteger
    })
    public synCode = -1;
    @property({
        type: CCInteger
    })
    public useCode = -1;

    public time = 0.5;
    public isStartTime = false;
    public isLong = false;

    public TouchStart() {
        if (this.isInBag) {
            this.isStartTime = true;
            this.isLong = false;
            this.time = 0.5;
        }
    }
    public TouchEnd() {
        if (this.isInBag) {
            this.isStartTime = false;
            if (!this.isLong) {
                this.time = 0.5;
            }
            console.log(this.node.name+"long:" + this.isLong);
        }
    }

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.TouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.TouchEnd, this);
    }

    start () {
        // [3]
    }

    update(deltaTime: number) {
        if (this.isStartTime) {
            this.time -= deltaTime;
            if (this.time <= 0) {
                this.isLong = true;
            }
        }
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
