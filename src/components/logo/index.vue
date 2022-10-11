<template>
  <div class="logo-wrap">
    <img class="logo" alt="logo" src="../../assets/img/toptitle4.png" />
    <svg class="svg-box">
      <polyline class="ani-line1" points="30,20 200,20" />
      <polyline class="ani-line2" points="1890,20 1720,20" />
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.logo-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.logo {
  display: inline-block;
  width: 95%;
}
.logo2-wrap {
  position: absolute;
  top: 7px;
  width: 107%;
  height: 119%;
}
.logo2 {
  width: 100%;
  height: 100%;
}
.logo2-box {
  position: absolute;
  top: 0;
  left: 50%;
  width: 20px;
  height: 100%;
  background-color: transparent;
}
.svg-box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .ani-line1 {
    fill: none;
    stroke-width: 2;
    stroke: #6ab0ff;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-dasharray: 20, 186;
    stroke-dashoffset: 40;
    animation: lineMove1 4s linear infinite;
  }
  @keyframes lineMove1 {
    0% {
      stroke-dashoffset: 40;
      stroke: #325e8c;
    }
    15% {
      stroke: #6ab0ff;
    }
    50% {
      stroke-dashoffset: -18;
      stroke: #6ab0ff;
    }
    51% {
      stroke-dashoffset: -18;
      stroke: #325e8c;
    }
    100% {
      stroke-dashoffset: -18;
      stroke: #325e8c;
    }
  }
  .ani-line2 {
    fill: none;
    stroke-width: 2;
    stroke: #6ab0ff;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-dasharray: 20, 186;
    stroke-dashoffset: 40;
    animation: lineMove2 4s linear infinite;
  }
  @keyframes lineMove2 {
    0% {
      stroke-dashoffset: 40;
      stroke: #325e8c;
    }
    15% {
      stroke: #6ab0ff;
    }
    50% {
      stroke-dashoffset: -18;
      stroke: #6ab0ff;
    }
    51% {
      stroke-dashoffset: -18;
      stroke: #325e8c;
    }
    100% {
      stroke-dashoffset: -18;
      stroke: #325e8c;
    }
  }
}
</style>
