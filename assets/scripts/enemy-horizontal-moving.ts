import { gsap, Linear } from "gsap";
import GameController from "./game-controller";
const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyHorizontalMoving extends cc.Component
{
	private timeLineMoving = new gsap.core.Timeline();
	private levelScale: number = 0;
	private duration: number = 1;

	start()
	{
		this.levelScale = GameController.getInstance().GetLevelScale();
		this.duration = 1 / this.levelScale;
		
		this.timeLineMoving = new gsap.core.Timeline({ repeat: -1 });
		this.timeLineMoving.to(this.node, {
			x: 50,
			ease: Linear.easeNone,
			duration: this.duration,
		});
		this.timeLineMoving.to(this.node, {
			x: 0,
			ease: Linear.easeNone,
			duration: this.duration,
		});
		this.timeLineMoving.to(this.node, {
			x: -50,
			ease: Linear.easeNone,
			duration: this.duration,
		});
		this.timeLineMoving.to(this.node, {
			x: 0,
			ease: Linear.easeNone,
			duration: this.duration,
		});
	}

	onDestroy(): void
	{
		this.timeLineMoving.kill();
	}
}
