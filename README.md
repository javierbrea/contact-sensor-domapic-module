# Contact Sensor Domapic Module

> Domapic module for handling a contact sensor

[![Build status][travisci-image]][travisci-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Quality Gate][quality-gate-image]][quality-gate-url] [![js-standard-style][standard-image]][standard-url]

[![NPM dependencies][npm-dependencies-image]][npm-dependencies-url] [![Last commit][last-commit-image]][last-commit-url] [![Last release][release-image]][release-url]

[![NPM downloads][npm-downloads-image]][npm-downloads-url] [![License][license-image]][license-url]

---

## Intro

This package starts a Domapic Module with an ability called "contactSensor" that handles a GPIO in "in" mode. It is intended to be used in a Raspberry Pi or any other system supporting the [onoff][onoff-url] library, such as C.H.I.P. or BeagleBone.

It can be used alone, but also can be connected to a [Domapic Controller][domapic-controller-url] to get the most out of it.

![Contact sensor connection schema][contact-sensor-schema-image]

## Installation

```bash
npm i contact-sensor-domapic-module -g
```

## Usage

```bash
domapic-contact-sensor start --gpio=12 --debounce=3000 --reverse=false --save
```

The server will be started in background using [pm2][pm2-url].

To display logs, type:

```bash
domapic-contact-sensor logs #--lines=300
```

## Options

The module, apart of all common [domapic services options][domapic-service-options-url], provides custom options for configuring the sensor:

* `gpio` - Number defining the Gpio where the contact sensor to be controlled is connected.
* `debounce` - Time in miliseconds to wait for before notifying about a change in the status of the contact sensor.
* `reverse` - If `true`, the value of the gpio will be inverted when emitting event or returning state. Default is `false` (returns `true` when contact sensor detects contact, and `false` when not)

## Connection with Domapic Controller

Connect the module with a Domapic Controller providing the Controller url and connection token (you'll find it the Controller logs when it is started):

```bash
domapic-contact-sensor start --controller=http://192.168.1.110:3000 --controllerApiKey=fo--controller-api-key
```

Now, the module can be controlled through the Controller interface, or installed plugins.

## Stand alone usage

Domapic modules are intended to be used through Domapic Controller, but can be used as an stand-alone service as well. Follow next instructions to use the built-in api by your own:

### Rest API

When the server is started, you can browse to the provided Swagger interface to get all the info about the api resources.  Apart of all api methods common to all [Domapic Services][domapic-service-url], the server provides one [_Domapic Ability_][domapic-service-abilities-url] for getting the state of the sensor, which generates one extra API resource:

* `/api/abilities/contact-sensor/state` - Returns the current state of the sensor.

### Authentication

The server includes the [Domapic Services][domapic-service-url] authentication method, which is disabled by default for `127.0.0.1`.
You can disable the authentication using the `--authDisabled` option (not recommended if your server is being exposed to the Internet). Read more about [available options in the domapic services documentation][domapic-service-options-url].

If you want to authenticate when requesting from another IPs, look for the api key automatically generated and intended to be used by Domapic Controller when the server is started. You'll find it in the server logs:

```
-----------------------------------------------------------------
Try adding connection from Controller, using the next service Api Key: HMl6GHWr7foowxM40CB6tQPuXt3zc7zE
-----------------------------------------------------------------
```

To make your own requests to the api, provide this token using the `X-Api-Key` header.

Use the mentioned api key also for authenticating when using the Swagger interface.

## Alternative command line methods

### Not global installation

If the package is not installed globally, you can replace the `domapic-contact-sensor` command in examples above by `npm run domapic-contact-sensor --` (commands must be executed inside the package folder in that case)

### Not background mode

If you don't want to use the built-in background runner, you can start the server directly, attaching logs to current `stdout`. Move to the package folder and replace the `domapic-contact-sensor` command of examples above by `node server.js`. Press `CTRL+C` to stop the server.


[coveralls-image]: https://coveralls.io/repos/github/javierbrea/contact-sensor-domapic-module/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/javierbrea/contact-sensor-domapic-module
[travisci-image]: https://travis-ci.com/javierbrea/contact-sensor-domapic-module.svg?branch=master
[travisci-url]: https://travis-ci.com/javierbrea/contact-sensor-domapic-module
[last-commit-image]: https://img.shields.io/github/last-commit/javierbrea/contact-sensor-domapic-module.svg
[last-commit-url]: https://github.com/javierbrea/contact-sensor-domapic-module/commits
[license-image]: https://img.shields.io/npm/l/contact-sensor-domapic-module.svg
[license-url]: https://github.com/javierbrea/contact-sensor-domapic-module/blob/master/LICENSE
[npm-downloads-image]: https://img.shields.io/npm/dm/contact-sensor-domapic-module.svg
[npm-downloads-url]: https://www.npmjs.com/package/contact-sensor-domapic-module
[npm-dependencies-image]: https://img.shields.io/david/javierbrea/contact-sensor-domapic-module.svg
[npm-dependencies-url]: https://david-dm.org/javierbrea/contact-sensor-domapic-module
[quality-gate-image]: https://sonarcloud.io/api/project_badges/measure?project=contact-sensor-domapic-module&metric=alert_status
[quality-gate-url]: https://sonarcloud.io/dashboard?id=contact-sensor-domapic-module
[release-image]: https://img.shields.io/github/release-date/javierbrea/contact-sensor-domapic-module.svg
[release-url]: https://github.com/javierbrea/contact-sensor-domapic-module/releases
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/

[onoff-url]: https://www.npmjs.com/package/onoff
[domapic-controller-url]: https://www.npmjs.com/package/domapic-controller
[domapic-service-options-url]: https://github.com/domapic/domapic-service#options
[domapic-service-abilities-url]: https://github.com/domapic/domapic-service#abilities
[domapic-service-url]: https://github.com/domapic/domapic-service
[pm2-url]: http://pm2.keymetrics.io/

[contact-sensor-schema-image]: http://domapic.com/assets/contact-sensor/fritz_schema.png

