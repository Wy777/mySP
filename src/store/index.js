import { createStore } from 'vuex'

//模块的详细梳理见sublime笔记
const modulesA = {
  namespaced: true,
  state: {
    message1: "我是模块A的！",
    message2: "我也是模块A的"
  },
  //对于modules里的mutations和getters来说，第一个接收的state参数，都是指的内部state
  getters: {
    a1(state) {
      return "直接用"
    },
    a2(state) {
      return state.message1+"1111111"
    },
    a3(state,getters) {
      //这里是获取不到的，因为内部state里并没有name，name在root级的state里
      return state.name
    },
    a5(state,getters,rootState,rootGetters) {
      //当拥有namespaced属性后，getters、mutations、actions就不再是全局性质的了
      //没有namespaced属性时，还可以偷懒，就用getters拿到root级的getters
      return rootState.name+rootGetters.powerCounter
    },
    a6(state,getters,rootState) {
      //拿别的模块里的state
      return rootState.b.mydata
    },
    a7(state,getters,rootState,rootGetters) {
      //拿别的模块里的getters
      return getters.a1+rootGetters["b/g2"]
    }
  },
  mutations: {
    c1(state) {
      console.log(state.message1)
    },
    m1(state,payload) {
      //一般来说，mutations内部里无法直接获取getters，不过也没什么获取的必要，因为mutations是管理state的工具，而getters只是一个计算属性OR可以看成过滤器，你获取一个计算属性干嘛呢？
      // console.log(this.$store.getters.a1)
      console.log(payload)
    }
  },
  //actions里接收的第一个参数context，其实指代的是这个内部模块的store
  actions: {
    t1({commit,getters,rootState,rootGetters}) {
      const pay = {
        a: rootState.info,
        //这里值得注意的是，因为使用了namespaced属性，所以本模块的getters名，在全局注册里全部变成了"模块名/getters名"，因此要用rootGetters拿的话，要加模块名，想直接拿的话，就用getters这个局部对象
        b: rootGetters["a/a1"],
        c: getters.a2
      }
      commit("m1",pay)
    },
    t2({commit,dispatch},payload) {
      //如何在本模块调用root级的方法呢？
      //新增参数到三，第一个依旧是方法名，第二个应该是参数，第三个是true
      commit("doName",payload,{root:true})
    },
    t3({dispatch,getters}) {
      dispatch("doA1",getters.a1,{root:true})
    },
    t4({commit},payload) {
      //调用别的模块的东西也是一样的方法，只不过第一个参数的值需要注意，是要通过模块名的，毕竟它不是全局的
      commit("b/b1",payload,{root:true})
    }
  }
}

const modulesB = {
  namespaced: true,
  state: {
    mydata: "这是我存在modulesB里的数据",
  },
  mutations: {
    b1(state,payload) {
      console.log(payload)
    }
  },
  getters: {
    g1(state,getters) {
      return "嘟嘟嘟"
    },
    g2(state,getters,rootState,rootGetters) {
      return getters.g1+rootGetters.powerCounter
    }
  }
}

export default createStore({
  state: {
    name: "为什么？",
    counter: 0,
    students: [
      {name: "吴悠", age: 25, id: "1995"},
      {name: "王安琪", age: 18, id: "1996"},
      {name: "陈安", age: 35, id: "1998"},
      {name: "毕思佳", age: 45, id: "1990"},
      {name: "孟姗姗", age: 20, id: "1945"}
    ],
    info: {
      name: '张起灵',
      age: 100,
      height: 1.8
    }
  },
  mutations: {
    //方法
    add(state) {
      state.counter++;
    },
    cut(state) {
      state.counter--;
    },
    addCount(state,payload) {
      //mutations里接收参数
      state.counter += payload.giveNumber;
      console.log(payload);
    },
    pushNew(state,stu) {
      state.students.push(stu);
    },
    // pushObj(state) {
    //   //？？？？为什么为什么为什么，找不到vue也找不到set方法
    //   //！因为。。。vue3没有$set了，被废除惹
    //   // Vue.set(state.info,"call","仙女布偶！")只能在vue2版本或兼容版里用
    // }
    changeinfo(state) {
      state.info.name = "肖瓶瓶"
    },
    doName(state,payload) {
      console.log(payload)
    }
  },
  actions: {
    // ashowinfo(context,payload) {
    //   setTimeout(() => {
    //     context.commit("changeinfo");
    //     console.log(payload)
    //   },2000)
    // }
    // 如果我们的需求中有一个是反馈机制呢？
    ashowinfo(context,payload) {
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          context.commit("changeinfo");
          console.log(payload);
          console.log(context.getters.powerCounter);
          resolve("action方法经过mutation顺利提交！")
        },1000)
      }).then(res => {
        console.log(res)
      })

      // 这种简写版是不可以的，这里的Promise.resolve()无法和vue界面的then函数直接相连
      // setTimeout(() => {
      //   context.commit("changeinfo");
      //   console.log(payload);
      //   Promise.resolve("action方法经过mutation顺利提交！")
      // })
    },
    doA1(context,payload) {
      context.commit("doName",payload)
    }
  },
  getters: {
    powerCounter(state) {
      return state.counter * state.counter
    },
    showStu(state) {
      return state.students.filter(a => a.age > 20)
    },
    stuLength(state,getters) {
      return getters.showStu.length;
    },
    changeFilter(state) {
      //解决了在最外层函数的参数已固定时，无法传入别的参数的问题
      return function(userage) {
        return state.students.filter(v => v.age > userage)
      }
    }
  },
  modules: {
    a: modulesA,
    b: modulesB,
  }
})
