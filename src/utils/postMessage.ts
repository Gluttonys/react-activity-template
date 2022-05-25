enum IOS_COMMAND {
  /** @desc 关闭浏览器指令 */
  CLOSE = 'onCloseBtnClick',
  /** @desc 实名认证 */
  AUTHENTICATE = 'gotoRealNameVCHandler',
  /** @desc 个人主页 */
  PERSON_HOME_PAGE = 'onUserCenterBtnClick',
  /** @desc 进入房间 */
  GO_TO_LIVE_ROOM = 'onGotoLiveRoom',
  /** @desc 资金明细 */
  FUNDING_DETAILS = 'gotoWalletDetailPageHandler',
  /** @desc 在线客服 */
  ONLINE_SERVICE = 'gotoMQLineServicePageHandler',
  /** @desc 调起移动端问题反馈页面 */
  FEED_BACK_HANDLE = 'feedBackHandler',
  /** @desc 注销账号回调 跳回登录页面 */
  CANCELLATION_ACCOUNT_SUCCESS_HANDLE = 'cancellationAccountSuccessHandler',
  /** @desc 客户端录音回调 */
  RECORD_HANDLE = 'recordHandle',
  /** @desc 跳转家族大厅 */
  FAMILY_HALL_HANDLE = 'familyHallHandle',
  /** @desc 跳转创建房间 */
  CREATE_STREAM_ROOM_HANDLE = 'createStreamRoomHandle',
}

/**
 * @desc 调起客户端方法参数
 * */
type Materials = {
  type: IOS_COMMAND;
  params: Record<string, any>;
  data: Record<string, any>;
};

const postMessage = (type: IOS_COMMAND, params: Record<string, any> = {}) => {
  try {
    let materials: Partial<Materials> = { type };
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    if (isiOS) {
      materials.params = params;
      window.webkit.messageHandlers.common.postMessage(
        JSON.stringify(materials),
      );
    } else if (isAndroid) {
      materials.data = params;
      window.bridge.postMessage(JSON.stringify(materials));
    }
  } catch (e) {
    console.error('不行的，毛哥， 这样行不通的。。。。');
  }
};

export { postMessage, IOS_COMMAND };
