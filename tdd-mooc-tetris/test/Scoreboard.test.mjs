import { expect } from "chai";
import { Scoreboard } from "../src/Scoreboard.mjs";

describe("Scoreboard", () => {
  let rules = {
    level: 13,
    line1: (n) => 40 * (1 + n),
    line2: (n) => 100 * (1 + n),
    line3: (n) => 300 * (1 + n),
    line4: (n) => 1200 * (1 + n),
  };
  let scoreboard;
  beforeEach(() => {
    scoreboard = new Scoreboard(rules);
  });

  it("initial score value is a zero", () => {
    expect(scoreboard.getScore()).to.equal(0);
  });

  it("score is updated correctly when there is one removed line", () => {
    scoreboard.update({ lines: 1 });
    expect(scoreboard.getScore()).to.equal(560);
  });

  it("score is updated correctly when there are two removed lines", () => {
    scoreboard.update({ lines: 2 });
    expect(scoreboard.getScore()).to.equal(1400);
  });

  it("score is updated correctly when there are three removed lines", () => {
    scoreboard.update({ lines: 3 });
    expect(scoreboard.getScore()).to.equal(4200);
  });

  it("score is updated correctly when there are four removed lines", () => {
    scoreboard.update({ lines: 4 });
    expect(scoreboard.getScore()).to.equal(16800);
  });

  it("multiple updates calculates the score correctly", () => {
    scoreboard.update({ lines: 2 });
    scoreboard.update({ lines: 1 });
    scoreboard.update({ lines: 1 });
    scoreboard.update({ lines: 4 });
    expect(scoreboard.getScore()).to.equal(19320);
  });
});
