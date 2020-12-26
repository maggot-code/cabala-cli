/*
 * @Author: maggot-code
 * @Date: 2020-12-24 23:30:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2020-12-27 01:27:27
 * @Description: file content
 */
const chalk = require('chalk');
const download = require('download-git-repo');

const templateAddress = require('../package.json').templateAddress;

const copyTemplate = (type, targetDir) => {
    if (!templateAddress[type]) {
        console.log(`"${chalk.green(type)}" template address is can't find! o(╥﹏╥)o`);
        process.exit(1);
    }

    // 开始下载，友好提示
    console.log(`✨ copy ${chalk.green(type)} template to ${chalk.yellow(targetDir)}, please wait...\r`);

    return new Promise((resolve, reject) => {
        download(templateAddress[type].download, targetDir, { clone: false }, err => {
            if (err) {
                return reject(`
                    Failed fetching remote git repo ${chalk.cyan(templateAddress[type].github)}:\r
                    ${err}
                `);
            }

            // rm('-rf', targetDir);
            return resolve(`✨ success ${chalk.green(type)} template (*^▽^*)!\r`);
        });
    })
}

module.exports = {
    copyTemplate
}