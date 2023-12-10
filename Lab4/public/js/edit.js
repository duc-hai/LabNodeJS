const mess = document.getElementById("mess")
    if (mess.innerText.trim() != "") {
        //Show message
        showMess()
    }

    $('#mess').on('DOMSubtreeModified', function () {
        showMess()
    })

    function showMess() {
        $(".alert").show('medium');
        setTimeout(function () {
            $(".alert").hide('medium');
        }, 3000)
    }

    const status = document.getElementById('status').getAttribute('aria-valuenow')
    $('option[value="' + status + '"]').attr('selected', 'selected');

    const gender = document.getElementById('gender').getAttribute('aria-valuenow')
    $('option[value="' + gender + '"]').attr('selected', 'selected');

    document.getElementById("formAddProduct").addEventListener("submit", function (event) {
        event.preventDefault()
        let name = document.getElementById('name').value
        let gen = document.getElementById('gender').value
        let email = document.getElementById('email').value
        let stat = document.getElementById('status').value
        let data = { name: name, gender: gen, email: email, status: stat }
        let id = document.getElementById("userID").innerText
        fetch(`/public-api/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                console.log(data.message)
                if (data.code == 0) {
                    window.location.href = `/?message=${data.message}`
                }
                else {
                    document.getElementById("mess").innerText = data.message 
                }
            })
            .catch((err) => {
                console.error("Error: ", err)
            })
    })