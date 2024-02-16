const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");

const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
// const { type } = require("os");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
//create an array to store team members
const teamMembers = [];

//prompt user for manager input details
const inputManager = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please input your team manager's name:",
            validate: (nameInput) => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("You haven't entered a name!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "id",
            message: "Please enter your team manager's ID:",
            validate: (idInput) => {
                if (isNaN(idInput)) {
                    console.log("You didn't enter a valid ID!");
                    return false;
                } else {
                    return true;
                }
            },
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your team manager's email:",
            validate: (emailInput) => {
                const valid = /\S+@\S+\.\S+/.test(emailInput);
                if (valid) {
                    return true;
                } else {
                    console.log("You didn't enter a valid email!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter your team manager's office number:",
            validate: (officeNumberInput) => {
                if (isNaN(officeNumberInput)) {
                    console.log("You didn't enter a valid office number!");
                    return false;
                } else {
                    return true;
                }
            },
        },
    ])
    .then((managerInput) => {
        const { name, id, email, officeNumber } = managerInput;
        const manager = new Manager(name, id, email, officeNumber);

        teamMembers.push(manager);
        console.log(manager);
    });
};

const inputEmployee = () => {
    console.log(" add any type of employee to your team!");

    return inquirer
    .prompt([
        {
        type: "list",
        name: "role",
        message: "Please choose the role of your added employee.",
        choices: ["Engineer", "Intern"],
    },
    {
        type:"input",
        name: "name",
        message: "Please input your employees name:",
        validate: (nameInput) => {
            if (nameInput) {
                return true;
            } else {
                console.log("You didn't enter a name!");
            }
        },
    },
      {
        type: "input",
        name: "id",
        message: "Please enter the ID of your employee:",
        validate: (nameInput) => {
            if (isNaN(nameInput)) {
                console.log("You didn't enter a valid ID!");
                return false;
            } else {
                return true;
        }
      },
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your employees email:",  
        validate: (emailInput) => {
            const valid = /\S+@\S+\.\S+/.test(emailInput);
            if (valid) {
                return true;
            } else {
                console.log("You didn't enter a valid email!");
                return false; 
            }
        },
    },
    {
        type: "input",
        name:"github",
        message: "Please enter your employees username on Github:",
        when: (input) => input.role === "Engineer",
        validate: (nameInput) => {
            if (nameInput) {
                return true;
            } else {
                console.log("You must enter this employees github user:");
            }
        },
    },
    {
        type: "input",
        name: "school",
        message: "Enter the school of your intern:",
        when: (input) => input.role === "Intern",
        validate: (nameInput) => {
            if (nameInput) {
                return true;
            } else {
                console.log("You must enter the interns school!");
            }
        },
    },
    {
        type: "confirm",
        name: "confirmTeamMember",
        message: "Do you want to add more team members?",
        default: false,
    },

    ])
    .then((memberData) => {
        //stored data for types of team members inherited from employee class
        let { name, id, email, role, github, school, confirmTeamMember } = memberData;
        let member;
    
        if (role === "Engineer") {
            member = new Engineer(name, id, email, github);
            console.log(member);
        } else if (role === "Intern") {
            member = new Intern(name, id, email, school);
            console.log(member);
        }
        teamMembers.push(member);
    
        if (confirmTeamMember) {
            // add more team members
            return inputEmployee(); 
        } else {
            return teamMembers;
        }
    });
    
};

//setting function to generate html page using the file sys
const writeFile = (data) => {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true }); // Create the output directory if it does not exist
    fs.writeFile(outputPath, data, (err) => {
    // fs.writeFile("./output/team.html", data, (err) => {
        //incase of error
    if (err) {
        console.log(err);
        return;
        //message for profile successfully generated
     } else {
        console.log("Team profile has successfully been generated!"
        );
     }
    });
};

inputManager()
.then(inputEmployee)
.then((teamMembers) => {
    return render(teamMembers);
})
.then((outputPath) => {
    return writeFile(outputPath);
})
.catch((err) => {
    console.log(err);
});
