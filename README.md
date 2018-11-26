# create-es-module
Helper to create es module

## Creating a module

`Yarn`:
``` 
yarn create es-module my-module
```
`NPM`:
```
npm init es-module my-module
```
`NPX`:
```
npx create-es-module my-module
```

It will create `my-module` folder with the default structure.

## Build
`yarn build` or `npm run build`
Builds the module for production to the `build` folder.

## Test
`yarn test` or `npm test`

## Publish
It will publish the module to `npm`.
By default files in `build` folder is whitelisted to be included in the package. 
For more information about list of files in the package visit https://docs.npmjs.com/files/package.json#files.

## Add `flow`
You need to add `flow-bin` as dev dependency and run `init` command.
```
yarn add flow-bin --dev
npx flow --init
```

## Add `react` and use JSX  
You need to add `react` as dependency
```
yarn add react
```

## What’s Included?
- React, JSX, ES6 and Flow syntax support.
- Unit test
- module build and cjs build

## 

## TODO
- make react optional

## Credits
Credit to [create-react-app](https://github.com/facebook/create-react-app).

## License
MIT
