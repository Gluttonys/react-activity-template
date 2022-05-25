/**
 * @desc 在此给 window 对象原型添加附属品 的定义 （防止报错警告）
 */
declare interface Window {
  readonly webkit: any;
  readonly bridge: any;
}
