# 3 x Pokemon with Next.js
## CSR, SSR and SSG with Next.js

This is a fork of [Jack Herrington's Pokemon Next Three Ways](https://github.com/jherr/pokemon-next-three-ways)  with addition of TypeScript and updated/cleaned dependencies. It provides 3 example projects for a web application that is

 - **C**lient **S**ide **R**endered
 - **S**erver **S**ide **R**endered
 - using **S**tatic **S**ite **G**eneration

## Running dev

 1. `cd` into the folder you would like to run
 2. Run `yarn install`
 3. Run `yarn dev`
 4. Access [http://localhost:3000/](http://localhost:3000/)
 5. **Keep in mind that you will not see benefits of SSR or SSG running in development mode, every page is pre-rendered on each request**

## Building
 1. Run `yarn install`
 2. Run `yarn build`
 3. Run `yarn start`

 ## Deploying
1. Run `amplify configure`
2. Run `amplify init`
```
? Enter a name for the project: SSGPokemonNextJS
? Enter a name for the environment: dev
? Choose your default editor: Visual Studio Code (or your preferred editor)
? Choose the type of app that youre building: javascript
? What javascript framework are you using: react
? Source Directory Path: src
? Distribution Directory Path: out
? Build Command: yarn build
? Start Command: yarn start
? Do you want to use an AWS profile? Y
? Please choose the profile you want to use: <your profile>
```
3. Run `amplify add hosting`
```
? Select the plugin module to execute: Hosting with Amplify Console
? Choose a type: Manual deployment
```
4. Deploy app with `amplify publish`


The URL for the app should be displayed in your terminal.

