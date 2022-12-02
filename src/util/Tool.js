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

const Tool = {
    /**
     * 时间戳转化
     */
    transformTimestamp( timestamp="") {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    /**
     * 转化地址
     */
    transformAddr(country="",region="",city=""){
        let list = [];
        list.push(country,region,city)
        return list.join("-")
    }

}
export default Tool
