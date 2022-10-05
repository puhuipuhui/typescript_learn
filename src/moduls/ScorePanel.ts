class ScorePanel {
  score = 0;
  level = 1;
  soreEle: HTMLElement;
  levelEle: HTMLElement;
  maxLevel: number;
  upScore: number;
  constructor(maxlevel = 10, upScore: number = 10) {
    this.levelEle = document.getElementById('level')!;
    this.soreEle = document.getElementById('sore')!;
    // 最大等级
    this.maxLevel = maxlevel;
    // 每 upScore 积分升级一次
    this.upScore = upScore;
  }
  addSore() {
    this.soreEle.innerHTML = ++this.score + '';
    if (this.score % this.upScore === 0) {
      this.upLevel()
    }
  }
  upLevel() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }

}

export default ScorePanel;