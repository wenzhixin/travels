/**
 * @author Zhixin Wen<wenzhixin2010@gmail.com>
 * 从 lvyou.baidu 获取景点信息
 */

var fs = require('fs'),
    path = require('path'),
    request = require('request'),
    scraper = require('scraper'),
    ProgressBar = require('progress'),

    PAGE_NUMBER = 5,
    BASE_URL = 'http://lvyou.baidu.com/',
    LIST_URL = BASE_URL + 'destination/ajax/webapp/allview?sid=da666bc57594baeb76b3bcf0&rn=20&pn=',
    INTRO_URL = '/jianjie?pu=sz@1501_1004&amp;from=&amp;uid=&amp;ssid=&amp;bd_page_type=1&amp;device_os_id=2',
    TRAFFIC_URL = BASE_URL + 'destination/ajax/getroute?route=traffic&format=ajax&sid=',

    page = 0,
    max = 0,
    count = 0,
    list = [],
    bar = null;

function getList() {
    request.get(LIST_URL + page, function (err, response, body) {
        if (err) {
            throw err;
        }
        page++;
        if (response.statusCode === 200) {
            var res = JSON.parse(body);

            list = list.concat(res.data.scene_list);

            if (page === PAGE_NUMBER) {
                max = list.length * 3;
                bar = new ProgressBar('Get data from baidu [:bar] :percent', {
                    complete: '=',
                    incomplete: ' ',
                    width: 20,
                    total: max
                });
                list.forEach(getDetail);
            } else {
                getList();
            }
        }
    });
}

function getDetail(scene) {
    // 删除点评
    delete scene.newest_remark;

    var url = BASE_URL + scene.surl;

    // 简介
    getScraper(url + INTRO_URL, function ($) {

        var $div = $('.content .pd5');
        $div.find('a').remove();
        scene.introduction = $.trim($div.text());
        count++;
        saveData();
    });

    // 门票和开放时间
    getScraper(url, function ($) {
        var tickets = [];
        $('.mod:contains("门票和开放时间")').find('.pd5 div').each(function () {
            tickets.push($.trim($(this).text()));
        });
        scene.tickets = tickets;
        count++;
        saveData();
    });

    // 交通
    request.get(TRAFFIC_URL + scene.sid, function (err, response, body) {
        if (err) {
            throw err;
        }
        if (response.statusCode === 200) {
            var res = JSON.parse(body);
            scene.traffics = res.data.remote || [];
        }
        count++;
        saveData();
    });

    // 下载图片
    var filename = path.basename(scene.pic_url);
    request(scene.pic_url).pipe(fs.createWriteStream('../images/data/' + filename));
    scene.pic_url = 'images/data/' + filename;
}

function getScraper(url, callback) {
    scraper({
        'uri': url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D)'
        }
    }, function (err, $) {
        if (err) {
            throw err;
        }

        callback($);
    });
}

function saveData() {
    bar.tick(1);
    if (count === max) {
        fs.writeFile('./data.json', JSON.stringify(list));
        console.log('Create data OK...');
    }
}

getList();