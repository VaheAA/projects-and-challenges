<template>
  <div class="buttons">
    <button @click="undoPoint">Undo</button>
    <button @click="redoPoint">Redo</button>
  </div>
  <div class="point-box" @click="plotPoint">
    <div class="point" v-for="(point, index) in points" key="index"
      :style="{ top: `${point.y}%`, left: `${point.x}%` }"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const points = ref([]);
const deletedPoints = ref([]);

function plotPoint (e) {
  points.value.push({
    x: (e.offsetX / window.innerWidth) * 100,
    y: (e.offsetY / window.innerHeight) * 100
  });
}

function undoPoint () {
  const deletedPoint = points.value.pop();
  deletedPoints.value.push(deletedPoint);
}

function redoPoint () {
  const returnedPoint = deletedPoints.value.pop();
  points.value.push(returnedPoint);
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.point-box {
  position: relative;
  height: 100vh;
  background-color: gray;
}

.point {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
}
</style>
