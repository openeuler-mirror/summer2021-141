
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Box2')
export class Box2 extends Component {
    @property({
        type: Node
    })
    tip: Node = null!;
    @property({
        type: Node
    })
    item: Node = null!;

    left1 = false;
    right1 = false;

    leftTimes = 0;
    rightTimes = 0;

    tempLeft = 0;
    public LeftBtnClick() {
        if (!this.right1) {
            this.leftTimes++;
            if (this.leftTimes == 8) this.left1 = true;
            else this.left1 = false;
            if (this.leftTimes == this.tempLeft + 4 && this.tempLeft != 0) {
                this.tip.active = true;
                this.leftTimes = 0;
                this.rightTimes = 0;
                this.left1 = false;
                this.right1 = false;
                this.tempLeft = 0;
            }
        }
        else {
            this.leftTimes++;
            if (this.leftTimes == this.tempLeft + 4) {
                if (this.left1 && this.right1) this.item.active = true;
                else {
                    this.tip.active = true;
                    this.leftTimes = 0;
                    this.rightTimes = 0;
                    this.left1 = false;
                    this.right1 = false;
                    this.tempLeft = 0;
                }
            }
        }
        console.log(this.leftTimes + "//left");
    }
    public RightBtnClick() {
        if (this.left1) {
            this.rightTimes++;
            if (this.rightTimes == 2) {
                this.right1 = true;
                this.tempLeft = this.leftTimes;
            }
            else this.right1 = false;
        }
        else {
            this.right1 = true;
            this.tempLeft = this.leftTimes;
        }
        console.log(this.rightTimes + "//right");
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
