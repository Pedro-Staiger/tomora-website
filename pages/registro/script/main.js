//Declaração das variáveis do switch tipo de conta
const buttonSwitch = document.querySelector("#button-switch");
let type = "medicado";

//Declaração das variáveis do loader
const label = document.querySelector("#label");
const loading = document.querySelector("img");

//Declaração de função login pela tecla enter em todos inputs
document.querySelector('#input-nome').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        cadastrar();
    }
});

document.querySelector('#input-email').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        cadastrar();
    }
});

document.querySelector('#input-senha').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        cadastrar();
    }
});

//Função que mostra ou esconde a senha
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

//Função que troca o tipo de conta
function switchType() {
    if (type === "medicado") {
        buttonSwitch.textContent = "Sou auxiliar";
        buttonSwitch.style.background = "#B7E4C7";
        buttonSwitch.style.color = "#212529";
        type = "auxiliar";
    } else {
        buttonSwitch.textContent = "Sou medicado";
        buttonSwitch.style.background = "#A89CD6";
        buttonSwitch.style.color = "#e9ecef";
        type = "medicado";
    }
}

//Função que cadastra o usuário
function cadastrar() {
    const inputNome = document.querySelector("#input-nome");
    const inputEmail = document.querySelector("#input-email");
    const inputSenha = document.querySelector("#input-senha");

    const name = inputNome.value;
    const email = inputEmail.value;
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

    if (email == "" || name == "" || password == "") {
        label.style.display = "flex";
        label.textContent = "Por favor, preencha os campos corretamente";
        label.style.color = "red";
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