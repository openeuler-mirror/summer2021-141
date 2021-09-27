
import { absMax, CCFloat, Collider, director, Enum, Event, find, ITriggerEvent, RichText, RigidBody, Script, tween, Scheduler, animation, BoxCollider, Vec3, physics, Label } from 'cc';
import { EventTouch, Touch, math } from 'cc';
import { _decorator, Component, Node, SkeletalAnimation, CCLoader, systemEvent, SystemEventType, Animation } from 'cc';
import { GameManager } from './GameManager';
import { ItemS } from './ItemS';
import { QA } from './Q&A';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({
        type: CCFloat,
    })
    fadeTime = 0.3;
    @property({
        type: CCFloat,
    })
    jumpTime = 0.3;
    @property({
        type: CCFloat,
    })
    runSpeed = 10;
    @property({
        type: SkeletalAnimation,
    })
    public animator: SkeletalAnimation = null!;
    @property(
        { type: Node }
    )
    men: Node[] = [];

    @property({
        type: GameManager
    })
    gameManager: GameManager = null!;
    @property(
        { type: Label }
    )
    scoreText: Label = null!;

    @property(
        { type: Node }
    )
    endPanel: Node = null!;

    @property(
        { type: Node }
    )
    effects: Node[] = [];
    @property(
        { type: QA }
    )
    qa: QA = null!;
    @property(
        { type: Node }
    )
    QAPanel: Node = null!;
    @property(
        { type: Node }
    )
    coins: Node = null!;
    @property(
        { type: Node }
    )
    bg1: Node = null!;
    @property(
        { type: Node }
    )
    bg2: Node = null!;
    @property(
        { type: Node }
    )
    bg3: Node = null!;

    rigidBody: RigidBody = null!;
    isHitBar: boolean = false;
    public isInvisibleH: boolean = false;
    isInvisibleR: boolean = false;
    isAccelerate: boolean = false;
    isAbsorb: boolean = false;

    public t1 = 0;
    t2 = 0;
    t3 = 0;
    t4 = 0;
    public phase = 0;
    speeds: number[] = [20, 25, 30];
    
    touchX = 0;
    touchY = 0;
    curentX = 0;
    targetX = 0;
    jump = false;
    slip = false;
    turn = false;
    curentZ = 0;
    public score = 0;
    playerStatus = 0;
    status = Enum({
        Normal: 0,
        Hardware: 1,
        Raspberry: 2,
        Cloud: 3,
        Virtual: 4,
    });
    onLoad()
    {
        this.playerStatus = this.status.Normal;
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStartEvent, this);
        systemEvent.on(SystemEventType.TOUCH_END, this.onTouchEndEvent, this);
    }
    public Restart() {
        this.scoreText.string = "0";
        this.bg1.active = true;
        this.bg2.active = false;
        this.bg3.active = false;
        this.node.position = new Vec3(0, 0, 0);
        this.animator.stop();
        this.men[1].active = false;
        this.men[0].active = true;
        this.men[2].active = false;
        this.men[3].active = false;
        this.men[4].active = false;
        let anim = this.men[0].getComponent(SkeletalAnimation);
        anim?.stop();
        this.isInvisibleH = false;
        this.isInvisibleR = false;
        this.isAccelerate = false;
        this.isAbsorb = false;
        this.phase = 0;
        this.t1 = 0;
        this.t2 = 0;
        this.t3 = 0;
        this.t4 = 0;
        this.touchX = 0;
        this. touchY = 0;
        this. curentX = 0;
        this.targetX = 0;
        this.jump = false;
        this. slip = false;
        this.turn = false;
        this.curentZ = 0;
        this.score = 0;
    }
    public OnStart()
    {
        let anim = this.men[0].getComponent(SkeletalAnimation);
        anim?.play();
       // this.animator.play("run");
        this.rigidBody = this.node.getComponent(RigidBody)!;
        let collider = this.node.getComponent(Collider)!;
        collider.on("onTriggerEnter", this.onTriggerEnter, this);
        // [3]
    }
    onDestroy()
    {
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStartEvent, this);
        systemEvent.off(SystemEventType.TOUCH_END, this.onTouchEndEvent, this);
    }
    onTouchStartEvent(touch: Touch, event: EventTouch)
    {
        if (this.jump || this.turn)
            return;
        this.touchX = touch.getLocation().x;
        this.touchY = touch.getLocation().y;
    }
    onTouchEndEvent(touch: Touch, event: EventTouch)
    {
        if (!this.gameManager.isPause && this.gameManager.isStart ) {
            if (this.jump || this.turn)
                return;
            let endX = touch.getLocation().x;
            let endY = touch.getLocation().y;
            let difX = this.touchX - endX;
            let difY = this.touchY - endY;

            //上下起跳
            console.log(difY);
            if (Math.abs(difY) > Math.abs(difX) && difY < -30 && !this.jump) {
                difX = 0;
                this.jump = true;
                this.men[1].active = true;
                this.men[0].active = false;
                this.men[2].active = false;
                this.men[3].active = false;
                this.men[4].active = false;
                let anim = this.men[1].getComponent(SkeletalAnimation);
                anim?.play();
                setTimeout(() => {
                    this.jump = false;
                    this.men[0].active = true;
                    this.men[1].active = false;
                    let anim = this.men[0].getComponent(SkeletalAnimation);
                    anim?.play();
                }, this.jumpTime * 1900);
                this.rigidBody.applyForce(new math.Vec3(0, 23000, 0));
                console.log("jump");
                return;
            }
            else if (Math.abs(difY) > Math.abs(difX) && difY > 30) {
                difX = 0;
                this.slip = true;
                this.men[2].active = true;
                this.men[0].active = false;
                let anim = this.men[2].getComponent(SkeletalAnimation);
                anim?.play();
                this.node.getComponent(BoxCollider)!.size = new Vec3(0.5,0.5,0.5);
                this.node.getComponent(BoxCollider)!.center = new Vec3(0, 0.3, 0.1);
                setTimeout(() => {
                    this.slip = false;
                    this.node.getComponent(BoxCollider)!.size = new Vec3(0.5,1.5,0.5);
                    this.node.getComponent(BoxCollider)!.center = new Vec3(0, 0.8, 0.1);
                    this.men[0].active = true;
                    this.men[2].active = false;
                    let anim = this.men[0].getComponent(SkeletalAnimation);
                    anim?.play();
                }, this.jumpTime * 2300);
                console.log("slip");
                return;
            }
            //左右转向
            if (difX < -30) {
                this.targetX = Math.max(this.curentX - 1.5, -1.5);
                this.men[3].active = true;
                this.men[0].active = false;
                let anim = this.men[3].getComponent(SkeletalAnimation);
                anim?.play();
                setTimeout(() => {
                    this.men[0].active = true;
                    this.men[3].active = false;
                    let anim = this.men[3].getComponent(SkeletalAnimation);
                    anim?.play();
                }, this.fadeTime * 800);
            }
            else if (difX > 30) {
                this.targetX = Math.min(this.curentX + 1.5, 1.5);
                this.men[4].active = true;
                this.men[0].active = false;
                let anim = this.men[4].getComponent(SkeletalAnimation);
                anim?.play();
                setTimeout(() => {
                    this.men[0].active = true;
                    this.men[4].active = false;
                    let anim = this.men[4].getComponent(SkeletalAnimation);
                    anim?.play();
                }, this.fadeTime * 800);
            }
            if (this.targetX != this.curentX) {
                this.turn = true;
                setTimeout(() => {
                    this.curentX = this.targetX;
                    this.turn = false;
                }, this.fadeTime * 1200);
            }
        }
    }
    onTriggerEnter(event: ITriggerEvent)
    {
        console.log(event.type, event);
        let instance = event.otherCollider.node;
        console.log(instance.name)
        if (instance.getComponent(ItemS)?.isCoin) {
            this.gameManager.coinPoolRestore(instance);
            this.score++;
            this.scoreText.string = this.score.toString();
            return;
        }
        else if (instance.getComponent(ItemS)?.isBar && this.isInvisibleH == false && !this.gameManager.isPause) {
            if (this.isInvisibleR == false) {
                this.qa.SetQA();
                let anim = this.QAPanel.children[1].getComponent(Animation)!;
                this.QAPanel.active = true;
                anim.play();
                this.isAccelerate = false;
                this.runSpeed = this.speeds[this.phase];
                this.isAbsorb = false;
                this.effects[2].active = false;
                //director.pause();
                this.gameManager.isPause = true;
                //this.animator.crossFade("run");
                this.animator.pause();
            }
            else {
                this.isInvisibleR = false;
                this.effects[1].active = false;
            }
        }
        else if (instance.getComponent(ItemS)?.isHW) {
            this.isInvisibleH = true;
            this.t1 = 10;
            this.effects[0].active = true;
            this.gameManager.HWPoolRestore(instance);
        }
        else if (instance.getComponent(ItemS)?.isRB) {
            this.isInvisibleR = true;
            this.t2 = 10;
            this.effects[1].active = true;
            this.gameManager.RBPoolRestore(instance);
        }
        else if (instance.getComponent(ItemS)?.isCN) {
            this.isAccelerate = true;
            this.t3 = 10;
            this.gameManager.CNPoolRestore(instance);
        }
        else if (instance.getComponent(ItemS)?.isVM) {
            this.isAbsorb = true;
            this.t4 = 10;
            this.effects[2].active = true;
            this.gameManager.VMPoolRestore(instance);
        }
    }
    public Setting() {
        this.isInvisibleH
    }
    public setEndPanelHide()
    {
        this.endPanel.active = false;
    }
    update(deltaTime: number)
    {
        console.log(this.node.position.z);
        if (this.phase != 3) {
            if (this.node.position.z < 6800) this.runSpeed = 20 + this.node.position.z * 5 / 3400;
            else this.runSpeed = 30;
        }
        if (this.node.position.z > 3400 && this.phase == 0) {
            this.phase = 1;
        }
        if (this.node.position.z > 3695 && this.phase == 1) {
            this.bg1.active = false;
            this.bg2.active = true;
        }
        if (this.node.position.z > 6800 && this.phase == 1) {
            this.phase = 2;
        }
        if (this.node.position.z > 7100 && this.phase == 2) {
            this.bg2.active = false;
            this.bg3.active = true;
        }
        if (this.node.position.z > 10200 && this.phase == 2) {
            this.phase = 3;
            for (let i = 0; i < this.gameManager.barRoot.children.length; i++)
                this.gameManager.barRoot.children[i].active = false;
        }
        if (this.phase == 3) {
            this.runSpeed -= this.speeds[2]/5 * deltaTime;
        }
        if (this.runSpeed <= 0)
            this.animator.stop();
        if (!this.gameManager.isPause && this.gameManager.isStart) {
            if (this.isInvisibleH) {
                this.t1 -= deltaTime;
                if (this.t1 <= 0) {
                    this.isInvisibleH = false;
                    this.effects[0].active = false;
                }
            }
            if (this.isInvisibleR) {
                this.t2 -= deltaTime;
                if (this.t2 <= 0) {
                    this.isInvisibleR = false;
                    this.effects[1].active = false;
                }
            }
            if (this.isAccelerate) {
                this.runSpeed = this.speeds[this.phase]+10;
                this.t3 -= deltaTime;
                if (this.t3 <= 0) {
                    this.isAccelerate = false;
                    this.runSpeed = this.speeds[this.phase];
                }
            }
            if (this.isAbsorb) {
                this.t4 -= deltaTime;
                if (this.t4 <= 0) {
                    this.isAbsorb = false;
                    this.effects[2].active = false;
                }
                for (let i = 0; i < this.coins.children.length; i++) {
                    if (this.coins.children[i].position.z < this.node.position.z + 10) {
                        if (this.coins.children[i].getComponent(ItemS)?.isCoin) {
                           // this.gameManager.coinPoolRestore(this.coins.children[i]);
                          //  this.score++;
                         //   this.scoreText.string = this.score.toString();
                            //tween(this.coins.children[i].position).to(1, this.node.position).start();
                            let pos = this.coins.children[i].position.clone();
                            pos.x = math.lerp(pos.x, this.node.position.x, 1.8 / this.fadeTime * deltaTime * 4);
                            pos.z = math.lerp(pos.z, this.node.position.z + this.speeds[this.phase] / 15, 1.8 / this.fadeTime * deltaTime * 4);
                            pos.y = math.lerp(pos.y, this.node.position.y+0.8, 1.8 / this.fadeTime * deltaTime * 4);
                            this.coins.children[i].setPosition(pos);
                        }
                    }
                }
            }
            this.curentZ += this.runSpeed * deltaTime;
            let pos = this.node.position.clone();
            pos.z = this.curentZ;
            if (this.turn) {
                pos.x = math.lerp(pos.x, this.targetX, 1.8 / this.fadeTime * deltaTime);
            }
            this.node.setPosition(pos);
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
