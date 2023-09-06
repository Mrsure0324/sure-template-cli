#!/usr/bin/env node
import { select, input, checkbox } from '@inquirer/prompts';
import createInfoFormat from '../utils/createInfoFormat.js'
import mkdir from '../utils/mkdir.js'
import chalk from 'chalk'
import Mustache from 'mustache'
import fs from 'fs'
const root = process.cwd();
export default async () => {

    const action = await select({
        message: '请选择要执行的动作',
        choices: [
            {
                name: 'Create Some Template In Your Project',
                value: 'create',
                description: '生成模版',
            },
            {
                name: 'Insert Some Code Fragment In Your Project',
                value: 'insert',
                description: '插入代码片段',
            },
        ],
    });

    if(action === 'create') {

        const pageType = await select({
            message: '请选择模版类型',
            choices: [
                {
                    name: 'Page Curd',
                    value: 'PageCurd',
                    description: '【tsx】 包含 Search Table',
                },
                {
                    name: 'Page Normal',
                    value: 'page-normal',
                    description: '【tsx】空模板',
                },
            ],
        });

        const templateConfig = await import(`${root}/modules/templates/${pageType}/.template.js`)
        const modules = templateConfig?.default?.modules;
        const info = {
            name: await input({
                message: '请输入项目名称（英文）【！！建议大驼峰！！】', 
                validate(input){
                    if(input) {
                        return true
                    }else {
                        return false
                    }
                }
            }),
            nameZh: await input({
                message: '请输入项目名称（中文）【用于pageTitle等】',
                validate(input){
                    if(input) {
                        return true
                    }else {
                        return false
                    }
                }
            }),
            modules: await checkbox({
                message: '请选择需要创建的模块',
                choices: modules.map(el => {
                    return {
                        name: el?.name,
                        value: el?.name,
                        description: el?.description,
                    }
                }),
                validate(list){
                    if(list && list?.length > 0) {
                        return true
                    }else {
                        return false
                    }
                }
            })
        }

        //参数解析
        const createInfo = createInfoFormat(info);
        if(createInfo) {
            console.log(chalk.greenBright.bold('========= 参数解析 成功 ========='))
            console.log(createInfo)
        } else {
            console.log(chalk.red('【Error:】参数解析 失败'))
            console.log(createInfo)
            // return 
        }
        

        //模版解析      
        
        const path = `${root}/modules/templates/${pageType}/${templateConfig.default.resolve}`;

        let template = null;
        try {
            console.log(chalk.greenBright.bold('========= 模版解析 成功 ========='))
            template = await fs.readFileSync(path, 'utf8');
        } catch(err) {
            console.log(chalk.red('【Error:】文件读取 失败'))
            return console.log(err)
        }

        const output = Mustache.render(template, createInfo);

        // 文件输出
        const outputRoot = `${root}/test`;
        const outputName = createInfo.name;
        const fileName = 'index.tsx';
        const filePath = `${outputRoot}/${outputName}`
        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            await fs.writeFileSync(`${filePath}/${fileName}`, output);
            console.log(chalk.greenBright.bold('========= 文件输出 成功 ========='));
        } catch(err) {
            console.log(chalk.red('【Error:】文件输出 失败'))
            return console.log(err)
        }

        
    } else {
        console.log('功能暂未开放')
    }
}

