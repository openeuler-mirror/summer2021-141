
import { _decorator, Component, Node, NodePool, Prefab, instantiate, CCInteger, math, randomRangeInt, RichText, director, Camera, Vec3, Label, resources, Animation } from 'cc';
import { DEBUG } from 'cc/env';
import { PlayerControl } from './PlayerControl';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    // [1]
    // dummy = '';

    ////////////////////////21212121212
    // [2]
    // @property
    // serializableDummy = 0;
    @property({
        type: PlayerControl
    })
    playerControl: PlayerControl = null!;
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
        [Prefab]
    )
    barPerfabs: Prefab[] = [];
    @property(
        [Prefab]
    )
    itemPerfabs: Prefab[] = [];

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


    @property(
        { type: Node }
    )
    pausePanel: Node = null!;
    @property(
        { type: Node }
    )
    pause: Node = null!;

    @property(
        { type: Node }
    )
    endPanel: Node = null!;
    @property(
        { type: Node }
    )
    endS: Node = null!;
    @property(
        { type: Node }
    )
    endF: Node = null!;

    @property({
        type: Node
    })
    QAPanel: Node = null!;

    @property(
        { type: Node }
    )
    bg: Node = null!;
    @property(
        { type: Camera }
    )
    camera: Camera = null!;
    @property({
        type: Label
    })
    score1: Label = null!;

    @property(
        { type: Node }
    )
    downCount: Node = null!;
    @property(
        { type: Node }
    )
    infoPanel: Node = null!;
    @property(
        { type: Node }
    )
    infoBtn: Node = null!;
    @property(
        { type: Node }
    )
    content: Node = null!;
    @property(
        { type: Node }
    )
    startPanel: Node = null!;


        
    playerCurentZ = 0;
    playerLastZ = 0;
    coinCount = 0;
    t1 = 0;
    t2 = 0;
    t3 = 300;
    private _coinPool: NodePool = new NodePool();
    private _barPool: NodePool = new NodePool();
    private _barPools: NodePool[] = [];
    private _itemPools: NodePool[] = [];
    private _barPoolss: NodePool[][] = [];
    private _itemPoolss= [];

    isPause: boolean = false;
    isStart: boolean = false;
    isContinue: boolean = false;
    public SetBarPool() {
        for (let k = 0; k < 3; k++) {
            let _barPools: NodePool[] = [];
            for (let i = 0; i < 5; i++) {
                let temp: NodePool = new NodePool();
                _barPools.push(temp);
            }
            let t = 0;
            for (let i = k * 5; i < k * 5 + 5; i++) {
                for (let j = 0; j < 5; j++) {
                    let temp = instantiate(this.barPerfabs[i]);
                    _barPools[t].put(temp);
                }
                t++;
            }
            this._barPoolss.push(_barPools);
        }
    }
    public SetItemPool() {
        for (let i = 0; i < 5; i++) {
            let temp: NodePool = new NodePool();
            this._itemPools.push(temp);
        }
        for (let i = 0; i < this.itemPerfabs.length; i++) {
            if (i < 1) {
                for (let j = 0; j < 20; j++) {
                    let temp = instantiate(this.itemPerfabs[i]);
                    this._itemPools[0].put(temp);
                }
            }
            else {
                for (let j = 0; j < 5; j++) {
                    let temp = instantiate(this.itemPerfabs[i]);
                    this._itemPools[i].put(temp);
                }
            }
        }
    }
    public coinPoolRestore(item: Node)
    {
        this._itemPools[0].put(item);
    }
    /*public ItemPoolRestore(item: Node) {
        if (item.name == "HardWare")
            this._itemPools[1].put(item);
        else if (item.name == "RaspBarry")
            this._itemPools[2].put(item);
        else if (item.name == "CloudNative")
            this._itemPools[3].put(item);
        else if (item.name == "VM")
            this._itemPools[4].put(item);
        else if (item.name == "Coin")
            this._itemPools[0].put(item);
    }8*/
    public HWPoolRestore(item: Node) {
        this._itemPools[1].put(item);
    }
    public RBPoolRestore(item: Node) {
        this._itemPools[2].put(item);
    }
    public CNPoolRestore(item: Node) {
        this._itemPools[3].put(item);
    }
    public VMPoolRestore(item: Node) {
        this._itemPools[4].put(item);
    }
    public Cll() {
        this.endPanel.active = false;
    }
    public Restart() {
        for (let i = 0; i < this._itemPools.length; i++)
            this._itemPools[i].clear();
        let pos = this.player.position.clone();
        pos.z += 288.5;
        pos.y += 2;
        this.bg.setPosition(pos);
        this.endPanel.active = false;
        this.playerCurentZ = 0;
        this.playerLastZ = 0;
        this.coinCount = 0;
        this.isPause = false;
        this. isStart = false;
        this.isContinue= false;
        this.SetItemPool();
       // this.SetBarPool();
        this.GameStart();
    }
    public GS() {
        this.downCount.active = false;
        this.isStart = true;
        this.playerControl.OnStart();
        for (let i = 0; i < 10; ++i) {
            if (this.coinCount > 30) {
                this.coinCount = 0;
                let b = randomRangeInt(1, 5);
                let item = this._itemPools[b].get();
                if (item != null) {
                    this.coinCount = 0;
                    item.parent = this.coinRoot;
                    item.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 2.2, 5 * i+150));
                }
            }
            else {
                let coin = this._itemPools[0].get();
                if (coin != null) {
                    this.coinCount++;
                    coin.parent = this.coinRoot;
                    coin.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 0.7, 5 * i+150));
                }
            }
        }
    }
    public GameStart() {

        this.startPanel.active = false;
        this.content.active = true;
        this.DownCount(3);
        this.scheduleOnce(this.GS, 3);
    }
    public DownCount(time: number) {
        this.downCount.active = true;
        this.downCount.children[0].active = false;
        this.downCount.children[1].active = false;
        this.scheduleOnce(this.Down0, time - 3);
    }
    public Down0() {
        let anim = this.downCount.children[1].getComponent(Animation);
        this.downCount.children[0].active = true;
        this.downCount.children[1].active = true;
        anim!.play();
    }
    public GetInfo() {
        this.infoPanel.active = true;
    }
    public CloseInfo() {
        this.infoPanel.active = false;
    }
    
    public GameOver(isSucceed: boolean) {
        this.score1.string = Math.floor(this.playerControl.score * 10 + this.player.position.z * 15).toString();
        if (isSucceed) {
            this.isPause = true;
            this.endPanel.active = true;
            this.endS.active = true;
        }
        else {
            this.QAPanel.active = false;
            this.endPanel.active = true;
            this.endF.active = true;
        }
    }
    public KeepGo() {
        //this.QAPanel.active = false;
        this.downCount.active = false;
        this.playerControl.animator.resume();
        this.isPause = false;
        console.log("keepgo");
    }
    public pauseClick()
    {
        // director.pause();
        this.isPause = true;
        this.playerControl.animator.pause();
        this.pausePanel.active = true;
        this.pause.active = false;
    }
        
    public continueClick()
    {
        this.DownCount(3);
        this.pausePanel.active = false;
        this.pause.active = true;
        this.scheduleOnce(this.KeepGo, 3);

    }
    start()
    {
        /*for (let i = 0; i < this.coinPoolNumber; ++i)
        {
            let coin = instantiate(this.coinPerfab);
            this._coinPool.put(coin);
        }
        for (let i = 0; i < this.barPoolNumber; ++i)
        {
            let bar = instantiate(this.barPerfab);
            this._barPool.put(bar);
        }*/
        this.SetItemPool();
        this.endPanel.active = false;
       // this.SetBarPool();
        /*for (let i = 0; i < this.HWPoolNumber; ++i) {
            let hardWare = instantiate(this.hardWarePrefab);
            this._HWPool.put(hardWare);
        }
        for (let i = 0; i < this.RBPoolNumber; ++i) {
            let raspBarry = instantiate(this.raspBerryPrefab);
            this._RBPool.put(raspBarry);
        }
        for (let i = 0; i < this.CNPoolNumber; ++i) {
            let cloudNative = instantiate(this.cloudNativePrefab);
            this._CNPool.put(cloudNative);
        }
        for (let i = 0; i < this.VMPoolNumber; ++i) {
            let VM = instantiate(this.vmWarePrefab);
            this._VMPool.put(VM);
        }
       /* for (let i = 0; i < this.coinPoolNumber - 5; ++i)
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
        }*/
    }

    update(deltaTime: number)
    {
        if (!this.isPause && this.isStart) {//this.bg.setPosition(new math.Vec3(this.bg.position.x, this.bg.position.y, this.player.position.z + 300));
            //if (this.t1 > 0) this.t1 -= deltaTime;
            //if (this.t2 > 0) this.t2 -= deltaTime;
            let pos = this.camera.node.position.clone();
            pos.z += 300;
            pos.y -=3;
            this.bg.setPosition(pos);
            if (this.playerControl.phase == 3) {
                if (this.playerControl.runSpeed <= 0)
                    this.GameOver(true);
            }
            this.playerCurentZ += this.player.position.z - this.playerLastZ;
            this.playerLastZ = this.player.position.z;
            if (this.playerCurentZ > 60) {
                this.playerCurentZ -= 60;
                let childCoinLenth = this.coinRoot.children.length;
                let tempZ = this.player.position.z;
                if (this.playerControl.phase != 3 && this.player.position.z < 5050) {
                    let killCoinNumber = 0;
                    for (let i = childCoinLenth - 1; i >= 0; --i) {
                        //console.log("1." + this.coinRoot.children[i].position.z);
                        //console.log("2." + tempZ);
                        if (this.coinRoot.children[i].position.z < tempZ - 5) {
                            if (this.coinRoot.children[i].name == "HardWare")
                                this._itemPools[1].put(this.coinRoot.children[i]);
                            else if (this.coinRoot.children[i].name == "RaspBarry")
                                this._itemPools[2].put(this.coinRoot.children[i]);
                            else if (this.coinRoot.children[i].name == "CloudNative")
                                this._itemPools[3].put(this.coinRoot.children[i]);
                            else if (this.coinRoot.children[i].name == "VM")
                                this._itemPools[4].put(this.coinRoot.children[i]);
                            else if (this.coinRoot.children[i].name == "Coin")
                                this._itemPools[0].put(this.coinRoot.children[i]);
                            killCoinNumber++;
                        }
                    }
                    //console.log(killCoinNumber + "?");
                    killCoinNumber = killCoinNumber < 6 ? 6 : killCoinNumber;
                    for (let i = 0; i < 6; ++i) {
                        if (this.coinCount > 30) {
                            let b = randomRangeInt(1, 5);
                            let item = this._itemPools[b].get();
                            if (item != null) {
                                this.coinCount = 0
                                item.parent = this.coinRoot;
                                item.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 2.2, 200 + tempZ + 5 * i));
                            }
                        }
                        else {
                            let coin = this._itemPools[0].get();
                            if (coin != null) {
                                this.coinCount++;
                                coin.parent = this.coinRoot;
                                coin.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 0.7, 200 + tempZ + 5 * i));
                                console.log("setCoin");
                            }
                        }
                    }
                    /*if (this.t1 <= 0 && this.t2 <= 0) {
                        this.t2 = 4;
                        let childBarLenth = this.barRoot.children.length;
                        let killBarNumber = 0;
                        for (let i = childBarLenth - 1; i >= 0; --i) {
                            if (this.barRoot.children[i].position.z < tempZ - 4) {
                                let str = this.barRoot.children[i].name.split("0");
                                let a1 = Number(str[0]);
                                let a2 = Number(str[1]);
                                console.log(this.barRoot.children[i].name);
                                console.log(a1 + "|||" + a2);
                                this._barPoolss[a1 - 1][a2].put(this.barRoot.children[i]);
                                killBarNumber++;
                            }
                        }
                        for (let i = 0; i < 1; ++i) {
                            let a = randomRangeInt(0, 5);
                            let bar = this._barPoolss[this.playerControl.phase][a].get();
                            if (bar != null) {
                                bar.parent = this.barRoot;
                                if (bar.name == "202" || bar.name == "201" || bar.name == "102" || bar.name == "103" || bar.name == "104"
                                ) {
                                    bar.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 2, 60 + tempZ + 10 * i + 2.5));
                                }
                                else if (bar.name == "100" || bar.name == "101" || bar.name == "301" || bar.name == "204") {
                                    bar.setPosition(new math.Vec3(0, 1.5, 60 + tempZ + 10 * i + 2.5));
                                }
                                else if (bar.name == "203") {
                                    bar.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 0.2, 60 + tempZ + 10 * i + 2.5));
                                }
                                else if (bar.name == "200") {
                                    bar.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 1, 60 + tempZ + 10 * i + 2.5));
                                }
                                else if (bar.name == "300") {
                                    bar.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 1.3, 60 + tempZ + 10 * i + 2.5));
                                }
                                else {
                                    bar.setPosition(new math.Vec3(randomRangeInt(-1, 2) * 1.5, 0.7, 60 + tempZ + 10 * i + 2.5));
                                }
                            }
                        }
                    }*/
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
