### Webpack:

**1. Webpack is a module bundler for javascript applications**
**2. Webpack attempts to lighten the developer by doing the following things like:**

- <u>**_part of the development process that handled dependencies on its own_**</u>
- **_we could <u>simply write code in such a way that the build process managed by itself</u> based on only what was necessary in the end?_**
- So webpack attempts to make the build process easier <u>**_by passing dependencies through JavaScript_**</u>.
- In other words: <u>**you don’t write code for webpack. You write code for your project.**</u> And webpack keeps up (with some config).

If you're struggling with any of the following:

- Loading dependencies out of order
- Including **unused** CSS or JS in production
- Accidentally **double-loading** (or triple-loading) **libraries**
- Encountering **scoping issues**—both from CSS and JavaScript
- Finding a good system for using NPM packages in your JavaScript,
- Needing **to optimize asset delivery** better but fearing you’ll break something

Then you could benefit from webpack because it handles all the above effortlessly by letting JS worry about your dependencies and load order.

### Webpack’s Core Philosophy:

Two core philosophies of Webpack are:

1.  Everything is a module- Just like JS files can be "modules", everything else (CSS, Images, HTML) can also be modules.
    i) That is, you can require(“myJSfile.js”) or require(“myCSSfile.css”).
    ii) This mean **_we can split any artifact into smaller manageable pieces, reuse them_** and so on.

<br/>

2.  Load only "what" you need and "when" you need - Typically module bundlers take all the modules and generate a large single output "bundle.js" file.

    i) But in many real world apps, this "bundle.js" could be 10MB-15MB and could take forever to load!
    ii) So Webpack has various features to **split your code** and generate multiple "bundle" files, and also **load parts of the app asynchronously** so that you just load what you need and when you need it.

---

##### Adding webpack to our local project

```js
npm install webpack webpack-cli --save-dev
```

<img src='https://miro.medium.com/v2/resize:fit:1100/format:webp/1*OOKOVAnkJMgUeF_yoYKtrw.jpeg'>

#### **we don’t have any dist folder in our project**, but you will understand "Why" in a moment.

- if we will run `npx webpack ./script` in project folder without any webpack configuration, `dist` folder <u>**_will be created with a new main.js file_**</u> in it.

<img src='https://miro.medium.com/v2/resize:fit:1100/format:webp/1*h2LDPKam6KAdD64y-Gn6ag.jpeg'>

#### Points to remember:

- If you will **place your script file** **inside the /src folder** and **rename scripts file to index.js** -> <u>**_you could run npx webpack command without specifying file path_**</u>.

#### The result would be exactly the same as the previous one: /dist/main.js

<img src='https://miro.medium.com/v2/resize:fit:720/format:webp/1*qq2Zaqw2oWc2KIlKL7PrSA.jpeg'>

---

```js
npm install --save-dev webpack-dev-server
```

- Next, run `npx webpack` with this configuration, so that our bundle was placed inside or root folder:

##### Make app’s bundle file inside the root folder of the app

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*nDuLilq4uipyV7OgQ1ds6g.jpeg">

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Y3_MEvIHx7iSEVGQk30clg.jpeg">

---

### Regenerate bundle on file save

- webpack will automatically regenerate your bundle file each time you will change and save your code:

- you can achieve the same result if you will and **watch: true to the webpack.config.js file**:

---

### After installing webpack-dev-server you can run:

```js
npm install --save-dev webpack-dev-server
```

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*nDuLilq4uipyV7OgQ1ds6g.jpeg">

```js
npx webpack-dev-server
```

```json
// best way is to add a script to the package.json file:
"scripts": {
  ...
  "start:dev": "webpack-dev-server"
},
```

- After running that script `yarn start:dev` your server will start running at http://localhost:8080/ (by default).
- And after changing and saving your file, webpack-dev-server will automatically redeploy new version:

---

### Babel + ES6

```js
npm install -D babel-loader @babel/core @babel/preset-env
```

##### Next, we need to add a babel config file .babelrc in the root of your project with this configuration ( Link to the official @babel/preset-env docs): https://babeljs.io/docs/en/next/babel-preset-env.htm

```js
//webpack.config.js
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.js$/i, //RegEx search for any files that end in .js to be loaded via Babel.
        exclude: [/node_modules/], //you can specify an exclude option to skip certain files.
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['env'] },
          },
        ],
      },

      // Loaders for other file types can go here
    ],
  },
  // …
};
```

---

### Production vs Development builds

- Writing separate webpack configurations for each environment is a recommendation
- “Common” config file should be “used” in dev and prod config files, because they will share that common config (so we would not need to copy-paste config props). For this, we will need to use webpack-merge npm package:

```js
npm install --save-dev webpack-merge
```

**After installing webpack-merge package we will create:**

- webpack.common.js
- webpack.dev.js
- webpack.prod.js

## <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*6N_kGVxiIXycbI6xxYMuJg.jpeg">

```json
//package.json

"scripts": {
  ...
  "build": "webpack --config webpack.prod.js",
  "build:dev": "webpack --config webpack.dev.js",
},
```

<img src="https://www.north-47.com/wp-content/uploads/2019/02/1_WCAdMi04IFEWdngK8bkFcw.png">

### webpack v4+ will minify your code by default in “production mode”.

---

For specifying another config file that our server should use before start:

```js
npx webpack-dev-server --config webpack.common.js
```

---

### Adding HTML file into the build

- Currently, we have `index.html` file in a `/public folder`.
- How can we move it to /build folder during webpack build?
- For this task, **we will need html-webpack-plugin** :

```js
npm install --save-dev html-webpack-plugin
```

##### webpack.common.js

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*9dJrki6J0xp_GpqXYbwQYg.jpeg">

- you can see index.html in a /build folder, is the same copy of index.html in /public folder
- If we set inject:true and Run npx webpack -- config webpack.dev.js

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*mLCI3r1KAuQmNWvQIw5qoQ.jpeg">

##### will add path to our bundle.js file into our "template" — index.html file.

- Path that is injected -> is a combination of output.publicPath and output.filename props in our webpack.commom.js config file.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*s3lsfzyqPijsi6ppNoxksg.jpeg">

---

### CSS + Style Loader

- Now we would like to import a handy reset CSS file to our index.html so that at the beginning all our styles were the same for all browsers (as you know each browser uses their own default styles).

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*XbA3uk8JgCAOubx9zjKGxg.jpeg">

- Remember that **_webpack can only understand JavaScript_**, so we’ll have to install the appropriate loader:

```js
npm install --save-dev css-loader style-loader
yarn add --dev css-loader style-loader
```

##### After that, we should add new configuration to webpack.common.js file:

##### Now, let’s run a new build npx webpack — config webpack.dev.js and see at the results:

```js
//webpack.config.js or webpack.common.js
// Loaders are processed in reverse array order. That means css-loader will run before style-loader.
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // …
    ],
  },
};
```

---

### CSS bundled separately

- We can do that easily by swapping out `style-loader` with `extract-text-webpack-plugin` in our config **without having to change any code**

```js
npm install --save-dev mini-css-extract-plugin
yarn add mini-css-extract-plugin -D
```

```js
const ExtractTextPlugin = require('mini-css-extract-plugin');
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
          ],
        }),
      },

      // …
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true,
    }),
  ],
};
```

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZGvo1ZDenB6ztTKLBREccg.jpeg">

##### Rerun npx webpack — config webpack.prod.js :

- And our final touch would be CSS file minimizing.

```js
npm install --save-dev optimize-css-assets-webpack-plugin
// or
yarn add optimize-css-assets-webpack-plugin -D
```

Rerun `npx webpack — config webpack.prod.js`

---

### Adding assets to the build

```js
npm install --save-dev file-loader
```

And after that, we will need to add a new configuration object to module.rules webpack config:

#### Rerun npx webpack — config webpack.prod.js

```js
"scripts": {
  ...
  "eject": "react-scripts eject"
},

// If you will run it, you will see the whole webpack.config.js file that is used.
```

---

### CSS Modules

- typically works best only if you’re building the DOM with JavaScript, but in essence, it magically scopes your CSS classes to the JavaScript file that loaded it

- If you plan on using it, CSS Modules comes packaged with css-loader

```js
yarn add --dev css-loader
```

```js
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true },
          },
        ],
      },
      // …
    ],
  },
};
```

---

### Sass

```js
yarn add --dev sass-loader node-sass
```

```js
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'], //the order of use is backward, so we’re loading Sass first, followed by our CSS parser, and finally Style loader to load our parsed CSS into the <head> of our page.
      },
      // …
    ],
  },
};
```

---

---

### Working with Multiple Files:

- You can specify any number of entry/output points you wish by modifying only the entry object.

```js
// Multiple files, bundled together
const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['./home.js', './events.js', './vendor.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', //all bundled together as one dist/app.bundle.js file, in array order.
  },
};
```

```js
// Multiple files, multiple outputs
// Alternately, you may choose to bundle multiple JS files to break up parts of your app.
// This will be bundled as 3 files: dist/home.bundle.js, dist/events.bundle.js, and dist/contact.bundle.js.

const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    home: './home.js',
    events: './events.js',
    contact: './contact.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
};
```

#### Vendor Caching:

- If you want to separate your vendor libraries into their own bundle so that users don’t have to re-download your third-party dependencies every time you make a minor app update,
- You can easily do that thanks to webpack’s built-in Commons Chunk Plugin:

```js
const webpack = require('webpack');
module.exports = {
  entry: {
    index: './index.js',
    vendor: ['react', 'react-dom'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', //make sure vendor in CommonsChunkPlugin matches the 'vendor' entry name above, it can be anything as long as it matches an entry key.
      minChunks: Infinity,
    }),
  ],
};
```

- In this, you’re explicitly telling webpack to **use your vendor bundle as a commons chunk** containing your react and react-dom Node Modules for the entire app.
- In larger applications where optimization is key, this can yield better results if you limited your vendor bundle like this.

**Note**:

- By doing this, <u>**you should load vendor before app in your template**</u>. webpack will often emit something like this:

---

### Thinking in Modules

- In order to get the most out of webpack, you’ll have to **think in modules**—small, reusable, self-contained processes that do one thing and one thing well.

```js
└── js/
    └── application.js   // 300KB of spaghetti code
```

```js
└── js/
    ├── components/
    │   ├── button.js
    │   ├── calendar.js
    │   ├── comment.js
    │   ├── modal.js
    │   ├── tab.js
    │   ├── timer.js
    │   ├── video.js
    │   └── wysiwyg.js
    │
    └── index.js  // ~ 1KB of code; imports from ./components/

```

- The result is clean, reusable code.
- Each individual component depends on import-ing its own dependencies, and export-ing what it wants to make public to other modules.
- Pair this with Babel + ES6, and you can utilize JavaScript Classes for great modularity, and don’t-think-about-it scoping that just works.

---

#### Q) What is a bundle in webpack?

- Bundle <u>**_is a output file generated_**</u> by webpack.
- It contains all of the modules which are used in application.
- Bundles **generation process is regulated by** <u>**_webpack config file_**</u>.

---

#### Q) What is a dependency graph and how does webpack build it?

- Any time one when file depends on another, webpack treats this as a dependency.

- <u>_Starting from entry point(s), webpack recursively builds a dependency graph_ that includes every module your application needs</u>, using import and require statements, <u>**_then packages all of those modules into bundle(s)_**</u>

---

#### Q) What is tree shaking?

- Tree shaking is a term used in the JavaScript world to describe **_the process of removing unused code from your final bundle_**.
- This <u>_can be done with a tool like Webpack_</u>, which will analyze your code and remove any unused pieces, <u>resulting in a smaller bundle size</u>.

---

#### Q) What is Hot-Modules-Replacement?

- is webpack feature which <u>allows to update modules in application **without page reload**</u>.

---

#### Q) Difference between NPM vs. Bower vs. Browserify vs. Gulp vs. Grunt vs. Webpack?

- `npm` and `bower` are package managers. **_They just download_** the dependencies and don't know how to build projects on their own.
  <br/>
- <u>They will call webpack/gulp/grunt **_after fetching all the dependencies_**.</u>
  <br/>

- <u>**_Bower builds flattened dependencies trees_**</u> (unlike `npm` which do it <u>**_recursively_**</u>).
  <br/>

- npm fetches the dependencies for each dependency (may fetch the same a few times) while <u>**_bower expects you to manually include sub-dependencies_**</u>.
  <br/>

- `grunt` and `gulp` <u>**_are task runners to automate everything_**</u> that can be automated (i.e compile CSS/Sass, optimize images, make a bundle and minify/transpile it)

  <br/>

- `webpack` (webpack-dev-server): Webpack <u>**_is a build tool that pulls all of your assets, including javascript, images, fonts and CSS in a dependency graph_**</u>

  <br/>

- `browserify` <u>**_allows packaging node modules_**</u> for browsers.

<u>**Points to remember:**</u>

- Sometimes `bower` and `npm` are used together in front end and back-end respectively (since each megabyte might matter on front-end)

  <br/>

- `Grunt` is <u>**_based on configuring separate independent tasks_**</u>, each task opens/handles/closes file.

  <br/>

- `Gulp` <u>**_requires less amount of code and is based on Node streams_**</u>, which allows it to build pipe chains (w/o reopening the same file) and makes it faster.

  <br/>

- `npm/bower` + plugins may replace task runners. Their abilities often intersect so there are different implications if you need to use gulp/grunt over npm + plugins.

- **_<u>Task runners are definitely better for complex tasks</u>_** (on each build create bundle, transpile from ES6 to ES5, run it all browsers emulators, make screenshots and deploy to dropbox through ftp)

- `browserify vs node's require` is actually `AMD vs CommonJS`.

---

### Loaders: <br />

#### Q) What is a loader in webpack?

- Loaders <u>**_are transformations that are applied_**</u> on the <u>source code of a module</u>.

  <br/>

- Loaders <u>**_describe to webpack on how to process non-javascript modules_**</u> and include these dependencies into your bundles

- A loader can refer to a preprocessor such as Sass, or a transpiler such as Babel.
- On NPM, they’re usually named `*-loader` such as `sass-loader` or `babel-loader`.

  <br/>

- <u>**_Webpack supports modules written in a variety of languages and pre-processors_**</u>, via loaders

---

#### Q) Where should loaders be defined?

- in the config's object's rules property

---

#### Q) Explain this code

```js
{
   test: /\.scss$/,
   loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap', 'postcss-loader'],
   exclude: /node_modules/
}

```

- This code is intended **<u>to transform and load SASS files as webpack modules</u>**.
- This config tells to webpack to search for all files <b><u>which have .scss extension from right to left order</u></b>

1. `postcss-loader`- transforms postcss to sass code.
2. `sass-loader` - transforms sass to plain css.
3. `css-loader`- reads css file, resolves import and url(...) statements.
4. `style-loader` - creates `style` tags in the page's `head` element containing css returned by css-loader.

5. `?.sourceMap`- source maps for all .scss files will be created.

---

#### Q) Do loaders work in a synchronous or an asynchronous way?

- **Both**.
- Loaders can work synchronous or asynchronous.

---

#### Q) Is it possible to use multiple loaders in the rules single object?

- Yes, its possible to chain loaders.

---

#### Q) Name loaders you think are very important and helpful

- raw-loader
- url-loader
- html-loader
- file-loader
- style-loader
- css-loader
- script-loader
- babel-loader
- loaders for typescript, coffeescript, less, sass, pug, markdown etc

---

### Plugins: <br />

#### Q) Describe a plugin in webpack

- Plugins used **_to customize webpack’s build process_** in a variety of ways.
- A webpack plugin **_is a JavaScript object that has an apply property_**.
- This **_<u>apply property is called by the webpack compiler</u>_**, giving access to the entire compilation lifecycle.
- Webpack comes with a multiple built-in plugins available under webpack.[plugin-name]

---

#### Q) What is the difference between loader and plugin

<u>**Loader:**</u>

- Loaders do the <u>**pre-processing transformation of virtually any file format**</u> when you use the sth like `require("my-loader!./my-awesome-module")`
- Exposes only one single function to webpack
- not able to influence the actual build process

<u>**Plugins:**</u>

- <u>**_Can deeply integrate into webpack because they can register hooks within webpack build system_**</u> and access and modify the compiler and how it works as well as the compilation.

- Therefore they are powerful but also harder to maintain

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*0pkzmVEIVpVjSnwARB-cwA.png">

---

#### Q) Name some plugins you think are very important and helpful

- **CommonsChunkPlugin**:

  - <u>**_Creates a separate file_**</u> (known as chunk), <u>consisting of common modules shared between multiple entry points.</u>

  <br />

- **DefinePlugin**:
  - <u>allows you to create global constants which can be configured at compile time</u>

<br/>

- **HtmlWebpackPlugin**:

  - <u>**_simplifies creation of HTML files_**</u> to serve your webpack bundles

    <br/>

- **ExtractTextWebpackPlugin**:
  - <u>Extract text from a bundle(s) into a separate file.</u>

<br/>

- **CompressionWebpackPlugin**:
  - <u>Prepare **_compressed versions of assets to serve them with Content-Encoding_**.</u>

---

#### Q) What is the advantage of CompressionPlugin?

- CompressionPlugin builds gzip-ed version of bundles.
- It's possible to simply add server side compression e.g using nginx or express compression plugin.
- Server-side compression is not recommended because it adds load on CPU and increases response time.

---

#### Q) How to move some data (e.g css code) from a bundle to a separate file in webpack?

- using ExtractTextWebpackPlugin.
- It moves all the required \*.css modules in entry chunks into a separate CSS file.
- So your styles are no longer inlined into the JS bundle, but in a separate CSS file (styles.css).
- If your total stylesheet volume is big, it will be faster because the CSS bundle is loaded in parallel to the JS bundle.

#### Q) Is it possible to write your own plugin?

- Yes, its possible to write your own plugin and use plugins written by community.

#### Q) What are some advantages of using webpack-dev-server over simple http server or nginx?

- webpack-dev-server simplifies development process
- Due to **_integrated fast in-memory access to the webpack assets and hot-modules-replacement_** features.

#### Q) How to enable source maps in webpack bundles?

- Using devtool: `‘source-map’`

---

### Optimization

#### Q) Briefly describe long-term caching and how to achieve it using webpack?

- Browsers should cache static assets to save traffic and users time.
- But after each change or bugfix, browser have to download newer version of files.
- The most easy way to achieve this is changing file name.
- It could be buildId or unique hash in the end of file’s name like

```js
app.js?build=1
    app.js?build=2
```

or

```js
app.js.2a6c1fee4b5b0d2c9285.js
  app.js.70b594fe8b07bcedaa98.js
```

##### To achieve this using webpack simple configuration should be done

```js
module.exports = {
    ...
    output: {
     filename: "[name].[hash].js"
    }
    ...
   }

```

#### Q) Which built-in plugin should be used for code minification?

- UglifyJS plugin.

---

#### Q) How to remove unused selectors from css using webpack?

- purifycss-webpack plugin

---

#### Q) webpack CLI Vs webpack-dev-server

- Webpack provides two interfaces

1. Webpack CLI tool - the default interface (installed as part of the Webpack itself)
2. webpack-dev-server tool - we need to install it separately

### Webpack CLI tool (Good for Production Builds)

- This tool **_takes options via CLI and also via a config file_** (default: webpack.config.js) and gives it to the Webpack for bundling.

```js
//Install it locally & add it to package.json
npm install webpack --save
//Add it to package.json's script
“scripts”: {
 “build”: “webpack --config webpack.config.prod.js -p”,
 ...
 }
//Use it by running the following:
"npm run build"
```

### Webpack-dev-server (Good for Development Builds)

- This is an Express node.js server that runs at port 8080. This server internally calls Webpack.
- The benefit of this is that it provides additional capabilities like **reloading the browser** i.e. “Live Reloading” and/or replacing just the changed module i.e “Hot Module Replacement” (HMR).

```js
// Add it to package.json's script

“scripts”: {
 “start”: “webpack-dev-server --inline --hot”,
 ...
 }
// Use it by running
$ npm start
Open browser at:
http://localhost:8080
```

#### Points to remember:

- It’s worth noting that **_some of the options like “inline” and “hot” are webpack-dev-server only_** options. Where as **_some others like “hide-modules” are CLI only_** options.

- The other thing to note is you can pass options to webpack-dev-server in two ways:

1. Through webpack.config.js’s “devServer” object.
2. Through CLI options

```js
//Via CLI
webpack-dev-server --hot --inline
//Via webpack.config.js
devServer: {
 inline: true,
 hot:true
 }
```

Most preferable is to pass options as CLI options within package.json like so:

```js
//package.json
{
scripts:
   {“start”: “webpack-dev-server --hot --inline”}
}
```

#### “hot” Vs “inline” webpack-dev-server options

- “inline” option adds “Live reloading” for the entire page.
- “hot” option enables “Hot Module Reloading” that tries to reload just the component that’s changed (instead of the entire page).
- If we pass both options, then, when the source changes, the webpack-dev-server will try to HMR first. If that doesn’t work, then it will reload the entire page.

```js
//When the source changes, all 3 options generates new bundle but,

//1. doesn't reload the browser page
$ webpack-dev-server


//2. reloads the entire browser page
$ webpack-dev-server --inline


//3. reloads just the module(HMR), or the entire page if HMR fails
$ webpack-dev-server  --inline --hot

```

#### “entry” — String Vs Array Vs Object

- `Entry` tells the Webpack where the root module or the starting point is.
- This can be a String, an Array or an Object. This could confuse you but the different types are used for different purposes.

- Entry tells the webpack where the root module or the starting point is.
- This can be a String, an Array or an Object.
- Different types are used for different purposes.

##### If you have a single starting point (like most apps), you can use any format and the result will be the same

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*OnXpfv4zjL-5zO2Ha6mXDw.png">

---

#### entry — Array

- If you want to **append multiple files that are NOT dependent on each other**, you can use the Array format.

- For example: you may need “googleAnalytics.js” in your HTML. You can tell Webpack to append it to the end of the bundle.js like so:

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*xB51RRC4ik6BBP2lJ90Iuw.png">

---

#### entry — object

- Now, let’s say y**ou have true multi-page application, not a SPA** w/ multi-views, but with multiple HTML files (index.html and profile.html).
- **_You can then tell Webpack to generate multiple bundles at once_** by using <u>entry object.</u>

- The below config will generate two JS files: indexEntry.js and profileEntry.js that you can use in index.html and profile.html respectively.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*xB51RRC4ik6BBP2lJ90Iuw.png">

##### Usage:

```js
//profile.html
<script src=”dist/profileEntry.js”></script>
//index.html
<script src=”dist/indexEntry.js”></script>
```

#### Note: The name of the file comes from the “entry” object’s keys.

---

#### entry — combination

- You can also use the Array type entries inside an entry object.
- For example the below config will generate 3 files: vendor.js that contains three vendor files, an index.js and a profile.js.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*yz76QY1fVzBGKJ-6X6Eleg.png">

---

### output — “path” Vs “publicPath”

- output tells the Webpack where and how to store the resulting files.
- “path” simply tells the Webpack **where it should store the result**.
- “publicPath” is used by several Webpack’s plugins to update the URLs inside CSS, HTML files when generating production builds.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*63Zta4mbC_3o44QdycrD7Q.png">

- For example, in your CSS, you may have a url to load ‘./test.png’ on your localhost.
- But in production, the ‘test.png’ might actually be located at a CDN while your node.js server might be running on Heroku.
- So that means, you’ll have to manually update the URLs in all the files to point to the CDN when running in Production.
- Instead, you can use Webpack’s publicPath and use bunch of plugins that are publicPath-aware to automatically update URLs when generating production builds.

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*aOM5ZF8alWLr4BC0CfZe0w.png">

---

### Loaders And Chaining Loaders

- Loaders are additional node modules that help ‘load’ or ‘import’ files of various types into browser acceptable formats like JS, Stylesheets and so on.

- Further loaders also allow importing such files into JS via “require” or “import” in ES6.
- For example: You can use babel-loader to convert JS written in ES6 to browser acceptable ES5 like so:

```js
module: {
 loaders: [{
  test: /\.js$/, ←Test for ".js" file, if it passes, use the loader
  exclude: /node_modules/, ←Exclude node_modules folder
  loader: ‘babel’ ←use babel (short for ‘babel-loader’)
 }]
```

---

### Chaining Loaders ( works right to left)

- Multiple Loaders can be chained and made to work on the same file type.
- The chaining works from right-to-left and the loader are separated by “!”.
- For example, Let’s say we have a CSS file “myCssFile.css” and we want to dump it’s content into <style>CSS content</style> tag inside our HTML. We can accomplish that using two loaders: css-loader and style-loader.

```js
module: {
 loaders: [{
  test: /\.css$/,
  loader: ‘style!css’ <--(short for style-loader!css-loader)
 }]
```

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*nes9iLmskmsD8Fp4Ek3u-A.png">

- Webpack searches for CSS files dependencies inside the modules. (That is Webpack checks to see if a JS file has “require(myCssFile.css)”)
- If it finds the dependency, then the Webpack gives that file first to the “css-loader”
- css-loader loads all the CSS and CSS’ own dependencies (i.e @import otherCSS) into JSON. Webpack then passes the result to “style-loader”.
- style-loader to take the JSON and add it to a style tag — `<style>CSS contents</style>` and inserts the tag into the index.html file.

---

### Loaders Themselves Can Be Configured

- Loaders themselves can be configured to work differently by passing parameters.
- In the example below, we are configuring url-loader to use DataURLs for images less than 1024 bytes and use URL for images that are larger than 1024 bytes.
- We can do this by passing “limit” parameter in the following two ways:

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*-qVdcA3E8JSdtszxHqfIdA.png">

---

### The .babelrc file

babel-loader uses “presets” configuration to know how to convert ES6 to ES5 and also how to parse React’s JSX to JS.

- We can pass the configuration via “query” parameter like below:

```js
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      },
    },
  ];
}
```

#### However in many projects babel’s configuration can become very large.

- So instead you can keep those them in babel-loader’s configuration file called .babelrc file.
- babel-loader will automatically load the .babelrc file if it exists.

##### So in many examples, you’ll see:

```js
//webpack.config.js
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }
  ]
}

//.bablerc
{
 “presets”: [“react”, “es2015”]
}
```

---

### Plugins

- Plugins are additional node modules that usually work on the resulting bundle.
- For example, `uglifyJSPlugin` takes the bundle.js and minimizes and obfuscates the contents to decrease the file size.
- Similarly `extract-text-webpack-plugin` internally uses css-loader and style-loader to gather all the CSS into one place and finally extracts the result into a separate external styles.css file and includes the link to style.css into index.html

```js
//webpack.config.js
//Take all the .css files, combine their contents and it extract them to a single "styles.css"
var ETP = require("extract-text-webpack-plugin");

module: {
 loaders: [
  {test: /\.css$/, loader:ETP.extract("style-loader","css-loader") }
  ]
},
plugins: [
    new ExtractTextPlugin("styles.css") //Extract to styles.css file
  ]
}
```

- If you want to just inline CSS as a style element into HTML, you can do that without the extract-text-webpack-plugin and by just CSS and Style loaders like below:

```js
module: {
 loaders: [{
  test: /\.css$/,
  loader: ‘style!css’ <--(short for style-loader!css-loader)
 }]

```

---

### Loaders Vs Plugins

- As you might have realized, **Loaders work at the individual file level** during or before the bundle is generated.

- Where as **Plugins work at bundle or chunk level and usually work at the end of the bundle generation process**.

- And some Plugins like `commonsChunksPlugins` go even further and modify how the bundles themselves are created.

---

### Resolving File Extensions

- Many Webpack config files have a resolve extensions property that has an empty string like shown below.

- The empty string is there to help resolve imports without extensions like: require(“./myJSFile”) or import myJSFile from ‘./myJSFile’ without file extensions.

```js
{
 resolve: {
   extensions: [‘’, ‘.js’, ‘.jsx’]
 }
}
```

---

### Enable HMR Method — Via NPM Module

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZOs6q4rBU-z4Twydb3U2IA.png">

---

### A Simple React App

##### In order to enable HMR for CSS and React modules, all you need to do is to add the following loaders.

```js
npm install react-hot-loader --save-dev
npm install style-loader --save-dev
```

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*b1ZsT5kifDjS-8xyrv5rRA.png">

---

### “/hot/only-dev-server” Vs “/hot/dev-server”

- They both are simple JS libraries and provide HMR interface for webpack-dev-server’s client JS(part of WDS) that’s also loaded into the browser

##### You can use just one of them. The main difference is as follows:

1. only-dev-server doesn’t reload the browser upon syntax errors. This is recommended for React apps because it keeps the state.

2. dev-server tries HMR (default). If there is any issue, it reloads the entire browser.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*GFhX4gqYYNW0kJK4Rm8eDQ.png">

### A React App With Backend API calls (proxy)

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*DKdz2Fz5AkMib3vpK8t6BA.png">

### A React App With Backend Server That’s BOTH API AND Web Server

##### The solution is to proxy everything with a “\*” star.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*tfzP054lcZ_7t6E9LVsQ5g.png">

---

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*lQy2FdfWzKv9o1-HoTp6og.png">
