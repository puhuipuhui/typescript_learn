import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./snake";
class GameControl {
  // 蛇
  snake: Snake;
  // 食物
  food: Food;
  // 分数
  scorePanel: ScorePanel;
  // 移动方向
  direction: string = '';
  // 是否结束
  isLive: boolean = true;
  constructor() {
    this.food = new Food();
    this.snake = new Snake();
    this.scorePanel = new ScorePanel(10, 1);
    this.init();
  }
  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    // 调用run方法，使蛇移动
    this.run();
  }
  keydownHandler(event: KeyboardEvent) {
    this.direction = event.key;
    // console.log(this.direction)
  }
  run() {
    // console.log('计时器');

    /*
    *   根据方向（this.direction）来使蛇的位置改变
    *       向上 top  减少
    *       向下 top  增加
    *       向左 left 减少
    *       向右 left 增加
    */
    // 获取蛇现在坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    // 根据按键方向来计算X值和Y值（未更新）
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        // 向上移动 top 减少
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        // 向下移动 top 增加
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        // 向左移动 left 减少
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        // 向右移动 left 增加
        X += 10;
        break;
    }

    // 检查蛇是否吃到了食物
    this.checkEat(X, Y);

    //修改蛇的X和Y值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      // 进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
      alert('GAME OVER!');
      // 将isLive设置为false
      this.isLive = false;
      // console.log(this.isLive)
    }

    // 开启一个定时调用（定时器调用自身）
    // 会再次创建一个定时器

    // clearTimeout(t)
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }
  // 定义一个方法，用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物的位置要进行重置
      this.food.change();
      // 分数增加
      this.scorePanel.addSore();
      // 蛇要增加一节
      this.snake.addBody();
    }
  }
}

export default GameControl;