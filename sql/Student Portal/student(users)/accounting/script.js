document.addEventListener('DOMContentLoaded', function () {
    loadTransactions()
})

function loadTransactions() {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'transactions.php', true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('transactionTable').innerHTML = xhr.responseText
        }
    }
    xhr.send()
}
