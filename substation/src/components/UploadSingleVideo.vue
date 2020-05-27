<template>
  <el-upload
    class="uploader-pic-wrap"
    refs="singleUpload"
    :action="action"
    :show-file-list="false"
    :before-upload="before"
    :on-success="success"
    :on-progress="progress"
    :on-error="error"
    :data="data"
  >
    <div
      v-if="isUploading"
      style="padding-top: 8px;"
    >
      <el-progress
        type="circle"
        :percentage="uploadProgress"
        :width="54"
        :stroke-width="2"
      ></el-progress>
    </div>

    <i
      v-if="!isUploading"
      class="el-icon-plus uploader-pic-icon"
    ></i>
    <div
      v-if="!isUploading"
      class="uploader-pic-text"
    >
      上传视频
    </div>
    <div
      class="el-upload__tip"
      slot="tip"
      v-if="tip"
    >{{tip}}</div>
  </el-upload>
</template>

<script>
import { on } from "@/utils/events";
export default {
  props: {
    // 底下的提示文字，通常提示文件可上传的限制
    tip: {
      type: String,
      default() {
        return "";
      }
    },
    // 视频时长,默认 15秒
    duration: {
      type: Number,
      default() {
        return 15;
      }
    },
    // 上传到商家文档库为"seller" 上传到粉丝文档库"buyers"
    uploadStatus: {
      type: String,
      default() {
        return "seller";
      }
    }
  },
  data() {
    return {
      // action: "http://pnku5h05i.bkt.clouddn.com",
      action: "http://up-z2.qiniup.com/",
      accept: "video/mp4,video/ogg",
      // 是否正在上传图片
      isUploading: false,
      // 上传的进度
      uploadProgress: 0,
      // 上传额外的参数
      data: {
        token: "",
        key: "",
        fname: "",
        "x:name": ""
      }
    };
  },
  methods: {
    // 获取上传参数
    // 请求参数 group 商家的图片为"seller" 粉丝的"buyers"
    // string类型，
    // 如果商家端 or 粉丝端里面再有分组，那就是 seller-xxx, buyers-xxx
    async findTaskGroupInfo(params, callback) {
      let res = await this.$http({
        url: "/qiniu/findUploadFileSign",
        method: "get",
        params: {
          group: params.group
        }
      });
      const { code, data } = res;
      // console.log(res);
      if (code == 200) {
        let newName = this.genNonDuplicateID(4);

        this.data.token = data;
        this.data.key = newName + "." + params.fileExtension;
        this.data.fname = newName + "." + params.fileExtension;
        this.data["x:name"] = newName;
      }
      callback && callback(code);
    },
    // 根据时间戳生成不重复的字符串
    genNonDuplicateID(randomLength) {
      return Number(
        Math.random()
          .toString()
          .substr(3, randomLength) + Date.now()
      ).toString(36);
    },
    before(file) {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          // console.log(file);
          // 排除类型不对的图片
          if (this.accept && this.accept !== "") {
            let acceptTypeList = this.accept.split(",");
            let isAccept = false;

            acceptTypeList.map(m => {
              if (m === file.type) {
                isAccept = true;
              }
            });

            if (!isAccept) {
              this.$message.error("文件格式不对");
              return false;
            }
          }

          // 排除大于1G的视频
          if (file.size / 1024 <= 1000000) {
          } else {
            this.$message.error("视频大小不能超过1G");
            return false;
          }

          // 获取视频时长，大于规定时长的不能上传
          let localVideoUrl = this.getObjectURL(file);
          let video = document.createElement("video");
          let source = document.createElement("source");
          source.src = localVideoUrl;

          video.appendChild(source);
          video.style.display = "none";

          on(video, "error", () => {
            console.log("加载失败！");
            console.log(e);
            this.$message.error("视频读取错误");
            reject();
          });

          on(video, "canplaythrough", () => {
            let duration = parseInt(video.duration);
            // console.log(this.duration, duration)

            // 时长判断
            if (this.duration < duration) {
              this.$message.error(
                "视频时长过大，当前限制视频上传时长为：" + this.duration + " 秒"
              );
              reject();
            } else {
              let fileNames = file.name.split(".");
              let fileExtension = fileNames[fileNames.length - 1];

              this.findTaskGroupInfo(
                {
                  group: this.uploadStatus,
                  fileExtension
                },
                code => {
                  if (code == 200) {
                    this.isUploading = true;
                    // console.log(
                    //   "恭喜你，通过校验了，该文件可上传 ===================>>>>>>>>"
                    // );
                    resolve(file);
                  } else {
                    this.$message.error("获取文件上传token失败");
                    reject();
                  }
                }
              );
            }
          });
        });
      });
    },
    success(response, file, fileList) {
      // console.log(response, file, fileList);
      this.isUploading = false;
      this.uploadProgress = 0;
      this.$emit("success", {
        key: response.key,
        saveUrl: "/" + response.key
        // link: "http://pnku5h05i.bkt.clouddn.com/" + response.key
      });
    },
    progress(event, file, fileList) {
      // console.log(event);
      this.uploadProgress = parseInt(event.percent);
    },
    error(err, file, fileList) {
      // console.log(err, file, fileList);
      this.$message.error("文件上传失败");
      this.isUploading = false;
      this.uploadProgress = 0;
      this.$emit("error");
    },
    onUpload() {
      this.$refs.singleUpload.submit();
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }
    // photoCompress(file, w, callback) {
    //   let re = this.getObjectURL(file);
    //   // console.log(re);
    //   this.canvasDataURL(re, w, callback);
    // }
  }
};
</script>

