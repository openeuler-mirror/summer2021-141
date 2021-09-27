
import { _decorator, Component, Node,Event, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Sudoku')
export class Sudoku extends Component {
    @property({
        type: Node,
    })
    sudoku: Node = null!;


    public OpenSu() {
        this.sudoku.active = true;
    }
    public NumberAdd(event: Event) {
        let btn = event!.target as Node;
        let label = btn.children[9].getComponent(Label);
        if (label?.string != "") {
            let a = Number(label?.string);
            a++;
            if (a > 8) {
                a = 0;
                btn.children[8].active = false;
                btn.children[0].active = true;
            }
            else {
                btn.children[a - 1].active = false;
                btn.children[a].active = true;
            }
            label!.string = a.toString();

        }
        else {
            label!.string = "0";
            btn.children[0].active = true;
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
