import { schedulesDay } from "./schedules/load.js"

// Adiciona um ouvinte de evento para o evento 'DOMContentLoaded' no documento
document.addEventListener("DOMContentLoaded", () => {
    schedulesDay()
})