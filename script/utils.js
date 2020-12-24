/*
 * @Author: maggot-code
 * @Date: 2020-12-24 12:04:14
 * @LastEditors: maggot-code
 * @LastEditTime: 2020-12-24 12:19:17
 * @Description: file content
 */
const chalk = require('chalk');

const lowercase = str => {
    return str.toLocaleLowerCase();
}

const checkCommandLength = (argvLen, maxArgvLens) => {
    if (argvLen > maxArgvLens) {
        console.log(
            chalk.yellow('warning：input null and void，so give up')
        );
    }
}

module.exports = {
    lowercase,
    checkCommandLength
}