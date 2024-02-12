const inicioDeSesion = e => {
    e.preventDefault()

    const apiUrl = `http://localhost:8087/api/login`

    const email = document.getElementById('InputEmail').value
    const password = document.getElementById('InputPassword').value

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }

    fetch(apiUrl, options)
        .then(res => res.json())
        .then(data => {
            if (data.access_token) {
                localStorage.setItem("token", data.access_token)
                location = "index.html"
            }
        })
}
const form = document.querySelector('form')
form.addEventListener('submit',evento => inicioDeSesion(evento))