/**
 * 自用工具箱
 */

/**
 * 1-number 的随机数
 * @param number
 * @returns {number}
 */
export function randomNumber(number = 1) {
    return Math.ceil(Math.random() * number);
}

/**
 * 随机图片
 */
export function randomImg(path = "/images/poster/", ext = ".jpg", count = 10) {
    return path + randomNumber(count) + ext;
}
