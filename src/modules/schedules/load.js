import { hoursLoad } from "../form/hours-load";

//seleciona o input de data
const selectedDate = document.getElementById("date");

// Função de carregamento de agendamentos
export function schedulesDay() {
    //obtem a data do input
    const date = selectedDate.value
    //renderiza as horas disponíveis 
    hoursLoad({ date })



}