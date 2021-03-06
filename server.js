'use strict'

const path = require('path')

const domapic = require('domapic-service')
const gpioIn = require('gpio-in-domapic')

const pluginConfigs = require('./lib/plugins.json')

const {
  ABILITY_NAME,
  DEBOUNCE_OPTION,
  ABILITY_DESCRIPTION,
  ABILITY_STATE_DESCRIPTION,
  ABILITY_EVENT_DESCRIPTION,
  REVERSE_OPTION
} = require('./lib/statics')

const options = require('./lib/options')

domapic.createModule({
  packagePath: path.resolve(__dirname),
  customConfig: options
}).then(async dmpcModule => {
  const contactSensor = new gpioIn.Gpio(dmpcModule, {
  }, {
    debounceTimeout: DEBOUNCE_OPTION
  })

  const reverse = await dmpcModule.config.get(REVERSE_OPTION)

  const gpioValue = value => reverse ? !value : value

  await dmpcModule.register({
    [ABILITY_NAME]: {
      description: ABILITY_DESCRIPTION,
      data: {
        type: 'boolean'
      },
      state: {
        description: ABILITY_STATE_DESCRIPTION,
        handler: () => gpioValue(contactSensor.status)
      },
      event: {
        description: ABILITY_EVENT_DESCRIPTION
      }
    }
  })

  await dmpcModule.addPluginConfig(pluginConfigs)
  await contactSensor.init()

  contactSensor.events.on(gpioIn.Gpio.eventNames.CHANGE, newValue => {
    const value = gpioValue(newValue)
    dmpcModule.tracer.debug(ABILITY_EVENT_DESCRIPTION, value)
    dmpcModule.events.emit(ABILITY_NAME, value)
  })

  return dmpcModule.start()
})
