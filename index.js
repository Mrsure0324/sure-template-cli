#!/usr/bin/env node

import figlet from 'figlet'
import chalk from 'chalk'
import { Command } from 'commander'
import microGenerator from './actions/microGenerator.js'
const init = () => {
    console.log(
        chalk.greenBright(
            figlet.textSync('SURE CLI RUNNING', {
                // font: "",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
}

const run = () => {

    init();

    const program = new Command();
    
    program.version('0.0.1', '-v, --vers', '查看版本号');

    program
        .command('generator')
        .alias('gen')
        .description('启动微生成器')
        .action(() => {
            microGenerator();
        });

    program.parse();
};

run();