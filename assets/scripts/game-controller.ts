const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component
{
	@property(cc.Node)
	nodeUINewGame: cc.Node = null;
	@property(cc.Node)
	nodeUILoseGame: cc.Node = null;
	@property(cc.Node)
	nodeUIWinGame: cc.Node = null;
	@property(cc.Node)
	nodeMainGameSpawner: cc.Node = null;
	@property(cc.Label)
	lblScores: cc.Label = null;
	@property(cc.Label)
	lblLives: cc.Label = null;
	@property(cc.Label)
	lblTimes: cc.Label = null;
	@property(cc.Label)
	lblLevel: cc.Label = null;

	private static _instance: GameController;
	private score: number = 0;
	private lives: number = 2;
	private times: number = 60;
	private levelScale: number = 1;

	onLoad()
	{
		cc.director.preloadScene('main-scene');
		this.createInstance();
		this.nodeUINewGame.active = true;
	}

	private createInstance(): void
	{

		if (GameController._instance)
		{
			throw new Error("Error: Instantiation failed: Use GameController.getInstance() instead of new.");
		}
		GameController._instance = this;
	}

	public static getInstance(): GameController
	{
		return GameController._instance;
	}

	public GetLevelScale(): number
	{
		return this.levelScale;
	}

	public IncreaseScore(): void
	{
		this.score += 20;
		this.lblScores.string = "Score : " + this.score;
		if (this.score >= 600)
		{
			this.winGame();
		}
	}

	public PlayerGetDamaged(): void
	{
		this.lives--;
		this.lblLives.string = "Lives : " + this.lives;
		if (this.lives <= 0)
		{
			this.endGame();
		}
	}

	private endGame(): void
	{
		this.levelScale = 1;
		this.lblLevel.string = "Level " + this.levelScale;
		this.nodeUILoseGame.active = true;
		this.reset();
	}

	private winGame(): void
	{
		this.levelScale++;
		this.nodeUIWinGame.active = true;
		this.lblLevel.string = "Level " + this.levelScale;
		this.reset();
	}

	private reset(): void
	{
		this.unschedule(this.countDown);
		this.nodeMainGameSpawner.children.forEach((node =>
		{
			node.destroy();
		}));
	}

	public StartGame(): void
	{
		this.score = 0;
		this.lblScores.string = "Score : " + this.score;
		this.lives = 2;
		this.lblLives.string = "Lives : " + this.lives;
		this.times = 60;
		this.lblTimes.string = this.times.toString();

		this.schedule(this.countDown, 1, this.times, 0);

		cc.director.loadScene('main-scene');
		this.nodeUINewGame.active = false;
		this.nodeUILoseGame.active = false;
		this.nodeUIWinGame.active = false;
	}

	private countDown(): void
	{
		this.times--;
		this.lblTimes.string = this.times.toString();
		if (this.times <= 0)
		{
			this.endGame();
		}
	}
}