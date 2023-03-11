const Paciente = require("../models/Paciente");
const consultaModel = require("./../models/Consulta");
function getDateParts(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return { year, month };
}

function populateResult(result){
    for (let i = 1; i <= 12; i++) {
        const key = i.toString().padStart(2, "0");
        if (!(key in result)) {
            result[key] = 0;
        }
    }
    return result
}
module.exports = {
    buscarTodos: async (user) => {
        try {
            const results = await consultaModel.find().populate('paciente')
            const minhasConsultas = results.filter(result => result?.paciente?.email == user.email)
            const result = {};
            if(minhasConsultas.length == 0) {
                return populateResult(result)
            }
            for (let item of minhasConsultas) {
                const { year, month } = getDateParts(item.data);
                const key = month.toString();
                if (key in result) {
                    result[key]++;
                } else {
                    result[key] = 1;
                }
            }


            return populateResult(result)
        } catch (error) {
            throw {message: error.message, status: 500};
        }
    }
}
