
import { _decorator, Component, Node, Event, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Box1')
export class Box1 extends Component {
    @property({
        type: Node
    })
    nodes: Node[] = [];
    @property({
        type: Node
    })
    mask: Node = null!;
    @property({
        type: Node
    })
    node2: Node = null!;

    t1 = 0.7;

    public SwitchCode(event: Event) {
        let btn = event.target! as Node;
        let label = btn.children[4].getComponent(Label);
        let a = Number(label?.string);
        for (let i = 0; i < btn.children.length; i++)
            btn.children[i].active = false;
        btn.children[a].active = true;
        a++;
        if (a >= 4) a = 0;
        label!.string = a.toString();
    }
    start () {
        // [3]
    }

    update(deltaTime: number) {
        if (this.nodes[0].active && this.nodes[1].active && this.nodes[2].active && this.nodes[3].active) {
            this.mask.active = true;
            console.log(this.t1);
            if (this.t1 <= 0) {
                this.node2.active = true;
            }
        }
     }
}
