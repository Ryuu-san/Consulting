import Patient from './patient_module'
import Consultation from './consultation_module'

export default {
    modules: {
        patient: Patient,
        consultation: Consultation
    },
    state: {
        //Свитч, отвечает за отображение: 
        //Показать модуль пациента или 
        //модуль консультации?
        pat_or_con: true
    },
    mutations: {},
    actions: {}
}