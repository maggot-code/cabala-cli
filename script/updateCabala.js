/*
 * @Author: maggot-code
 * @Date: 2020-12-26 01:37:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2020-12-27 02:05:29
 * @Description: file content
 */
const chalk = require('chalk');
const { shellRun } = require('./utils');
const updateCabala = () => {
    console.log(`✨ update "${chalk.green('@hanserena/cabala-cli')}" ...`);
    console.log(shellRun('npm update @hanserena/cabala-cli -g'));
    console.log('✨ update success!');
    console.log(shellRun(`cabala -v`));
    console.log(shellRun(`cabala`));
    process.exit(1);
}
module.exports = {
    updateCabala
}