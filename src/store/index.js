import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
    map: null, // 地图对象
    mapLoad: false, // 地图加载的参数
    showAll: true,  // 是否显示所有监控
    currentFloor: 0, // 当前楼层
    isInDoor: false, // 是否是室内
    currentPanelIndex: 0, // 当前模块
    currentSys: '',
    currentSysModule: '',
    oldCurrentSys: ''
}

const mutations = {
    SET_MAP(state, map) {
        state.map = map
    },
    SET_MAP_LOAD(state, mapLoad) {
        state.mapLoad = mapLoad
    },
    SET_ISINDOOR(state, isInDoor) {
        state.isInDoor = isInDoor
    },
    SET_CURRENTFLOOR(state, currentFloor) {
        state.currentFloor = currentFloor
    },
    SET_CURRENTSYS(state, sys){
        state.currentSys = sys
    },
    SET_OLD_CURRENTSYS(state, sys){
        state.oldCurrentSys = sys
    },
    SET_CURRENTSYS_MODULE(state, module){
        state.currentSysModule = module
    }
}

const getters = {
    map: state => state.map,
    showAll: state => state.showAll,
    mapLoad: state => state.mapLoad,
    isInDoor: state => state.isInDoor,
    currentFloor: state => state.currentFloor,
    currentSys: state => state.currentSys,
    currentSysModule: state => state.currentSysModule
}

export default new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules: {},
    getters
});
