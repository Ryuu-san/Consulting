<template>
  <div class="create-patient">
    <div class="create-patient__input">
        <span>Фамилия</span>
        <input type="text" placeholder="" v-model="new_patient.family" @change="validateFields('family', 'string')">
        <p class="input-errors" v-if="validate_list.family_errors">Введите корректно фамилию</p>
    </div>
    <div class="create-patient__input">
        <span>Имя</span>
        <input type="text" placeholder="" v-model="new_patient.name" @change="validateFields('name', 'string')">
        <p class="input-errors" v-if="validate_list.name_errors">Введите корректно имя</p>
    </div>
    <div class="create-patient__input">
        <span>Отчество</span>
        <input type="text" placeholder="" v-model="new_patient.patronymic" @change="validateFields('patronymic', 'string')">
        <p class="input-errors" v-if="validate_list.patronymic_errors">Введите корректно отчество</p>
    </div>
    <div class="create-patient__input">
        <span>Дата рождения</span>
        <date-picker value-type="DD.MM.YYYY" v-model="new_patient.date_birth" @change="validateFields('date_birth', 'date')"></date-picker>
        <p class="input-errors" v-if="validate_list.date_birth_errors">Введите день рождения</p>
    </div>
    <div class="create-patient__input">
        <span>Пол</span>
        <input type="text" placeholder="" v-model="new_patient.gender" @change="validateFields('gender', 'string')">
        <p class="input-errors" v-if="validate_list.gender_errors">Введите корректно пол</p>
    </div>
    <div class="create-patient__input">
        <span>СНИЛС</span>
        <input type="text" placeholder="" v-model="new_patient.snils" @change="validateFields('snils', 'number')">
        <p class="input-errors" v-if="validate_list.snils_errors">Введите действительный СНИЛС в формате 12345678999</p>
    </div>
    <div class="create-patient__input">
        <span>Физиологические данные пациента</span>
        <input type="text" placeholder="" v-model="new_patient.physiological_data_patient">
    </div>
    <p v-if="validate_errors" class="input-errors">Заполните корректно поля выше</p>
    <div class="create-patient__control-buttons">
        <button @click="back"><i class="fa fa-reply" aria-hidden="true"></i></button>
        <button @click="savePatient"><i class="fa fa-share" aria-hidden="true"></i></button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    name: 'create_patient',
    inject: [
      'params'
    ],
    components: { DatePicker },
    data(){
        return{
            time1: null,
            new_patient:{
                id: '',
                family: '',
                name: '',
                patronymic: '',
                date_birth: '',
                gender: '',
                snils: '',
                physiological_data_patient: '',
                delete: false,
                patient_search: ''
            },
            validate_list: {
                family: false,
                family_errors: false,
                name: false,
                name_errors: false,
                patronymic: false,
                patronymic_errors: false,
                date_birth: false,
                date_birth_errors: false,
                gender: false,
                gender_errors: false,
                snils: false,
                snils_errors: false
            },
            validate: false,
            validate_errors: false
        }
    },
    methods:{
        back(){
            this.$emit('backPatient')
        },
        randomId(){
            let randomNumber = (Math.random() * 256 + '').replace(/\./g, "").substr(0, 9)
            this.new_patient.id = randomNumber
        },
        validateFields(data, type){
            if(type === 'string' && this.new_patient[data].match(/\d/g) === null){
                this.validate_list[data] = true
                this.validate_list[data + '' + '_errors'] = false
            }else if(type === 'string'){
                this.validate_list[data + '' + '_errors'] = true
                this.validate_list[data] = false           
            }

            if(type === 'number' && this.new_patient[data].match(/[А-Яа-я-A-Za-z]/g) === null){
                if(data === 'snils'){
                    let result = null
                    let count = 9
                    let check_numbers = Number(this.new_patient[data].substring(9, 11))
                    for(let i = 0; i !== this.new_patient[data].length - 2; i++){
                        result += this.new_patient[data][i] * count
                        count--
                    }
                    if(result === check_numbers){
                        this.validate_list[data] = true
                        this.validate_list[data + '' + '_errors'] = false
                    }else{
                        this.validate_list[data + '' + '_errors'] = true
                        this.validate_list[data] = false 
                    }
                }else{
                    this.validate_list[data] = true
                    this.validate_list[data + '' + '_errors'] = false
                }
            }else if(type === 'number'){
                this.validate_list[data + '' + '_errors'] = true
                this.validate_list[data] = false 
            }
            if(type === 'date' && this.new_patient[data]!== null && this.new_patient[data].match(/^(0?[1-9]|[12][0-9]|3[01])[\.\-](0?[1-9]|1[012])[\.\-]\d{4}$/) !== null){
                this.validate_list[data] = true
                this.validate_list[data + '' + '_errors'] = false
            }else if(type === 'date'){
                this.validate_list[data + '' + '_errors'] = true
                this.validate_list[data] = false 
            }
            
            this.disabledButton()
        },
        disabledButton(){
            if(this.validate_list.family && this.validate_list.name && this.validate_list.patronymic && this.validate_list.date_birth && this.validate_list.gender && this.validate_list.snils){
                this.validate = true
            }else{
                this.validate = false
            }
        },
        //Создать паицента
        savePatient(){
            this.validateFields()
            if(this.validate){
                this.randomId()
                this.new_patient.patient_search = this.new_patient.family + this.new_patient.name + this.new_patient.patronymic + this.new_patient.snils
                this.validate_errors = false
                this.params.pat_or_con = false
                this.params.consultation.id_patient = this.new_patient.id
                this.params.patient.patient_list.push(this.new_patient)
                this.params.consultation.create = false
            }else{
                this.validate_errors = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .create-patient{
        width: 60%;
        margin: auto;
        display: flex;
        flex-direction: column;
        background: #f4f4f4;
        &__input{
            display: flex;
            flex-direction: column;
            span{
                padding:10px;
            }
            .mx-datepicker{
                width: auto;
            }
        }
        &__control-buttons{
            display: flex;
            justify-content: center;
            padding: 10px;
            button{
                background: none;
                color:#a8a8a8
            }
        }
    }
</style>
