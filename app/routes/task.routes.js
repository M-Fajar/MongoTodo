const express = require('express')

module.exports = (app) => {
    const tasks = require('../controllers/task.controller')
    const router = require('express').Router()

    router.get('/', tasks.findAll)
    router.post('/',tasks.create)
    router.post('/sub/:id', tasks.addsub)
    router.put('/sub/:id',tasks.updatesub)
    router.put('/:id',tasks.update)
    router.post('/sub/delete/:id',tasks.deletesub)
    router.delete('/:id',tasks.delete)


    app.use('/api/todo',router)
}