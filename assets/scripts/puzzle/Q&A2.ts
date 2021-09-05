
import { _decorator, Component, Node, CCBoolean, Label, randomRangeInt, Event } from 'cc';
import { GlobalFunction } from '../global/GlobalFunction';
const { ccclass, property } = _decorator;

@ccclass('QA2')
export class QA2 extends Component {
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
        type: GlobalFunction
    })
    globalFunc: GlobalFunction = null!;
    @property({
        type: Node,
    })
    tipPanel: Node[] = []!;
    @property({
        type: Node,
    })
    falsePanel: Node = null!;
    @property({
        type: Node,
    })
    QAPanel: Node = null!;

    sa = 0;
    tipCode = 0;

    public CloseQA() {
        this.QAPanel.active = false;
        this.ResetStatus();
    }

    public SetQA() {
        this.QAPanel.active = true;
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
                this.questions.children[0].getComponent(QA2)!.isTrue = true;
                break;
            case "B":
                this.questions.children[1].getComponent(QA2)!.isTrue = true;
                break;
            case "C":
                this.questions.children[2].getComponent(QA2)!.isTrue = true;
                break;
            case "D":
                this.questions.children[3].getComponent(QA2)!.isTrue = true;
                break;
            default:
                console.log("erro");
                break;
        }
    }

    public Select(event: Event) {
        let btn = event!.target as Node;
        if (btn.getComponent(QA2)?.isTrue) {
            btn.children[0].active = true;
            btn.children[1].active = false;
            this.scheduleOnce(this.Succeed, 2);
        }
        else {
            btn.children[0].active = false;
            btn.children[1].active = true;
            this.scheduleOnce(this.Failed, 2);
        }
    }

    public ResetStatus() {
        for (let i = 0; i < this.questions.children.length; i++) {
            this.questions.children[i].children[0].active = false;
            this.questions.children[i].children[1].active = false;
            this.questions.children[i].getComponent(QA2)!.isTrue = false;
        }
    }
    public Failed() {
        this.CloseQA();
        this.ResetStatus();
        this.falsePanel.active = true;
    }
    public Succeed() {
        this.CloseQA();
        this.ResetStatus();
        this.tipPanel[this.tipCode].active = true;
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
