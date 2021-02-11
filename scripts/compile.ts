import ts from 'typescript'
import glob from 'glob'
import path from 'path'
import util from 'util'
import * as fs from 'fs-extra'
import { exec } from 'child_process'

const globAsync = util.promisify(glob)
const execAsync = util.promisify(exec)
const cwd = process.cwd()

const tsConfigFileName = ts.findConfigFile(cwd, ts.sys.fileExists, 'tsconfig.json')
const tsConfigFile = ts.readConfigFile(tsConfigFileName!, ts.sys.readFile)
const tsCompilerOptions = ts.parseJsonConfigFileContent(tsConfigFile.config, ts.sys, './')

compile()

async function compile() {
  const allFiles = await globAsync('./+(apps|courses)/**/*')
  const tsFiles: string[] = []
  const outDir = cwd // path.join(cwd, 'compiled')

  // Compile TypeScript files and copy everything else into a `compiled` directory
  for (let file of allFiles) {
    if (
      ['.ts', '.tsx'].includes(path.extname(file)) &&
      // We don't want to compile files in the TypeScript elective course
      !file.includes(path.join('courses/electives/typescript'))
    ) {
      tsFiles.push(file)
    } else {
      // await fs.copy(file, path.join(outDir, path.relative(cwd, file)))
    }
  }

  await compileTypeScript(tsFiles, {
    ...tsCompilerOptions.options,
    allowJs: false,
    noEmit: false,
    noEmitOnError: false,
    declaration: false,
    strict: false,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.Preserve,
    resolveJsonModule: false,
    removeComments: false,
    outDir,
  })

  // TS`s jsx setting is set to `preserve` to prevent compiling JSX to React.createElement.
  // TS names uses .jsx for those files, and we want to rename them to .js
  await renameJsxFileExtensions(outDir)

  // await execAsync(`prettier --write ${path.relative(cwd, 'apps')}`)
  // await execAsync(`prettier --write ${path.relative(cwd, 'courses')}`)
  console.log('end')
}

async function compileTypeScript(fileNames: string[], options: ts.CompilerOptions) {
  let program = ts.createProgram(fileNames, options)
  let emitResult = program.emit()
  let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)

  for (let diagnostic of allDiagnostics) {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!)
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`)
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
    }
  }

  // let outDir = program.getCompilerOptions().outDir!
  // for (let inputFile of fileNames) {
  //   await removeDuplicateSourceFile(outDir, path.relative(cwd, inputFile))
  // }

  let exitCode = emitResult.emitSkipped ? 1 : 0
  return exitCode
}

async function removeDuplicateSourceFile(outDir: string, relativeFilePath: string) {
  const duplicateSourceFile = path.join(outDir, relativeFilePath)
  if (await fileExists(duplicateSourceFile)) {
    await fs.remove(duplicateSourceFile)
  }
}

async function fileExists(filePath: string) {
  return new Promise((res) => {
    fs.access(filePath, fs.constants.F_OK, (err) => res(!err))
  })
}

async function renameJsxFileExtensions(rootPath: string) {
  const files = await globAsync(`${rootPath}/**/*.jsx`)
  for (const file of files) {
    const fileParts = path.parse(file)
    await fs.rename(file, path.join(fileParts.dir, `${fileParts.name}.js`))
  }
}
