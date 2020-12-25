/*
 * @Author: maggot-code
 * @Date: 2020-12-26 01:37:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2020-12-26 01:39:06
 * @Description: file content
 */
const { shellRun } = require('./utils');
const updateCabala = () => {
    console.log('正在更新...');
    setTimeout(() => {
        console.log('✨ 更新完成');
        console.log(shellRun(`cabala -v`));
        console.log(shellRun(`cabala`));
    }, 6000);
}
module.exports = {
    updateCabala
}