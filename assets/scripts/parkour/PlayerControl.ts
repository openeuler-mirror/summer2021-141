
import { absMax, CCFloat, Collider, director, Enum, Event, find, ITriggerEvent, RichText, RigidBody, Script, tween, Scheduler, animation } from 'cc';
import { EventTouch, Touch, math } from 'cc';
import { _decorator, Component, Node, SkeletalAnimation, CCLoader, systemEvent, SystemEventType, Animation } from 'cc';
import { GameManager } from './GameManager';
import { ItemS } from './ItemS';
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

    @property({
        type: GameManager
    })
    gameManager: GameManager = null!;
    @property(
        { type: RichText }
    )
    scoreText: RichText = null!;

    @property(
        { type: Node }
    )
    endPanel: Node = null!;
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
    speeds: number[] = [15, 20, 30];
    
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
    public OnStart()
    {
        this.animator.play("run");
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
            if (Math.abs(difY) > Math.abs(difX) && difY < -30) {
                difX = 0;
                this.jump = true;
                this.animator.play("idle");
                setTimeout(() => {
                    this.jump = false;
                    this.animator.crossFade("run");
                }, this.jumpTime * 1200);
                this.rigidBody.applyForce(new math.Vec3(0, 23000, 0));
                console.log("jump");
                return;
            }
            else if (Math.abs(difY) > Math.abs(difX) && difY > 30) {
                difX = 0;
                this.slip = true;
                this.animator.play("life");
                setTimeout(() => {
                    this.slip = false;
                    this.animator.crossFade("run");
                }, this.jumpTime * 1200);
                console.log("slip");
                return;
            }
            //左右转向
            if (difX < -30) {
                this.targetX = Math.max(this.curentX - 1.5, -1.5);
                this.animator.play("dodgeRight");
                setTimeout(() => {
                    this.animator.crossFade("run");
                }, this.fadeTime * 1000);
            }
            else if (difX > 30) {
                this.targetX = Math.min(this.curentX + 1.5, 1.5);
                this.animator.play("dodgeLeft");
                setTimeout(() => {
                    this.animator.crossFade("run");
                }, this.fadeTime * 1000);
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
                let anim = this.QAPanel.children[1].getComponent(Animation)!;
                this.QAPanel.active = true;
                anim.play();
                this.isAccelerate = false;
                this.runSpeed = this.speeds[this.phase];
                this.isAbsorb = false;
                //director.pause();
                this.gameManager.isPause = true;
                //this.animator.crossFade("run");
                this.animator.pause();
            }
            else {
                this.isInvisibleR = false;
            }
        }
        else if (instance.getComponent(ItemS)?.isHW) {
            this.isInvisibleH = true;
            this.t1 = 10;
            this.gameManager.HWPoolRestore(instance);
        }
        else if (instance.getComponent(ItemS)?.isRB) {
            this.isInvisibleR = true;
            this.t2 = 10;
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
        if (this.phase!=3) this.runSpeed = this.speeds[this.phase];
        if (this.node.position.z > 1700 && this.phase == 0) {
            this.phase = 1;
            //this.bg1.active = false;
           // this.bg2.active = true;
        }
        if (this.node.position.z > 3400 && this.phase == 1) {
            this.phase = 2;
          // this.bg2.active = false;
           // this.bg3.active = true;
        }
        if (this.node.position.z > 5100 && this.phase == 2) {
            this.phase = 3;
            for (let i = 0; i < this.gameManager.barRoot.children.length; i++)
                this.gameManager.barRoot.children[i].active = false;
        }
        if (this.phase == 3) {
            this.runSpeed -= this.speeds[2]/5 * deltaTime;
        }
        if (!this.gameManager.isPause && this.gameManager.isStart) {
            if (this.isInvisibleH) {
                this.t1 -= deltaTime;
                if (this.t1 <= 0) {
                    this.isInvisibleH = false;
                }
            }
            if (this.isInvisibleR) {
                this.t2 -= deltaTime;
                if (this.t2 <= 0) {
                    this.isInvisibleR = false;
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
                }
                for (let i = 0; i < this.coins.children.length; i++) {
                    if (this.coins.children[i].position.z < this.node.position.z + 10) {
                        if (this.coins.children[i].getComponent(ItemS)?.isCoin) {
                           // this.gameManager.coinPoolRestore(this.coins.children[i]);
                          //  this.score++;
                         //   this.scoreText.string = this.score.toString();
                            tween(this.coins.children[i].position).to(1, this.node.position).start();
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
