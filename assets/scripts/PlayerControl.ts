
import { absMax, CCFloat, Collider, director, Event, find, ITriggerEvent, RichText, RigidBody, Script } from 'cc';
import { EventTouch, Touch, math} from 'cc';
import { _decorator, Component, Node, SkeletalAnimation, CCLoader, systemEvent, SystemEventType } from 'cc';
import { GameManager } from './GameManager';
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
    runSpeed = 1;
    @property({
        type: SkeletalAnimation,
    })
    animator: SkeletalAnimation = null!;

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

    rigidBody: RigidBody = null!;

    
    touchX = 0;
    touchY = 0;
    curentX = 0;
    targetX = 0;
    jump = false;
    slip = false;
    turn = false;
    curentZ = 0;
    score = 0;
    onLoad()
    {
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStartEvent, this);
        systemEvent.on(SystemEventType.TOUCH_END, this.onTouchEndEvent, this);
    }
    start()
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
        if (this.jump || this.turn)
            return;
        let endX = touch.getLocation().x;
        let endY = touch.getLocation().y;
        let difX = this.touchX - endX;
        let difY = this.touchY - endY;

        //上下起跳
        console.log(difY);
        if (Math.abs(difY) > Math.abs(difX) && difY < -30)
        {
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
        else if (Math.abs(difY) > Math.abs(difX) && difY > 30)
        {
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
        if (difX < -30)
        {
            this.targetX = Math.max(this.curentX - 1.5, -1.5);
            this.animator.play("dodgeRight");
            setTimeout(() => {
                this.animator.crossFade("run");
            }, this.fadeTime * 1000);
        }
        else if (difX > 30)
        {
            this.targetX = Math.min(this.curentX + 1.5, 1.5);
            this.animator.play("dodgeLeft");
            setTimeout(() => {
                this.animator.crossFade("run");
            }, this.fadeTime * 1000);
        }
        if (this.targetX != this.curentX)
        {
            this.turn = true;
            setTimeout(() => {
                this.curentX = this.targetX;
                this.turn = false;
            }, this.fadeTime * 1200);
        }
    }
    onTriggerEnter(event: ITriggerEvent)
    {
        console.log(event.type, event);
        let instance = event.otherCollider.node;
        console.log(instance.name)
        if (instance.name == "Coin")
        {
            this.gameManager.coinPoolRestore(instance);
            this.score++;
            this.scoreText.string = "得分:" + this.score;
            return;
        }
        else if (instance.name == "bar")
        {
            this.endPanel.active = true;
            director.pause();
        }
    }
    public setEndPanelHide()
    {
        this.endPanel.active = false;
    }
    update(deltaTime: number)
    {
        this.curentZ += this.runSpeed * deltaTime;
        let pos = this.node.position.clone();
        pos.z = this.curentZ;
        if (this.turn)
        {
            pos.x = math.lerp(pos.x, this.targetX, 1.8/this.fadeTime*deltaTime);
        }
        this.node.setPosition(pos);
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
