module.exports=(mongoose) => {
    const schema = mongoose.Schema (
        {
            todo: String,
            done:Boolean,
            subs:[{
                todo:String,
                done:Boolean,
            }]
        }
    )

    schema.method('toJSON', function(){
        const {_v, _id, ...object} = this.toObject()
        object.id = _id

        return object
    })

    const Task = mongoose.model("tasks",schema)
    return Task
}