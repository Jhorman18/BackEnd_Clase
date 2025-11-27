# Documentación del proyecto BackEnd

Este proyecto es un servidor backend básico que implementa endpoints para manejar usuarios mediante Express y Prisma.

- Prerequisitos https://github.com/Jhorman18/servidorNodejsPrismaORM

## Tabla de Contenidos
1. [Descripción del proyecto](#descripción-del-proyecto)
2. [Prisma: conceptos y métodos](#prisma:-conceptos-y-métodos)
3. [Métodos HTTP y ejemplo de uso](#métodos-http-y-ejemplo-de-uso)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Controladores: lógica de negocio](#controladores:-lógica-de-negocio)
6. [Rutas: manejo de los endpoints](#rutas:-manejo-de-los-endpoints)
7. [Servidor principal: configuración y rutas](#servidor-principal:-configuración-y-rutas)
8. [Uso práctico con Postman](#uso-práctico-con-postman)
9. [Instalación y configuración](#instalación-y-configuración)

---

## Descripción del proyecto

Este servidor utiliza **Express** como framework backend y **Prisma** para interactuar con una base de datos MySQL. Los endpoints permiten:

- Crear nuevos usuarios (`POST /usuarios`)
- Consultar la lista completa de usuarios (`GET /usuarios`)

### Requerimientos
1. Node.js y npm instalados.
2. Base de datos MySQL.
3. Variables de entorno, como la URL de la base de datos, en `.env`:
   ```
   DATABASE_URL="mysql://user:password@host:port/database"
   ```

## Prisma: conceptos y métodos

**Prisma** es una herramienta de base de datos que simplifica las consultas mediante métodos como:
- **`findMany`**: Devuelve todos los registros que cumplen con una condición.
- **`findUnique`**: Busca un registro único basado en una clave única (por ejemplo, un `id` o un correo único).
- **`create`**: Crea un nuevo registro en la base de datos.
- **`delete`**: Elimina un registro.
- **`update`**: Actualiza un registro existente.

Estos métodos se pueden usar en **controladores** para gestionar las operaciones de CRUD (Create, Read, Update, Delete) con la base de datos.

---

## Métodos HTTP y ejemplo de uso

**Los tipos de peticiones HTTP que se pueden manejar son:**
- `GET`: Para obtener datos (ejemplo: leer usuarios).
- `POST`: Para enviar datos y crear nuevos registros (ejemplo: crear usuarios).
- `PUT`: Para actualizar registros existentes.
- `DELETE`: Para eliminar registros.

En este proyecto utilizamos:
- `GET /usuarios`: Devuelve todos los usuarios registrados en la base de datos.
- `POST /usuarios`: Crea un nuevo usuario con los datos proporcionados.

---

## Estructura del proyecto

```
/ruta-del-proyecto
│
├── prisma/               # Configuración de Prisma
│   ├── schema.prisma     # Esquema de la base de datos
│
├── src/                  # Carpeta principal
│   ├── app.js            # Configuración del servidor
│   ├── controllers/      # Carpeta de controladores
│   │   └── usuarioController.js
│   ├── routes/           # Carpeta de rutas
│   │   └── usuarioRoutes.js
│   └── prisma/           # Singleton del cliente Prisma
│       └── client.js
│
└── package.json          # Dependencias y scripts
```

---

## Controladores: lógica de negocio

Los controladores se encargan de la interacción con la base de datos **Prisma**. Contiene métodos reutilizables que encapsulan la lógica de negocio.

Archivo: `src/controllers/usuarioController.js`

- **`crearUsuario(data)`**:
  - Crea un usuario nuevo en la base de datos.
  - Valida que los datos como el correo y la contraseña estén presentes.
  - Hashea la contraseña utilizando `bcrypt` para mayor seguridad.

- **`obtenerUsuarios()`**:
  - Recupera todos los registros de usuarios de la base de datos.
  - Retorna un arreglo de objetos JSON con los usuarios encontrados.

Prisma se utiliza con métodos como `prisma.usuario.findMany` o `prisma.usuario.create`, según sea necesario.

---

## Rutas: manejo de los endpoints

Las rutas del proyecto son archivos donde se definen los **endpoints** mediante Express. Cada ruta está asociada a un controlador que maneja la lógica de negocio.

Archivo: `src/routes/usuarioRoutes.js`

- **`POST /usuarios`**:
  - Controlador: `crearUsuario(req.body)`
  - Proceso:
    1. Recibe datos del cliente en la petición.
    2. Llama al controlador `crearUsuario`.
    3. Devuelve el usuario creado en la respuesta.

- **`GET /usuarios`**:
  - Controlador: `obtenerUsuarios()`
  - Proceso:
    1. Llama al controlador `obtenerUsuarios`.
    2. Devuelve la lista de usuarios en formato JSON.

---

## Servidor principal: configuración y rutas

Archivo: `src/app.js`

Este archivo configura el servidor de Express y define las rutas principales:
- Usa `app.use` para incluir middlewares.
- Usa los endpoints definidos en `/routes/usuarioRoutes.js`.

Ejemplo de configuración:
```javascript
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes);
```

Ejecuta el servidor en el puerto 3000:
```javascript
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
```

---

## Uso práctico con Postman

### Descarga Postman
Puedes descargar e instalar Postman desde este enlace: [Descargar Postman](https://www.postman.com/downloads/)

### Probar los endpoints

1. **Abrir Postman**:
   - Ir al espacio de trabajo.
   - Hacer clic en el botón `+` para crear una nueva solicitud (`request`).

2. **Especificar el tipo de petición**:
   - Para crear un usuario, selecciona `POST`.
   - Para obtener los usuarios, selecciona `GET`.

3. **Escribir la URL**:
   - Usar `http://localhost:3000/usuarios` como dirección base.

4. **Configuración en caso de `POST`**:
   - Ir a la pestaña `Body` > seleccionar `raw` > y elegir `JSON` como formato.
   - Ejemplo de cuerpo JSON para `POST /usuarios`:
     ```json
     {
       "usuNombres": "Juan Perez",
       "usuCorreo": "juan@example.com",
       "usuTelefono": "3214567890",
       "usuPassword": "123456"
     }
     ```

### Ejemplos:
1. **Probar `GET /usuarios`**:
   - Método: `GET`
   - URL: `http://localhost:3000/usuarios`
   - Resultado esperado: Lista de usuarios en formato JSON.

2. **Probar `POST /usuarios`**:
   - Método: `POST`
   - URL: `http://localhost:3000/usuarios`
   - Body (JSON):
     ```json
     {
       "usuNombres": "Carlos Ramirez",
       "usuCorreo": "carlos@example.com",
       "usuTelefono": "1234567890",
       "usuPassword": "securePass123"
     }
     ```
   - Resultado esperado: Usuario creado con código `201`.

---

## Instalación y configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/usuario/BackEnd_Clase.git
   cd BackEnd_Clase
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Configurar la base de datos**:
   - Crear un archivo `.env` en la raíz del proyecto con la URL de tu base de datos.

4. **Iniciar el servidor**:
   ```bash
   npm start
   ```

¡Listo! Ahora puedes probar los endpoints con Postman.
