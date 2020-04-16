var fs = require('fs')
var inquirer = require('inquirer')
const axios = require("axios");

inquirer.prompt([
    {
        type: "input",
        message: "What is your Github username?",
        name: "Username",
    },
    {
        type: "input",
        message: "Enter the title of your project",
        name: "Title",
    },
    {
        type: "input",
        message: "Enter a description of your project",
        name: "Description",
    },
    // {
    //     type: "input",
    //     message: "Enter a table of contents",
    //     name: "Contents",
    // },
    {
        type: "input",
        message: "What command should be run to install any dependencies?",
        name: "Installation",
        default: "npm i"
    },
    {
        type: "input",
        message: "What command should be used to run tests?",
        name: "Tests",
        default: "npm test"
    },
    {
        type: "input",
        message: "What does the user need to know about using the project?",
        name: "Usage",
    },
    {
        type: "list",
        message: "What kind of license should your project have?",
        name: "Licensing",
        choices: 
        [ "MIT", new inquirer.Separator(), 
        "APACHE 2.0", new inquirer.Separator(),
        "GPL 3.0", new inquirer.Separator(),
        "BSD 3", new inquirer.Separator(),
        "None", new inquirer.Separator()]
    },
    {
        type: "input",
        message: "What does the user need to know about contributing to the project?",
        name: "Contributing",
    }
])
    .then(function (response) {

        output = JSON.stringify(response, null, '\t')
        
        fs.writeFile('README.md', output, function (err) {
            if (err) throw err;
            console.log('The file has been written!');
        })
    })
// console.log(response.Username)
.then(function () {
    axios
    .get("https://api.github.com/users/ameliagoodson")  //Need to get the username entered here
    .then(function (res) {
        var gitHubinfo = {
            name: res.data.name,
            email: res.data.email,
            image: res.data.avatar_url
        }
        var gitHubinfoStr = JSON.stringify(gitHubinfo)
        
    fs.appendFile('README.md', gitHubinfoStr, function (err) {
        if (err) throw err;
        console.log('The file has been updated!');
    })
})
})
