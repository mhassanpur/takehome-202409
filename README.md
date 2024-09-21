# takehome-202409
Instawork: Take-home Assignment (Sep 2024)

## Dependencies

This project depends on the following tools and frameworks:
 - Docker
 - Server:
    - Python v3.11
    - Django v5
    - Django REST Framework v3
    - sqlite3
 - Client:
    - Node v20
    - React v18
    - pnpm

## Getting Started

### Docker Compose

The easiest way to run the project is to use `docker compose` at the project's top-level directory:
```
docker compose up -d --build
```

This will build and run both the server and client images locally. Afterwards, you'll be able to access the server
and client at the following locations:
 - Server: `http://localhost:8000`
 - Client: `http://localhost:5173`

 ### Running the Server and Client without Docker

 It is possible to run both the server and client without Docker Compose, but it requires a bit more configuration and
 management of dependencies. See the sections below for details.

## Server

The server code resides in the `server/` directory and follows the convention for Django projects. It consists of a
Django project named `iwtakehome` as well as an app named `teammembers`.

The project deviates from default Django settings in the following ways:
 - `djangorestframework_camel_case` is used to provide camelCase JSON keys in the REST API.
 - Default pagination is set to `LimitOffsetPagination` with a default page size of 10.

Once the server is running in development mode, you may navigate to `http://localhost:8000` to explore the API
endpoints.

Note: The `docker-compose.yml` file is configured such that most changes to server or client code can be hot-reloaded
without re-building the docker images. The only exception to this is when making changes to project dependencies.

### Running the Server with Python and Virtualenv

Aside from Docker Compose, the project can be run with `virtualenv` and `python3`. It just requires the following
configuration. This is also recommended for making additional changes to the project, including managing additional
dependencies:

Make sure [python3](https://www.python.org/) and [virtualenv](https://virtualenv.pypa.io/en/latest/) are installed
locally. Then, set up your environment. From the top-level directory:

```
cd server
python3 -m virtualenv venv
source venv/bin/activate
```

To install project dependencies:

```
(venv) pip install -r requirements.txt
```

To initialize the database (sqlite3), run the migrations:

```
(venv) python manage.py migrate
```

To seed the database with some data:

```
(venv) python manage.py loaddata fixtures/data.json
```

Finally, to run the server:

```
(venv) python manage.py runserver 0.0.0.0:8000
```

### Adding new dependencies

To add new dependencies, first install the dependencies in your virtual environment using `pip`. Then run the following
command to save the new dependencies in `requirements.txt`:

```
(venv) pip freeze > requirements.txt
```

## Client

The client code, written primarily in Typescript, resides in the `client/` directory and follows the convention for
Vite React projects. The `pnpm` package manager is used to in lieu of `npm` due to its optimizations.

The following major libraries are used in the front-end code:
 - Node v20
 - `react` v18
 - `@mui/material` v5
 - `react-redux`
 - `@reduxjs/toolkit` (aka RTK)
 - `react-hook-forms`
 - `yup` (client-side form validation)

Once the client is running in development mode, you may navigate to `http://localhost:5173` to view the application UI.

### Running the Client with Node and pnpm

Aside from Docker Compose, the client can be run locally with Node and a package manager, such as pnpm. Make sure both
[node](https://nodejs.org/en) and [pnpm](https://pnpm.io/) are installed.

Use `pnpm` to install and use the latest version of Node v20:

```
cd client
pnpm env use --global 20
```

Then, install the project dependencies:

```
pnpm i
```

To build the project and check for issues:

```
pnpm build
```

To run the project locally:

```
pnpm dev
```

### Adding new dependencies

Use `pnpm` to add new dependencies to the project. For example, to add new packages as direct dependencies:

```
pnpm add <package>
```

Similarly, to add development dependencies:

```
pnpm add -D <package>
```