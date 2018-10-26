'use strict'

const express = require('express')
const path = require('path')
const ROOT_DIR = path.join(__dirname, './..')
const MODEL_DIR = path.join(__dirname, './../lib/models')

const testDBUtil = {
  async generateFixture(conn, model, fixture) {
    if (conn.readyState === 0) {
      throw new Error()
    }
    const Model = conn.model(model)
    return Promise.all(fixture.map(entity => new Model(entity).save()))
  },
}

global.express = express
global.ROOT_DIR = ROOT_DIR
global.MODEL_DIR = MODEL_DIR
global.testDBUtil = testDBUtil
