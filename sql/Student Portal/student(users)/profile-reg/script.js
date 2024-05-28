let profpic = document.getElementById('profile')
let inputpic = document.getElementById('pic')

inputpic.onchange = function () {
    profpic.src = URL.createObjectURL(inputpic.files[0])
}
