

var uuid = require("node-uuid");
const mgConnection = require("./mongoCollections");
const todoItems = mgConnection.todoItems;


module.exports = {

    //This function will return a promise that resolves to a newly created to-do list object.
    createTask(title, description) {
        //console.log(title+"--"+description);
        if(!title) return Promise.reject("Please provide the title for the task.");
        if(typeof title != "string") return Promise.reject("Invalid title type. String required.");
        if(!description) return Promise.reject("Please provide the description for the task.");
        if(typeof description != "string") return Promise.reject("Invalid description type. String required.");

        return todoItems().then((todoCollection) => {
            //console.log("\ncreating new task*****\n");
            newTask = {
                _id: uuid.v4(),
                title: title,
                description: description,
                completed: false,
                completedAt: null
            };

            return todoCollection
                .insertOne(newTask)
                .then((newTaskInfo) => {
                    return newTaskInfo.insertedId;
                }).then((newTaskID) => {
                    //console.log(newTaskID);
                    return this.getTask(newTaskID);
                });
        });
    },

    //This function will return a promise that resolves to an array of all tasks in the database.
    getAllTasks() {

        return todoItems().then((completeCollection) => {
            let allTasks = completeCollection.find({}).toArray();
            //console.log("allTasks");
            return allTasks;
        }).catch((error) => {
            reject("Error occurred in getting all the tasks.");
        });
    },

    //This function will return a promise that resolves to a task from the database, when given an id.
    getTask(id) {
       // console.log(id);
        if(!id) return Promise.reject("Please provide an id.");

        return todoItems().then((todoCollection) => {
           // console.log("getting");
            return todoCollection.findOne({_id: id});
        });
    },

    //This function will modify the task in the database. It will set completed to true and completedAt to the current time.
    completeTask(taskId) {

        if(!taskId) return Promise.reject("Please provide an Id for searching.");

        return todoItems().then((todoCollection) => {
            //console.log("inside complete task1");

            return this.getTask(taskId).then((currentTask) => {
                //console.log(cur-rentTask);
                var date = new Date().getMonth()+"/"+new Date().getDate()+"/"+new Date().getYear();
                updatedTask = {
                    _id: currentTask._id,
                    title: currentTask.title,
                    description: currentTask.description,
                    completed: true,
                    completedAt: new Date().toLocaleString()
                };
                //console.log("inside complete task2");
                return todoCollection
                    .updateOne({_id: taskId}, updatedTask)
                    .then((taskID) => {
                        //console.log("inside complete task3");
                        //console.log(taskId);
                        return this.getTask(taskId);
                    });
            });
        });
    },

    //This function will remove the task from the database.
    removeTask(id) {
        if(!id) return Promise.reject("Please provide an Id for removing the respective task.");
        //console.log("removeTask1\n");
        return todoItems().then((todoCollection) => {
            //console.log("removeTask2\n");
            return todoCollection
                .removeOne({_id: id})
                .then((deletedInfo) => {
                    //console.log("deletedInfo\n");
                    //console.log(deletedInfo);
                    if(deletedInfo.deletedCount === 0) {
                        throw(`Could not delete task with id of ${id}`);
                    }
                });
        });
    },

    //This function will remove all the data in collection.
    removeAll(id) {
        //console.log("Inside RemoveALL");
        return todoItems().then((completeCollection) => {
            completeCollection.remove({});
            //console.log("allTasks");
            return {};
        })
    }
}
