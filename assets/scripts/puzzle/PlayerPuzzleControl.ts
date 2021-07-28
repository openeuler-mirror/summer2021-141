
import { _decorator, Component, Node, macro, EventKeyboard, systemEvent, SystemEventType, Enum, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerPuzzleControl')
export class PlayerPuzzleControl extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;


    animation:any;

    start() {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    
    directionType = Enum({
        ALeft: 0,
        DRight: 1,
        SDown: 2,
        WUP: 3,
        None: 4,
        Used: 5
    });
    direction = this.directionType.None;
    onLoad() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDownEvent, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUpEvent, this);
        this.animation = this.getComponent(Animation);  
    }
    onDestroy() {
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDownEvent, this);
        systemEvent.off(SystemEventType.KEY_UP, this.onKeyUpEvent, this);
    }

    onKeyDownEvent(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.a:
                this.direction = this.directionType.ALeft;
        }
    }

    onKeyUpEvent(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.a:
                this.direction = this.directionType.None;
        }
    }
    update(deltaTime: number) {
        if (this.direction != this.directionType.None)
        {
            this.animation.play("move");
            this.direction = this.directionType.Used;
        }
        else {
            this.animation.play("idle");
        }
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
