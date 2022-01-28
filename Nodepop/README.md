# Nodepop

To start the application use:

```sh
npm install
```

In production:

```sh
npm start
```

In development:

```sh
npm run dev
```

## Inicializar la BD

Para inicializar la BD al estado inicial, se puede usar el comando:

```sh
npm run initdb
```

***ATENCIÓN*** - Esto borrará todos los datos de la BD y cargará el estado inicial.   

## Métodos del API

El API se accede en /api

Lista de anuncios:

- /api/anuncios

Filtros:
- http://localhost:3000/api/anuncios/?nombre='Bicicleta'&precio=230.15

Paginación:
- http://localhost:3000/api/anuncios/?skip=4&limit=2

Eligiendo que campos quiero:
- http://localhost:3000/api/anuncios/?select=nombre -_id precio

Ordenación:
- http://localhost:3000/api/anuncios/?sort=nombre precio


Buscar un anuncio por ID:

- /api/anuncios/:id

Crear un anuncio:

- POST /api/anuncios

Eliminar un anuncio:

- DELETE /api/anuncios/:id