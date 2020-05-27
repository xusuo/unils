<template>
  <div class="commonQuestionDetail">
    <p
      class="return"
      @click="$router.back();"
    >返回上一步</p>
    <div class="questionContent">
      <h1>{{activeQuestion.title}}</h1>
      <div v-html="activeQuestion.content"></div>
    </div>

    <div class="questionBottom">
      <div class="que-list">
        <!-- <p>
          如果您仍对本问题存有疑虑，请
          <span class="submitOrder">提交工单&gt;&gt;</span></p> -->
        <div class="otherQue">
          <h4>相关问题</h4>
          <ul
            v-for="(item, i) in questions"
            :key="i"
            v-if="item.isActive"
          >
            <li
              v-for="(chi, j) in item.children"
              :key="j"
              @click="switchQuestion(item, chi)"
            >{{chi.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          name: "资金财务",
          isActive: false,
          isShow: false,
          children: [
            {
              isActive: false,
              name: "如何进行充值？",
              content:
                '<div class="show-text-list"><p>您好，登陆网站成功后在首页【个人主页】最右侧可以查看您的当前余额，点击【充值】按钮可进行充值。请务必按照网站提示正确充值，充值请转账至公司财务支付宝：曹炎奎 （已实名认证） 。</p></div><div class="show-text-list"><p>注意：扫二维码后若显示其他支付宝账户请不要转账，避免诈骗。如遇特殊情况请联系在线客服咨询。</p></div><div class="show-text-list"><img src="http://106.14.154.124:8099/images/workOrder/workOrder1.png" alt="img"></div><div class="show-text-list"><img src="http://106.14.154.124:8099/images/workOrder/workOrder2.png" alt="img"></div><div class="show-text-list"><p>如按照正常充值要求充值，3-5秒内即刻充值到您的个人账户，刷新网站可以查看资金充值到账情况；如充值中忘记备注会导致到账时间延迟，请务必按照正常充值及充值要求进行充值。</p></div>'
            },
            {
              isActive: false,
              name: "充值备注填错了/忘记了怎么办？",
              content:
                '<div class="show-text-list"><p>如果忘记/填错备注了，请别担心，继续回到充值页面，点击【忘记备注】按钮，提交您的充值金额及支付宝充值订单号，点击确认提交系统，3-5秒内即刻到账。</p></div><div class="show-text-list"><img src="http://106.14.154.124:8099/images/workOrder/workOrder4.png" alt="img"></div> '
            },
            {
              isActive: false,
              name: "丢失的礼品包裹能不能退款？",
              content:
                '<div class="show-text-list"><p>您好，平台退款遵循以下规则：</p></div><div class="show-text-list"><p>待发货状态下的礼品退款，平台将予以全额退款；物流信息停滞下的礼品包裹退款，仓库核实包裹情况后，给予合理退款（部分退款/全额退款）；因收件人不予签收导致包裹被快递网点退回情况下，平台仅退礼品费用。</p></div><div class="show-text-list"><p>您好，发起订单退款后，经仓库核实订单情况，退款金额于1-2个工作日内完成到账。</p></div> '
            }
          ]
        },
        {
          name: "下单指南",
          isActive: false,
          isShow: false,
          children: [
            {
              isActive: false,
              name: "如何拍礼品？",
              content:
                '<div class="show-text-list"><p>第一步 导出收件人信息。</p></div><div class="show-text-list"><p>第二步 导入收件人信息。</p></div><div class="show-text-list"><p>第三步 选择赠品/礼品。</p></div><div class="show-text-list"><p>第四步：批量发货。</p></div><div class="show-text-list"><p>具体您可以在平台的“立即采购”界面参考下单视频介绍，如下图。</p></div><div class="show-text-list"><img src="http://106.14.154.124:8099/images/workOrder/workOrder3.png" alt="img"></div>'
            },
            {
              isActive: false,
              name: "申请样品和立即购买有什么区别？",
              content:
                '<div class="show-text-list"><p>目前系统默认申请样品是给单个买家填写收件人信息，立即采购是给多个买家提供收件人信息方便批量发货。仅在下单时候填写的页面会有些许不同。</p></div>'
            },
            {
              isActive: false,
              name: "为什么手动下单总是提示格式错误？",
              content:
                '<div class="show-text-list"><p>您好，请参照平台填写格式正确填写。</p></div><div class="show-text-list"><p>手动下单格式：姓名，电话，某省 某市 某区 具体地址（不需要邮编）</p></div><div class="show-text-list"><p>示例如下：</p></div><div class="show-text-list"><p>张三，15696969696，浙江省 杭州市 余杭区 南京路288号105室</p></div>'
            },
            {
              isActive: false,
              name: "已经发货的包裹还能取消撤回吗？",
              content:
                '<div class="show-text-list"><p>您好，目前平台仅支持下过任务订单五分钟内可以做订单撤回操作，超出五分钟仓库将完成礼品打包发货无法撤回任务。请您在拍下礼品前仔细核对是否信息正确。</p></div>'
            },
            {
              isActive: false,
              name: "为什么有的礼品不见了？",
              content:
                '<div class="show-text-list"><p>由于库存不足等其他原因礼品会做段时间的下架，并不定期新增新的礼品以供您的选购。对于热销产品的下架平台会提前做好通知，由于短时下架对您造成的困扰平台表示非常抱歉。</p></div>'
            },
            {
              isActive: false,
              name: "拍下的礼品还处于待发货状态还能撤回吗？",
              content:
                '<div class="show-text-list"><p>您好，目前平台仅支持下过任务订单五分钟内可以做订单撤回操作，超出五分钟仓库将完成礼品打包发货无法撤回任务。请您在拍下礼品前仔细核对是否信息正确。</p></div>'
            }
          ]
        },
        {
          name: "包裹物流",
          isActive: false,
          isShow: false,
          children: [
            {
              isActive: false,
              name: "为什么还没有揽件信息？",
              content:
                '<div class="show-text-list"><p>您好，下午四点前的订单仓库会当天打包，具体的揽件时间需要快递网点进行揽收，一般更新时间在凌晨；超过下午四点的订单需要隔天发出。如订单异常或揽收时间过长，请在您的商家端后台发起【申请查件】，仓库检报员会尽快核实包裹情况进行检查或补发操作。</p></div>'
            },
            {
              isActive: false,
              name: "为什么物流信息停止更新了？",
              content:
                '<div class="show-text-list"><p>您好，我们的礼品是正常寄送派件，包裹正常寄出后的物流信息停止更新是快递网点签收或流转时可能存在丢件、漏件、包裹破损无法寄送等情况。请您发现包裹信息有延迟停滞等情况尽快在商家端后台发起【申请查件】，仓库检报员会尽快和快递网点核实包裹情况，必要时采取补发操作。</p></div>'
            },
            {
              isActive: false,
              name: "为什么包裹被退回了？",
              content:
                '<div class="show-text-list"><p>包裹被退回有以下几种可能原因导致：收货地址错误导致无法派件；收件人联系电话错误或长期联系不上导致无法签收；包裹在流转或派送时破损导致无法派送；收件人拒绝签收等原因会导致包裹被退回。如遇包裹异常，请尽快在商家端后台发起【申请查件】，仓库检报员会尽快和快递网点核实包裹情况，必要时采取补发操作。因收件人的个人原因导致未签收请您及时联系买家了解具体原因。</p></div>'
            },
            {
              isActive: false,
              name: "遗失破损怎么办？",
              content:
                '<div class="show-text-list"><p>您好，礼品包裹在发出及派送中可能存在的因我方导致的遗失破损问题导致收件人无法签收或无法使用，平台可提供免费的补发服务。</p></div>'
            },
            {
              isActive: false,
              name: "中途拦截快递怎么办？",
              content:
                '<div class="show-text-list"><p>您好，如果您在我们平台上已经购买单号发了礼品，由于单号已经使用了，因此只能在申请查件拦截成功退取礼品的费用。具体步骤如下：</p></div><div class="show-text-list"><p>第一步 登陆商家端后台发起查件申请，并备注需要拦截包裹</p></div><div class="show-text-list"><img src="http://106.14.154.124:8099/images/workOrder/workOrder1120-1.png" alt="img"></div><div class="show-text-list"><img src="http://106.14.154.124:8099/images/workOrder/workOrder1120-2.png" alt="img"></div><div class="show-text-list"><p>第二步 联系您的专属运营或网站客服提供需拦截的单号，快递单号上报后等待礼品拦截回仓库，售后人员会对您的拦截包裹进行处理，点击【申请退款】我们将在1-2个工作日将礼品的费用退回至您的商家账户余额。由于收件地址的差异性，可能存在还未拦截就被客户提前签收的情况将无法拦截退款，还望理解。</p></div><div class="show-text-list"><img src="http://106.14.154.124:8099/images/workOrder/workOrder1120-3.png" alt="img"></div> '
            }
          ]
        },
        {
          name: "其他问题",
          isActive: false,
          isShow: false,
          children: [
            {
              isActive: false,
              name: "如何才能获得平台优惠福利？",
              content:
                '<div class="show-text-list"><p>您好，目前平台支持邀请注册免费升级VIP的优惠福利，如您的使用时间在连续一个月及以上或包裹量较大情况下可根据实际情况和您的专属运营申请新的优惠福利，具体要求以后续新的政策通知为准。</p></div>'
            }
          ]
        }
      ],
      activeQuestion: []
    };
  },
  methods: {
    switchQuestion(parent, item) {
      // 重置
      this.questions.forEach(m => {
        m.isActive = false;

        m.children.forEach(c => {
          c.isActive = false;
        });
      });

      parent.isActive = true;
      item.isActive = true;

      this.activeQuestion = {
        title: item.name,
        tag: parent.name,
        content: item.content
      };
    }
  },
  created() {
    let i = parseInt(this.$route.query.i);
    let j = parseInt(this.$route.query.j);

    let parent = this.questions[i];
    let item = this.questions[i].children[j];

    parent.isActive = true;
    parent.isShow = true;
    item.isActive = true;

    this.activeQuestion = {
      title: item.name,
      tag: parent.name,
      content: item.content
    };
  }
};
</script>

<style lang="less" scoped>
.commonQuestionDetail {
  padding: 20px;

  .return {
    text-decoration: underline;
    color: #f64f6f;
    font-size: 14px;
    cursor: pointer;
  }

  .questionContent {
    // width: 1000px;
    margin: 0 auto 50px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;

    h1 {
      text-align: center;
      font-size: 20px;
      line-height: 40px;
      color: #333;
      font-weight: 400;
    }

    /deep/.show-text-list {
      p {
        font-size: 14px;
        color: #999;
        padding: 3px 5px;
      }

      img {
        width: 240px;
        margin: 15px auto;
        display: block;
      }
    }
  }

  .questionBottom {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      font-size: 14px;
      line-height: 20px;
      color: #999;
      font-weight: 400;
      margin-bottom: 40px;
    }

    span {
      margin-left: 5px;
      font-size: 14px;
      line-height: 20px;
      color: #f64f6f;
      font-weight: 700;
      text-decoration: underline;
    }

    .submitOrder {
      cursor: pointer;
    }

    .que-list {
    }

    .otherQue {
      h4 {
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 700;
        margin-top: 20px;
      }

      ul {
        li {
          font-size: 14px;
          line-height: 20px;
          color: #999;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            color: #f64f6f;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>

