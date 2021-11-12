//就是好玩试试导出一个函数
// export function aa(){
//   console.log("11111111");
// }

//封装axios【代码行6-31是方法一】
import axios from "axios"

export function goApi(config,f1,f2){
  //用的比较多的封装的方法一
  // return new Promise((reso,reje) => {
  //   const instance = axios.create({
  //     baseURL: "http://152.136.185.210:7878/api/hy66"
  //   })
  //   instance(config)
  //   .then(res => {
  //     reso(res)
  //   })
  //   .catch(err => {
  //     reje(err)
  //   })
  // })

  //封装方法二
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66"
  })



  //axios的拦截器
  //拦截一些东西啦，或者拼接啦，判断啦
  //提到两类四种，请求成功拦截，请求失败拦截，响应成功拦截，响应失败拦截
  //其实发送请求去服务器获取数据的情况，特别像两个大陆，首先从客户端大陆造出了满足不同需求的空船，请求，即派遣这些空船出发去服务器大陆，成功登陆，即请求成功，登陆失败，即请求失败，然后等服务器这边数据都响应成功了，就是货物都可以装到空船上可以返航了，装满货的船只顺利回到客户端大陆，就是响应成功，中途发生问题不能回来，就是响应失败
  //而这个拦截器，就是满足了这个两大分类，四种条件触发的时候，立马把船只给拦截住，好让我们在这个状态下做出一些操作【比如请求一发出成功就来个loading动画啦，目前客户是否有携带token啦，规定权限啦等等之类的】

  // //请求拦截
  // instance.interceptors.request.use(config => {
  //   //这个config其实就是这个实例axios的各类信息
  //   console.log("空船已经成功登陆！正在劫持！")
  //   //劫持后还是得把信息给人还回去的，不然服务器就没法收到了
  //   return config
  // },err => {
  //   console.log("空船并未成功登陆！正在劫持！")
  // })
  if(typeof f1 == "function"){
    //这里主要是觉得，如果想要请求发生后，有一个loading界面或者别的反应，但是，我又不想在api这里写死，因为这样的话所有使用这个api去请求的组件，都是一个样式了，感觉有点无趣，所以尝试了一下，利用回调把实例axios传到组件里去，然后在组件里使用实例axios的拦截器自定义想要的反应，最后只需要在api这里判断一下参数是否为函数就可以了
    f1(instance)
  }

  if(typeof f2 == "function"){
    f2(instance)
    //同理哦，去app组件试一下响应拦截
  }

  //响应拦截


  return instance(config)
  // 呜呜呜，我就早说用return！
  // 主要是axios这个地方本来就使用了promise的
}


