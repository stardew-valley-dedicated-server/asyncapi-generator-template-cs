<h1 align="center">AsyncAPI Generator Template - C# WebSocket</h1>

<p align="center">
  <em>
    This is a C# Websocket Messages and Client template for the
    [AsyncAPI generator](https://github.com/asyncapi/generator) 
  </em>
</p>

This template is for generating a TypeScript Nuxt3 Websocket Client based on your AsyncAPI 3.0.0 document.

Have you found a bug or have an idea for improvement? Feel free to contribute!
See [the contribution guidelines](#Contributing) for how to do so.

# How to use

Example use-cases can be found in our [tests](./test).

Information about the generated files and a description can be found under [the documentation folder](./docs/general.md).

## Requirements

* @asyncapi/generator >=1.17.25 <2.0.0

Install the generator through [npm or run it from docker official installer](https://github.com/asyncapi/generator#install).

## Template Parameters

These are the available template parameters:

| Parameter | Type | Description |
| - | - | - |
| output | String | The output directory needs to be passed to be passed to the templates. Add the following to the CLI when generating your code `-p output=path/to/output`. |

## Features

* Generates strongly typed message as interfaces.
* Generates strongly typed client as Nuxt3 composable.

## Restrictions

* Only works in Nuxt3 during client-side rendering
