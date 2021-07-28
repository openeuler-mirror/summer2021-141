
import { _decorator, Component, Node, tween, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Introduce')
export class Introduce extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    public showIntroduce()
    {
        tween(this.node).by(1, { position: new math.Vec3(-400, 0) }).
            by(5, { position: new math.Vec3(0, 0) }).by(1, { position: new math.Vec3(400, 0) }).start();
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
