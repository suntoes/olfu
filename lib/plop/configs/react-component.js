module.exports = {
    name: 'react-component',
    config: {
        description: 'Adds a new react component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the component?',
            },
            {
                type: 'list',
                name: 'htmlTag',
                message: 'What is the base HTML element of the component?',
                choices: [
                    'div',
                    'article',
                    'section',
                    'p',
                    'span',
                    'ol',
                    'li',
                    'button',
                    'label',
                    'input',
                    'textarea',
                    'form',
                    'header',
                    'nav',
                    'footer',
                    'table',
                    'svg',
                ],
            },
            {
                type: 'input',
                name: 'category',
                message: 'What is the Category of the component?(i.e "Clickable/Button")',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'components/{{category}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'lib/plop/templates/component/base.hbs',
            },
            {
                type: 'add',
                path: 'components/{{category}}/{{pascalCase name}}/{{pascalCase name}}Styles.scss',
                templateFile: 'lib/plop/templates/component/style.hbs',
                onComplete: 'npm run barrel-component',
            },
            {
                type: 'add',
                path: 'lib/types/components/{{category}}/{{pascalCase name}}Props.ts',
                templateFile: 'lib/plop/templates/component/type.hbs',
                onComplete: 'npm run barrel-types',
            },
        ],
    },
}
