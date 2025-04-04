// Importando o dayjs
import dayjs from "dayjs";
// Importando as horas disponíveis
import { OpeningHours } from "../../utils/opening-hours.js";

import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours")

export function hoursLoad({ date }) {
    // limpa a lista de horários
    hours.innerHTML = ""

    const opening = OpeningHours.map((hour) => { // A função map é usada para iterar sobre o array OpeningHours e retornar um novo array
        //recupera somente a hora
        const [schedulesHour] = hour.split(":") // destrutura o array para pegar somente a hora
        // console.log(hour)
        // console.log(schedulesHour)

        // adiciona a hora no date e verifica se está no passado
        const isHourPast = dayjs(date).add(schedulesHour, "hour").isAfter(dayjs())
        // console.log(schedulesHour, isHourPast)

        return {
            hour,
            available: isHourPast,
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