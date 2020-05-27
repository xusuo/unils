<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>分站管理</el-breadcrumb-item>
        <el-breadcrumb-item>分站详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <ul class="info">
      <li>
        <p>
          <img
            :src="$baseImageUrl + stationInfo.logoUrl"
            alt=""
            style="width: 100px;"
          >
          <br />
          <strong>{{stationInfo.stationName}}</strong>
          <br />
          <em>{{stationInfo.stationDomain}}</em>
          <br />
          <a
            href="javascript:;"
            class="text-btn"
            @click="$refs.editInfoDialog.show(stationInfo);"
          >修改信息</a>
          <a
            href="javascript:;"
            class="text-btn"
            @click="resetPwd"
          >重置密码</a>
          <a
            href="javascript:;"
            class="text-btn"
            @click="$refs.editDominDialog.show(stationInfo.stationDomain);"
          >修改域名</a>
        </p>
        <p
          class="connect"
          style="max-width: 250px;"
        >
          <span>联系人姓名: {{stationInfo.contacts}}</span>
          <br />
          <span>联系人电话: {{stationInfo.contactsPhone}}</span>
          <br />
          <span>联系人QQ: {{stationInfo.contactsQq}}</span>
          <br />
          <span>联系人微信: {{stationInfo.contactsWx}}</span>
          <br />
          <span>管理员姓名: {{stationInfo.manage}}</span>
          <br />
          <span>管理员手机: {{stationInfo.managePhone}}</span>
        </p>
      </li>
      <li>
        <p>
          <b>{{stationInfo.balance ? stationInfo.balance : 0}}</b>
          <br />
          <em>账户余额</em>
        </p>
        <p>
          <b>{{stationInfo.totalReward ? stationInfo.totalReward : 0}}</b>
          <br />
          <em>累计奖金</em>
        </p>
      </li>
    </ul>

    <div class="yt-common-ctn">
      <div class="name">
        快递设置
        <el-select
          v-model="type"
          @change="switchExpress"
          style="margin-left: 20px;"
        >
          <el-option
            v-for="(item, i) in expressList"
            :label="item.expressName"
            :value="item.expressId"
            :key="i"
          ></el-option>
        </el-select>

          <el-button type="primary" @click="dialogVisible = true"  v-if="show">批量修改</el-button>
      </div>
    </div>

     <div
      class="custom-container-wrap"
      style="margin-top: 10px;"
    >
      <el-table
        :data="tableData"
        stripe
        border
        :span-method="objectSpanMethod"
        v-loading="loading"
      >
       <el-table-column
          label="分仓"
          prop="pointName"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.groupId !=7 ? scope.row.pointName :''}}
          </template>
        </el-table-column>
        <el-table-column
          label="快递类型"
          width="120px"
          prop="expressName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="归属名称"
          prop="roleName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="首重0.5kg（非偏远）"
          prop="first"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="0.5kg-1kg (非偏远)"
          prop="firstKg"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="1kg以上续重，每0.5kg (非偏远)"
          prop="additional"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="首重0.5kg (偏远)"
          prop="farFirst"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="0.5kg---1kg (偏远)"
          prop="farFirstKg"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="1kg以上续重，每0.5kg (偏远)"
          prop="farAdditional"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="是否按单提成"
          prop="isOnePrice"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isOnePrice == 0">否</span>
            <span v-if="scope.row.isOnePrice == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column
          label="每单提成"
          prop="onePrice"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="customerName"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              icon="el-icon-edit"
              v-if="scope.row.roleName == '分站'"
              @click="$refs.setPirceDialog.show(scope.row);"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
    title="批量修改"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose">
    <el-form
        ref="form" :rules="rules"
        :model="form"
        label-width="150px"
      >

        <el-form-item prop="onePrice"
          label="成本价："
        >
          <el-input
            v-model="form.onePrice"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleget">确 定</el-button>
    </span>
  </el-dialog>

    <EditInfoDialog
      ref="editInfoDialog"
      @success="queryChannelStationDetail"
    />
    <EditDominDialog
      ref="editDominDialog"
      @success="queryChannelStationDetail"
    />

    <SetPirceDialog
      ref="setPirceDialog"
      :expressId="type"
      @success="getTableData"
    />
  </div>
</template>

<script>
import EditInfoDialog from "./components/EditInfoDialog";
import EditDominDialog from "./components/EditDominDialog";
import SetPirceDialog from "./SetPriceDilaog";
export default {
  components: { EditInfoDialog, EditDominDialog, SetPirceDialog },
  data() {
    return {
      stationSwitch: true,
      myCost: [],
      dialogVisible: false,
      stationCost: [],
      show: true,
      form:{},
      rules: {
        onePrice: [
          { required: true, message: '请输入成本价', trigger: 'blur' }
        ]
      },
      stationInfo: {},
      tableData: [],
      expressList: [],
      type: "1",
      expressType: "1"
    };
  },
  methods: {
    async queryExpressList(params) {
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/queryExpressList",
        method: "get",
        params
      });
      const { data } = res;
      if (data) {
        this.expressList = data;

        if (data.length) {
          this.type = data[0].expressId;
          this.expressType = data[0].eType;
        }
      }
    },
    async updatePassword(params) {
      let res = await this.$http({
        url: "/auth/user/updatePassword",
        method: "post",
        data: params
      });
      const { code, data } = res;
      if (code === 200) {
        // console.log(data);
        this.$message.success("修改成功");
      }
    },
    resetPwd() {
      this.$confirm("此操作将会重置密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送重置密码的请求
          this.updatePassword({
            // code: "string",
            // groupId: 0,
            // loginAccount: "string",
            loginPassword: "123456"
            // newPassword: "string",
            // primaryPassword: "string",
            // userId: 0
          });
        })
        .catch(() => {});
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    async getTableData() {
      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/channel/getStationPriceByPoint",
        method: "get",
        params: {
          expressId: this.type,
          stationId: this.$route.query.id,
        }
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = [];
        // this.pagination.total = parseInt(data.total);
        
        data.forEach(element => {
          element.priceSetVoList.forEach(child => {

            this.tableData.push(child)
          })
        });

      } else {
        this.tableData = [
          {
            setId: 0,
            first: 0,
            firstKg: 0,
            additional: 0,
            farFirst: 0,
            farFirstKg: 0,
            farAdditional: 0,
            isOnePrice: 0,
            onePrice: ""
          }
        ];
      }
    },
    async queryChannelStationDetail() {
      let res = await this.$http({
        url: "/channel/queryChannelStationDetail",
        method: "get",
        params: {
          expressId: this.type,
          pointId: this.point,
          stationId: this.$route.query.id
        }
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200) {
        this.myCost = data.myCost ? data.myCost : [];
        this.stationCost = data.stationCost ? data.stationCost : [];
        this.stationInfo = data.stationInfo;
      }
    },
    async switchExpress(value) {
      if(value==1){
        this.show = true
      }else{
        this.show = false
      }
      await this.queryChannelStationDetail();
      await this.getTableData();
      
      this.expressList.forEach(m => {
        if (m.expressId == value) {
          this.expressType = m.eType;
        }
      });
    },
     // 批量修改
    async handleget(str) {
      this.$refs.form.validate(async valid => {
        if (valid) {

          const res = await this.$http({
            url: "/channel/updateBatchStationEnvelopePrice",
            method: "post",
            data: {
              stationId: this.$route.query.id,
              expressId: this.type,
              onePrice: this.form.onePrice
            }
          });
          this.$nextTick(() => {
            this.$refs['form'].resetFields()
          })
          this.dialogVisible = false
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          if(res.code === 200) {
            this.getTableData();
          }
          
        }
      })
    },
  },
  async created() {
    await this.queryExpressList();
    this.queryChannelStationDetail();
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  padding: 20px 30px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);

  > li {
    flex: 1;
    display: flex;
    align-items: center;
    -ms-flex-pack: distribute;
    justify-content: space-around;

    > p {
      flex: 1;
      line-height: 30px;
      text-align: center;

      > img {
        display: inline;
      }

      &.connect {
        text-align: left;
      }

      > strong {
        font-size: 18px;
        font-weight: 700;
      }

      > em {
        font-size: 16px;
        font-style: normal;
      }

      > a {
        margin: 0 10px;
      }

      > span {
        font-size: 14px;
      }

      > b {
        font-size: 36px;
        color: #ff3341;
      }
    }
  }
}

</style>
