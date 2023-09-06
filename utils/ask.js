import inquirer from 'inquirer'
export default (questions) => {
    return inquirer.prompt(questions);
}