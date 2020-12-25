/*
 * @Author: maggot-code
 * @Date: 2020-12-24 10:05:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2020-12-26 01:22:01
 * @Description: file content
 */
const chalk = require('chalk');
const semver = require('semver');

const checkNodeVersion = (needFile, checkName) => {
    // 检查node版本是否符合要求范围
    if (!semver.satisfies(process.version, needFile)) {
        console.log(`
            use ${chalk.yellow(checkName)}\r
            need node version : ${chalk.green(needFile)}\r
            local node version : ${chalk.red(process.version)}\r\n
            o(╥﹏╥)o
        `);
        return false;
    } else {
        return true;
    }
}

module.exports = {
    checkNodeVersion
}