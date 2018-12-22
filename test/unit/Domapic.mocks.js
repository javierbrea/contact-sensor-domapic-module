const test = require('narval')

const domapicService = require('domapic-service')

const Mock = function () {
  let sandbox = test.sinon.createSandbox()
  let resolveStartCalled

  const resolveOnStartCalledPromise = new Promise(resolve => {
    resolveStartCalled = resolve
  })

  const moduleStubs = {
    start: sandbox.stub().callsFake(() => {
      resolveStartCalled()
      return Promise.resolve()
    }),
    register: sandbox.stub(),
    events: {
      emit: sandbox.stub()
    },
    config: {
      get: sandbox.stub().resolves()
    },
    tracer: {
      info: sandbox.stub().resolves(),
      debug: sandbox.stub().resolves()
    },
    errors: {
      BadGateway: sandbox.stub()
    },
    addPluginConfig: sandbox.stub().resolves()
  }

  const stubs = {
    createModule: sandbox.stub(domapicService, 'createModule').resolves(moduleStubs),
    cli: sandbox.stub(domapicService, 'cli').resolves(moduleStubs)
  }

  const restore = () => {
    sandbox.restore()
  }

  return {
    restore,
    stubs: {
      ...stubs,
      module: moduleStubs
    },
    utils: {
      resolveOnStartCalled: () => resolveOnStartCalledPromise
    }
  }
}

module.exports = Mock
