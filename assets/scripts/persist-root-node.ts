const { ccclass, property } = cc._decorator;
@ccclass
export default class PersistRootNode extends cc.Component
{
    onLoad()
    {
        cc.game.addPersistRootNode(this.node);
    }
}