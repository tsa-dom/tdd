export class EventManager {
  subscribers;

  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers = this.subscribers.concat(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber);
  }

  notify(event) {
    this.subscribers.forEach((s) => s.update(event));
  }
}
