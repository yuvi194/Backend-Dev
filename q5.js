function time(){
    console.log("1");          // run in sync 

    setTimeout(() => {
        console.log("2");      // run after promise
    }, 0);

    setImmediate(() => {        // run last
        console.log("3");
    });

    process.nextTick(() => {               // runs first after sync function or code  ,  has higher priority
        console.log("4");
    });

    Promise.resolve().then(() => {        // runss after process one , run before timers
        console.log("5");
    });

    console.log("6");         // run second
}
module.exports={
    time
};