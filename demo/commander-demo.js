#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
const run = async () => {
    const program = new Command();

    /********* 版本 **********/ 
    program.version('0.0.1', '-v, --vers', '查看版本号');

    // /********* 命令 **********/ 
    // program
    //     .command('install <pkg...>')
    //     .option('-g, --global','是否全局下载') //single
    //     .alias('i')
    //     .description('下载依赖')
    //     .action((pkgs,opts) => {
    //         console.log(chalk.blueBright('[Target Env] ',opts?.global ? 'global' : 'local'))
            
    //         pkgs.forEach(pkg => {
    //             console.log(chalk.greenBright('[Install Package] ',pkg))
    //         });
    //     });

    

    // /********* 独立克制执行的子命令 **********/ 
    // program
    //     .command('update <pkg...>','更新依赖',{executableFile:'demo-update'})
    //     .alias('u')


    /********* 选项 **********/ 
    // program
    //     //boolean选项
    //     .option('-c, --cool','酷不酷')

    //     //带参选项 第三个参数为默认值
    //     .option('-n, --name <name>','名称','default name') //single

    //     //变长参数
    //     .option('-l, --list <list...>','多个参数') //array

    //     //必填选项
    //     // .requiredOption('-v, --version <type>', '指定版本')

    //     //自定义选项
    //     .option('-num, --number <number>','输入一个数字',(value, dummyPrevious) => {
    //         chalk.blueBright(console.log('===自定义选项 log===',value, dummyPrevious));
    //         return Number(value) + 1
    //     });

    

    program.parse();
    const options = program.opts();
    console.log(options)

}

run();