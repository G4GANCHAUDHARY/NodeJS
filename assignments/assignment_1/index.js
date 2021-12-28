// Taking input as key value pair using minimist
// const minimist = require("minimist")
// const p=require("process")
// const args = require('minimist')(process.argv)
// console.log(args['name'],args['age'],process.argv)


// const p=require("process")
// const input=process.argv.slice(2)
// var name="";
// for (x of input) {
//     name=name+" " +x
// }
// console.log(name)



// require("dotenv").config()
// console.log(process.env.USER_ID)
// To set enviro variable in window powershell ---> use `$env:USER_ID="Gagan"`


// const readline=require("readline-sync")
// const rl=readline.createInterface(
//     {input:process.stdin},
//     {output: process.stdout}
// )

// const input=rl.question("Enter name",(answer)=>{
//     console.log(answer)
//     rl.close()
// })

// const input=readline.question()
// console.log(input)

function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    const input=process.argv.slice(2);
    var name="";
    for (x of input) {
        name=name+x;
    }
    return name;
}

function getNameFromEnv() {
    // Write your code here
    // require("dotenv").config()
    // const name=process.env.User_name
    return process.env.name
}


function getNameFromReadLine() {
    // Write your code here
    const readline=require("readline")
    const rl=readline.createInterface(
        {input:process.stdin},
        {output: process.stdout}
    )

    rl.question("Enter name",(name)=>{
        console.log(`hi your name is ${name}`)
        rl.close()
    })
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}