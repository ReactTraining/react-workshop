import path from 'path'

const appPath = path.join('react', '_full-app')

export default function create(plop) {
  // controller generator
  plop.setGenerator('Component', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component Name',
      },
      {
        type: 'confirm',
        name: 'styles',
        message: 'Add SCSS Module?',
      },
    ],
    actions: (input) => {
      const actions = [
        {
          type: 'add',
          path: path.join(appPath, '{{name}}/index.ts'),
          templateFile: 'scripts/plop-component/index.hbs',
        },
      ]

      if (input.styles) {
        actions.push({
          type: 'add',
          path: path.join(appPath, '{{name}}/{{name}}.module.scss'),
          templateFile: 'scripts/plop-component/scss.hbs',
        })
        actions.push({
          type: 'add',
          path: path.join(appPath, '{{name}}/{{name}}.tsx'),
          templateFile: 'scripts/plop-component/component-with-scss.hbs',
        })
      } else {
        actions.push({
          type: 'add',
          path: path.join(appPath, '{{name}}/{{name}}.tsx'),
          templateFile: 'scripts/plop-component/component.hbs',
        })
      }

      return actions
    },
  })
}
