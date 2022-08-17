/**
 * 视频播放列表解析
 */
// 视频分类
function TransformUrl(info) {
    let cateList = [];
    // 不存在分集
    if (info.vod_play_url.search('/$/') !== -1) { // 不存在
        let video = {};
        video.name = '默认';
        video.url = info.vod_play_url;
        cateList.push(video);
    } else {
        let vod_play_from = info.vod_play_from.replace(/'/g, '');
        let vod_play_note = info.vod_play_note;
        let vod_play_url = info.vod_play_url.replace(/'/g, '');

        let cate = [];
        let list = [];

        // 存在两种播放的情况
        // eslint-disable-next-line camelcase
        if (vod_play_note !== '') {
            list = vod_play_url.split(vod_play_note).reverse();
            cate = vod_play_from.split(vod_play_note).reverse(); // 选项翻转

            if (cate.length > 0) {
                cate.forEach((name, index) => {
                    let item = {};
                    item.name = name;
                    item.list = splitList(list[index]);
                    cateList.push(item);
                })
            }
        } else {
            // 使用# 进行分割
            cate = ['默认'];
            if (cate.length > 0) {
                cate.forEach((name, index) => {
                    let item = {};
                    item.name = name;
                    item.list = splitList(vod_play_url);
                    cateList.push(item);
                })
            }
        }
    }
    return cateList;
}

// 切割集数
function splitList(data = '', dot = '#') {
    if (data === '') {
        return [];
    }
    // 直接是播放地址判断
    let lists = [];
    // console.log('原始播放地址：' + data)
    // console.log(data.search("/$/"))
    if (data.indexOf('$') === -1) {
        let listItem = {};
        listItem.name = '默认';
        listItem.url = data;
        listItem.selected = true; // 是否选中
        lists.push(listItem);
        return lists;
    }
    let list = data.split(dot);

    list.forEach(item => {
        if (item !== '') {
            let listItem = {};
            let itemData = item.split('$');
            listItem.name = itemData[0];
            listItem.url = itemData[1];
            listItem.selected = false; // 是否选中
            lists.push(listItem);
        }
    })
    return lists.reverse(); // 数组翻转
}

export default TransformUrl;
