let
    generatorOptions = ["Generate Random Password", "Oauth2 Generator"],
    serverUrl = "http://localhost:8755/api/",
    passwordLength = 0,
    userPasswordToStore = "";




async function requestServerForOptions() {


    await fetch(serverUrl + "options/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(res => {
        res.json().then(data => {

            return createButtonsFromServerOptions(data);
        })
    }).catch(err => {
        console.error(err)
        alert(err)
    })
}


function createButtonsFromServerOptions(options) {

    if (options && options.length > 0) {
        let button;
        for (let btn = 0; btn < options.length; btn++) {
            button = document.createElement(options[btn].element)
            button.disable;
            button.value = options[btn].html;
            button.setAttribute("type", options[btn].type)
            if (button.type === "number") {
                button.id = "password-length-input"
            }
            document.body.childNodes[1].childNodes[1].appendChild(button);
            button.addEventListener("click", (e) => {
                onOptionButtonClick(e)
            })
        }
    }
}

function setDefaultPasswordLength() {

    passwordLength = document.getElementById("password-length-input").value ? document.getElementById("password-length-input").value : 8
    document.getElementById("password-length-input").value = passwordLength;
}

async function onOptionButtonClick(e) {

    if (e.target.type != "button") return;

    e.preventDefault();
    setDefaultPasswordLength();

    await fetch(serverUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            option: e.target.value,
            passwordLength: passwordLength
        })
    }).then(data => {
        data.json().then(async json => {
            console.log(json);
            copyPasswordToClipboard(json)
            await requestServerForVaultOptions();
        })
    })

}


async function requestServerForVaultOptions() {

    await fetch(serverUrl + "vault/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(data => {
        console.log(data)
        data.json().then(json => {
            createVaultOptions(json)
        })
    })
}

function createVaultOptions(elements) {
    
    if (elements.length <= 0) return;
    
    let
        createdElement,
        selectElement;

    const appender = document.querySelectorAll(".generator-form")[0];
    
    for (let element = 0; element < elements.length; element++) {

        createdElement = document.createElement(elements[element].element);

        if (elements[element].element == "select") {
            elements[element].element.id = "vault-operation"
            appender.appendChild(createdElement);
            selectElement = createdElement;

        } else if (elements[element].element == "option") {

            selectElement.appendChild(createdElement)
            createdElement.value = elements[element].option
            createdElement.innerText = elements[element].option;

        } else if (elements[element].element == "input") {

            createdElement.value = elements[element].html;
            createdElement.setAttribute("type", elements[element].type)
            appender.appendChild(createdElement);

            if(elements[element].type == "button") {
                createdElement.addEventListener("click", async (e) => {
                    await storeSecret(e);
                })
            }
        }

        if(elements[element].type && elements[element].type == "text") {
            createdElement.value = ""
            createdElement.placeholder = elements[element].html
            createdElement.style.border = "none"
            createdElement.style.borderBottom = "solid black 2px"

        }
    }

}



async function storeSecret(e) {

    e.preventDefault()

    await fetch(serverUrl + "vault/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            secretUploader: "Shachar",
            password : "123456"
        })
    }).then(data => {
        console.log(data)
        data.json().then(json => {
            createVaultOptions(json)
        })
    })
}

async function copyPasswordToClipboard(password) {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {

        alert("Your Password has been copied to clipboard!")
        return await navigator.clipboard.writeText(password.randomPassword);

    }
}

requestServerForOptions();
