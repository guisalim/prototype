# Unity Prototype - client
## Folders Architecture
Below, a quick description of each one of the main files and folders within our project structure.

```js
prototype
├── .vscode
│   └── launch.json

├── node_modules
├── public
├── src
│   ├── _actions
│   ├── _api
│   ├── _config
│   ├── _models
│   ├── components
│   ├── features
│   ├── structure
│   ├── index.js

├── jsconfig.json
├── package.json
└── yarn.lock
```


### :open_file_folder: `src/` - Let's dive into React :rocket:
client is bult using React Redux architecture. This sections aims to describe each one of the folders and files used.
<br/>In order to have a better visual of the folders structure, all folders starting with underscore(`_`) are responsible for settings or state management, others starting without underscore are responsible for UI-only.

| Folder/File Name     |     Type                 | Description 
|       ---            |    :---:                 |      ---    
| _actions             | :open_file_folder:Folder | Refers to all redux actions creators and reducers, which will be responsible for manage the state of the appliation and request data from the server
| _api             | :open_file_folder:Folder | Refers to all endpoints that are used by the prototype<br/>- It used [`axios`](https://github.com/axios/axios) as default http request library
| _config             | :open_file_folder:Folder | Refers to all settings files. These settings files includes constants and the redux store setup.
| _models             | :open_file_folder:Folder | Refers to all prototype object models such as Game.
| componets     | :open_file_folder:Folder | Refers to all default components that are used within the application.<br/>- We use [Material-UI](https://material-ui.com/) as component library to create a initial structure. 
| features              | :open_file_folder:Folder | Refers to all main features.<br/>- Features are considered workflows expected and used by the user, such as the Form and the List of games, etc.
| structure             | :open_file_folder:Folder | Refers to the application skeleton.
|`index.js`             | :page_facing_up:File     | Entry point for the react application.


#### Components Archiitecture - Make it clean! :triangular_ruler:
In order to have components with clean code and architecture, our components are mostly divided by 3 differernt files that will be seen like this:

```js
any_parernt_folder_within_src
├── component_folder
|   ├── component.js
|   ├── container.js
|   └── index.js
```

1. **Component** file: Components are the UI itself (or Presentation Components), should be considered only what is related to the view of the component, such as html elements, css, js-in-css, styled-components and javascript code that handles the view, but not the state/context of the component.
2. **Contaner** file: Containers are all javascript code that handles the state/context of the component - it means: business rules for the component.
3. **Index** file: Entry point of the component. Webpack always looks for a `index.js` file within a folder when it is imported somewherer in your code.


## Acknowledgements
### Project Development
This project was build from scratch using the [Create React App](https://github.com/facebook/create-react-app) boilerplate.

### Packages included
This project include a few packages to support a better developement:
  * [Redux](https://redux.js.org) for client-side context management
  * [Material-UI](https://material-ui.com/) for default UI components
  * [Axios](https://github.com/axios/axios) for http requests management

## License 
This project is licensed under the terms of the MIT license.

## Contribution
Fell free to send suggestion or pull requests to improve this project.