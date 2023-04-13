import fs from 'fs'
import path from 'path'

const appPath = `apps/spa`

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
          templateFile: 'utils/plop-component/index.hbs',
        },
      ]

      if (input.styles) {
        actions.push({
          type: 'add',
          path: path.join(appPath, '{{name}}/{{name}}.module.scss'),
          templateFile: 'utils/plop-component/scss.hbs',
        })
        actions.push({
          type: 'add',
          path: path.join(appPath, '{{name}}/{{name}}.tsx'),
          templateFile: 'utils/plop-component/component-with-scss.hbs',
        })
      } else {
        actions.push({
          type: 'add',
          path: path.join(appPath, '{{name}}/{{name}}.tsx'),
          templateFile: 'utils/plop-component/component.hbs',
        })
      }

      return actions
    },
  })
}
