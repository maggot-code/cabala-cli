/*
 * @Author: maggot-code
 * @Date: 2020-12-24 10:05:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2020-12-24 10:22:05
 * @Description: file content
 */
const chalk = require('chalk');
const semver = require('semver');

const checkNodeVersion = (needFile, checkName) => {
    // 检查node版本是否符合要求范围
    if (!semver.satisfies(process.version, needFile)) {
        console.log(chalk.red(`
            use ${checkName}\r\n
            need node version : ${needFile}\r\n
            now node version : ${process.version}
        `));
        return false;
    }
    return true;
}

module.exports = {
    checkNodeVersion
}