
import { _decorator, Component, Node, Prefab, NodePool, instantiate, TextureCube, Scene, SceneAsset, director } from 'cc';
import { PlayerControl } from './PlayerControl';
const { ccclass, property } = _decorator;

@ccclass('BuildBlockPool')
export class BuildBlockPool extends Component {
    // [1]
    // dummy = '';

    @property({
        type: TextureCube
    })
    skyBoxes: TextureCube[] = [];
    @property({
        type: PlayerControl
    })
    playerControl: PlayerControl = null!;
    @property(
        { type: Prefab }
    )
    perfabs: Prefab[] = [];
    @property(
        { type: Prefab }
    )
    barPerfabs: Prefab[] = [];
    @property(
        { type: Node }
    )
    player: Node = null!;
    playerCurentZ = 0;
    playerLastZ = 0;
    blockPool = new NodePool();
    block1!: Node | null;
    block2!: Node | null;
    block3!: Node | null;
    block4!: Node | null;
    block0!: Node | null;
    index = 0;
    nextBlockZ = 596;

    _barPools: NodePool[] = [];

    public SetBarPool() {
        for (let k = 0; k < 4; k++) {
            let _barPool: NodePool = new NodePool;
            for (let i = 0; i < 5; i++) {
                let node = instantiate(this.barPerfabs[k]);
                _barPool.put(node);
            }
            this._barPools.push(_barPool);
        }
    }

    start () {
        // [3]
    }
    public Reset() {
        this.block0 = null;
        this.block1 = null;
        this.block2 = null;
        this.block3 = null;
        this.block4 = null;
        for (let i = 0; i < this.node.children.length; i++)
            this.node.children[i].destroy();
        for (let k = 0; k < this._barPools.length; k++) {
            this._barPools[k].clear();
            for (let i = 0; i < 5; i++) {
                let node = instantiate(this.barPerfabs[k]);
                this._barPools[k].put(node);
            }
        }
        this.playerCurentZ = this.player.position.z;
        this.index = 0;
        this.playerLastZ = 0;
        this.nextBlockZ = 596;
        let lenth = this.perfabs.length;
        /*for (let i = 0; i < lenth; ++i)
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
            position.z = 28;
            this.block1.setPosition(position);
        }
        if (this.block2 != null)
        {
            this.block2.parent = this.node;
            let position = this.block2.position.clone();
            position.z = 88;
            this.block2.setPosition(position);
        }*/
        this.block0 = instantiate(this.barPerfabs[4]);
        this.block4 = instantiate(this.barPerfabs[3]);
        if (this._barPools[0].size() > 0)
            this.block1 = this._barPools[0].get();
        else
            this.block1 = instantiate(this.barPerfabs[0]);
        if (this._barPools[0].size() > 0)
            this.block2 = this._barPools[0].get();
        else
            this.block2 = instantiate(this.barPerfabs[0]);
        if (this._barPools[0].size() > 0)
            this.block3 = this._barPools[0].get();
        else
            this.block3 = instantiate(this.barPerfabs[0]);
        if (this.block0 != null) {
            this.block0.parent = this.node;
            let position = this.block0.position.clone();
            position.z = -28;
            this.block0.setPosition(position);
        }
        if (this.block1 != null) {
            this.block1.parent = this.node;
            let position = this.block1.position.clone();
            position.z = 128;
            this.block1.setPosition(position);
        }
        if (this.block2 != null) {
            this.block2.parent = this.node;
            let position = this.block2.position.clone();
            position.z = 284;
            this.block2.setPosition(position);
        }
        if (this.block3 != null) {
            this.block3.parent = this.node;
            let position = this.block3.position.clone();
            position.z = 440;
            this.block3.setPosition(position);
        }
        director.getScene()!.globals.skybox.envmap = this.skyBoxes[0];
    }
    onLoad()
    {
        this.SetBarPool();
        this.playerCurentZ = this.player.position.z;
        let lenth = this.perfabs.length;
        /*for (let i = 0; i < lenth; ++i)
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
            position.z = 28;
            this.block1.setPosition(position);
        }
        if (this.block2 != null)
        {
            this.block2.parent = this.node;
            let position = this.block2.position.clone();
            position.z = 88;
            this.block2.setPosition(position);
        }*/
        this.block0 = instantiate(this.barPerfabs[4]);
        this.block4 = instantiate(this.barPerfabs[3]);
        if (this._barPools[0].size() > 0)
            this.block1 = this._barPools[0].get();
        else
            this.block1 = instantiate(this.barPerfabs[0]);
        if (this._barPools[0].size() > 0)
            this.block2 = this._barPools[0].get();
        else
            this.block2 = instantiate(this.barPerfabs[0]);
        if (this._barPools[0].size() > 0)
            this.block3 = this._barPools[0].get();
        else
            this.block3 = instantiate(this.barPerfabs[0]);
        if (this.block0 != null) {
            this.block0.parent = this.node;
            let position = this.block0.position.clone();
            position.z = -28;
            this.block0.setPosition(position);
        }
        if (this.block1 != null) {
            this.block1.parent = this.node;
            let position = this.block1.position.clone();
            position.z = 128;
            this.block1.setPosition(position);
        }
        if (this.block2 != null) {
            this.block2.parent = this.node;
            let position = this.block2.position.clone();
            position.z = 284;
            this.block2.setPosition(position);
        }
        if (this.block3!= null) {
            this.block3.parent = this.node;
            let position = this.block3.position.clone();
            position.z = 440;
            this.block3.setPosition(position);
        }
        //this.Reset();
    }

    update(deltaTime: number)
    {
        if (this.player.position.z>3695) {
            director.getScene()!.globals.skybox.envmap = this.skyBoxes[1];
            director.getScene()!.globals.ambient.skyIllum = 20000;
        }
        if (this.player.position.z > 7100) {
            director.getScene()!.globals.skybox.envmap = this.skyBoxes[2];
            director.getScene()!.globals.ambient.skyIllum = 40000;
        }
        this.playerCurentZ += this.player.position.z - this.playerLastZ;
        this.playerLastZ = this.player.position.z;
        if (this.playerCurentZ > 156)
        {
            this.playerCurentZ -= 156;
           /* if (this.index == 0)
            {
                let str = this.block1!.name.split("!");
                let a1 = Number(str[0]);
                let a2 = Number(str[1])
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
            }*/
            if (this.player.position.z <= 4744 && this.player.position.z >= 285) {
                if (this.index == 0) {
                    let a1 = Number(this.block1!.name);
                    this._barPools[a1].put(this.block1!);
                    this.block1 = this._barPools[this.playerControl.phase].get();
                    if (this.block1 != null) {
                        this.block1.parent = this.node;
                        let position = this.block1.position.clone();
                        position.z = this.nextBlockZ;
                        this.block1.setPosition(position);
                    }
                }
                if (this.index == 1) {
                    let a1 = Number(this.block2!.name);
                    this._barPools[a1].put(this.block2!);
                    this.block2 = this._barPools[this.playerControl.phase].get();
                    if (this.block2 != null) {
                        this.block2.parent = this.node;
                        let position = this.block2.position.clone();
                        position.z = this.nextBlockZ;
                        this.block2.setPosition(position);
                    }
                }
                if (this.index == 2) {
                    let a1 = Number(this.block3!.name);
                    this._barPools[a1].put(this.block3!);
                    this.block3 = this._barPools[this.playerControl.phase].get();
                    if (this.block3 != null) {
                        this.block3.parent = this.node;
                        let position = this.block3.position.clone();
                        position.z = this.nextBlockZ;
                        this.block3.setPosition(position);
                    }
                }
                this.index = (this.index + 1) % 3;
                this.nextBlockZ += 156;
            }
            else if (this.player.position.z > 4744) {
                /*let a1 = Number(this.block4!.name);
                this._barPools[a1].put(this.block4!);
                this.block4 = this._barPools[3].get();*/
                if (this.block4 != null) {
                    this.block4.parent = this.node;
                    let position = this.block4.position.clone();
                    position.z = this.nextBlockZ;
                    this.block4.setPosition(position);
                }
               // this.nextBlockZ += 156;
            }
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
