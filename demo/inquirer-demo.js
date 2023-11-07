import {
    select,
    input,
    checkbox,
    expand,
    confirm,
    password,
} from '@inquirer/prompts';
import treeify from 'treeify'
import chalk from 'chalk'
const run = async () => {
    const answers = {
        input: await input({
            message: 'Inquirer Input',
            validate(input) {
                if (!input) return false;
                return true;
            }
        }),
        select: await select({
            message: 'Inquirer Select',
            choices: [{
                name: 'npm',
                value: 'npm',
                description: 'npm description ....'
            }, {
                name: 'pnpm',
                value: 'pnpm',
                description: 'pnpm description ....'
            }, {
                name: 'yarn',
                value: 'yarn',
                description: 'yarn description ....'
            }]
        }),
        checkbox: await checkbox({
            message: 'Inquirer Checkbox',
            choices: [{
                name: 'npm',
                value: 'npm',
                description: 'npm description ....'
            }, {
                name: 'pnpm',
                value: 'pnpm',
                description: 'pnpm description ....'
            }, {
                name: 'yarn',
                value: 'yarn',
                description: 'yarn description ....'
            }]
        }),
        expand: await expand({
            message: 'Inquirer Expand',
            choices: [{
                    key: 'y',
                    name: 'Overwrite',
                    value: 'overwrite',
                },
                {
                    key: 'a',
                    name: 'Overwrite this one and all next',
                    value: 'overwrite_all',
                },
                {
                    key: 'd',
                    name: 'Show diff',
                    value: 'diff',
                },
                {
                    key: 'x',
                    name: 'Abort',
                    value: 'abort',
                },
            ],
        }),
        confirm: await confirm({
            message: 'Inquirer Confirm',
        }),
        password: await password({
            message: 'Inquirer Password',
        }),

    }
    // console.log(chalk.blueBright('-----------Result------------'))
    // console.log(chalk.blueBright(treeify.asTree(answers)))
    // console.log(chalk.blueBright('-----------Result------------'))
    console.log(answers)
}

run();