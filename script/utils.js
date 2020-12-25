/*
 * @Author: maggot-code
 * @Date: 2020-12-24 12:04:14
 * @LastEditors: maggot-code
 * @LastEditTime: 2020-12-25 23:51:17
 * @Description: file content
 */
const chalk = require('chalk');
const { exec } = require('shelljs');

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

const shellRun = (shell) => {
    return exec(shell, { silent: true }).stdout;
}

module.exports = {
    lowercase,
    checkCommandLength,
    shellRun
}