
import { _decorator, Component, Node } from 'cc';
import { Fade } from './Fade'
const { ccclass, property } = _decorator;

@ccclass('GameManager2')
export class GameManager2 extends Component {
    @property({
        type: Node
    })
    scenes: Node[] = [];
    @property({
        type: Fade
    })
    fade: Fade = null!;
    code: Number = 0;
    public SwitchScene(event: Event, custom: string) {
        this.fade.FadeIn()
        this.code = Number(custom);
        this.scheduleOnce(this.SS, 0.25);
    }
    public SS() {
        for (let i = 0; i < this.scenes.length; i++)
            this.scenes[i].active = false;
        this.scenes[Number(this.code)].active = true;
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
