
import { _decorator, Component, Node, Prefab, UI, Button, Event, Vec3 } from 'cc';
import { ItemStatus } from './ItemStatus';
const { ccclass, property } = _decorator;

@ccclass('BagManager')
export class BagManager extends Component {
    @property({
        type: Node,
    })
    btnLastClick: Node = null!;
    @property({
        type: Node,
    })
    btnLNowClick: Node = null!;
    @property({
        type: Node,
    })
    grid: Node = null!;
    @property({
        type: Node,
    })
    select: Node = null!;
    @property({
        type: Node,
    })
    synFailed: Node = null!;
    @property({
        type: Node,
    })
    synItems: Node[] = [];

    isSyn = false;
    synCode = -1;

    //public 

    public GetItem(event: Event) {
        let btn = event!.target as Node;
        let itemStatus = btn.getComponent(ItemStatus);
        if (!itemStatus?.isInBag) {
            btn.setParent(this.grid);
            itemStatus!.isInBag = true;
        }
    }
    public SelectItem(event: Event, custom: string) {
        this.btnLNowClick = event!.target as Node;
        //this.btnLNowClick = btn as Node;
        let itemStatus = this.btnLNowClick.getComponent(ItemStatus);
        if (!itemStatus?.isInBag) {
            this.btnLNowClick.setParent(this.grid);
            itemStatus!.isInBag = true;
        }
        else {
            if (!itemStatus.isLong) {
                console.log(this.btnLNowClick.name + "//now");
                if (this.btnLastClick != null) console.log(this.btnLastClick.name + "//last");
                if (this.btnLNowClick != this.btnLastClick) {
                    if (itemStatus!.canSyn) {//物品能合成
                        if (!this.isSyn) {//非合成状态
                            this.select.setParent(this.btnLNowClick);
                            this.select.position = new Vec3(0, 0, 0);
                            this.select.active = true;
                            this.isSyn = true;
                            this.synCode = Number(custom);
                        }
                        else {//合成状态
                            this.select.setParent(this.btnLNowClick);
                            this.select.position = new Vec3(0, 0, 0);
                            if (this.synCode == Number(custom)) {//合成成功
                                this.select.setParent(this.grid);
                                this.select.active = false;
                                this.btnLNowClick.destroy();
                                this.btnLastClick.destroy();
                                this.synItems[this.synCode].active = true;
                            }
                            else {//合成失败
                                this.synFailed.active = true;
                                this.synCode = -1;
                            }
                            this.isSyn = false;
                            this.select.active = false;
                        }
                    }
                    else {//物品不能合成
                        this.select.setParent(this.btnLNowClick);
                        this.select.position = new Vec3(0, 0, 0);
                        this.select.active = true;
                        this.isSyn = false;
                    }
                    this.btnLastClick = event!.target as Node;
                }
                else {
                    this.select.active = !this.select.active;
                    if (itemStatus.canSyn) this.isSyn = !this.isSyn;
                    this.synCode = Number(custom);
                }
            }
            else {
                itemStatus.time = 0.5;
                itemStatus.isLong = false;
            }
        }
        console.log(this.synCode);
        console.log(this.isSyn);
    }
    public SynItem() {

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
