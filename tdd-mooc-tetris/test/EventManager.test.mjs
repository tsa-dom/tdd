import { expect } from "chai";
import { EventManager } from "../src/EventManager.mjs";
import { Scoreboard } from "../src/Scoreboard.mjs";
import { rules1, rules2 } from "./helpers.mjs";

describe("Event manager", () => {
  let eventManager;
  let subscriber1;
  let subscriber2;
  let unsubscriber;

  beforeEach(() => {
    subscriber1 = new Scoreboard(rules1);
    subscriber2 = new Scoreboard(rules2);
    unsubscriber = new Scoreboard(rules1);
    eventManager = new EventManager();
    eventManager.subscribe(subscriber1);
    eventManager.subscribe(subscriber2);
  });

  it("subscribers receives notifications", () => {
    eventManager.notify({ lines: 2 });
    eventManager.notify({ lines: 3 });

    expect(subscriber1.getScore()).to.equal(400);
    expect(subscriber2.getScore()).to.equal(12);
  });

  it("an unsubscriber do not receive a notification", () => {
    eventManager.notify({ lines: 2 });

    expect(unsubscriber.getScore()).to.equal(0);
  });

  it("a subscriber is able to unsubscribe", () => {
    eventManager.notify({ lines: 2 });

    eventManager.unsubscribe(subscriber2);
    eventManager.notify({ lines: 2 });
    expect(subscriber2.getScore()).to.equal(3);
  });
});
