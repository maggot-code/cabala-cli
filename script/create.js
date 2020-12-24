/*
 * @Author: maggot-code
 * @Date: 2020-12-24 12:42:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2020-12-25 00:20:45
 * @Description: file content
 */
const path = require('path');
const fs = require('fs');

const templateType = require('../package.json').template;
const chalk = require('chalk');
const inquirer = require('inquirer');
const validateProjectName = require('validate-npm-package-name');

async function create(type, projectName, options) {
    // 检查是否存在该模板
    if (templateType.indexOf(type) === -1) {
        const typeList = templateType.map(item => `${item}\r`);
        return Promise.reject(`${chalk.red(`${chalk.yellow(type)} type is Not found`)} \nyou can type:
            ${chalk.green(typeList.join(' '))}`);
    }

    // 获取node进程的工作目录
    const cwd = process.cwd();

    // 判断是否是当前目录
    const inCurrentDir = projectName === '.';

    // 获取项目名(当前目录 or 指定的项目名)
    const name = inCurrentDir ? path.relative('../', cwd) : projectName;

    // 真正的目录地址
    const targetDir = path.resolve(cwd, projectName);

    // 校验项目名(包名)是否合法
    const validateResult = validateProjectName(name);
    if (!validateResult.validForNewPackages) {
        // 打印出错误以及警告
        console.error(chalk.red(`Invalid project name: "${name}"`));
        validateResult.errors &&
            validateResult.errors.forEach(error => {
                console.error(chalk.red.dim(`Error: ${error}`));
            });
        validateResult.warnings &&
            validateResult.warnings.forEach(warn => {
                console.error(chalk.yellow.dim(`Warning: ${warn}`));
            });
        process.exit(1);
    }

    /**
     * @step1 判断目录是否存在
     * @step2 如果存在 -> 中止程序，提示用户
     * @step3 如果不存在 -> 创建目录 -> copy模板到该目录下
     * @step4 copy模板到该目录下
     * @step5 安装成功！友好提示
     */
    if (fs.existsSync(targetDir)) {
        return Promise.reject(chalk.red(`${chalk.yellow(cwd)} exist "${name}" dir!`));
    } else {
        const { ok } = await inquirer.prompt([
            {
                name: "ok",
                type: "confirm",
                message: `You confirm dir create ${chalk.green(`${type} template`)} "${name}" ?`
            }
        ])
        if (!ok) {
            return Promise.reject(chalk.yellow(`You cancel`))
        } else {
            console.log('copy to');
            return Promise.resolve('success');
        }
    }
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