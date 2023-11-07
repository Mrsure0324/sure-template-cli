#!/usr/bin/env node
import { Command } from 'commander'
import chalk from 'chalk'
const program = new Command();
program.parse(process.argv);
const pkgs = program?.args
pkgs.forEach(pkg => {
    console.log(chalk.yellowBright('[Update Package] ',pkg))
});