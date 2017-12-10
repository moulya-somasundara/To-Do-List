
const todoItems = require("./todo");
const connection = require("./mongoConnection");

//console.log("Start");

let createFirstTask = todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?")
    .catch((error) => {
    console.log("\nError Occurred: "+error);
});

let createSecondTask = createFirstTask.then((firstTask) => {
    console.log("\nLogging firstTask task inserted");
    console.log(firstTask);
    return todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
}).catch((error) => {
    console.log("\nError Occurred: "+error);
});

let getAllTasks = createSecondTask.then((newTask) => {
    return todoItems.getAllTasks();
}).catch((error) => {
    console.log("\nError Occurred: "+error);
});

let logAllTasks = getAllTasks.then((allTasks) => {
    console.log("\n Logging all tasks - Before deleting first task");
    console.log(allTasks);
    return allTasks;
}).catch((error) => {
    console.log("\nError Occurred: "+error);
});

let removeFirstTask = logAllTasks.then((firstTask) => {
    console.log("\nFollowing task is being removed");
    console.log(firstTask[0]);
    return todoItems.removeTask(firstTask[0]._id);
}).catch((error) => {
    console.log("\nError Occurred: "+error);
});

let getAllTasks2 = removeFirstTask.then((newTask) => {
    return todoItems.getAllTasks();
}).catch((error) => {
    console.log("\nError Occurred: "+error);
});

let logAllTasks2 = getAllTasks2.then((allTasks) => {
    console.log("\nLogging all tasks - After deleting first task");
    console.log(allTasks);
    return allTasks;
}).catch((error) => {
    console.log("\nError Occurred: "+error);
});

let updateTask1 = logAllTasks2.then((newTasks) => {
    console.log("\nUpdating the above remaining second task");
    console.log(". \n.\n.\n.\n.\n.\n");
    return todoItems.completeTask(newTasks[0]._id);
}).catch((error) => {
    console.log("\nError Occurred: "+error);
});

let getAllTasks3 = updateTask1.then((newTask) => {
    return todoItems.getAllTasks();
}).catch((error) => {
    console.log("\nError Occurred: "+error);
});

let logAllTasks3 = getAllTasks3.then((allTasks) => {
    console.log("\nLogging all tasks - After updating second (Remaining) task");
    console.log(allTasks);
    return allTasks;
}).catch((error) => {
    console.log("\nError Occurred: "+error);
});

let emptyData = logAllTasks3.then((allTasks) => {
    //console.log(removeAllTask);
    return todoItems.removeAll(allTasks[0]._id);
}).catch((error) => {
    console.log("\nError Occurred: "+error);
});

 let closeConnectionStep = emptyData.then(() => {
 console.log("\nConnection Closed and collection data cleared");
 return connection();
 }).then((db) => {
 return db.close();
 }).catch((error) => {
     console.log("\nError Occurred: "+error);
     //return connection().close();
 });