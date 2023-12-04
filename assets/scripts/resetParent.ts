const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component
{
	start()
	{
		var nodeMainGame = cc.director.getScene().getChildByName('mainGame');
		var nodeMainGameSpawner = cc.director.getScene().getChildByName('menu-canvas').getChildByName('background');
		nodeMainGame.parent = nodeMainGameSpawner;
	}

}
