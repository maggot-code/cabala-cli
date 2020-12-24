/*
 * @Author: maggot-code
 * @Date: 2020-12-24 12:42:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2020-12-24 13:21:02
 * @Description: file content
 */
const templateType = require('../package.json').template;
const chalk = require('chalk');

async function create(type, projectName, options) {
    // 检查是否存在该模板
    if (templateType.indexOf(type) === -1) {
        const typeList = templateType.map(item => `${item}\r`);
        return Promise.reject(`${chalk.red(`${chalk.yellow(type)} type is Not found`)} \nyou can type:
            ${chalk.green(typeList.join(' '))}`);
    }

    // 获取node进程的工作目录
    const cwd = process.cwd();
    console.log(cwd);
    return Promise.resolve('success');
}

module.exports = (type, projectName, ...args) => {
    return create(type, projectName, ...args).then(res => {
        console.log(res);
        process.exit(1);
    }).catch(error => {
        console.error(error);
        process.exit(1);
    })
}