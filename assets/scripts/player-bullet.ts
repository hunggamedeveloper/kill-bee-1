const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerBullet extends cc.Component
{
	@property
	BulletSpeed: number = 800;

	onCollisionEnter(otherCollider, selfCollider)
	{
		if (otherCollider.name == "enemy<BoxCollider>")
		{
			this.node.destroy();
		}
	}

	update(dt)
	{
		this.node.setPosition(this.node.position.x, this.node.position.y -= this.BulletSpeed * dt);
		if (this.node.position.y <= -(this.node.parent.getContentSize().height))
		{
			this.node.destroy();
		}
	}
}
