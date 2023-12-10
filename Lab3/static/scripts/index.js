function logout() {
    window.location.replace("/logout")
}

function addProduct() {
    window.location.href = "/add"
}

function loadFlashMess() {
    let url = document.getElementById("messSucc").innerText
    let pathname = new URL(url).pathname;
    pathname = pathname.split("/")
 
    console.log(pathname)
   
    switch(pathname[1]){
        case 'login':
            showMess ("Đăng nhập thành công")
            break
        case 'add':
            showMess ("Thêm sản phẩm thành công")
            break
        case 'edit':
            showMess ("Cập nhật thông tin sản phẩm thành công")
            break
        case 'delete':
            showMess ("Xóa sản phẩm thành công")
            break
    }
}

function showMess (mess) {
    document.getElementById("messSucc").innerText = mess
    $(".alert").show('medium');
    setTimeout(function () {
        $(".alert").hide('medium');
    }, 3000)
}

function loadProducts() {
    loadFlashMess()
    fetch("/product", {
        method: "get",
    })
        .then((response) => {
            response.json().then(data => {
                console.log(data.data)
                for (let i = 0; i < data.data.length; i++) {
                    $("#list-product").append(`
                    <tr>
                        <td> ${i + 1} </td>
                        <td> ${data.data[i].name}</td>
                        <td>` + formatCurrency(Number(data.data[i].price)) + `</td>
                        <td>
                            <button onclick="editProduct(${data.data[i].id})" class="btn">Chỉnh sửa</button>
                            |
                            <button onclick="deleteProduct(${data.data[i].id},'${data.data[i].name}')" id="delete-btn" class="btn">Xóa</button>
                            |
                            <button onclick="infoProduct(${data.data[i].id})" class="btn">Chi tiết</button>
                        </td>
                    </tr>
                `)
                }
            })
        })
        .catch((err) => console.log(err))
}

function infoProduct(id) {
    window.location.href = `/detail/${id}`
}

function formatCurrency (money) {
    return money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

function editProduct(id) {
    window.location.href = `/edit/${id}`
}

function deleteProduct(id, name) {
    $("#name-product").html(name)
    $("#exampleModal").modal('show')
    $("#confirm-delete").click(function (event) {
        let jsn = { idProduct: id }
        fetch("/delete", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsn),
        })
            .then((response) => {
                response.json().then(data => {
                    console.log(data)
                    if (data.status == 0) {
                        window.location.href = "/delete"
                    }
                    else {
                        document.getElementById("mess").innerText = data.message
                        $(".alert").show('medium');
                        setTimeout(function () {
                            $(".alert").hide('medium');
                        }, 3000)
                    }
                })
            })
            .catch((err) => console.log(err))
    })
}

$("body").on('DOMSubtreeModified', "#mess", function () {
    console.log("Hé hé hé")
});