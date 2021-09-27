
import { _decorator, Component, Node } from 'cc';
import { ItemStatus } from './ItemStatus';
const { ccclass, property } = _decorator;

@ccclass('EventManager')
export class EventManager extends Component {
    @property({
        type: Node
    })
    event0: Node[] = [];
    @property({
        type: Node
    })
    event1: Node[] = [];
    @property({
        type: Node
    })
    event2: Node = null!;
    @property({
        type: Node
    })
    event3: Node = null!;
    @property({
        type: Node
    })
    event4: Node = null!;
    @property({
        type: Node
    })
    event7: Node = null!;
    @property({
        type: Node
    })
    event8: Node = null!;
    @property({
        type: Node
    })
    event10: Node = null!;
    @property({
        type: Node
    })
    event11: Node = null!;
    @property({
        type: Node
    })
    event14: Node = null!;
    @property({
        type: Node
    })
    event15: Node = null!;
    @property({
        type: Node
    })
    event16: Node = null!;
    @property({
        type: Node
    })
    event17: Node = null!;

    box3event5 = false;
    box3event6 = false;
    box3event7 = false;

    event9 = false;

    box4event12 = false;
    box4event13 = false;
    box4event14 = false;

    public Event0(a: number, items: ItemStatus) {
        if (a == 0) {//±´ÑÎ
            if (items.synCode == -1) {
                this.event0[0].active = true;
            }
            else {
                this.event0[0].active = true;
                this.event0[1].active = true;
            }
        }
        else {
            if (items.synCode == 0) {
                this.event0[0].active = true;
                this.event0[1].active = true;
            }
        }
        items.synCode++;
    }
    public Event1(item: Node, items: ItemStatus) {
        items.synCode++;
        if (item.name == "01") this.event1[0].active = true;
        else this.event1[1].active = true;
    }
    public Event2() {
        this.event2.active = true;
    }
    public Event3() {
        this.event3.active = true;
    }
    public Event4() {
        this.event4.active = true;
    }
    public Event5() {
        this.box3event5 = true;
        if (this.box3event5 && this.box3event6 && this.box3event7) this.event7.active = true;
    }
    public Event6() {
        this.box3event6 = true;
        if (this.box3event5 && this.box3event6 && this.box3event7) this.event7.active = true;
    }
    public Event7() {
        this.box3event7 = true;
        if (this.box3event5 && this.box3event6 && this.box3event7) this.event7.active = true;
    }
    public Event8() {
        this.event8.active = true;
    }
    public Event9() {
        this.event9 = true;
    }
    public Event10() {
        this.event10.active = true;
    }
    public Event11() {
        this.event11.active = true;
    }
    public Event12() {
        this.box4event12 = true;
        if (this.box4event12 && this.box4event13 && this.box4event14) this.event14.active = true;
    }
    public Event13() {
        this.box4event13 = true;
        if (this.box4event12 && this.box4event13 && this.box4event14) this.event14.active = true;
    }
    public Event14() {
        this.box4event14 = true;
        if (this.box4event12 && this.box4event13 && this.box4event14) this.event14.active = true;
    }
    public Event15() {
        this.event15.active = true;
    }
    public Event16() {
        this.event16.active = false;
    }
    public Event17() {
        this.event17.active = true;
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
