import observe from "./observe";
import Watcher from "./Watcher";

let obj = {
  a: 1,
  b: {
    c: {
      d: 4,
    },
  },
  e: [22, 33, 44, 55],
};
// let arr = [22, 33, 44, 55, 66]

// console.log(obj);

observe(obj);

// console.log(obj);

// obj.b.c.d = 10;
// console.log(obj.e);

// obj.e.splice(2, 1, [13, 14]);
// console.log(obj.e);

new Watcher(obj, "e", (val) => {
  console.log("watcher监听", val);
});

obj.e.push(66, 77, 88);
// obj.b.c.d = 88
// new Watcher(obj, "a", (val) => {
  //   console.log("watcher监听", val);
// });

// new Watcher(obj, "b.c.d", (val) => {
//   console.log("watcher监听", val);
// });
