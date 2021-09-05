
import { _decorator, Component, Node, NodePool, Prefab, instantiate, CCBoolean, math, randomRangeInt, RichText, director, Camera, Vec3, Label, Event, randomRange, color } from 'cc';
import { DEBUG } from 'cc/env';
import { GameManager } from './GameManager';
import { PlayerControl } from './PlayerControl';
import { GlobalFunction } from '../global/GlobalFunction';
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
        type: Label,
    })
    question: Label = null!;
    @property({
        type: Node,
    })
    downCount: Node = null!;
    @property({
        type: GlobalFunction
    })
    globalFunc: GlobalFunction = null!;

    sa = 0;

    public KeepGo() {
        //this.QAPanel.active = false;
        this.downCount.active = false;
        this.playerControl.animator.resume();
        this.gameManager.isPause = false;
        console.log("keepgo");
    }

    public SetQA() {
        let a = randomRangeInt(0, 8);
        if (this.sa == a) {
            if (this.sa != 0) {
                a = randomRangeInt(0, this.sa);
            }
            else {
                a = randomRangeInt(1, 8);
            }
        }
        else {
            this.sa = a;
        }
        this.question.string = this.globalFunc.questionBank[a].description;
        this.questions.children[0].children[2].getComponent(Label)!.string = this.globalFunc.questionBank[a].aOption;
        this.questions.children[1].children[2].getComponent(Label)!.string = this.globalFunc.questionBank[a].bOption;
        this.questions.children[2].children[2].getComponent(Label)!.string = this.globalFunc.questionBank[a].cOption;
        this.questions.children[3].children[2].getComponent(Label)!.string = this.globalFunc.questionBank[a].dOption;
        switch (this.globalFunc.questionBank[a].right) {
            case "A":
                this.questions.children[0].getComponent(QA)!.isTrue = true;
                break;
            case "B":
                this.questions.children[1].getComponent(QA)!.isTrue = true;
                break;
            case "C":
                this.questions.children[2].getComponent(QA)!.isTrue = true;
                break;
            case "D":
                this.questions.children[3].getComponent(QA)!.isTrue = true;
                break;
            default:
                console.log("erro");
                break;
        }
    }

    public Select(event: Event) {
        let btn = event!.target as Node;
        let lab = btn.children[2].getComponent(Label);
        lab!.color = color(255,255,255);
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
            let lab = this.questions.children[i].children[2].getComponent(Label);
            lab!.color = color(62, 105, 160);
            this.questions.children[i].getComponent(QA)!.isTrue = false;
        }
    }
    public Failed() {
        this.ResetStatus();
        this.gameManager.QAPanel.children[1].scale = new Vec3(0, 0, 0);
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
