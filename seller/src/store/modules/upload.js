
const yutang = {
  state: {
    // 导入订单,第一种方式
    uploadTypeOne: {
      // tb, tm, jd, pdd, qt
      type: "",
      uploadStep: 1,
      orderList: [],
      // 已经验证过的订单,可以直接用来关联礼品
      validedOrders: [],
      // 筛选订单的文本,用逗号分隔
      filterText: "",
      // 导入订单错误的个数
      errorNum: 0,
      // 导入订单成功的个数
      rightNum: 0,
      // 第一步导入订单之后,后台给的创建订单的 importId
      importId: ""
    },
    // 导入订单，第二种方式
    uploadTypeTwo: {
      // tb, tm, jd, pdd, qt
      type: "",
      uploadStep: 1,
      orderList: [],
      // 已经验证过的订单,可以直接用来关联礼品
      validedOrders: [],
      // 导入订单错误的个数
      errorNum: 0,
      // 导入订单成功的个数
      rightNum: 0,
      // 第一步导入订单之后,后台给的创建订单的 importId
      importId: ""
    }
  },
  mutations: {
    UPLOAD_TYPE_ONE(state, uploadTypeOne) {
      const { type, uploadStep, orderList, validedOrders, filterText, errorNum, rightNum, importId } = uploadTypeOne;

      if (type) {
        state.uploadTypeOne.type = type;
      }

      if (uploadStep) {
        state.uploadTypeOne.uploadStep = uploadStep;
      }

      if (orderList) {
        state.uploadTypeOne.orderList = orderList;
      }

      if (validedOrders) {
        state.uploadTypeOne.validedOrders = validedOrders;
      }

      if (filterText) {
        state.uploadTypeOne.filterText = filterText;
      }

      if (errorNum) {
        state.uploadTypeOne.errorNum = errorNum;
      }

      if (rightNum) {
        state.uploadTypeOne.rightNum = rightNum;
      }

      if (importId) {
        state.uploadTypeOne.importId = importId;
      }
    },
    UPLOAD_TYPE_TWO(state, uploadTypeTwo) {
      const { type, uploadStep, orderList, validedOrders, errorNum, rightNum, importId } = uploadTypeTwo;

      if (type) {
        state.uploadTypeTwo.type = type;
      }

      if (uploadStep) {
        state.uploadTypeTwo.uploadStep = uploadStep;
      }

      if (orderList) {
        state.uploadTypeTwo.orderList = orderList;
      }

      if (validedOrders) {
        state.uploadTypeTwo.validedOrders = validedOrders;
      }

      if (errorNum) {
        state.uploadTypeTwo.errorNum = errorNum;
      }

      if (rightNum) {
        state.uploadTypeTwo.rightNum = rightNum;
      }

      if (importId) {
        state.uploadTypeTwo.importId = importId;
      }
    }
  }
};

export default yutang;
