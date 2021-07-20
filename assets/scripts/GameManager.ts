
import { _decorator, Component, Node, NodePool, Prefab, instantiate, CCInteger, math, randomRangeInt, RichText } from 'cc';
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
    public coinPoolRestore(item: Node)
    {
        this._coinPool.put(item);
    }
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
                coin.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 0.7, 5 * i));
            }
        }
        for (let i = 0; i < this.barPoolNumber - 2; ++i)
        {
            let bar = this._barPool.get();
            if (bar != null)
            {
                bar.parent = this.barRoot;
                bar.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 0.7, 10 * i + 7.5));
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
            let childCoinLenth = this.coinRoot.children.length;
            let tempZ = this.player.position.z;
            let killCoinNumber = 0;
            for (let i = childCoinLenth - 1; i >= 0; --i)
            {
                //console.log("1." + this.coinRoot.children[i].position.z);
                //console.log("2." + tempZ);
                if (this.coinRoot.children[i].position.z < tempZ - 5)
                {
                    this._coinPool.put(this.coinRoot.children[i]);
                    killCoinNumber++;
                }
            }
            console.log(killCoinNumber + "?");
            killCoinNumber = killCoinNumber < 6 ? 6 : killCoinNumber;
            for (let i = 0; i < killCoinNumber; ++i)
            {
                let coin = this._coinPool.get();
                if (coin != null)
                {
                    coin.parent = this.coinRoot;
                    coin.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 0.7, 25 + tempZ + 5 * i));
                }
            }
            let childBarLenth = this.barRoot.children.length;
            let killBarNumber = 0;
            for (let i = childBarLenth - 1; i >= 0; --i)
            {
                if (this.barRoot.children[i].position.z < tempZ - 2)
                {
                    this._barPool.put(this.barRoot.children[i]);
                    killBarNumber++;
                }    
            }
            for (let i = 0; i < killBarNumber; ++i)
            {
                let bar = this._barPool.get();
                if (bar != null)
                {
                    bar.parent = this.barRoot;
                    bar.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 0.7, 25 + tempZ + 10 * i + 2.5));
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
