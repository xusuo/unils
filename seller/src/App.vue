/*
 * @Author: 陈晨 
 * @Date: 2019-05-25 17:49:20 
 * @Last Modified by:   陈晨 
 * @Last Modified time: 2019-05-25 17:49:20 
 */
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #f4f4f4;
}
body {
  font-family: Monospaced Number, Chinese Quote, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  /* font-weight: lighter; */
  line-height: 1.5;
}
html,
body,
#app {
  height: 100%;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
  /* font-weight: lighter; */
  font-weight: normal;
}
i,
em {
  font-style: normal;
}
a {
  color: #7b66ab;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
input,
button {
  outline: none;
}
button {
  transition: all 0.2s;
  box-sizing: border-box;
  background: transparent;
  cursor: pointer;
}
button:disabled {
  background-color: #d9d9d9 !important;
  border-color: #d9d9d9 !important;
  cursor: not-allowed;
}
button:hover {
  opacity: 0.8;
}
ul,
li {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
img {
  display: block;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  /*background-color: #fff;*/
}
::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
     border-radius: 10px;
     background-color: #f2f2f2;*/
  background: inherit;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
  background-color: #ccc;
}
</style>
