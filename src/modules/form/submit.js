import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector("form");
const clientName = document.getElementById("client");
const selectedDate = document.getElementById("date");

// Date atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

//carrega a data atual e define a data mínima como sendo a data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

// Evento de envio do formulário
form.onsubmit = async (e) => {
    e.preventDefault();

    try {
        // recuperando o nome do cliente
        const name = clientName.value.trim();
        //verifica se o nome do cliente foi informado
        if (!name) {
            return alert("Por favor, informe o nome do cliente.")
        }

        // Recuperando o horário selecionado
        const hourSelected = document.querySelector(".hour-selected")
        //verifica se o horário foi selecionado
        if (!hourSelected) {
            return alert("Por favor, selecione um horário.")
        }

        // recupera somente a hora 
        const [hour] = hourSelected.innerHTML.split(":")

        // insere a hora na data selecionada
        const when = dayjs(selectedDate.value).add(hour, "hour")

        // gera um ID
        const id = new Date().getTime()

        //Faz o agendamento
        await scheduleNew({
            id,
            name,
            when
        })

        //recarrega os agendamentos
        await schedulesDay()

        //limpa o formulário
        clientName.value = ""

    } catch (error) {
        alert("Não foi possível realizar o agendamento.")
        console.log(error)
    }
}