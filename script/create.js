/*
 * @Author: maggot-code
 * @Date: 2020-12-24 12:42:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-01-04 16:59:39
 * @Description: file content
 */
// 👍🚀👏🔥
const path = require('path');
const fs = require('fs');

const package = require('../package.json');
const chalk = require('chalk');
const semver = require('semver');
const inquirer = require('inquirer');
const validateProjectName = require('validate-npm-package-name');
const { cd, exec } = require('shelljs');

const { copyTemplate } = require('../template/copyTemplate');
const { updateCabala } = require('./updateCabala');
const { shellRun } = require('./utils');

async function create(type, projectName, options) {
    // 友好提示
    console.log(chalk.green(`Wait for check ${chalk.yellow('@hanserena/cabala-cli')} version ... (。-ω-)zzz\r\n`));

    const onLineVersion = shellRun(`npm view @hanserena/cabala-cli version`);
    if (!semver.satisfies(package.version, onLineVersion)) {
        // 检查版本需要更新
        console.log(chalk.yellow(`
            Local @hanserena/cabala-cli version ${chalk.red(package.version)}
            Find new version ${chalk.green(onLineVersion)}
            o(╥﹏╥)o
        `));
        // 提示是否更新
        const { ok } = await inquirer.prompt([
            {
                name: "ok",
                type: "confirm",
                message: `You can update ${chalk.yellow('@hanserena/cabala-cli')} version to ${chalk.red(package.version)} => ${chalk.green(onLineVersion)} ?`
            }
        ])
        if (!ok) {
            return Promise.reject(chalk.yellow(`You cancel (^_−)☆`));
        } else {
            updateCabala();
        }
    } else {
        // 检查是否存在该模板
        if (package.template.indexOf(type) === -1) {
            const typeList = package.template.map(item => `${item}\r`);
            return Promise.reject(`You choice type => "${chalk.yellow(type)}" is Not found o(╥﹏╥)o \ntype select:
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
            console.error(`(O_o)?? Invalid project name is: ${chalk.red(name)}`);
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
            return Promise.reject(`${chalk.yellow(cwd)} exist ${chalk.red(`"${name}"`)} dir! o(╥﹏╥)o`);
        } else {
            const { ok } = await inquirer.prompt([
                {
                    name: "ok",
                    type: "confirm",
                    message: `✨ You confirm dir create ${chalk.green(`${type} template`)} "${name}" ?`
                }
            ])
            if (!ok) {
                return Promise.reject(chalk.yellow(`You cancel (^_−)☆`))
            } else {
                return copyTemplate(type, targetDir).then(res => {
                    console.log(res);
                    console.log(`You can into ${chalk.yellow(targetDir)} execute "${chalk.green('npm install')}"\r`);
                }).catch(error => error)
            }
        }
    }
}

module.exports = (type, projectName, ...args) => {
    return create(type, projectName, ...args).catch(error => {
        console.error(error);
        process.exit(1);
    })
}