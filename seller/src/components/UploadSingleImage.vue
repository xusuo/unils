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
    :auto-upload="autoUpload"
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
      上传图片
    </div>
    <div
      class="el-upload__tip"
      slot="tip"
      v-if="tip"
    >{{tip}}</div>
  </el-upload>
</template>

<script>
export default {
  props: {
    // 底下的提示文字，通常提示文件可上传大小的限制
    tip: {
      type: String,
      default() {
        return "";
      }
    },
    // 最大KB大小,默认2MB
    size: {
      type: Number,
      default() {
        return 3072;
      }
    },
    // 是否自动提交,用以控制手动出发，防止用户胡乱传图片。
    // 这个还在改造。还没完成
    autoUpload: {
      type: Boolean,
      default() {
        return true;
      }
    },
    // 商家图片为"seller" 粉丝图片"buyers"
    uploadStatus: {
      type: String,
      default() {
        return "seller";
      }
    },
    // 大图片压缩率
    quality: {
      type: Number,
      default() {
        return 0.2;
      }
    },
    // 大图片压缩宽度,默认使用1000的宽度
    qualityWidth: {
      type: Number,
      default() {
        return 1000;
      }
    }
  },
  data() {
    return {
      action: "http://up.qiniup.com/",
      accept: "image/jpg,image/jpeg,image/png",
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
        url: "/admin/findUploadFileSign",
        method: "get",
        params: {
          // group: params.group
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

          // 排除过大的图片
          if (file.size / 1024 <= this.size) {
          } else {
            if (this.size > 1024) {
              this.$message.error(
                `图片大小不能超过${(this.size / 1024).toFixed(2)}M`
              );
            } else {
              this.$message.error(`图片大小不能超过${this.size}KB`);
            }
            return false;
          }

          let fileNames = file.name.split(".");
          let fileExtension = fileNames[fileNames.length - 1];

          // console.log("=======@@@@@@@");
          // 图片大小小于200KB的直接传，大于200KB，都需要压缩
          if (file.size / 1024 > 200) {
            this.photoCompress(
              file,
              {
                // 设置图片压缩率
                quality: this.quality,
                width: this.qualityWidth
              },
              base64Codes => {
                // console.log(base64Codes);
                var bl = this.convertBase64UrlToBlob(base64Codes);
                // console.log(bl);

                // 通过后台API获取上传参数
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
                      resolve(bl);
                    } else {
                      this.$message.error("获取文件上传token失败");
                      reject();
                    }
                  }
                );
              }
            );
          } else {
            // 通过后台API获取上传参数
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
    },
    convertBase64UrlToBlob(urlData) {
      let arr = urlData.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    canvasDataURL(path, obj, callback) {
      let img = new Image();
      img.src = path;
      img.onload = function() {
        let that = this;
        // 默认按比例压缩
        let w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;

        console.log(w);
        let quality = 0.7; // 默认图片质量为0.7
        //生成canvas
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        // 创建属性节点
        let anw = document.createAttribute("width");
        anw.nodeValue = w;
        let anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL("image/jpeg", quality);
        // 回调函数返回base64的值
        callback(base64);
      };
    },
    photoCompress(file, w, callback) {
      let re = this.getObjectURL(file);
      // console.log(re);
      this.canvasDataURL(re, w, callback);
    }
  }
};
</script>

