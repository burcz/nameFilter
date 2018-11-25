"use-strict";
const log = require('debug')('info');
const get = require('./nameGetter');

async function main() {
    let names = await get.names();
    log(JSON.stringify(names, null, 2));
}

main();