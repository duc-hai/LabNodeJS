const mess = document.getElementById("mess")
    if (mess.innerText.trim() != "") {
        //Show message
        $(".alert").show('medium');
        setTimeout(function () {
            $(".alert").hide('medium');
        }, 3000)
    }

    const status = document.getElementById('status').getAttribute('aria-valuenow')
    $('option[value="' + status + '"]').attr('selected', 'selected');

    const gender = document.getElementById('gender').getAttribute('aria-valuenow')
    $('option[value="' + gender + '"]').attr('selected', 'selected');