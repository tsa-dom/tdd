export class Scoreboard {
  score;
  rules;

  constructor(rules) {
    this.score = 0
    this.rules = rules
  }

  getScore() {
    return this.score
  }

  update(event) {
    switch (event.lines) {
      case 1:
        this.score += this.rules.line1(this.rules.level)
        break;
      case 2:
        this.score += this.rules.line2(this.rules.level)
        break
      case 3:
        this.score += this.rules.line3(this.rules.level)
        break
      case 4:
        this.score += this.rules.line4(this.rules.level)
        break
    }
  }
}