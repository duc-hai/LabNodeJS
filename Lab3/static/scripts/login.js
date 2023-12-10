async function onLogin () {
    var data = {
        email : document.getElementById('email').value,
        pwd : document.getElementById('password').value,
    };

    try {
        const resp = await fetch ("/login", {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify (data),
            // baseURL : "localhost:8080"
        })
        const json = await resp.json()
        console.log(json)
        if (json.status != 0) {    
            document.getElementById("mess").innerText = json.message
            $(".alert").show('medium');
            setTimeout(hideAlertMess, 3000)
        }
        else {
            window.location.replace("./")
        }
    }
    catch (err) {
        console.err(err)
    }
}

function hideAlertMess () {
    $(".alert").hide('medium');
}

document.getElementById("formLogin").addEventListener("submit", function (event) {
    event.preventDefault()
    onLogin()
})