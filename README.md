# openapi-ts-template

## Description

A `Node.js` typescript template with open api implementation 

## Configuration

Use a `.env` at root of the repository to set values for the environment variables defined in [custom-environment-variables.json](./config/custom-environment-variables.json).

| variable         | required |   default   | description                                                                          |
| :--------------- | :------: | :---------: | :----------------------------------------------------------------------------------- |
| PORT             |    N     |   `3000`    | The port for the API to listen on                                                    |
| LOG_LEVEL        |    N     |   `debug`   | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`] |
| ENVIRONMENT_VAR  |    N     |  `example`  | An environment specific variable                                                     |

[default.json](./config/default.json) contains default configuration values.

Alternatively create a `./config/local.json` file to override the values of `default.json`.

## Getting started

```sh
# start dependencies
docker compose up -d
# install packages
npm i
# generate swagger and route files for Open API
npm run build
# start service in dev mode. In order to start in full - npm start"
npm run dev
```

View OpenAPI documentation for all routes with Swagger:

```
localhost:3000/swagger/
```

## Tests

**Unit** and **integration** test are executed by calling the following commands:

```sh
npm run test:integration
npm run test:unit
```
