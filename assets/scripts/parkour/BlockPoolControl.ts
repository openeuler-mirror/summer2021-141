
import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
import { PlayerControl } from './PlayerControl';
const { ccclass, property } = _decorator;

@ccclass('BuildBlockPool')
export class BuildBlockPool extends Component {
    // [1]
    // dummy = '';

    @property(
        { type: Prefab }
    )
    perfabs: Prefab[] = [];
    @property(
        { type: Node }
    )
    player: Node = null!;
    playerCurentZ = 0;
    playerLastZ = 0;
    blockPool = new NodePool();
    block1!: Node | null;
    block2!: Node | null;
    index = 0;
    nextBlockZ = 73;
    start () {
        // [3]
    }
    onLoad()
    {
        this.playerCurentZ = this.player.position.z;
        let lenth = this.perfabs.length;
        for (let i = 0; i < lenth; ++i)
        {
            let block = instantiate(this.perfabs[i]);
            this.blockPool.put(block);
        }
        if(this.blockPool.size()>0)
            this.block1 = this.blockPool.get();
        else
            this.block1 = instantiate(this.perfabs[0]);
        if (this.blockPool.size() > 0)
            this.block2 = this.blockPool.get();
        else
            this.block2 = instantiate(this.perfabs[0]);
        if (this.block1 != null)
        {
            this.block1.parent = this.node;
            let position = this.block1.position.clone();
            position.z = 13;
            this.block1.setPosition(position);
        }
        if (this.block2 != null)
        {
            this.block2.parent = this.node;
            let position = this.block2.position.clone();
            position.z = 43;
            this.block2.setPosition(position);
        }
        
    }

    update(deltaTime: number)
    {
        this.playerCurentZ += this.player.position.z - this.playerLastZ;
        this.playerLastZ = this.player.position.z;
        if (this.playerCurentZ > 30)
        {
            this.playerCurentZ -= 30;
            if (this.index == 0)
            {
                this.blockPool.put(this.block1!);
                this.block1 = this.blockPool.get();
                if (this.block1 != null)
                {
                    this.block1.parent = this.node;
                    let position = this.block1.position.clone();
                    position.z = this.nextBlockZ;
                    this.block1.setPosition(position);
                }
            }
            if (this.index == 1)
            {
                this.blockPool.put(this.block2!);
                this.block2 = this.blockPool.get();
                if (this.block2 != null) {
                    this.block2.parent = this.node;
                    let position = this.block2.position.clone();
                    position.z = this.nextBlockZ;
                    this.block2.setPosition(position);
                }
            }
            this.index = (this.index + 1) % 2;
            this.nextBlockZ += 30;
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
