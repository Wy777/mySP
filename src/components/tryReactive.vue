<template>
  <div id="tReactive">
    <p>{{$store.state.info}}</p>
    <!-- 这里就不能直接用myarr了 -->
    <br>
    <p>这里来试一试vuex的modules叭</p>
    <!-- modules里的a被自动放入到state里 -->
    <span>{{$store.state.a.message1}}</span>
    <span>{{$store.state.a.message2}}</span>
    <br>
    <!-- 一般来说，除了state是被锁定在内部模块里，getters、mutations、actions其实都是注册在全局store里，所以不需要通过模块名，就可以直接拿到，但是！当模块被各自锁定的时候，还是要通过模块名去拿具体的东西 -->
    <p>{{$store.getters["a/a1"]}}1</p>
    <p>{{$store.getters["a/a2"]}}2</p>
    <p>{{$store.getters["a/a3"]}}3</p>
    <p>{{$store.getters["a/a5"]}}5</p>
    <p>{{$store.getters["a/a6"]}}6</p>
    <p>{{$store.getters["a/a7"]}}7</p>
    <button @click="bb">尝试获取</button>
    <button @click="cc">这里需要模块名</button>
    <button @click="dd">能否调用别的模块方法？</button>
    <button @click="ee">给我调用</button>
    <button @click="ff">跨模块调用</button>
  </div>
</template>

<script>
export default {
  name: "#tReactive",
  data() {
    return {

    }
  },
  methods: {
    c1() {
      this.$store.commit("c1")
    },
    bb() {
      this.$store.dispatch("a/t1")
    },
    cc() {
      this.$store.commit("a/c1")
    },
    dd() {
      this.$store.dispatch("a/t2",{
        name: "拜托拜托",
        sex: "无性别"
      })
    },
    ee() {
      this.$store.dispatch("a/t3")
    },
    ff(){
      this.$store.dispatch("a/t4","给我传")
    }
  },
}
</script>

<style>

</style>