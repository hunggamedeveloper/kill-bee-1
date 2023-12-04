import GameController from "./game-controller";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component
{
	@property(cc.Prefab)
	prefabExplosion: cc.Prefab = null;
	@property(cc.Prefab)
	bullet: cc.Prefab = null;
	private isDestroy: boolean = false;
	private nodeParent: cc.Node = null;
	private nodePlayer: cc.Node = null;

	onCollisionEnter(otherCollider, selfCollider)
	{
		if (otherCollider.name == "playerBullet<BoxCollider>")
		{
			var explosion = cc.instantiate(this.prefabExplosion);
			explosion.parent = this.node.parent;
			explosion.setPosition(this.node.position.x, this.node.position.y);
			this.disable();
			GameController.getInstance().IncreaseScore();
		}
	}

	public shootBullets(nodeParent: cc.Node, nodePlayer: cc.Node, duration: number, index: number)
	{
		this.nodeParent = nodeParent;
		this.nodePlayer = nodePlayer;
		this.schedule(this._shootBullets, duration * 30, cc.macro.REPEAT_FOREVER, duration * index);
	}

	private _shootBullets(): void
	{
		if (!this.isDestroy)
		{
			var bullet = cc.instantiate(this.bullet);
			bullet.parent = this.nodeParent;
			var worldPosition = this.node.parent.convertToWorldSpaceAR(this.node.position);
			var enemyPosition = this.nodeParent.convertToNodeSpaceAR(worldPosition);
			var direction = new cc.Vec2(this.nodePlayer.position.x - enemyPosition.x, this.nodePlayer.position.y - enemyPosition.y);
			direction = direction.normalize();
			bullet.setPosition(enemyPosition.x, enemyPosition.y - 20);
			bullet.getComponent("enemy-bullet").direction = direction;
		}
	}

	public IsDestroy(): boolean
	{
		return this.isDestroy;
	}

	private disable(): void
	{
		this.unschedule(this._shootBullets);
		this.isDestroy = true;
		this.node.active = false;
	}
}