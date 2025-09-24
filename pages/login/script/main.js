const inputEmail = document.querySelector("#input-email");
const inputSenha = document.querySelector("#input-senha");

const label = document.querySelector("#label");
const loading = document.querySelector("img");

function mostrarSenha() {
    const senha = inputSenha.value
    if (inputSenha.getAttribute("type") === "password") {
        inputSenha.setAttribute("type", "text");
    } else {
        inputSenha.setAttribute("type", "password");
    }

    inputSenha.value = senha;
}

const formulario = document.querySelector("form");

function getLogin() {
    const email = inputEmail.value;
    const password = inputSenha.value;

    if (email == "" || password == "") {
        texto.textContent = "Por favor, preencha os campos corretamente";
    } else {
        label.style.display = "flex";
        label.textContent = "Carregando...";
        label.style.color = "#B7E4C7";
        loading.style.display = "flex";
        fetch("https://tomora.onrender.com/usersLogin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // avisar que o corpo é JSON
            },
            body: JSON.stringify({ email, password })
        }).then(response => {
            if (!response.ok) {
                label.textContent = "Erro ao realizar login, dados incorretos ou inexistentes";
                label.style.color = "red";
                loading.style.display = "none";
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json(); // aqui transforma a resposta em JSON
        })
            .then(data => {
                console.log('Dados recebidos:', data); // aqui tem os dados reais do backend
                label.textContent = "Login efetuado com sucesso";
                label.style.color = "#B7E4C7";
                loading.style.display = "none";
                localStorage.setItem("userId", data.id);
                localStorage.setItem("username", data.name);
                localStorage.setItem("isMedicado", data.isMedicado);
                localStorage.setItem("isAuxiliar", data.isAuxiliar);
                localStorage.setItem("linkedId", data.linkedId);
                setInterval(() => {
                    window.location = "../dashboard/index.html";
                }, 2000)
            })
            .catch(error => {
                label.textContent = "Erro ao realizar login, dados incorretos ou inexistentes";
                label.style.color = "red";
                loading.style.display = "none";
                console.error('Erro:', error);
            });

    }
}