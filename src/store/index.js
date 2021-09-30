import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
	videoinfor:{
        "status" : true,
        "time" : 1627529555283,
        "code" : 200,
        "properties" : { },
        "data" : {
            "infoName" : "图书馆北球机",
            "dockingType" : "6",
            "url" : "http://10.100.200.124:83/openUrl/KqtaN44/live.m3u8"
        }
    },
    map: null, // 地图对象
    mapLoad: false, // 地图加载的参数
    showAll: true,  // 是否显示所有监控 
    showVideo: false, // 监控弹窗是否开启
    videoSrc: '', // 视频流地址
    videoIndex: null, // 视频的div下标
    currentFloor: 0, // 当前楼层
    isInDoor: false, // 是否是室内
    currentPanelIndex: 0, // 当前模块
}

const mutations = {
    SET_MAP(state, map) {
        state.map = map
    },
    SET_SHOWALLCAMERA(state, showAll) {
      state.showAll = showAll
    },
    SET_SHOWVIDEO(state, showVideo) {
        if (showVideo) {
			state.videoSrc = "http://10.100.200.124:83/openUrl/KqtaN44/live.m3u8"
            state.showVideo = showVideo.show
            state.videoIndex = showVideo.index
        }
    },
    SET_MAP_LOAD(state, mapLoad) {
        state.mapLoad = mapLoad
    },
    SET_ISINDOOR(state, isInDoor) {
        state.isInDoor = isInDoor
    },
    SET_CURRENTPANELINDEX(state, index) {
        state.currentPanelIndex = index
    },
    SET_CURRENTFLOOR(state, currentFloor) {
        state.currentFloor = currentFloor
    }
}

const getters = {
    map: state => state.map,
    showAll: state => state.showAll,
    showVideo: state => state.showVideo,
    videoIndex: state => state.videoIndex,
    videoSrc: state => state.videoSrc,
    mapLoad: state => state.mapLoad,
    isInDoor: state => state.isInDoor,
    currentPanelIndex: state => state.currentPanelIndex,
    currentFloor: state => state.currentFloor,
}

export default new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules: {},
    getters
});
