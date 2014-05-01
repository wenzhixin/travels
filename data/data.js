/**
 * @author Zhixin Wen<wenzhixin2010@gmail.com>
 * 从 lvyou.baidu 获取景点信息
 */

var fs = require('fs'),
    request = require('request'),
    scraper = require('scraper'),

    NUMBER = 100,
    BASE_URL = 'http://lvyou.baidu.com/',
    LIST_URL = BASE_URL + 'destination/ajax/webapp/allview?sid=da666bc57594baeb76b3bcf0&pn=0&rn=' + NUMBER,
    INTRO_URL = '/jianjie?pu=sz@1501_1004&amp;from=&amp;uid=&amp;ssid=&amp;bd_page_type=1&amp;device_os_id=2',
    TRAFFIC_URL = BASE_URL + 'destination/ajax/getroute?route=traffic&format=ajax&sid=',

    data = null,
    max = 0;
    count = 0;

function getList() {
    request.get(LIST_URL, function(err, response, body) {
        if (err) {
            throw err;
        }
        if (response.statusCode === 200) {
            var res = JSON.parse(body);
            data = res.data;
            max = res.data.scene_list.length * 3;
            res.data.scene_list.forEach(getDetail);
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
    getScraper(url, function($) {
        var tickets = [];
        $('.mod:contains("门票和开放时间")').find('.pd5 div').each(function() {
            tickets.push($.trim($(this).text()));
        });
        scene.tickets = tickets;
        count++;
        saveData();
    });

    // 交通
    request.get(TRAFFIC_URL + scene.sid, function(err, response, body) {
        if (err) {
            throw err;
        }
        if (response.statusCode === 200) {
            var res = JSON.parse(body);
            scene.traffic = res.data.remote || [];
        }
        count++;
        saveData();
    });
}

function getScraper(url, callback) {
    scraper({
        'uri': url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D)'
        }
    } ,function (err, $) {
        if (err) {
            throw err;
        }

        callback($);
    });
}

function saveData() {
    if (count === max) {
        fs.writeFile('./data.json', JSON.stringify(data));
        console.log('Create data OK...');
    }
}

getList();