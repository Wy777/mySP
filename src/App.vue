<template>
  <div id="app">
    <p>{{$store.state.counter}}</p>
    <button @click="toAdd">点击我加1</button>
    <br>
    <button @click="toCut">点击我减1</button>
    <br>
    <button @click="addSome(10)">点击我加你想加的数</button>
    <br>
    <button @click="addStu">点击我增加学生</button>
    <p>{{$store.getters.powerCounter}}</p>
    <p>{{$store.getters.showStu}}</p>
    <p>{{$store.getters.stuLength}}</p>
    <p>{{$store.getters.changeFilter(25)}}</p>
    <br>
    <p>{{$store.state.info}}</p>
    <!-- 直接用myarr也可以 -->
    <button @click="toChange">改变</button>
    <button @click="toDelete">删除</button>
    <router-link to="/tReactive">给我跳</router-link>
    <br>
    <p>{{$store.state.info}}</p>
    <button @click="actionChange">通过异步操作来改变</button>
    <router-view></router-view>
    <!-- <div @click="goAxios">导入定义好的某axios实例进行网络请求</div> -->
    <!-- <p>{{axiosData1}}在接收网络请求数据给组件内的data时，data本身是初始值是""好还是{}好？</p>
    <p>{{axiosData2}}在接收网络请求数据给组件内的data时，data本身是初始值是""好还是{}好？</p> -->
    <!-- <p>呃，目前没看出啥区别</p> -->
    <p @click="getData">利用封装的网络请求api去得到数据</p>
  </div>
</template>

<script>
import {reactive} from "vue"
import {useStore} from "vuex"
//因为在setup函数里是没有this的，所以没法直接拿到store对象，这里要引用这个useStore

// import {instance1} from "./main.js"
import {goApi} from "./components/network/request.js"

export default {
  name: "#app",
  data() {
    return {
      // trySome: {
      //   a: "123"
      // }
      mydata: "123",
      axiosData1: "",
      axiosData2: {},
    }
  },
  methods: {
    toAdd() {
      this.$store.commit("add");
    },
    toCut() {
      this.$store.commit("cut");
    },
    addSome(a) {
      //给mutations传参【此参数有一个专业名词，payload，负载】
      //不过这里给显示普通的传参
      // this.$store.commit("addCount",a);

      //特殊的传参
      //不过有个缺点呢，这里定了传参的名字，那在mutations接收的object里，就必须对应上这个名字才能拿到
      this.$store.commit({
        type: "addCount",
        giveNumber: a
      })
    },
    addStu() {
      const obj = {
        name: "小凤凰",
        age: 23,
        id: "1994"
      };
      this.$store.commit("pushNew",obj)
    },
    addNew() {
      this.$store.commit("pushObj");
    },
    toChange() {
      //vue3没有$set了。。。废除惹
      // Vue.$set(trySome,"b","999")
      this.myarr.call = "仙女布偶！";
    },
    toDelete() {
      delete this.myarr["age"];
    },
    actionChange() {
      this.$store.dispatch("ashowinfo","action也是可以传递参数的！")
    },
    // goAxios() {
    //   // var me = this;
    //   instance1({
    //     url: '/home/multidata'
    //   }).then(res => {
    //     console.log(res.data.data);
    //    this.axiosData1 = res.data.data;
    //     this.axiosData2 = res.data.data;
    //   })
    // },
    getData() {
      goApi({
        url: '/home/multidata'
      },i => {
        i.interceptors.request.use(config => {
          alert("您的请求已经成功发送！");
          return config
        },err => {
          console.log(err)
        })
      },j => {
        j.interceptors.response.use(res => {
          alert("您请求的数据已成功接收！")
          return res
        })
      },err => {
        console.log(err)
      })
      .then(res => {
        console.log(res);
      })
    }
  },
  setup() {
    const store = useStore();
    //然后调用这个方法，就可以得到store对象啦
    const myarr = reactive(store.state.info);
    return {
      myarr
    }
  }
}
</script>

<style>
</style>
