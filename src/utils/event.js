class Event {
  constructor() {
    this.handlers = {};
  }

  // 注册事件
  on(type, handler) {
    if (!this.handlers[type]) {
      this.handlers[type] = handler;
    } else {
      console.error(new Error(`type ${type} has already been declared`));
    }
  }

  // 移除事件
  off(type) {
    if (!this.handlers[type]) {
      console.error(new Error(`${type} is not defined`));
    } else {
      delete this.handlers[type];
    }
  }

  // 调用事件，传参
  emit(type, ...params) {
    if (!this.handlers[type]) {
      console.error(new Error(`${type} is not defined`));
    } else {
      // 执行
      this.handlers[type](...params);
    }
  }
}

export default Event;
