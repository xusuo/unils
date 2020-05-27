<template>
  <el-upload
    :action="action"
    :accept="accept"
    :auto-upload="false"
    :data="data"
    :headers="headers"
    :on-change="onChange"
    :on-progress="progress"
    :on-success="submitSuccess"
    :show-file-list="false"
    class="f-ib"
    drag
    ref="upload"
  >
    <!-- <b
      slot="trigger"
      class="button-n"
      style="margin-left: 0;"
    >选择文件</b>-->
    <i
      class="el-icon-upload2"
      style="font-size: 67px;
    color: #C0C4CC;
    margin: 40px 0 16px;
    line-height: 50px;"
    ></i>
    <div class="el-upload__text">
      <!-- 将文件拖到此处，或 -->
      <em>点击上传</em>
    </div>
    <div
      class="el-upload__tip"
      slot="tip"
    >
      只能上传.xlsx, .xls文件，多次上传仅最新上传有效
      <br>
      文件大小限制5M以内
      <!-- 进度条没用，先注释。 -->
      <!-- <div>
        <el-progress
          :percentage="uploadProgress"
          :width="54"
          :stroke-width="2"
        ></el-progress>
      </div>-->
    </div>
  </el-upload>
</template>

<script>
import Cookies from 'js-cookie'
import XLSX from "xlsx";

export default {
  props: {
    // 淘宝 tb，天猫 tm，京东 jd，拼多多 pdd
    orderType: {
      type: String,
      default() {
        return "tb";
      }
    },
    // 订单筛选条件，默认为空
    filterText: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      action: this.$baseURL + "/seller/importOrder",
      accept:
        "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,.csv,.xlsx,.xls",
      headers: {
        Authorization: Cookies.get("TOKEN")
      },
      data: {
        type: "",
        fileType: "",
        selectFile: "",
        // 1-手工导入；2-智能文件导入；3-普通文件导入；4-智能导入
        orderType: 3
      },
      // 用户是否选择过文件，
      // 已经上传过一次的文件需要重新选择
      hasSelectFile: false,
      // 上传的进度
      uploadProgress: 0,
      fileList: []
    };
  },
  // computed: {
  //   uploadUrl() {
  //     if (this.data.fileType === "csv") {
  //       return this.$baseURL + "/seller/importTaskForCsv";
  //     } else {
  //       return this.$baseURL + "/seller/importOrder";
  //     }
  //   }
  // },
  methods: {
    onChange(e) {
      // console.log(e);
      // 设置文件扩展名参数
      let filename = e.raw.name;
      let ftx = filename.split(".");
      this.data.fileType = ftx[ftx.length - 1];

      // 选中一个之后，如果之前还有，就处理为只剩最后一个
      let upload = this.$refs.upload;
      if (upload.uploadFiles.length >= 2) {
        // upload.uploadFiles = [];
        upload.uploadFiles = [
          upload.uploadFiles[upload.uploadFiles.length - 1]
        ];
      }

      this.readExcel(e.raw, "." + ftx[ftx.length - 1]);
    },
    // 读取excel文件
    readExcel(file, ftx) {
      console.log(file, ftx);
      const fileReader = new FileReader();

      // 排除类型不对的图片
      if (this.accept && this.accept !== "") {
        let acceptTypeList = this.accept.split(",");
        let isAccept = false;

        acceptTypeList.map(m => {
          // if (m === file.type) {
          //   isAccept = true;
          // }
          
          // 根据扩展名去判断了
          if (m === ftx) {
            isAccept = true;
          }
        });

        if (!isAccept) {
          this.$message.error("文件格式不对");
          return false;
        }
      }

      // 排除过大的文件，5M一下
      if (file.size / 1024 > 5120) {
        this.$message.error(`文件大小不能超过 5 M`);
        return false;
      }

      fileReader.readAsBinaryString(file);
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          // console.log(workbook);
          let sheetArray;
          for (let sheet in workbook.Sheets) {
            sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); //获得以第一列为键名的sheet数组对象
          }

          // 上传成功的钩子
          this.$emit("success", {
            fileName: file.name,
            items: sheetArray
          });
          this.hasSelectFile = true;
        } catch (error) {
          console.log(error);
          this.$message.warning("文件类型不正确！");
          return false;
        }
      };
    },

    submit() {
      // jd pdd tm（淘宝/天猫/其他）
      if (this.orderType === "jd" || this.orderType === "pdd") {
        this.data.type = this.orderType;
      } else {
        this.data.type = "tm";
      }

      if (this.filterText !== "") {
        this.data.selectFile = this.filterText.split(/[(\r\n)\r\n]+/).join(",");
      } else {
        delete this.data.selectFile;
      }

      // console.log(this.$refs.upload);
      // console.log(this.$refs.upload.uploadFiles);
      // console.log("submit-----index...");

      // 选了文件才开始导入
      if (this.$refs.upload.uploadFiles.length > 0) {
        this.$refs.upload.submit();
      } else {
        this.$message.error("请重新选择文件");
        this.$emit("submit-error");
      }
    },

    // 上传进度
    progress(event, file, fileList) {
      this.uploadProgress = parseInt(event.percent);
    },

    submitSuccess(response, file, fileList) {
      let { code, data, message } = response;
      this.uploadProgress = 0;
      // 上传之后，清空已选文件文件，不管成功还是失败
      this.$refs.upload.clearFiles();
      // 导入之后重置为空
      this.$refs.upload.uploadFiles = [];
      this.$emit("submit-upload");

      if (code == 200) {
        this.hasSelectFile = false;
        this.$emit("submit-success", data);
      } else {
        this.$message.error(message);
        this.$emit("submit-error");
      }
    },
    // 下面的处理方法都交给后台了。前台后面再删除
    // 处理淘宝/天猫订单
    handleTbOrder(data) {
      let arr = [];

      if (data[0]["订单编号"]) {
        data.forEach((m, i) => {
          arr.push({
            orderNo: m["订单编号"],
            name: m["收货人姓名"],
            mobile: m["联系手机"],
            address: m["收货地址"],
            goodsTitle: m["宝贝标题"],
            checkResult: true,
            index: i
          });
        });
      }

      return arr;
    },
    // 处理京东订单
    handleJdOrder(data) {
      let arr = [];

      if (data[0]["客户姓名"]) {
        data.forEach((m, i) => {
          arr.push({
            orderNo: m["订单号"],
            name: m["客户姓名"],
            mobile: m["联系电话"],
            address: m["客户地址"],
            goodsTitle: m["商品名称"],
            checkResult: true,
            index: i
          });
        });
      }

      return arr;
    },
    // 拼多多订单
    handlePddOrder(data) {
      let arr = [];

      if (data[0]["收货人"]) {
        data.forEach((m, i) => {
          arr.push({
            orderNo: m["订单号"],
            name: m["收货人"],
            mobile: m["手机"],
            address: m["省"] + m["市"] + m["区"] + m["街道"],
            goodsTitle: m["商品"],
            checkResult: true,
            index: i
          });
        });
      }

      return arr;
    }
  }
};
</script>
