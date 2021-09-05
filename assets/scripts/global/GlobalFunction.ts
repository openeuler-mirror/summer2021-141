
import { _decorator, Component, Node, director, loader } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalFunction')
export class GlobalFunction extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    public questionBank: any;

    start () {
        this.questionJsonLoad()
    }
    public resumeGame()
    {
        director.resume();
    }
    public sceneChangeFirst()
    {
        director.loadScene("parkour");
    }
    public sceneChangeStart()
    {
        director.resume();
        director.loadScene("startUI");
    }
    public sceneChangeSecond() {
        director.loadScene("puzzle");
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
    public questionJsonLoad()
    {
        loader.loadRes('Json/Question.json',  (err, jsonAsset) => {
            if (err) {
                console.log(err);
                return;
            }
            this.questionBank = jsonAsset.json.question;
            console.log(this.questionBank);
        });
    }
}
interface question {
    description: string;
    aOption: string;
    bOption: string;
    cOption: string;
    dOption: string;
    right: string;
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
