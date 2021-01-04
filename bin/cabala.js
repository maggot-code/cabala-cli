#! /usr/bin/env node

/*
 * @Author: maggot-code
 * @Date: 2020-12-24 09:28:43
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-01-04 17:05:29
 * @Description: file content
 */

const { program } = require('commander'); // 命令行工具
const package = require('../package.json');
const create = require('../script/create');
const { lowercase, checkCommandLength } = require('../script/utils');
const { checkNodeVersion } = require('../script/checkNodeVersion');

const nodeVersion = checkNodeVersion(package.engines.node, '@hanserena/cabala-cli');
if (!nodeVersion) {
    // 退出进程
    process.exit(1);
}

program.version(package.version, '-v, --version').usage('<command> [options]');

// 构建目录
program.command('new <type> <project-name>')
    .description('new project from a type')
    .action((type, projectName, cmd) => {
        checkCommandLength(process.argv.length, 5)
        create(lowercase(type), projectName, cmd)
    })

// 输出模板列表
program.command('type')
    .description('show cabala type list')
    .action(() => {
        const typeList = package.template.map(item => `${item}\r`);
        console.log(typeList.join(' '));
    })

program.parse(process.argv)

// 输入easy显示帮助信息
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
