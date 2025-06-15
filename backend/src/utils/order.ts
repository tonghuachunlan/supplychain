/**
 * 生成订单号
 * 格式：时间戳(14位) + 用户ID后6位 + 4位随机数
 * @param userId 用户ID
 * @returns 订单号
 */
export const generateOrderNo = (userId: string): string => {
  // 获取当前时间戳（14位）
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .slice(0, 14);

  // 获取用户ID的后6位，不足6位前面补0
  const userSuffix = userId.slice(-6).padStart(6, '0');

  // 生成4位随机数
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `${timestamp}${userSuffix}${random}`;
};

/**
 * 解析订单号
 * @param orderNo 订单号
 * @returns 订单信息
 */
export const parseOrderNo = (orderNo: string): {
  timestamp: Date;
  userSuffix: string;
  random: string;
} => {
  const timestamp = new Date(
    orderNo.slice(0, 4) +
    '-' +
    orderNo.slice(4, 6) +
    '-' +
    orderNo.slice(6, 8) +
    'T' +
    orderNo.slice(8, 10) +
    ':' +
    orderNo.slice(10, 12) +
    ':' +
    orderNo.slice(12, 14) +
    'Z'
  );

  return {
    timestamp,
    userSuffix: orderNo.slice(14, 20),
    random: orderNo.slice(20),
  };
};

/**
 * 生成退款订单号
 * @param orderId 原订单号
 * @returns 退款订单号
 */
export const generateRefundNo = (orderId: string): string => {
  return `R${orderId}${Date.now().toString().slice(-6)}`;
}; 