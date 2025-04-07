import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"

const periods = document.querySelectorAll(".period")

// gerar evento de click para cada lista 
periods.forEach((period) => {
    // captura o evento de click na lista
    period.addEventListener("click", async (event) => {
        if (event.target.classList.contains("cancel-icon")) {
            // obtem a li pai do elemento clicado
            const item = event.target.closest("li")
            // obtem o id do agendamento
            const { id } = item.dataset


            // verifica se o id do agendamento foi obtido
            if (id) {
                const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?")

                // verifica se o usuário confirmou
                if (isConfirm) {
                    //faz a requisição na API para cancelar o agendamento
                    await scheduleCancel({ id })
                    // // recarrega a lista de agendamentos
                    schedulesDay()

                }
            }
        }
    })
})
