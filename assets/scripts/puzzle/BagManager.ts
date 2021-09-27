
import { _decorator, Component, Node, Prefab, UI, Button, Event, Vec3, Animation, UITransform } from 'cc';
import { EventManager } from './EventManager';
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
    @property({
        type: EventManager
    })
    eventManager: EventManager = null!;
    @property({
        type: Animation
    })
    anim: Animation = null!;

    usedItem: Node = null!;

    isSyn = false;
    isUse = false;
    synCode = -1;
    useCode = -1;
    bagOn = false;
    //public 

    public Openbag() {
        this.bagOn = !this.bagOn;
        if (this.bagOn) {
            this.anim.play("bagOn");
        }
        else {
            this.anim.play("bagOff");
        }
    }
    public GetItem(event: Event) {
        let btn = event!.target as Node;
        let itemStatus = btn.getComponent(ItemStatus);
        if (!itemStatus?.isInBag) {
            btn.setParent(this.grid);
            itemStatus!.isInBag = true;
        }
    }
    public SelectItem() {
        this.select.setParent(this.btnLNowClick);
        this.select.position = new Vec3(0, 0, 0);
        let x = 1 / this.select.parent!.scale.x;
        let y = 1 / this.select.parent!.scale.y;
        this.select.scale = new Vec3(x, y, 1);
        this.select.active = true;
    }
    public SynItem(event: Event, custom: string) {//合成+使用获得
        this.btnLNowClick = event!.target as Node;
        let itemStatus = this.btnLNowClick.getComponent(ItemStatus);
        if (itemStatus?.isItem) {
            if (!itemStatus?.isInBag && !itemStatus.synGet) {
                let x = this.btnLNowClick.getComponent(UITransform)!.width / 376;
                let y = this.btnLNowClick.getComponent(UITransform)!.height / 360;
                if (x > 1 && y > 1) {
                    if (x >= y) this.btnLNowClick.scale = new Vec3(1 / x, 1 / x, 1);
                    else this.btnLNowClick.scale = new Vec3(1 / y, 1 / y, 1);
                }
                else if (x < 1) {
                    if (x <= 1 / y) this.btnLNowClick.scale = new Vec3(x, x, 1);
                    else this.btnLNowClick.scale = new Vec3(1/y, 1/y, 1);
                }
                else if (y < 1) {
                    if (1/x <= y) this.btnLNowClick.scale = new Vec3(1/x, 1/x, 1);
                    else this.btnLNowClick.scale = new Vec3(y, y, 1);
                }
                else {
                    if (x <= y) this.btnLNowClick.scale = new Vec3(x, x, 1);
                    else this.btnLNowClick.scale = new Vec3(y, y, 1);
                }
                this.btnLNowClick.setParent(this.grid);
                itemStatus!.isInBag = true;
            }
            else if (itemStatus.isItem) {
                if (!itemStatus?.isLong ) {
                    console.log(this.btnLNowClick.name + "//now");
                    if (this.btnLastClick != null) console.log(this.btnLastClick.name + "//last");
                    if (this.btnLNowClick != this.btnLastClick) {
                        if (itemStatus!.canSyn) {//物品能合成
                            this.isUse = false;
                            if (!this.isSyn) {//非合成状态
                                /*this.select.setParent(this.btnLNowClick);
                                this.select.position = new Vec3(0, 0, 0);
                                this.select.active = true;*/
                                this.SelectItem();
                                this.isSyn = true;
                                this.synCode = itemStatus.synCode;
                            }
                            else {//合成状态
                                this.SelectItem();
                                if (this.synCode == itemStatus.synCode) {//合成成功
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
                        else if (itemStatus.canUse) {//单用
                            this.isSyn = false;
                            this.SelectItem();
                            this.isUse = true;
                            this.usedItem = this.btnLNowClick;
                            this.useCode = itemStatus.useCode;
                        }
                        else {//物品不能合成/使用
                            this.SelectItem();
                            this.isSyn = false;
                        }
                        this.btnLastClick = event!.target as Node;
                    }
                    else {
                        this.select.active = !this.select.active;
                        if (itemStatus?.canSyn) this.isSyn = !this.isSyn;
                        if (itemStatus?.canUse) this.isUse = !this.isUse;
                        this.synCode = itemStatus.synCode;
                        this.useCode = itemStatus.useCode;
                    }
                }
                else {
                    itemStatus.time = 0.5;
                    itemStatus.isLong = false;
                }
            }
        }
        else {//使用获得
            if (this.isSyn) {
                if (this.synCode == itemStatus!.synCode) {
                    this.select.setParent(this.grid);
                    this.select.active = false;
                    this.btnLNowClick.destroy();
                    this.btnLastClick.destroy();
                    this.synItems[this.synCode].active = true;
                    this.isSyn = false;
                }
                else {
                    this.select.active = false;
                    this.isSyn = false;
                    this.synCode = -1;
                }
            }
        }
        console.log(this.synCode);
        console.log(this.isSyn);
    }
    public UseFinished() {
        this.isUse = false;
        this.select.setParent(this.grid);
        this.select.active = false;
        this.usedItem.destroy();
    }
    public UseItem(event: Event, custom: string) {//单纯使用
        let btn = event!.target as Node;
        let itemStatus = btn.getComponent(ItemStatus);
        if (this.isUse) {
            if (this.useCode == itemStatus?.useCode) {
                switch (this.useCode) {
                    case 0:
                        if (this.usedItem.name == "00") {
                            this.eventManager.Event0(0, itemStatus);
                        }
                        else {
                            this.eventManager.Event0(1, itemStatus);
                        }
                        this.UseFinished();
                        break;
                    case 1:
                        this.eventManager.Event1(btn, this.usedItem.getComponent(ItemStatus)!);
                        this.select.active = false;
                        if (this.usedItem.getComponent(ItemStatus)?.synCode == 1)
                            this.UseFinished();
                        break;
                    case 2:
                        this.eventManager.Event2();
                        this.UseFinished();
                        break;
                    case 3:
                        this.eventManager.Event3();
                        this.UseFinished();
                        break;
                    case 4:
                        this.eventManager.Event4();
                        this.UseFinished();
                        break;
                    case 5:
                        this.eventManager.Event5();
                        this.UseFinished();
                        break;
                    case 6:
                        this.eventManager.Event6();
                        this.UseFinished();
                        break;
                    case 7:
                        this.eventManager.Event7();
                        this.UseFinished();
                        break;
                    case 8:
                        this.eventManager.Event8();
                        this.UseFinished();
                        break;
                    case 9:
                        this.eventManager.Event9();
                        this.UseFinished();
                        break;
                    case 10:
                        if (this.eventManager.event9) {
                            this.eventManager.Event10();
                            this.UseFinished();
                        }
                        break;
                    case 11:
                        this.eventManager.Event11();
                        this.UseFinished();
                        break;
                    case 12:
                        this.eventManager.Event12();
                        this.UseFinished();
                        break;
                    case 13:
                        this.eventManager.Event13();
                        this.UseFinished();
                        break;
                    case 14:
                        this.eventManager.Event14();
                        this.UseFinished();
                        break;
                    case 15:
                        this.eventManager.Event15();
                        this.UseFinished();
                        break;
                    case 16:
                        this.eventManager.Event16();
                        this.UseFinished();
                        break;
                    case 17:
                        this.eventManager.Event17();
                        this.UseFinished();
                        break;
                }
                this.isUse = false;
            }
            else {
                this.isUse = false;
                this.select.active = false;
                this.useCode = -1;
            }
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
