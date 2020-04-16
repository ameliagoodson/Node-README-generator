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
    {
        type: "input",
        message: "Enter a table of contents",
        name: "Contents",
    },
    {
        type: "input",
        message: "Enter any instructions for installation",
        name: "Installation",
    },
    {
        type: "input",
        message: "Enter directions for usage",
        name: "Usage",
    },
    {
        type: "input",
        message: "Enter details of licensing restrictions",
        name: "Licensing",
    },
    {
        type: "input",
        message: "Enter details of contributing",
        name: "Contributing",
    },
    {
        type: "input",
        message: "Enter details about testing that has been undertaken",
        name: "Tests",
    },
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
