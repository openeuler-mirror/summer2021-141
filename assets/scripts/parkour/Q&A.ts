
import { _decorator, Component, Node, NodePool, Prefab, instantiate, CCBoolean, math, randomRangeInt, RichText, director, Camera, Vec3, Label, Event } from 'cc';
import { DEBUG } from 'cc/env';
import { GameManager } from './GameManager';
import { PlayerControl } from './PlayerControl';
const { ccclass, property } = _decorator;

@ccclass('QA')
export class QA extends Component {
    @property({
        type: GameManager
    })
    gameManager: GameManager = null!;
    @property({
        type: PlayerControl
    })
    playerControl: PlayerControl = null!;
    @property({
        type: CCBoolean,
    })
    isTrue: boolean = false;
    @property({
        type: Node,
    })
    questions: Node = null!;
    @property({
        type: Node,
    })
    downCount: Node = null!;

    public test() {
        this.gameManager.KeepGo();
    }


    public DownCount(time: number) {
        this.downCount.active = true;
        this.downCount.children[0].active = false;
        this.downCount.children[1].active = false;
        this.downCount.children[2].active = false;
        this.downCount.children[3].active = false;
        /*for (let i = 1; i < this.downCount.children.length; i++) {
            this.schedule(this.downCount.children[i].active = true, 1);
        }*/
        this.scheduleOnce(this.Down0, time - 3);
        this.scheduleOnce(this.Down1, time - 2);
        this.scheduleOnce(this.Down2, time - 1);
       // this.scheduleOnce(this.gameManager.KeepGo, 4);
    }
    public Down0() {
        this.downCount.children[0].active = true;
        this.downCount.children[1].active = true;
    }
    public Down1() {
        this.downCount.children[1].active = false;
        this.downCount.children[2].active = true;
    }
    public Down2() {
        this.downCount.children[2].active = false;
        this.downCount.children[3].active = true
    }
    public KeepGo() {
        //this.QAPanel.active = false;
        this.downCount.active = false;
        this.playerControl.animator.resume();
        this.gameManager.isPause = false;
        console.log("keepgo");
    }

    public Select(event: Event) {
        let btn = event!.target as Node;
        if (btn.getComponent(QA)?.isTrue) {
            btn.children[0].active = true;
            btn.children[1].active = false;
            this.scheduleOnce(this.Succeed, 1);
            this.gameManager.DownCount(4);
            this.scheduleOnce(this.KeepGo, 4);
            this.playerControl.isInvisibleH = true;
            this.playerControl.t1 = 1;
        }
        else {
            btn.children[0].active = false;
            btn.children[1].active = true;
            this.scheduleOnce(this.Failed, 1);
          //  this.Failed();
        }
    }
    public GiveUp() {
        this.Failed();
    }
    public ResetStatus() {
        for (let i = 0; i < this.questions.children.length; i++) {
            this.questions.children[i].children[0].active = false;
            this.questions.children[i].children[1].active = false;
        }
    }
    public Failed() {
        this.ResetStatus();
        this.gameManager.GameOver(false);
    }
    public Succeed() {
        this.gameManager.QAPanel.active = false;
        this.gameManager.QAPanel.children[1].scale = new Vec3(0, 0, 0);
        this.ResetStatus();
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
