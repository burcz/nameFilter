"use-strict";
const log = require('debug')('info');
const request = require('async-request');
const cheerio = require('cheerio');

exports.names = getNames;
let url = "http://www.keresztnevek.hu/";
async function getNames() {
    let names = {
        male: {},
        female: {}
    };
    try {
        var response = await request(url);
        var $ = cheerio.load(response.body);
    }
    catch (err) {
        log(err);
    }
    for (let charCode = 65; charCode <= 90; charCode++) {
        let char = String.fromCharCode(charCode);
        names.male[char] = [];
        names.female[char] = [];
        $("#noi" + char + " tr").each(function(i, tr) {
            $("a", tr).each(function(j, a) {
                names.female[char].push($(a).text());
            })
        });
        $("#ferfi" + char + " tr").each(function(i, tr) {
            $("a", tr).each(function(j, a) {
                names.male[char].push($(a).text());
            })
        });
    }
    return names;
}