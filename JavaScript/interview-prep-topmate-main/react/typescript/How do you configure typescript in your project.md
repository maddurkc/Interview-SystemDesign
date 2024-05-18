## Configure in Typescript

### 1. Install TypeScript
```js
npm install --save-dev typescript
```

### 2. Initialize a TypeScript Project
- After installing TypeScript, **you need to initialize a new TypeScript project by generating a `tsconfig.json` file**, which is the TypeScript configuration file. 
- This file <ins>***specifies the root files and the compiler options***</ins> required to compile the project.

```js
// This command creates a tsconfig.json file with default settings, which you can customize for your project.
npx tsc --init
```

### 3. Configure tsconfig.json

- ##### The tsconfig.json file controls how TypeScript compiles your code. Here are some common configurations you might adjust:

```ts
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

- **target**: Set the ECMAScript target version (e.g., es5, es6, es2017).
- **module**: Specify the module code generation method (e.g., commonjs, es6, umd).
- **strict**: Enable all strict type-checking options.
- **outDir**: Specify an output directory for all emitted files.
- **rootDir**: Specify the root directory of input files. Use to control the output directory structure with outDir.
- **noImplicitAny**: Raise an error on expressions and declarations with an implied any type.
- **moduleResolution**: Determine how modules get resolved. Can be node for Node.js-style resolution, or classic.

### 4. Scripts (if webpack already installed in your project)

```js
{
  "scripts": {
    "start": "webpack serve --port 3000",
    "build": "set NODE_ENV=production && webpack"
  }
  ...
}
```

**More details**: https://dev.to/alekseiberezkin/setting-up-react-typescript-app-without-create-react-app-oph
