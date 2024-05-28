document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get('error')
    if (error === '1') {
        document.getElementById('popup').style.display = 'block'
        setTimeout(function () {
            document.getElementById('popup').style.display = 'none'
        }, 3000)
    } else {
        document.getElementById('popup').style.display = 'none'
    }
})
