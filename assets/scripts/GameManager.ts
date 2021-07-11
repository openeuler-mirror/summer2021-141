
import { _decorator, Component, Node, NodePool, Prefab, instantiate, CCInteger, math, randomRangeInt } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(
        { type: Prefab }
    )
    coinPerfab: Prefab = null!;
    @property(
        { type: CCInteger }
    )
    coinPoolNumber = 20;
    
    @property(
        { type: Prefab }
    )
    barPerfab: Prefab = null!;
    @property(
        { type: CCInteger }
    )
    barPoolNumber = 5;

    @property(
        { type: Node }
    )
    player: Node = null!;
    @property(
        { type: Node }
    )
    coinRoot: Node = null!;
    @property(
        { type: Node }
    )
    barRoot: Node = null!;

    playerCurentZ = 0;
    playerLastZ = 0;
    private _coinPool: NodePool = new NodePool();
    private _barPool: NodePool = new NodePool();
    start()
    {
        for (let i = 0; i < this.coinPoolNumber; ++i)
        {
            let coin = instantiate(this.coinPerfab);
            this._coinPool.put(coin);
        }
        for (let i = 0; i < this.barPoolNumber; ++i)
        {
            let bar = instantiate(this.barPerfab);
            this._barPool.put(bar);
        }
        for (let i = 0; i < this.coinPoolNumber - 5; ++i)
        {
            let coin = this._coinPool.get();
            if (coin != null)
            {
                coin.parent = this.coinRoot;
                coin.setPosition(new math.Vec3(randomRangeInt(-1, 1) * 1.5, 0.7, 5 * i));
            }
        }
    }

    update(deltaTime: number)
    {
        this.playerCurentZ += this.player.position.z - this.playerLastZ;
        this.playerLastZ = this.player.position.z;
        if (this.playerCurentZ > 30)
        {
            this.playerCurentZ -= 30;
            let childLenth = this.coinRoot.children.length;
            let tempZ = this.player.position.z;
            let killNumber = 0;
            for (let i = childLenth - 1; i >= 0; --i)
            {
                console.log("1." + this.coinRoot.children[i].position.z);
                console.log("2." + tempZ);
                if (this.coinRoot.children[i].position.z < tempZ - 5)
                {
                    this._coinPool.put(this.coinRoot.children[i]);
                    killNumber++;
                }
            }
            console.log(killNumber+"?");
            for (let i = 0; i < killNumber; ++i)
            {
                let coin = this._coinPool.get();
                if (coin != null)
                {
                    coin.parent = this.coinRoot;
                    coin.setPosition(new math.Vec3(randomRangeInt(-1, 1) * 1.5, 0.7, 25 + tempZ + 5 * i));
                }
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
