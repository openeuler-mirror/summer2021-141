
import { _decorator, Component, Node, Canvas, view, macro, find, UITransform, tween, Event } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Typescript001')
export class Typescript001 extends Component {
    @property({
        type: Node
    })
    n1: Node = null!;
    @property({
        type: Node
    })
    n2: Node = null!;

    aaa = 0;
    sss = false;

    public A() {
        let framesize = view.getFrameSize();
        let node = find("Canvas");
        let cvsize = view.getCanvasSize();
       // let dw = cvs
        view.setOrientation(macro.ORIENTATION_LANDSCAPE);
        if (framesize.height > framesize.width)
            view.setFrameSize(framesize.height, framesize.width)
        let s = view.getDesignResolutionSize();
        view.setDesignResolutionSize(s.height, s.width, 2);
        view.setCanvasSize(cvsize.height, cvsize.width);
        let a = view.getDesignResolutionSize();
        let b = view.getCanvasSize()
        console.log(a);
        console.log(b);
        console.log(framesize);
    }
    public B() {
        tween(this.n1.position)
            .to(1, this.n2.position)
            .start();
    }
    public C() {
        this.sss = true;
        console.log(this.aaa);
    }
    public D() {
        this.sss = false;
        return;
    }
    public E() {
        console.log("00000000");
    }
    onLoad() {
        // this.A();
       // this.node.on(Node.EventType.TOUCH_START, this.C, this)
      //  this.node.on(Node.EventType.TOUCH_END, this.D, this)
    }
    start() {

    }

     update (deltaTime: number) {
         if (this.sss)
             this.aaa++;
         
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
