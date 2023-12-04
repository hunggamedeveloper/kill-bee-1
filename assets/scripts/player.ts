import GameController from "./game-controller";

const { ccclass, property } = cc._decorator;
const TIME_COUNT_DOWN = 0.2;
@ccclass
export default class Player extends cc.Component
{
	private moveLeft: number = 0;
	private moveRight: number = 0;
	private timeCountDown: number = 0;
	private isFired: boolean = false;

	@property(cc.Prefab)
	greenBullet: cc.Prefab = null;
	@property(cc.Prefab)
	prefabExplosion: cc.Prefab = null;

	onLoad()
	{
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.moveJet, this);
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.stopJet, this);
	}

	onDestroy()
	{
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.moveJet, this);
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.stopJet, this);
	}

	shootBullets()
	{
		var bullet = cc.instantiate(this.greenBullet);
		bullet.setPosition(this.node.position.x, this.node.position.y + 25);
		this.node.parent.addChild(bullet);
	}

	moveJet(event)
	{
		switch (event.keyCode)
		{
			case cc.macro.KEY.left:
			case cc.macro.KEY.a:
				this.moveLeft = 1;
				break;
			case cc.macro.KEY.right:
			case cc.macro.KEY.d:
				this.moveRight = 1;
				break;
			case cc.macro.KEY.space:
				if (this.timeCountDown <= 0)
				{
					this.shootBullets();
					this.isFired = true;
					this.timeCountDown = TIME_COUNT_DOWN;
				}
				break;
		}
	}

	stopJet(event)
	{
		switch (event.keyCode)
		{
			case cc.macro.KEY.left:
			case cc.macro.KEY.a:
				this.moveLeft = 0;
				break;
			case cc.macro.KEY.right:
			case cc.macro.KEY.d:
				this.moveRight = 0;
				break;
			case cc.macro.KEY.space:
				this.isFired = false
				break;
		}
	}

	update(dt)
	{
		if (this.moveLeft == 1 && this.node.position.x > -468)
		{
			this.node.setPosition(this.node.position.x -= 300 * dt, this.node.position.y);
		}
		if (this.moveRight == 1 && this.node.position.x < 468)
		{
			this.node.setPosition(this.node.position.x += 300 * dt, this.node.position.y);
		}
		if (this.timeCountDown > 0)
		{
			this.timeCountDown -= dt;
		}
		if (this.isFired && this.timeCountDown <= 0)
		{
			this.shootBullets();
			this.timeCountDown = TIME_COUNT_DOWN;
		}
	}

	onCollisionEnter(otherCollider, selfCollider)
	{
		if (otherCollider.name == "enemyBullet<BoxCollider>")
		{
			var explosion = cc.instantiate(this.prefabExplosion);
			explosion.parent = this.node.parent;
			explosion.setPosition(this.node.position.x, this.node.position.y);
			GameController.getInstance().PlayerGetDamaged();
		}
	}
}
