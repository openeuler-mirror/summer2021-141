
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DialogManager')
export class DialogManager extends Component {
    @property({
        type: Node,
    })
    dialog: Node = null!;
    @property({
        type: Label,
    })
    lable: Label = null!;

    dialogCode = 0;
    str: string[] = ["dialog1", "dialog2", "dialog3"];
    public OpenDialog() {
        this.dialog.active = true;
    }
    public SetDialog() {

    }
    public NextDialog() {

        switch (this.dialogCode) {
            case 3:
                this.dialog.active = false;
                break;
            default:
                this.lable.string = this.str[this.dialogCode];
                break;
        }
        this.dialogCode++;
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
