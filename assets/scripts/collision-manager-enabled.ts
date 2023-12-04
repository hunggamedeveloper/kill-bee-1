const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component
{
	onLoad()
	{
		var manager = cc.director.getCollisionManager();
		manager.enabled = true;
	}
}
