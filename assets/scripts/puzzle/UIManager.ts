
import { _decorator, Component, Node, Canvas, view, macro, find, UITransform, director, Event, Label } from 'cc';
import { Fade } from './Fade'
import { BagManager } from './BagManager'
import { ItemStatus } from './ItemStatus';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property({
        type: BagManager
    })
    bagManager: BagManager = null!;

    @property({
        type: Fade
    })
    fade: Fade = null!;
    @property({
        type: Node
    })
    startUI: Node = null!;
    @property({
        type: Node
    })
    gameUI: Node = null!;
    @property({
        type: Node
    })
    infoUI: Node = null!;
    @property({
        type: Node,
    })
    select: Node = null!;
    @property({
        type: Node,
    })
    scenes: Node[] = [];

    public StartGame() {
        this.gameUI.active = true;
    }
    public RestartGame() {
        this.startUI.active = true;
    }
    public Close(event: Event) {
        let btn = event!.target as Node;
        btn.parent!.active = false;
    }
    public ShowInfo(event: Event) {
        let btn = event!.target as Node;
        let itemStatus = btn.getComponent(ItemStatus);
        if (!itemStatus?.isInBag && !itemStatus?.synGet && itemStatus?.isItem) {
            this.infoUI.active = true;
            let name = this.infoUI.children[3].getComponent(Label);
            name!.string = btn.name;
        }
        else {
            if (itemStatus!.isLong) {
                this.infoUI.active = true;
                let name = this.infoUI.children[3].getComponent(Label);
                name!.string = btn.name;
            }
        }
    }
    public CheckScene(event: Event, custom: string) {
        this.scenes[Number(custom)].active = true;
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
