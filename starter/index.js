const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");



// TODO: Write Code to gather information about the development team members, and render the HTML file.
//create an array to store team members
const teamMembers = [];

//I need to create a function to prompt the user for team managers details
function promptTeamManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the team's manager's name:",
            name: "name",
        },
        {
            type: "input",
            message: "Enter the team manager's employer ID:",
            name: "id",
        },
        {
            type: "input",
            message: "Enter the team manager's email address",
            name: "email",
        },
        {
            type: "Input", 
            message: "Enter the team managers office number?:",
            name: "officeNumber",
        },
    ]).then((answers) => {
        //drawingg out answers from userninput
        const { name, id, email, officeNumber } = answers;

        //making a manager object with information provided in the user input
        const manager = new Manager(name, id, email, officeNumber);

        //Push the manager object using push function to add into TeamMembers array
        teamMembers.push(manager);

        //now call a function to prompt the user for the team engineer's details
        function promptTeamEngineer() {
            inquirer.prompt([
            {
                type: "input",
                message: "Enter the team Engineer's name:",
                name: "name", 
            },
            {
                type: "input",
                message: "Enter the team engineers ID:",
                name: "id",
            },
            {
                type: "input",
                message: "Enter the team engineers email address",
                name: "email",
            },
            {
                type: "Input", 
                message: "Enter the team engineer's github username?:",
                name: "github",
            },
            ]).then((answers) => {
                //destructing to extract values from 'answers parameter
                const { name, id, email, github };

                //creating an engineer object containing all the infor provided by user input
                const engineer = new Engineer(name, id, email, github);

                //Using push function to add the new "engineer" object to the TeamMembers array alongisde "manager"
                teamMembers.push(engineer);

                //calling function to prompt user for Interns details
                function promptIntern() {
                    inquirer.prompt([
                        {
                        type: "input",
                        message: "Enter the name of your intern:",
                        name: "name",
                        },
                        {
                        type: "input",
                        message: "Enter the intern's ID:",
                        name: "id",
                        },
                        {
                          type: "input",
                            message: "Enter the intern's email:",
                            name: "email",
                        },
                        {
                            type: "input",
                        message: "Enter the intern's school:",
                        name: "school",
                        },
                    ]).then((answers) {
                        const { name, id, email, school } = answers;

                        //make an intern object with the provided info
                        const intern = new Intern(name, id, email, school);

                        //push the intern object to add into the teamMembers array
                        teamMembers.push(intern);

                        // add prompt incase user wants to add more team members
                        promptAddMoreTeamMembers();
                    });
                  }
                // Function to prompt the user to add more team members or finish
               function promptAddMoreTeamMembers() {
               inquirer.prompt([
                        {
                      type: "list",
                       message: "Do you want to add more team members?",
                       choices: ["Add Engineer", "Add Intern", "Finish Building Team"],
                       name: "choice",
                      },
                      ]).then((answer) => {
                        const { choice } answer;
            }
            )
    }
    )

}
