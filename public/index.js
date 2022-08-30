let
    generatorOptions = ["Generate Random Password", "Oauth2 Generator"],
    serverUrl = "http://localhost:8755/api/",
    passwordLength = 0;


requestServerForOptions();


async function requestServerForOptions() {


    await fetch(serverUrl + "options/", {
        method: "GET",
        headers : {
            "Content-Type": "application/json"
        },
    }).then(res => {
        res.json().then(data => {
            createButtonsFromServerOptions(data);
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
            if(button.type === "number") {
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

async function onOptionButtonClick(e){

    if(e.target.type != "button") return;

    e.preventDefault();
    setDefaultPasswordLength();
    
    await fetch(serverUrl, {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },

        body : JSON.stringify({
            option : e.target.value,
            passwordLength : passwordLength})
    }).then(data =>{
        data.json().then(json => {
            console.log(json)
            alert(JSON.stringify(json))
        })
    })

}