const buttonSwitch = document.querySelector("#button-switch");
let type = "medicado";

const label = document.querySelector("#label");
const loading = document.querySelector("img");

function mostrarSenha() {
    const inputSenha = document.querySelector("#input-senha");
    const senha = inputSenha.value
    if (inputSenha.getAttribute("type") === "password") {
        inputSenha.setAttribute("type", "text");
    } else {
        inputSenha.setAttribute("type", "password");
    }

    input.value = senha;
}

function switchType() {
    if (type === "medicado") {
        buttonSwitch.textContent = "Sou auxiliar";
        buttonSwitch.style.background = "#B7E4C7";
        type = "auxiliar";
    } else {
        buttonSwitch.textContent = "Sou medicado";
        buttonSwitch.style.background = "#A89CD6";
        type = "medicado";
    }
}

function cadastrar() {
    const inputEmail = document.querySelector("#input-email");
    const inputNome = document.querySelector("#input-nome");
    const inputSenha = document.querySelector("#input-senha");

    const email = inputEmail.value;
    const name = inputNome.value;
    const password = inputSenha.value;

    let isMedicado = null;
    let isAuxiliar = null;
    if (type === "medicado") {
        isMedicado = true;
        isAuxiliar = false;
    } else {
        isAuxiliar = true;
        isMedicado = false;
    }


    const formulario = document.querySelector("form");
    const texto = document.createElement("p");


    if (email == "" || name == "" || password == "") {
        texto.textContent = "Por favor, preencha os campos corretamente";
    } else {
        const novoUsuario = { email, name, password, isMedicado, isAuxiliar };
        label.style.display = "flex";
        label.textContent = "Carregando...";
        label.style.color = "#B7E4C7";
        loading.style.display = "flex";
        fetch("https://tomora.onrender.com/usersCreate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)
        })
            .then(response => {
                if (!response.ok) {
                    label.textContent = "Erro ao criar usuário, tente novamente mais tarde";
                    label.style.color = "red";
                    loading.style.display = "none";
                    // Se o status da resposta não for 200–299, lança erro
                    throw new Error("Erro na requisição: " + response.status);
                }
                return response.json(); // Se for JSON no corpo da resposta
            })
            .then(data => {
                // Sucesso: pode usar os dados retornados
                console.log("Resposta da API:", data);
                label.textContent = "Usuário criado com sucesso";
                label.style.color = "#B7E4C7";
                loading.style.display = "none";
                setInterval(() => {
                    window.location = "../login/index.html";
                }, 2000)
            })
            .catch(error => {
                // Erro na requisição
                console.error("Detalhes do erro:", error);
                label.textContent = "Erro ao criar usuário, tente novamente mais tarde";
                label.style.color = "red";
                loading.style.display = "none";
            });

    }

}