// Importando o dayjs
import dayjs from "dayjs";
// Importando as horas disponíveis
import { openingHours } from "../../utils/opening-hours.js";

import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules }) {
    // limpa a lista de horários
    hours.innerHTML = "";

    //obtém a lista de horários ocupados
    const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))

    const opening = openingHours.map((hour) => { // A função map é usada para iterar sobre o array OpeningHours e retornar um novo array
        //recupera somente a hora
        const [scheduleHour] = hour.split(":") // destrutura o array para pegar somente a hora
        // console.log(hour)
        // console.log(schedulesHour)

        // adiciona a hora no date e verifica se está no passado
        const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())
        // console.log(schedulesHour, isHourPast)

        // verifica se a hora está disponível
        const available = !unavailableHours.includes(hour) && !isHourPast

        return {
            hour,
            available,
        }
    })

    //renderiza as horas disponíveis
    opening.forEach(({ hour, available }) => {
        //criando o elemento li
        const li = document.createElement("li")

        // adicionando a classe ao elemento li
        li.classList.add("hour")
        li.classList.add(available ? "hour-available" : "hour-unavailable") //verifica se a hora esta no passado

        // li.setAttribute("value", hour.hour)
        li.textContent = hour // adiciona o horário ao elemento li

        // adiciondo o header ao elemento li
        if (hour === "09:00") {
            hourHeaderAdd("Manhã")
        } else if (hour === "12:00") {
            hourHeaderAdd("Tarde")
        } else if (hour === "18:00") {
            hourHeaderAdd("Noite")
        }

        // adiciona o elemento li ao elemento pai
        hours.append(li)
    })

    // adiciona o evento de ao horários disponíveis
    hoursClick()
}

function hourHeaderAdd(title) {
    const header = document.createElement("li")

    header.classList.add("hour-period")

    // Define o texto dentro do elemento li com o valor do título fornecido
    header.textContent = title

    // Adiciona o novo elemento li como um filho do elemento 'hours' (onde os horários são exibidos)
    hours.append(header)
}