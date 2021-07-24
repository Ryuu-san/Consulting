<template>
  <div class="editing_patient">
    <div class="editing_patient__input">
        <span>Фамилия</span>
        <input type="text" v-model="editing_patient.family" @change="validateFields('family', 'string')">
        <p class="input-errors" v-if="validate_list.family_errors">Введите корректно фамилию</p>
    </div>
    <div class="editing_patient__input">
        <span>Имя</span>
        <input type="text" v-model="editing_patient.name" @change="validateFields('name', 'string')">
        <p class="input-errors" v-if="validate_list.name_errors">Введите корректно имя</p>
    </div>
    <div class="editing_patient__input">
        <span>Отчество</span>
        <input type="text" v-model="editing_patient.patronymic" @change="validateFields('patronymic', 'string')">
        <p class="input-errors" v-if="validate_list.patronymic_errors">Введите корректно отчество</p>
    </div>
    <div class="editing_patient__input">
        <span>Дата рождения</span>
        <date-picker value-type="DD.MM.YYYY" v-model="editing_patient.date_birth" @change="validateFields('date_birth', 'date')"></date-picker>
        <p class="input-errors" v-if="validate_list.date_birth_errors">Введите день рождения</p>
    </div>
    <div class="editing_patient__input">
        <span>Пол</span>
        <input type="text" v-model="editing_patient.gender" @change="validateFields('gender', 'string')">
        <p class="input-errors" v-if="validate_list.gender_errors">Введите корректно пол</p>
    </div>
    <div class="editing_patient__input">
        <span>СНИЛС</span>
        <input type="text" v-model="editing_patient.snils" @change="validateFields('snils', 'number')">
        <p class="input-errors" v-if="validate_list.snils_errors">Введите действительный СНИЛС в формате 12345678999</p>
    </div>
    <div class="editing_patient__input">
        <span>Физиологические данные пациента</span>
        <textarea type="text" v-model="editing_patient.physiological_data_patient"></textarea>
    </div>
    <p v-if="validate_errors" class="input-errors">Заполните корректно поля выше</p>
    <div class="editing_patient__control-buttons">
        <button @click="back"><i class="fa fa-reply" aria-hidden="true"></i></button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name:'editing_patient',
  components: { DatePicker },
  data(){
      return{
          editing_patient: [],
          params: this.params.patient,
          //Массив который отвечает за 
          //валидацию и логику внутри нее
          validate_list: {
            family: true,
            family_errors: false,
            name: true,
            name_errors: false,
            patronymic: true,
            patronymic_errors: false,
            date_birth: true,
            date_birth_errors: false,
            gender: true,
            gender_errors: false,
            snils: true,
            snils_errors: false
          },
          validate: true,
          validate_errors: false
      }
  },
  inject: ['params'],
  methods:{
    //Валидация
    validateFields(data, type){
        if(type === 'string' && this.editing_patient[data].match(/\d/g) === null){
            this.validate_list[data] = true
            this.validate_list[data + '' + '_errors'] = false
        }else if(type === 'string'){
            this.validate_list[data + '' + '_errors'] = true
            this.validate_list[data] = false           
        }

        if(type === 'number' && this.editing_patient[data].match(/[А-Яа-я-A-Za-z]/g) === null){
            if(data === 'snils'){
                let result = null
                let count = 9
                let check_numbers = Number(this.editing_patient[data].substring(9, 11))
                for(let i = 0; i !== this.editing_patient[data].length - 2; i++){
                    result += this.editing_patient[data][i] * count
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

        if(type === 'date' && this.editing_patient[data]!== null && this.editing_patient[data].match(/^(0?[1-9]|[12][0-9]|3[01])[\.\-](0?[1-9]|1[012])[\.\-]\d{4}$/) !== null){
            this.validate_list[data] = true
            this.validate_list[data + '' + '_errors'] = false
        }else if(type === 'date'){
            this.validate_list[data + '' + '_errors'] = true
            this.validate_list[data] = false 
        }
            
        this.disabledButton()
    },
    //Не прошли валидацию? Кнопка закрытия не будет работать
    disabledButton(){
        if(this.validate_list.family && this.validate_list.name && this.validate_list.patronymic && this.validate_list.date_birth && this.validate_list.gender && this.validate_list.snils){
            this.validate = true
        }else{
            this.validate = false
        }
    },
    //Закрыть блок и сохранить все изменения
    back(){
        this.validateFields()
        if(this.validate){
            this.validate_errors = false
            this.params.editing = false
        }else{
            this.validate_errors = true
        }
    }
  },
  mounted(){
    this.editing_patient = this.params.editing_patient
  }
}
</script>

<style lang="scss" scoped>
    .editing_patient{
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

