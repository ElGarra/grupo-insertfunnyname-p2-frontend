# Uso de la App

## Guía de instalación
Para instalar esta app localmente, sólamente se debe ejecutar el comando `yarn install`, para instalar todas las dependencias que el proyecto requiere. Posterior a esto, la aplicación se puede ejecutar en ambiente de desarrollo usando el comando `yarn start`, lo cual abre automáticamente una ventana en http://localhost:3000. Para acceder a todas las funcionalidades de esta aplicación en ambiente local, se debe también ejecutar el backend. Para esto, referirse a la guía de instalación en el repositorio respectivo. Para "conectar" al backend, solo hay que colocar la `url`, generalmente http://localhost:5000, en el archivo .env, o en un archivo .env.local (que debe crearse), con la variable de entorno `REACT_APP_BACKEND_URL`.


## El link para acceder a la App:
https://adoring-hamilton-a871be.netlify.app

## Funcionalidades:
Los usuarios pueden vender, arrendar o comprar propiedades usando FindHomy. Dentro de esta app se permite comunicación entre un usuario interesado en una propiedad con el vendedor. El vendedor incluye una descripción de su propiedad, tamaño, etc que será visible para cualquier usuario, no sólo los que no hayan hecho login. No obstante, estos visitantes no podrán hacer comentarios, crear reuniones con los vendedores o reportar a un usuario. 

Al momento que un usuario decida publicar una propiedad, éste tiene la opción de subir las imagenes de la propiedad. 

Finalmente, se pueden hacer comentarios de las propiedades por usuarios inscritos en la app, en caso de que un usuario publique un comentario inapropiado, otro usuario tiene la posibilidad de reportar a dicho usuario. El admin va a revisar estos reportes y decidir que acción se va a tomar. 



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


