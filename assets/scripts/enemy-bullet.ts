const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component
{
	@property(cc.Vec2)
	direction: cc.Vec2 = cc.Vec2.ZERO;
	@property(cc.Integer)
	force: number = 300;


	onCollisionEnter(otherCollider, selfCollider)
	{
		if (otherCollider.name == "player<BoxCollider>")
		{
			this.node.destroy();
		}
	}

	update(dt)
	{
		this.node.setPosition(this.node.position.x + this.direction.x * dt * this.force, this.node.position.y + this.direction.y * dt * this.force);
		if (this.node.position.y <= -640 || Math.abs(this.node.position.x) > 960)
		{
			this.node.destroy();
		}
	}
}