function goindex() {
    this.$router.replace('/')
}

function golog() {
    this.$router.replace('/login')
}




// 将全局公共方法，组合成一个对象
export default {
    goindex,
    golog,
}