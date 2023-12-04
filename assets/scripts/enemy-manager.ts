import Enemy from "./enemy";
import GameController from "./game-controller";
import Player from "./player";
const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyManager extends cc.Component
{
	@property(Enemy)
	enemies: Enemy[] = [];
	@property(Player)
	player: Player = null;
	@property(cc.Node)
	nodeCanvas: cc.Node = null;

	private levelScale: number = 0;
	private duration: number = 1;

	start()
	{
		this.enemies = this.getComponentsInChildren('enemy');
		this.enemies = this.shuffle(this.enemies);
		this.levelScale = GameController.getInstance().GetLevelScale();
		this.duration = 1 / this.levelScale;

		for (let index = 0; index < this.enemies.length; index++)
		{
			this.enemies[index].shootBullets(this.nodeCanvas, this.player.node, this.duration, index);
		}
	}

	private shuffle(array)
	{
		let currentIndex = array.length, randomIndex;
		// While there remain elements to shuffle.
		while (currentIndex > 0)
		{
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}
		return array;
	}
}