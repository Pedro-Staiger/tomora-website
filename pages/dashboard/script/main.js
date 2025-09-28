if (localStorage.getItem("userId") == "" || localStorage.getItem("userId") == null) {
    alert("O login não foi efetuado. Por favor vá para a página de login...");
} else {
    getReminders();
    getHistory();
}


//Parte dos lembretes
function getReminders() {
    let searchId = localStorage.getItem("linkedId");
    // Se linkedId não existir ou for vazio, usa userId
    if (!searchId || searchId === "" || searchId === "null" || searchId === null) {
        searchId = localStorage.getItem("userId");
    }

    fetch("https://tomora.onrender.com/remindersSearch", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // avisar que o corpo é JSON
        },
        body: JSON.stringify({ searchId })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json(); // aqui transforma a resposta em JSON
    })
        .then(data => {
            console.log('Dados recebidos:', data); // aqui tem os dados reais do backend
            showReminders(data)
        })
        .catch(error => {
            console.error('Erro:', error);
        });

}

function showReminders(reminders) {
    const div = document.querySelector("#lembretes");
    const lastReminders = document.querySelectorAll(".lembrete");
    if (lastReminders) {
        lastReminders.forEach(element => {
            div.removeChild(element)
        });
    }
    if (reminders.length > 0) {
        reminders.forEach(element => {
            const reminder = document.createElement("div");
            reminder.setAttribute("class", "lembrete");
            reminder.setAttribute("id", element.id);

            const title = document.createElement("h3");
            title.textContent = (element.name).toUpperCase();

            const divId = document.createElement("div");
            const labelId = document.createElement("b");
            labelId.textContent = "Id: ";
            const id = document.createElement("p");
            id.textContent = element.id;
            divId.appendChild(labelId);
            divId.appendChild(id);

            const divDosage = document.createElement("div");
            const labelDosage = document.createElement("b");
            labelDosage.textContent = "Dosagem: ";
            const dosage = document.createElement("p");
            dosage.textContent = element.dosage;
            divDosage.appendChild(labelDosage);
            divDosage.appendChild(dosage);

            const divHour = document.createElement("div");
            const labelHour = document.createElement("b");
            labelHour.textContent = "Horário: ";
            const hour = document.createElement("p");
            hour.textContent = element.hour;
            divHour.appendChild(labelHour);
            divHour.appendChild(hour);

            const divObs = document.createElement("div");
            const labelObs = document.createElement("b");
            labelObs.textContent = "Descrição: ";
            const obs = document.createElement("p");
            if (element.desc == undefined || element.desc == "") {
                obs.textContent = "Nenhuma";
            } else {
                obs.textContent = element.desc;
            }
            divObs.appendChild(labelObs);
            divObs.appendChild(obs);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir🗑️";
            deleteButton.setAttribute("onclick", "deleteReminder(this)")

            reminder.appendChild(title);
            reminder.appendChild(divId);
            reminder.appendChild(divDosage);
            reminder.appendChild(divHour);
            reminder.appendChild(divObs);
            reminder.appendChild(deleteButton);

            div.appendChild(reminder);
        });
    } else {
        const text = document.createElement("p");
        text.textContent = "(Nenhum lembrete cadastrado)";
        div.appendChild(text);
    }
}


function deleteReminder(button) {
    const reminder = button.parentElement;
    const id = reminder.getAttribute("id");

    fetch("https://tomora.onrender.com/remindersDelete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao deletar lembrete. Verifique se ele realmente existe.");
        });
}

function showForm() {
    form = document.querySelector("form");
    form.style.display = "flex";

    btnShow = document.querySelector("#button-show");
    btnShow.style.display = "none";
}

function createReminder() {
    const inputName = document.querySelector("#input-name");
    const inputDosage = document.querySelector("#input-dosage");
    const inputDesc = document.querySelector("#input-desc");
    const inputHour = document.querySelector("#input-hour");

    const name = inputName.value;
    const dosage = inputDosage.value;
    const desc = inputDesc.value;
    const hour = inputHour.value;

    if (name == "" || dosage == "" || hour == "") {
        const formulario = document.querySelector("form");
        const texto = document.createElement("p");
        texto.textContent = "Por favor, preencha os campos corretamente";
        formulario.appendChild(texto);
    } else {
        if (localStorage.getItem("linkedId") != null && localStorage.getItem("userId") != null) {
            let userId = localStorage.getItem("linkedId");
            // Se linkedId não existir ou for vazio, usa userId
            if (!userId || userId === "" || userId === "null" || userId === null) {
                userId = localStorage.getItem("userId");
            }

            const novoLembrete = { name, userId, dosage, desc, hour, };

            fetch("https://tomora.onrender.com/remindersCreate", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoLembrete)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro ao criar lembrete");
                    }
                    return response.json();
                })
                .then(() => {
                    // Limpa o formulário
                    const formulario = document.querySelector("form");
                    formulario.style.display = "none";

                    // Mostra o botão de exibir formulário novamente
                    const btnShow = document.querySelector("main button");
                    btnShow.style.display = "flex";

                    // Atualiza os lembretes
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Erro:", error);
                });
        }
    }
}

//Parte do histórico
function getHistory() {
    let searchId = localStorage.getItem("linkedId");
    // Se linkedId não existir ou for vazio, usa userId
    if (!searchId || searchId === "" || searchId === "null" || searchId === null) {
        searchId = localStorage.getItem("userId");
    }

    fetch("https://tomora.onrender.com/historySearch", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // avisar que o corpo é JSON
        },
        body: JSON.stringify({ searchId })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json(); // aqui transforma a resposta em JSON
    })
        .then(data => {
            console.log('Dados recebidos:', data); // aqui tem os dados reais do backend
            showHistory(data)
        })
        .catch(error => {
            console.error('Erro:', error);
        });

}

function showHistory(history) {
    const div = document.querySelector("#historicos");
    if (history.length > 0) {
        const lastHistory = document.querySelectorAll(".historico");
        if (lastHistory) {
            lastHistory.forEach(element => {
                div.removeChild(element);
            });
        }

        history.forEach(element => {
            const history = document.createElement("div");
            history.setAttribute("class", "historico");
            history.setAttribute("id", element.id);

            const title = document.createElement("h3");
            title.textContent = (element.name).toUpperCase();

            const divId = document.createElement("div");
            const labelId = document.createElement("b");
            labelId.textContent = "Id:"
            const id = document.createElement("p");
            id.textContent = element.id;
            divId.appendChild(labelId);
            divId.appendChild(id);

            const divReminderId = document.createElement("div");
            const labelReminderId = document.createElement("b");
            labelReminderId.textContent = "Id do lembrete:"
            const reminderId = document.createElement("p");
            reminderId.textContent = element.reminderId;
            divReminderId.appendChild(labelReminderId);
            divReminderId.appendChild(reminderId);

            const divHour = document.createElement("div");
            const labelHour = document.createElement("b");
            labelHour.textContent = "Horário:"
            const hour = document.createElement("p");
            hour.textContent = element.hour;
            divHour.appendChild(labelHour);
            divHour.appendChild(hour);

            const divTaken = document.createElement("div");
            const labelTaken = document.createElement("b");
            labelTaken.textContent = "Status:"
            const taken = document.createElement("p");
            if (element.taken === true) {
                taken.textContent = "Foi tomado";
                title.style.color = "#B7E4C7"
            } else {
                taken.textContent = "Não foi tomado";
                title.style.color = "red"
            }
            divTaken.appendChild(labelTaken);
            divTaken.appendChild(taken);


            history.appendChild(title);
            history.appendChild(divId);
            history.appendChild(divReminderId);
            history.appendChild(divHour);
            history.appendChild(divTaken);

            div.appendChild(history)

        });
    } else {
        const text = document.createElement("p");
        text.textContent = "(Nenhum histórico encontrado)";
        div.appendChild(text);
    }


}