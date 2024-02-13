const register = e => {
    e.preventDefault()

    const apiUrl = `http://localhost:8087/api/register`

    const email = document.getElementById('InputEmail').value
    const password = document.getElementById('InputPassword').value
    const password_confirmation = document.getElementById('InputPassword2').value
    const nombre_usuario = document.getElementById('InputName').value


    const options2 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, password_confirmation, nombre_usuario}),
    }

    fetch(apiUrl, options2)
        .then(res => res.json())
        .then(data => {
            if (data.access_token) {
                localStorage.setItem("token", data.access_token)
                location = "main.html"
            }
        })
}
const form = document.querySelector('form')
form.addEventListener('submit', evento => register(evento))