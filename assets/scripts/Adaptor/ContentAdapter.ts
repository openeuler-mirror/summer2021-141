
import { _decorator, Component, Node, NodePool, Prefab, instantiate, CCInteger, math, randomRangeInt, RichText, director, Camera, Vec3, UI, UITransform, view } from 'cc';
import { DEBUG } from 'cc/env';
const { ccclass, property } = _decorator;


@ccclass
export default class ContentAdapter extends Component {
    onLoad() {

        let srcScaleForShowAll = Math.min(view.getCanvasSize().width / this.node.getComponent(UITransform)!.width, view.getCanvasSize().height / this.node.getComponent(UITransform)!.height);
        let realWidth = this.node.getComponent(UITransform)!.width * srcScaleForShowAll;
        let realHeight = this.node.getComponent(UITransform)!.height * srcScaleForShowAll;


        this.node.getComponent(UITransform)!.width = this.node.getComponent(UITransform)!.width * (view.getCanvasSize().width / realWidth);
        this.node.getComponent(UITransform)!.height = this.node.getComponent(UITransform)!.height * (view.getCanvasSize().height / realHeight);



    }
    start() {
        let srcScaleForShowAll = Math.min(view.getCanvasSize().width / this.node.getComponent(UITransform)!.width, view.getCanvasSize().height / this.node.getComponent(UITransform)!.height);
        let realWidth = this.node.getComponent(UITransform)!.width * srcScaleForShowAll;
        let realHeight = this.node.getComponent(UITransform)!.height * srcScaleForShowAll;

        this.node.getComponent(UITransform)!.width = this.node.getComponent(UITransform)!.width * (view.getCanvasSize().width / realWidth);
        this.node.getComponent(UITransform)!.height = this.node.getComponent(UITransform)!.height * (view.getCanvasSize().height / realHeight);
    }

    // private _updateAllChildNodeWidget(parentNode: cc.Node) {
    //     if (parentNode == null) {
    //         return;
    //     }
    //     let widget = parentNode.getComponent(cc.Widget);
    //     if (widget != null) {
    //         widget.updateAlignment();
    //     }
    //     if (parentNode.childrenCount == 0) {
    //         return;
    //     }
    //     parentNode.children.forEach((childNode: cc.Node) => {
    //         this._updateAllChildNodeWidget(childNode);
    //     });
    // }
}
