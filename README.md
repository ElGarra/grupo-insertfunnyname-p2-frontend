# FindHomy Client

## Guía de instalación


Se debe clonar este repositorio al sistema de archivos local, usando

```bash
git clone git@github.com:IIC2513-2021-1/grupo-insertfunnyname-p2-backend.git
```

Posteriormente, se deben instalar las dependencias del proyecto, usando

```bash
yarn install
```

Es altamente recomendable ejecutar al mismo tiempo el backend, para poder acceder a todas las funcionalidades que ofrece la aplicación. Para esto, referirse a la guía de instalación de la API. Si el backend se encuentra ejecutándose, se debe crear un archivo `.env.local` en la raíz de este repositorio, que contenga la url a la API, de la siguiente manera: 

```bash
REACT_APP_BACKEND_URL=http://localhost:5000
```


La aplicación se puede ejecutar en modo "development" usando el comando 

```bash
yarn start
```


Una ventana del navegador debería abrirse automáticamente para mostrar la aplicación en React. Generalmente, se ejecuta en la url `http://localhost:3000`

## Link para acceder a producción para acceder a la App:
https://adoring-hamilton-a871be.netlify.app

## Manual de uso

Los usuarios pueden vender, arrendar o comprar propiedades usando FindHomy. Dentro de esta app se permite comunicación entre un usuario interesado en una propiedad con el vendedor. El vendedor incluye una descripción de su propiedad, tamaño, etc que será visible para cualquier usuario, no sólo los que no hayan hecho login. No obstante, estos visitantes no podrán hacer comentarios, crear reuniones con los vendedores o reportar a un usuario. 

Al momento que un usuario decida publicar una propiedad, éste tiene la opción de subir las imagenes de la propiedad. 

Finalmente, se pueden hacer comentarios de las propiedades por usuarios inscritos en la app, en caso de que un usuario publique un comentario inapropiado, otro usuario tiene la posibilidad de reportar a dicho usuario. El admin va a revisar estos reportes y decidir que acción se va a tomar. 



## Pruebas de Aceptación

*Nota: cuando se dice "luego de un tiempo", se refiere generalmente al tiempo de respuesta de la API (hosteada en heroku). La primera respuesta es muy probable que sea la más lenta (ya que se saca el dyno del estado durmiente). Las respuestas subsiguientes deberían ser casi instantáneas.*

### FH01: Registro de usuarios

Pasos:
- Ingresar a la aplicación en la ruta base (`/`)
- En la esquina superior derecha del navbar, seleccionar el botón que dice **SIGN UP**. Se dirigirá a la ruta `/signup`.
- Completar el formulario desplegado con los datos pedidos (First Name, Last Name, Email, Password, Password confirmation), y marcar la casilla aceptando los términos y condiciones.
- **Nota:** la aplicación está ligada a un mailer, y se envía un correo a la dirección ingresada, por lo que idealmente no se debe ingresar correos "al azar" que puedan parecer reales. Se recomienda usar un correo real que se posea, o algún correo desechable (e.g. 10 minute mail).
- Presionar el botón de **SUBMIT** del form.
- Luego de un tiempo, aparecerá un mensaje comunicando al usuario que se creó el usuario.


### FH02: Inicio de sesión

Pasos:
- Ingresar a la aplicación en la ruta base (`/`)
- En la esquina superior derecha del navbar, seleccionar el botón que dice **LOGIN**. Se dirigirá a la ruta `/login`.
- Completar el formulario desplegado con los datos pedidos (Email y password). Se puede crear un usuario nuevo con los pasos de **FH01** si no se tienen credenciales.
- Presionar el botón de **SUBMIT** del form.
- Luego de un tiempo, se redirigirá al usuario a la ruta base, con la sesión ya iniciada (comprobable por el cambio de los botones del navbar, y la habilitación de las funcionalidades que no son accesibles como visita).
- **Nota:** existen dos tipos de usuario que comparten el Signup, los "normales", y los admins, de los cuales se hablará más tarde.


### FH03: Visualizar información de usuario

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- En la esquina superior derecha del navbar, seleccionar el botón que dice **MY PROFILE**. Se dirigirá a la ruta `/profile`.
- En esta vista se despliega la información del usuario (Foto, nombre, email, fecha de registro en FindHomy)

### FH04: Editar información de usuario

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- En la esquina superior derecha del navbar, seleccionar el botón que dice **MY PROFILE**. Se dirigirá a la ruta `/profile`.
- Seleccionar el botón **EDIT PROFILE** que aparece bajo la información del usuario. Se abrirá un form en ese mismo lugar.
- Cambiar los campos que se deseen.
- Una vez hechos los cambios deseados, presionar el botón **SUBMIT** del form.
- Luego de un tiempo, aparecerá un mensaje comunicando al usuario que se modificó el usuario. Además, se actualizará automáticamente la información del usuario (exceptuando la foto).

### FH05: Visualizar información de propiedades

Pasos:
- Ingresar a la aplicación en la ruta base (`/`)
- Presionar el botón grande que aparece cerca del centro de la pantalla, que dice **BROWSE OUR PROPERTIES**. Se dirigirá a la ruta `/properties`.
- Luego de un tiempo, se desplegarán todas las properties que se ofrecen en FindHomy, con un resumen de su información.

### FH06: Publicar una nueva propiedad

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar a la ruta `/properties` (ver **FH05**).
- Seleccionar el botón **CREATE PROPERTY** que aparece al inicio de la lista, antes de que empiecen las properties. Se abrirá un form en ese mismo lugar.
- Rellenar los campos solicitados.
- Presionar el botón **SUBMIT** del form.
- Luego de un tiempo, se redirigirá al usuario a la vista que muestra la información de la nueva propiedad creada.

### FH07: Visualizar detalles de una propiedad

Pasos:
- Ingresar a la ruta `/properties` (ver **FH05**).
- Luego de cargadas las properties, clickear la imagen de alguna property de la cual se desee ver sus detalles. Se redirigirá al usuario a la vista que muestra los detalles de esta property, con la ruta `/properties/:propertyId`.
- Luego de un tiempo, se mostrarán todos los detalles de la property en pantalla.

### FH08: Editar detalles de una propiedad

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar a la ruta `/properties` (ver **FH05**).
- Seleccionar una propiedad que el usuario de la sesión haya creado/publicado (ver **FH07**). En su defecto, crear publicar una property nueva (ver **FH06**).
- Una vez en la ruta `/properties/:propertyId`, se mostrarán todos los detalles de la property en pantalla. Si además el usuario creó/publicó esa property, aparecerá el botón **EDIT PROPERTY** bajo los detalles.
- Presionar el botón **EDIT PROPERTY**. Se abrirá un form en ese mismo lugar.
- Cambiar los campos que se deseen.
- Una vez hechos los cambios deseados, presionar el botón **SUBMIT** del form.
- Luego de un tiempo, aparecerá un mensaje comunicando al usuario que se modificó la property. Además, se actualizará automáticamente la información de la property (exceptuando la foto).

### FH09: Eliminar una propiedad

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar al detalle de una propiedad que el usuario de la sesión haya creado/publicado (ver **FH07**).
- Una vez en la ruta `/properties/:propertyId`, se mostrarán todos los detalles de la property en pantalla. Si además el usuario creó/publicó esa property, aparecerá el botón **DELETE PROPERTY** bajo los detalles.
- Presionar el botón **DELETE PROPERTY**.
- Luego de un tiempo, se eliminará la property, y se redirigirá al usuario al índice de properties (`/properties`).

### FH10: Crear una reunión virtual para visitar una propiedad

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar al detalle de una propiedad que el usuario de la sesión **NO** haya creado/publicado (ver **FH07**).
- Una vez en la ruta `/properties/:propertyId`, se mostrarán todos los detalles de la property en pantalla. Aparecerá el botón **BOOK MEETING** bajo los detalles.
- Presionar el botón **BOOK MEETING**. Se abrirá un form en ese mismo lugar.
- Rellenar los campos solicitados, siendo *type = remote* una reunión virtual.
- Presionar el botón **SUBMIT** del form.
- Luego de un tiempo, aparecerá un mensaje comunicando al usuario que se creó satisfactoriamente la reunión/meeting.

### FH11: Visualizar reuniones de una propiedad

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar al detalle de una propiedad que el usuario de la sesión haya creado/publicado (ver **FH07**).
- Una vez en la ruta `/properties/:propertyId`, se mostrarán todos los detalles de la property en pantalla. Si además el usuario creó/publicó esa property, aparecerá la sección de meetings bajo los detalles y los botones para editar/borrar la property.
- Si no hay ninguna meeting agendada para esta property, se mostrará el mensaje "There are no meetings to show".
- En caso de que si haya meetings agendadas, se mostrará una lista con el resumen de los detalles de la reunión.

### FH12: Visualizar reuniones del usuario

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar al perfil del usuario (ver **FH03**).
- Una vez en la ruta `/profile`, aparecerá la sección de meetings bajo los detalles del perfil y el botón para editar.
- Si no hay ninguna meeting agendada para el usuario, se mostrará un mensaje avisándolo.
- En caso de que si haya meetings agendadas, se mostrará una lista con el resumen de los detalles de la reunión, similar a la del punto **FH11**.
- **Nota:** los tipos de meeting se separan en dos, las *seller meeting*, y las *buyer meeting*, en donde el usuario vende una propiedad, y donde la compra, respectivamente.

### FH13: Visualizar comentarios de una propiedad

Pasos:
- Ingresar al detalle de una propiedad cualquiera (ver **FH07**).
- Los comentarios se muestran bajo los detalles de la propiedad.
- Si no hay ningún comentario para la property, se mostrará un mensaje avisándolo.
- En caso de que si hayan comentarios, se mostraran en formato lista de cards, con su creador y contenido respectivo.

### FH14: Crear un comentario de una propiedad

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar al detalle de una propiedad cualquiera (ver **FH07**).
- Al final de la vista, y bajo la sección de comentarios (ver **FH13**), se encuentra el form para crear un comentario para la propiedad.
- Rellenar el campo pedido (body).
- Presionar el botón **SUBMIT** del form.
- Luego de un tiempo, aparecerá un mensaje comunicando al usuario que se creó satisfactoriamente el comentario.
- Para visualizar el comentario en la página, se debe salir y volver a entrar de la vista (como por ejemplo, presionando el botón hacia atras y luego hacia a delante, o refrescando la página).

### FH15: Eliminar un comentario de una propiedad

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar al detalle de una propiedad cualquiera (ver **FH07**).
- Encontrar la sección de comentarios (ver **FH13**). Si alguno de los comentarios publicados corresponde a alguno creado por el usuario, se verá junto a este el botón de **DELETE COMMENT**.
- Si no se encuentra ningún comentario propio, se puede crear uno nuevo (ver **FH 14**).
- Presionar el botón **DELETE COMMENT**.
- Desaparecerá el comentario de la lista, indicando que se borró.

### FH16: Editar un comentario de una propiedad

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar al detalle de una propiedad cualquiera (ver **FH07**).
- Encontrar la sección de comentarios (ver **FH13**). Si alguno de los comentarios publicados corresponde a alguno creado por el usuario, se verá junto a este el botón de **EDIT COMMENT**.
- Si no se encuentra ningún comentario propio, se puede crear uno nuevo (ver **FH 14**).
- Presionar el botón **EDIT COMMENT**. Se abrirá un form en ese mismo lugar.
- Modificar el campo deseado (body).
- Presionar el botón **SUBMIT**.
- Luego de un tiempo, se mostrará un mensaje indicando que se actualizó el comentario, y sus datos se modificarán inmediatamente.

### FH17: Visualizar detalles de una reunión

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Revisar el listado de meetings que tiene el usuario o alguna de sus propiedades (ver **FH11** y **FH12**).
- En el listado de propiedades, al lado de cada una aparece el botón **DETAILS**.
- Presionar el botón **DETAILS**. Se redirigirá a la vista del detalle de la meeting, con ruta `/meetings/:meetingId`.

### FH18: Editar detalles de una reunión

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Entrar a la vista del detalle de alguna meeting (ver **FH17**).
- Abajo de la información de la reunión, se muestra el botón **EDIT MEETING**.
- Presionar el botón **EDIT MEETING**. Se abrirá un form en ese mismo lugar.
- Modificar los campos deseados.
- Presionar el botón **SUBMIT**.
- Luego de un tiempo, se mostrará un mensaje indicando que se actualizó la reunión, y sus datos se modificarán inmediatamente.

*Enunciado se salta FH19*

### FH20: Eliminar una reunión

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Entrar a la vista del detalle de alguna meeting (ver **FH17**).
- Abajo de la información de la reunión, se muestra el botón **DELETE MEETING**.
- Presionar el botón **DELETE MEETING**. 
- Luego de un tiempo, se redirigirá al usuario a la página anterior, para indicar que se ha borrado. No aparecerá en el listado.

### FH21: Crear un reporte sobre otro usuario

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar al detalle de una propiedad cualquiera (ver **FH07**).
- Justo al lado del botón **BOOK MEETING**, se encuentra el botón **REPORT POSTER USER**, que reporta al usuario que creó la property (no aparecerá el botón si es que la property fue creada por el mismo usuario).
- Además, en la sección de los comentarios, para cada comentario no hecho por el usuario logeado existe el botón **REPORT USER**, que permite reportar directamente al usuario que creó el comentario.
- Al presionar **REPORT POSTER USER** o **REPORT USER**, se abrirá un modal que contiene un form.
- Rellenar el campo pedido (razón del reporte), y presionar **SUBMIT**.
- Luego de un tiempo, se mostrará un mensaje indicando que se realizó el reporte de usuario.

### FH22: Crear un reporte sobre un comentario

Pasos:
- Haber iniciado sesión con un usuario (ver **FH02**).
- Ingresar al detalle de una propiedad cualquiera (ver **FH07**).
- En la sección de los comentarios, para cada comentario no hecho por el usuario logeado existe el botón **REPORT COMMENT**, que permite reportar el comentario.
- Al presionar **REPORT COMMENT**, se abrirá un modal que contiene un form.
- Rellenar el campo pedido (razón del reporte), y presionar **SUBMIT**.
- Luego de un tiempo, se mostrará un mensaje indicando que se realizó el reporte de comentario.

### FH23: Obtener reportes

Pasos:
- Iniciar sesión con una cuenta de admin, en el mismo formulario de **FH02**.
- **Nota:** a diferencia de los usuarios normales, los admins no se pueden crear, si no que vienen precreados en la base de datos.
- En la esquina superior derecha, si se encuentra en una cuenta de admin, aparecerá el botón **ADMIN PANEL**.
- Presionar botón **ADMIN PANEL**, se redirigirá a `/admin`.
- Luego de un tiempo, se muestran todos los reportes, en dos tablas, una para reports de comentarios, y otra para reports de usuarios.

### FH24: Eliminar usuario

Pasos:
- Acceder a vista de reportes con una cuenta de admin (ver **FH23**)
- Ver tabla de reportes de usuario.
- Cada fila de esta tabla tiene un botón que permite eliminar al usuario que ha sido reportado.
- Presionar botón **DELETE USER**.
- Se borrará la fila (y todas las otras que contengan reportes al mismo usuario), indicando que se borró la cuenta del usuario.

### FH25: Eliminar propiedad

Pasos:
- Estar logeado con una cuenta de tipo admin
- Acceder al detalle de una property cualquiera (ver **FH07**)
- Bajo los detalles de la propiedad, se encuentra el botón **DELETE PROPERTY**, que permite borrar la propiedad, muy similar al botón que posee el creador de la propiedad.
- Al presionar **DELETE PROPERTY**, se devuelve al usuario al índice de las properties, indicando que se ha borrado la property

### FH26: Eliminar comentario

Pasos:
- Acceder a vista de reportes con una cuenta de admin (ver **FH23**)
- Ver tabla de reportes de comentarios.
- Cada fila de esta tabla tiene un botón que permite eliminar al comentario que ha sido reportado.
- Presionar botón **DELETE COMMENT**.
- Se borrará la fila (y todas las otras que contengan reportes al mismo comentario), indicando que se borró el comentario específico.

### FH27: Manejo de accessos
En nuestra aplicación, se bloquea el acceso a las vistas/funcionalidades a los usuarios que no tienen el permiso correspondiente para estar en una vista o realizar una acción.

Ejemplos comprobables:
- Cuando un usuario no está logeado (visita), los forms y acciones que están presentes para los usuarios logeados (como comentar, reportar, agendar, etc) no están presentes. Por ejemplo, al entrar a la vista de una propiedad y ver los comentarios, no se puede crear un nuevo (no está presente el form)
- Cuando un usuario está logeado, no puede acceder a rutas que no le corresponden, como por ejemplo, borrar/editar una property que no le corresponde (notar que los botones se "cambian" por agendar una meeting y reportar la property, que en este caso no le corresponderían a un usuario que es dueño de la property).
- La vista de admin está completamente protegida, y cuando un usuario no logeado o no admin intenta acceder a esta vista, se le impide el acceso. A su vez, los admins no pueden realizar acciones que son características para los usuarios logeados, como ver su perfil.

Notar que los accesos también se manejan en el backend por medio de la token, por lo que se agrega una segunda capa de seguridad.

### FH28: Manejo de formularios

Todos los formularios implementados para esta entrega utilizan validaciones en el cliente (además de las validaciones preexistentes en el servidor). Esto se puede comprobar en varios lugares, como por ejemplo, al intentar crear una property colocando campos requeridos en blanco (como el título), o al no colocar la fecha al agendar una meeting. Al hacer submit de algo incorrecto, se muestran mensajes descriptivos al cliente de qué es lo que anda mal con la información actual.

Los formularios fueron implementados con Formik, que ayuda a crear fields controlados de manera simple, y usando Yup para las validaciones de los inputs del usuario.

*Nota: hay ciertas validaciones que no se pueden realizar en el frontend, como por ejemplo, comprobar que el correo no exista anteriormente al crear una cuenta. Esto se hace en el lado del servidor.*



### FUNCIONALIDAD EXTRA: FILTROS DE PROPERTIES

Pasos:
- Acceder a la vista de properties `/properties` (ver **FH05**).
- Al inicio de la vista, hay una "barra de búsqueda", y dos dropdowns que representan los filtros.
- Se puede "filtrar" por las siguientes opciones:
 - Por el tipo de listing "sale" o "rent" (venta o arriendo, respectivamente)
 - Por el tipo de property "house", "farm", "office", etc.
 - Por palabras que puedan aparecer en el título de la property o en la dirección.
- Los filtros descritos anteriormente se complementan entre sí
- Las properties se actualizan instantáneamente al ir escribiendo o modificando los filtros.

