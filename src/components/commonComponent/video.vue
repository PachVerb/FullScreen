<template>
  <div class="modal-wrap" @click="handleClose">
    <div class="modal-box" @click.stop>
      <div class="modal-head">
        <span>视频查看</span>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <div class="list-container">
        <!-- 视频名称 -->

        <!-- 多频切换 -->
        <div class="footer-inner">
          <div
            class="footer-item"
            @click="selectMode('one')"
            :class="[mode == 'one' ? 'active_item' : '']"
          >
            <i class="icon icon_one"></i>
            <span>一屏</span>
          </div>
          <div
            class="footer-item"
            @click="selectMode('four')"
            :class="[mode == 'four' ? 'active_item' : '']"
          >
            <i class="icon icon_four"></i>
            <span>四屏</span>
          </div>
          <div
            class="footer-item"
            @click="selectMode('nine')"
            :class="[mode == 'nine' ? 'active_item' : '']"
          >
            <i class="icon icon_nine"></i>
            <span>九屏</span>
          </div>
        </div>
        <!-- 视频 -->
        <div class="list-warpper">
          <div v-for="(item,index) in videoInfo" class="list-item" :class="getItemStyle" :key="index">
            <div class="title" v-if="item.address + item.name">{{item.address}}</div>
            <video class="monitor-item-img" :src="item.src" v-if="item.src" autoplay loop muted controls preload="auto"></video>
            <div class="empty-item" v-else>
              <div class="empty-inner">
                <p>暂无监控画面</p>
              </div>
            </div>
          </div>
          <div v-if="!videoInfo||videoInfo.length===0" class="list-item" :class="getItemStyle">
            <div class="empty-item">
              <div class="empty-inner">
                <!-- <img src="./../../assets/img/video/add.png" alt /> -->
                <p>暂无监控画面</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="video-footer"> -->
        
        <!-- </div> -->
        <!-- <Modal
          v-model="showModal"
          title="选择设备"
          @on-ok="ok"
          class="video-modal"
          width="400"
          :mask="false"
        >
          <RadioGroup v-model="currValue">
            <Tree class="department-radio" :render="renderContent" :data="treeList"></Tree>
          </RadioGroup>
        </Modal> -->
      </div>
    </div>
  </div>
</template>
<script>

import { Icon } from 'element-ui'
const MODE_MAP = {
  one: 1,
  four: 4,
  nine: 9
};
export default {
  props: {
    videoList: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      videoInfo: [], // 展示的数组
      flvList: [],  //flv地址数组
      copyInfo: [], //原始数组
      oList: [], // 1模式数组
      fList: [], // 4 模式数组
      nList: [], // 9模式数组
      showModal: false,
      multiple: false,
      currValue: "",
      treeList: [],
      dialogVisible: false
    };
  },
  components: {
    // RtmpLive,
    // RtmpLiveFlash,
    // VideoLive
    [Icon.name]: Icon
  },
  created() {
    // this.queryVideoList();
    // this.queryVideoTree();
    // console.log(this.treeList);
    this.videoInfo = JSON.parse(JSON.stringify(this.videoList)).slice(0,9)
    if(this.videoInfo.length > 1) this.videoInfo = [...this.videoInfo, ...this.addEmptyInVideoList(this.videoInfo, 9)]
  },
  computed: {
    getItemStyle() {
      if (this.videoInfo.length <= 1) {
        return "oItem";
      } else if (this.videoInfo.length > 1 && this.videoInfo.length <= 4) {
        return "fItem";
      } else if (this.videoInfo.length > 4 && this.videoInfo.length <= 9) {
        return "nItem";
      }
    },
    mode() {
      if (this.videoInfo.length >= 0 && this.videoInfo.length < 2) {
        return "one";
      } else if (this.videoInfo.length > 1 && this.videoInfo.length < 5) {
        return "four";
      } else if (this.videoInfo.length > 4 && this.videoInfo.length < 10) {
        return "nine";
      }
    }
  },
  methods: {
    handleClose(){
      this.$emit('close', false)
    },
    // 初始化各种模式数组并根据长度范围设置展示数组
    initModeList() {
      this.oList = [...this.copyInfo.slice(0, 1)];
      this.fList = [...this.copyInfo.slice(0, 4)];
      this.nList = [...this.copyInfo.slice(0, 9)];
      this.addEmptyToList(this.fList, 4 - this.copyInfo.length);
      this.addEmptyToList(this.nList, 9 - this.copyInfo.length);
      if (this.copyInfo.length >= 0 && this.copyInfo.length < 2) {
        this.videoInfo = this.oList;
      } else if (this.copyInfo.length > 1 && this.copyInfo.length < 5) {
        this.videoInfo = this.fList;
      } else if (this.copyInfo.length > 4 && this.copyInfo.length < 10) {
        this.videoInfo = this.nList;
      }
    },
    // 添加空白项到数组
    addEmptyToList(target, len) {
      for (let i = 0; i < len; i++) {
        target.push({
          title: "",
          videoSrc: ""
        });
      }
    },
    handleList(list) {

      const infoList = list.map(item => {
        item.title = item.infoName
      })
      return list;
    },
    queryVideoList() {
      let infoCodes = this.getQueryKey();
      console.log("infoCodes", infoCodes);
      let param = {
        infoCodes
      };

      thematicGetUrlList(param).then(res => {
        console.log(res)
        let data = JSON.parse(JSON.stringify(res.data.data))
        if(!data || data.length === 0) {
          //this.$Message.info('未解析出视频源')
          this.$confirm = this.$confirm('没有可播放视频源，点击确认关闭网页')
          .then(_ => {
            window.close();
            done();
          })
          .catch(_ => {});
          this.dialogVisible = true
          this.initModeList()
          return
        }
        if (data.length > 9) {
          this.$Message.info("一次最多查看九个视频");
          data = data.slice(0, 9);
        }
        console.log(data)
        const promiseList = data.map(item => {
          return new Promise((resolve, reject) => {
            /* fetch('http://192.168.4.200:8082/camera/camera', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "rtsp": "rtsp://admin:Qq1234567@192.168.4.225:554/MPEG-4/ch1/main/av_stream"
              })
            }).then(res => {
              res.json().then(jsonData => {
                resolve(jsonData.httpFlv)
              })
            }) */
            getHttpFlv({
              rtsp: item.src
            }).then(res => {
              if(res.data.data === null) {
                resolve('未解析出视频源')
              } else {
                resolve(res.data.data.httpFlv)
              }              
            })
          })
        })
        Promise.all(promiseList).then(res => {
          console.log(res)
          data = data.map((item,index) => {
            item.src = res[index]
            return item
          })
          console.log(data)
          this.copyInfo = this.handleList(data);
          console.log('1111111', this.copyInfo);
          this.initModeList();
        })
        /* console.log(data)
        this.copyInfo = this.handleList(data);
        console.log(this.copyInfo);
        this.initModeList(); */
      }).catch(e => {
        this.$confirm('网络错误，没有可播放视频，点击确认关闭网页')
          .then(_ => {
            window.close();
            done();
          })
          .catch(_ => {
            this.initModeList()
          });
        console.log(e);
      });

    },
    queryVideoTree() {
      let { campusCode } = this.$route.query;
      queryVideoTree({campusCode})
        .then(res => {
          let list = JSON.parse(res.data.data);
          this.handleTreeData(list);
          this.treeList = list;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getQueryKey() {
      let data =
        this.$route.query._queryKey && JSON.parse(this.$route.query._queryKey);
      if (data.length === 0) return [];
      return data.map(i => i.infoCode);
    },
    selectMode(mode) {
      console.log(mode)
      switch (mode) {
        case "one":
          this.videoInfo = this.videoList.slice(0,1);
          break;
        case "four":
          this.videoInfo = this.videoList.slice(0,4);
          this.videoInfo = [...this.videoInfo, ...this.addEmptyInVideoList(this.videoInfo, 4)]
          break;
        case "nine":
          this.videoInfo = this.videoList.slice(0,9);
          this.videoInfo = [...this.videoInfo, ...this.addEmptyInVideoList(this.videoInfo, 9)]
          break;
        default:
          break;
      }
    },
    addEmptyInVideoList(videoList,length){
      let arr = []
      if(videoList.length < length){
        for (let index = 0; index < length - videoList.length; index++) {
          arr.push({
            title: '',
            src: ''
          })
        }
      }
      return arr
    },
    addVideo(index) {
      this.showModal = true;
      this.addIndx = index;
    },
    ok() {
      console.log(this.currValue);
      if(!this.currValue) {
        this.$Message.info('请选择你要播放的视频')
        return
      }

      thematicGetUrlList({'infoCodes': this.currValue}).then(res => {
        if(res.data.data === null || res.data.data.length === 0 || !res.data.status) {
          this.$Message.info('没有可播放视频')
          //this.initModeList()
          return
        }
        let data = res.data.data
        console.log(data)
        getHttpFlv({
          rtsp: data[0].src
        }).then(res => {
          if(res.data.data === null) {
            data[0].src = '未解析出视频源'
          } else {
            data[0].src = res.data.data.httpFlv
          }
          let addItem = this.handleList(data)[0]
          console.log(addItem, this.fList)
          if (this.mode === "one") {
            this.$set(this.oList, this.addIndx, addItem);
          } else if (this.mode === "four") {
            this.$set(this.fList, this.addIndx, addItem);
            this.$set(this.nList, this.addIndx, addItem);
          } else if (this.mode === "nine") {
            if (this.addIndx < 4) {
              this.$set(this.fList, this.addIndx, addItem);
            }
            this.$set(this.nList, this.addIndx, addItem);
          }
          this.currValue = "";
        })

      }) 
    },
    renderContent(h, { root, node, data }) {
      return (
        <div
          onClick={() => {
            this.changeExpand(data);
          }}
          class="tree-item ivu-tree-gather"
        >
          <span class="left-info">
            <span class={["ivu-tree-title"]}>
              {data.children && data.children.length ? (
                <span>{data.info_name}</span>
              ) : (
                <Radio label={data.info_code}>{data.info_name}</Radio>
              )}
            </span>
          </span>
        </div>
      );
    },
    changeExpand(data) {
      data.expand = !data.expand;
    },
    handleTreeData(list) {
      if (list.length === 0) return;
      list.forEach((item, index) => {
        if (
          item.hasOwnProperty("children") &&
          Array.isArray(item["children"]) &&
          !item.hasOwnProperty("expand")
        ) {
          item.expand = false;
          this.handleTreeData(item.children);
        }
      });
    },
  }
};
</script>
<style lang="css" scoped>
.el-icon-close{
  cursor: pointer;
}
.modal-wrap{
  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .6);
}
.modal-head{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 60vw;
  height: 40px;
  background-color: rgba(50, 75, 160, 1);
}
.list-container {
  position: relative;
  height: 60vh;
  width: 60vw;
}
.list-warpper {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-content: flex-start;
}
.list-item {
  box-sizing: border-box;
  /* padding: 1px; */
  position: relative;
  overflow: hidden;
  border: 1px solid rgb(254,254,254);
}
.list-item .title {
  position: absolute;
  /* top: 2px; */
  left: 50%;
  z-index: 2;
  width: 100%;
  height: 20px;
  margin-left: -50%;
  font-size: 13px;
  color: #fff;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}
.monitor-item-img{
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.oItem {
  width: 100%;
  height: 100%;
}
.fItem {
  width: 50%;
  height: 50%;
  flex: 50% 0 0;
}
.nItem {
  width: 33.3%;
  height: 33.3%;
  flex: 33.3% 0 0;
}
.footer-inner {
  position: absolute;
  top: 20px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 40px;
  border-radius: 20px;
  margin-left: -12.5%;
  background: rgba(0, 0, 0, 0.14);
  z-index: 23;
}
.footer-item {
  /* width: 60px; */
  font-size: 15px;
  display: flex;
  color: #fff;
  margin-right: 15px;
  align-items: center;
  cursor: pointer;
}
.footer-item:last-child {
  margin: 0;
}
.footer-item img {
  width: 25px;
  height: 25px;
}
.active_item span {
  color: #10b3ff;
}
.icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.icon_one {
  background: url("../../assets/video/yi.png") no-repeat;
  background-size: 100% 100%;
}
.active_item .icon_one {
  background: url("../../assets/video/dj-yi.png") no-repeat;
  background-size: 100% 100%;
}
.icon_four {
  background: url("../../assets/video/shi.png") no-repeat;
  background-size: 100% 100%;
}
.active_item .icon_four {
  background: url("../../assets/video/dj-shi.png") no-repeat;
  background-size: 100% 100%;
}
.icon_nine {
  background: url("../../assets/video/jiu.png") no-repeat;
  background-size: 100% 100%;
}
.active_item .icon_nine {
  background: url("../../assets/video/dj-jiu.png") no-repeat;
  background-size: 100% 100%;
}
.empty-item {
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 14px;
}
.empty-item .empty-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.empty-item .empty-inner img {
  margin-bottom: 15px;
  cursor: pointer;
}
</style>
<style>
.video-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-modal .ivu-modal-header {
  border-radius: 6px 6px 0 0;
  background: #10b3ff;
}
.video-modal .ivu-modal-header-inner {
  color: #fff;
}
.video-modal .ivu-modal-header-inner {
  color: #fff;
}
.video-modal .ivu-icon-ios-close {
  color: #fff;
}
.video-modal .ivu-modal-footer {
  border-top: none;
}
.video-modal .ivu-modal-body{
  max-height: 300px;
  overflow-y:scroll;
}
.department-radio .tree-item {
  display: inline-block;
}
/* div::-webkit-scrollbar{
  width:4px;
  height:10px;
}
div::-webkit-scrollbar-track{
  background: #fff;
  border-radius:2px;
}
div::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
div::-webkit-scrollbar-thumb:hover{
  background: #333;
}
div::-webkit-scrollbar-corner{
  background: #179a16;
} */

</style>

<style lang="less" scoped>
.list-container{
  /deep/.video-box {
    margin-top: 20px;
    width: 100%;
    height: calc(100% - 20px);
    .video-live{
      width: 100%;
      height: 100%;
    }
  }
}

</style>