import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { schedulesShow } from "../schedules/show";
import { hoursLoad } from "../form/hours-load";


//seleciona o input de data
const selectedDate = document.getElementById("date");

// Função de carregamento de agendamentos
export async function schedulesDay() {
    // obtem a data do input
    const date = selectedDate.value

    // busca na api os agendamentos do dia selecionado
    const dailySchedules = await scheduleFetchByDay({ date })

    // exibe os agendamentos 
    schedulesShow({ dailySchedules })

    //renderiza as horas disponíveis 
    hoursLoad({ date, dailySchedules })
}