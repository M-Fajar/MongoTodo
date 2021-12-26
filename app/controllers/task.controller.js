const { json } = require('express/lib/response');
const db = require('../models')
const Task = db.tasks

exports.findAll = (req,res) => {
    Task.find()
    .then((result)=> {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some eror while retrieving tasks"
        })
    });
    
}

exports.create = (req,res) =>{
    
    const task = new Task({
        todo: req.body.todo,
        done:false,
        subs:[]
        
    })
    task.save(task).then((result) => {
        res.send(result)
    }).catch((err)=>{
        res.status(409).send({
            message: err.message || "Some eror while create tasks"
        })

    })
}
exports.addsub = (req,res) => {
    const idparrent = req.params.id
    console.log(req.body)
    Task.findByIdAndUpdate(idparrent,{
        "$push":{"subs":{todo:req.body.todo,done:false}}
    }).then((result) =>{
        if(!result){
            res.status(404).send({
                message: "Task not found"
            })
        }
        res.send({
            message: "Subtask was Added"
        })
    })
    .catch((err)=>{
        res.status(409).send({
            message : err.message || "Some error while update Task"
        })
    })
    // parrent.subs.push({
    //     todo:req.body.todo,
    //     done:false
    // })
    // parrent.save(parrent).then((result) => {
    //     res.send(result)
    //         }).catch((err)=>{
    //     res.status(409).send({
    //         message: err.message || "Some eror while create subtask"
    //         })

    //     })  
    
}
exports.deletesub = (req,res) => {
    const idparrent = req.params.id
    console.log(req.body)
    Task.findByIdAndUpdate(idparrent,{
        "$pull":{"subs":{_id:req.body.id}}
    }).then((result) =>{
        if(!result){
            res.status(404).send({
                message: "Task not found"
            })
        }
        res.send({
            message: "Subtask was deleted"
        })
    })
    .catch((err)=>{
        res.status(409).send({
            message : err.message || "Some error while update Task"
        })
    })
    
}

exports.updatesub = (req,res) => {
    const idparrent = req.params.id
    
    Task.findById(idparrent,function(err,result){
        if(!err){
            if(!result){
                res.status(404).send({
                    message: "Task not found"
                })
            }
            else{
                result.subs.id(req.body.id).done = req.body.done;
                result.markModified('subs');
                result.save(function(saveer,saveresult){
                    if(!saveer){
                        res.status(200).send(saveresult);
                    }
                    else{
                        res.status(400).send(saveer.message)
                    }
                })
            }
        }
        else{
            res.status(400).send(err.message);
        }
    })


    // Task.findByIdAndUpdate(idparrent,{
        
    //     "$set":{"subs":{_id:req.body.id}},
    //      done:req.body.done
    // }).then((result) =>{
    //     if(!result){
    //         res.status(404).send({
    //             message: "Task not found"
    //         })
    //     }
    //     res.send({
    //         message: "Subtask was deleted"
    //     })
    // })
    // .catch((err)=>{
    //     res.status(409).send({
    //         message : err.message || "Some error while update Task"
    //     })
    // })
    
}

exports.findOne = (req,res) =>{
    const id = req.params.id

    Task.findById(id)
    .then((result) => {
        res.send(result)
    })
    .catch((err)=>{
        res.status(409).send({
            message : err.message || "Some error while show Task"
        })
    })
}

exports.update = (req,res) => {
    const idparrent = req.params.id
    Task.findByIdAndUpdate(idparrent,{
        done: req.body.done
        }).then((result) =>{
        if(!result){
            res.status(404).send({
                message: "Task not found"
            })
        }
        res.send({
            message: "Task was updated"
        })
    })
    .catch((err)=>{
        res.status(409).send({
            message : err.message || "Some error while update Task"
        })
    })

    
}

exports.delete = (req,res) =>{
    const id = req.params.id

    Task.findByIdAndRemove(id)
    .then((result) =>{
        if(!result){
            res.status(404).send({
                message: "Task not found"
            })
        }
        res.send({
            message: "Task was Deleted"
        })
    })
    .catch((err)=>{
        res.status(409).send({
            message : err.message || "Some error while delete Task"
        })
    })
}