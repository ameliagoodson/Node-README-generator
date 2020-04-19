var fs = require('fs')
var inquirer = require('inquirer')
const axios = require("axios");

//Function to write the initial file
function writetoFile(output) {
    fs.writeFile('README.md', output, function (err) {
        if (err) throw err;
        console.log('The file has been written!');
    })
}

// Function to append the Github information to the file
function appendGitFile(githubresponse) {
    fs.appendFile('README.md', githubresponse, function (err) {
        if (err) throw err;
        console.log('The file has been updated!');
    }
    )
}

//Uses template literal to format the content that will be displayed in the Readme
function generateContent(data) {
    return (
`
[Badge](https://img.shields.io/badge/Test%20project-Test-blue)

# Title 
${data.title}

# Table of Contents 
* [Description](##Description)
* [Installation](##Installation) 
* [Usage](##Usage)
* [Testing](##Testing)
* [Licensing](##Licensing)
* [Contributing to the project](##Contributing-to-the-project)
* [Github details](##Github-details)

## Description
${data.description} 

## Installation
${data.installation}

## Usage
${data.usage}

## Testing
${data.tests}

## Licensing
${data.licensing}

## Contributing to the project
${data.contributing}
`
    )
}

// Format the Github content with template literal
function generateGitContent(data) {
    return (
        `
## Github details
[GitHub URL:](${data.url})
Profile picture: ${data.image}
Name: ${data.name}
Email: ${data.email}

`)
}

//Questions to user
const questions = [
    {
        type: "input",
        message: "What is your Github username?",
        name: "Username",
    },
    {
        type: "input",
        message: "Enter the title of your project",
        name: "title",
    },
    {
        type: "input",
        message: "Enter a description of your project",
        name: "description",
    },
    {
        type: "input",
        message: "What command should be run to install any dependencies?",
        name: "installation",
        default: "npm i"
    },
    {
        type: "input",
        message: "What command should be used to run tests?",
        name: "tests",
        default: "npm test"
    },
    {
        type: "input",
        message: "What does the user need to know about using the project?",
        name: "usage",
    },
    {
        type: "list",
        message: "What kind of license should your project have?",
        name: "licensing",
        choices:
            ["MIT", new inquirer.Separator(),
                "APACHE 2.0", new inquirer.Separator(),
                "GPL 3.0", new inquirer.Separator(),
                "BSD 3", new inquirer.Separator(),
                "None", new inquirer.Separator()]
    },
    {
        type: "input",
        message: "What does the user need to know about contributing to the project?",
        name: "contributing",
    }
]

inquirer.prompt(questions)
    .then(function (response) {
        let content = generateContent(response)
        writetoFile(content)

//Axios call to Github API
        axios
            .get("https://api.github.com/users/" + response.Username)
            .then(function (res) {
                var githubinfo = {
                    username: res.data.login,
                    name: res.data.name,
                    email: res.data.email,
                    image: res.data.avatar_url, 
                    url: res.data.html_url,
                }
                let githubcontent = generateGitContent(githubinfo)
                appendGitFile(githubcontent)
            })
    })
