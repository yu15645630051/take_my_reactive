import Dep from "./Dep";

let uid = 0;
/**
 * Watcher是一个中介的角色，数据发生变化时通知它，然后它再通知其他地方
 */
export default class Watcher {
  constructor(target, expression, callback) {
    console.log("Watcher构造器");
    this.id = uid++;
    this.target = target;
    // 按点拆分  执行this.getter()就可以读取data.a.b.c的内容
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get();
  }

  get() {
    // 进入依赖收集阶段。
    // 让全局的Dep.target设置为Watcher本身
    Dep.target = this;

    // obj 是当前的实例对象 当前为 a b e
    const obj = this.target;


    var value;
    // 只要能找就一直找
    try {
      // 检测到了最开始的数值
      value = this.getter(obj);
      console.log('value111', value);

    } finally {
      Dep.target = null;
    }
    return value;
  }

  update() {
    this.run();
  }

  run() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(callback) {
    console.log('callback', callback);

    // 这里的value 就是改变后的值 value 88
    // this.value 是初始值 4
    const valueOrignal = this.get();

    if (valueOrignal !== this.value || typeof valueOrignal === "object") {
      const oldValue = this.value;
      // 更新 赋值
      this.value = valueOrignal;
      // callback 是index.js 里的callback
      callback.call(this.target, this.value, oldValue);
    }
  }
}

/**
 * 将str用.分割成数组segments，然后循环数组，一层一层去读取数据，最后拿到的obj就是str中想要读的数据
 * 因为需要检测引用数据类型最后的数值 所以用obj = obj[key] 每一次循环下来就会拨开一层替换掉
 * @param {*} str
 * @returns
 */
function parsePath(str) {
  let segments = str.split(".");
  return function (obj) {
    for (let key of segments) {
      if (!obj) return;
      obj = obj[key];
    }
    return obj;
  };
}
