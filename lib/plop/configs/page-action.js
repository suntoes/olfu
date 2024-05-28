module.exports = {
    name: 'page-action',
    config: {
        description: 'Adds a new Page Action',
        prompts: [
            {
                type: 'input',
                name: 'functionName',
                message: 'What is the "function" name?',
            },
            {
                type: 'input',
                name: 'category',
                message: 'What is the Category of the action?(i.e "Clickable/Button")',
            },
            {
                type: 'confirm',
                name: 'needsDatabase',
                message: 'Does the action need the database?',
            },
            {
                type: 'confirm',
                name: 'needsEpic',
                message: 'Does the action need Epic?',
            },
            {
                type: 'confirm',
                name: 'fromForm',
                message: 'Is it a "Form" action?',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'packages/actions/{{category}}/{{pascalCase functionName}}/{{pascalCase functionName}}.ts',
                templateFile: 'templates/action/base.hbs',
            },
            {
                type: 'add',
                path: 'packages/types/Actions/{{category}}/{{pascalCase functionName}}Return.ts',
                templateFile: 'templates/action/type.hbs',
                skip(data) {
                    if (data.fromForm) {
                        // Skip this action
                        return 'Skipped adding custom action type'
                    }
                    return
                },
            },
        ],
    },
}
