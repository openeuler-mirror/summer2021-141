
import { _decorator, Component, Node, Sprite, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Fade')
export class Fade extends Component {
    @property({
        type: Node
    })
    mask: Node = null!;
    @property({
        type: Animation
    })
    anim: Animation = null!;

    isFadeIn: boolean = false;
    isFadeOut: boolean = false;

    public FadeIn() {
        this.mask.active = true;
        this.anim.play("Fade");
        this.scheduleOnce(this.A, 0.5);
        console.log("jksksj");
    }
    public A() {
        this.mask.active = false;
    }
    start() {
        this.anim.play();
        console.log("jksksj");
    }

     //update (deltaTime: number) {
    //
     //}
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
