
import { _decorator, Component, Node,Canvas, view, macro, find, UITransform } from 'cc';
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
    @property({
        type: Node
    })
    startUI: Node = null!;
    @property({
        type: Node
    })
    gameUI: Node = null!;

    code = 0;

    public SetSceneHorizental() {
        let framesize = view.getFrameSize();
        let cvsize = view.getCanvasSize();
        view.setOrientation(macro.ORIENTATION_LANDSCAPE);
        if (framesize.height > framesize.width)
            view.setFrameSize(framesize.height, framesize.width);
        let s = view.getDesignResolutionSize();
        view.setDesignResolutionSize(s.height, s.width, 2);
        view.setCanvasSize(cvsize.height, cvsize.width);
    }
    public SetSceneVertical() {
        let framesize = view.getFrameSize();
        let cvsize = view.getCanvasSize();
        view.setOrientation(macro.ORIENTATION_PORTRAIT);
        if (framesize.width > framesize.height)
            view.setFrameSize(framesize.height, framesize.width);
        let s = view.getDesignResolutionSize();
        view.setDesignResolutionSize(s.height, s.width, 2);
        view.setCanvasSize(cvsize.height, cvsize.width);
    }

    public SwitchScene(event: Event, custom: string) {
        this.fade.FadeIn()
        this.code = Number(custom);
        this.scheduleOnce(this.StartScene, 0.25);
    }
    public StartGame() {
        this.startUI.active = false;
        this.gameUI.active = true;
        this.StartScene();
    }
    public RestartGame() {
        this.gameUI.active = false;
        this.startUI.active = true;
    }
    public StartScene() {
        for (let i = 0; i < this.scenes.length; i++)
            this.scenes[i].active = false;
        this.scenes[this.code].active = true;
    }
    onLoad() {
        this.SetSceneHorizental();
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
