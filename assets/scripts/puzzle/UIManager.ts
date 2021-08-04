
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({
        type: Node,
    })
    bagBtn: Node = null!;
    @property({
        type: Node,
    })
    menuBtn: Node = null!;
    @property({
        type: Node,
    })
    bag: Node = null!;
    @property({
        type: Node,
    })
    menu: Node = null!;

    public OpenBag() {
        director.resume();
        this.bag.active = true;
    }
    public OpenMenu() {
        director.pause();
        this.menu.active = true;
    }
    public CloseBag() {
        director.resume();
        this.bag.active = false;
    }
    public CloseMenu() {
        director.resume();
        this.menu.active = false;
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
