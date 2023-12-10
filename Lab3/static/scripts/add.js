document.getElementById("formAddProduct").addEventListener("submit", evt => {
    evt.preventDefault()
    const file = document.getElementById("image")
    const formData = new FormData()

    formData.append("name", document.getElementById("name").value)
    formData.append("price", document.getElementById("price").value)
    formData.append("description", document.getElementById("description").value)
    formData.append("file", file.files[0])
    fetch("/add", {
        method: "post",
        body: formData,
    })
        .then((response) => {
            response.json().then(data => {
                console.log(data)
                if (data.status != 0) {
                    document.getElementById("mess").innerText = data.message
                    $(".alert").show('medium');
                    setTimeout(function () {
                        $(".alert").hide('medium');
                    }, 3000)
                }
                else {
                    window.location.replace("./")
                }
            })
        })
        .catch((err) => console.log(err))
})