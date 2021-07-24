<template>
  <div class="create_consultation">
    <p>Создание консультации</p>
    <div class="create_consultation_input">
        <span>Дата</span>
        <date-picker value-type="DD.MM.YYYY" v-model="new_consultation.date" @change="validateFields('date', 'date')"></date-picker>
        <p v-if="validate_list.date_errors" class="input-errors">{{validate_list.data_error_text}}</p>
    </div>
    <div class="create_consultation_input">
        <span>Время</span>
        <date-picker v-model="new_consultation.time" value-type="format" format="HH:mm" type="time" @change="validateFields('time', 'time')"></date-picker>
        <p v-if="validate_list.time_errors" class="input-errors">{{validate_list.time_error_text}}</p>
    </div>
    <div class="create_consultation_input">
        <span>Симптомы</span>
        <textarea type="text" placeholder="" v-model="new_consultation.symptoms"></textarea>
    </div>
    <p v-if="validate_errors" class="input-errors">Заполните форму выше</p>
    <div class="create_consultation__control-buttons">
        <button @click="next"><i class="fa fa-reply" aria-hidden="true"></i></button>
        <button @click="create"><i class="fa fa-check" aria-hidden="true"></i></button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name:'create_consultation',
  inject: [
    'params'
  ],
  components: { DatePicker },
  computed:{
    //Проверяет есть ли записать 
    //консультации на это же время
    uniqueTime(){
        return this.params.consultation.consultation_list.filter((item)=>{
            return item.id_patient === this.params.consultation.id_patient && item.delete === false
        })
        .filter((item)=>{
            return item.date === this.new_consultation.date && item.time === this.new_consultation.time
        })
    }
  },
  data(){
      return{
        new_consultation:{
            id: 1,
            id_patient: this.params.consultation.id_patient,
            date: '',
            time: '',
            symptoms: '',
            delete: false
        },
        validate_list: {
            date: false,
            date_errors: false,
            data_error_text: '',
            time: false,
            time_errors: false,
            time_error_text: '',
        },
        validate: false,
        validate_errors: false
      }
  },
  methods:{
      //Закрыть модуль
      next(){
        this.params.pat_or_con = true
      },
      randomId(){
          let randomNumber = (Math.random() * 256 + '').replace(/\./g, "").substr(0, 9)
          this.new_consultation.id = randomNumber
      },

      //Валидация
      validateFields(data, type){
        let app = this
        
        function validateDate(data, type){
            if(type === 'date' && app.uniqueTime.length === 0 && app.new_consultation[data]!== null && app.new_consultation[data].match(/^(0?[1-9]|[12][0-9]|3[01])[\.\-](0?[1-9]|1[012])[\.\-]\d{4}$/) !== null){
                app.validate_list[data] = true
                app.validate_list[data + '' + '_errors'] = false
            }else if(type === 'date'){
                if(app.uniqueTime.length !== 0){
                    app.validate_list.data_error_text = 'На данную дату и время уже назначена консультация'
                }else{
                    app.validate_list.data_error_text = 'Выберите дату'
                }
                app.validate_list[data + '' + '_errors'] = true
                app.validate_list[data] = false 
            }
        }

        
        function validateTime(data, type){
            if(type === 'time' && app.uniqueTime.length === 0 && app.new_consultation[data]!== null && app.new_consultation[data].match(/^(0[8-9]|1[0-9]|1[0-9]):[0-5][0-9]$/) !== null){
                app.validate_list[data] = true
                app.validate_list[data + '' + '_errors'] = false
            }else if(type === 'time'){
                if(app.uniqueTime.length !== 0){
                    app.validate_list.time_error_text = 'На данное время уже назначена консультация'
                }else{
                    app.validate_list.time_error_text = 'Выберите время: рабочий день с 08:00 до 20:00'
                }
                app.validate_list[data + '' + '_errors'] = true
                app.validate_list[data] = false 
            }
        }

        if(type === 'date' && this.uniqueTime.length === 0 && this.new_consultation[data]!== null && this.new_consultation[data].match(/^(0?[1-9]|[12][0-9]|3[01])[\.\-](0?[1-9]|1[012])[\.\-]\d{4}$/) !== null){
            validateTime('time', 'time')
            this.validate_list[data] = true
            this.validate_list[data + '' + '_errors'] = false
        }else if(type === 'date'){
            if(this.uniqueTime.length !== 0){
                this.validate_list.data_error_text = 'На данную дату и время уже назначена консультация'
            }else{
                this.validate_list.data_error_text = 'Выберите дату'
            }
            this.validate_list[data + '' + '_errors'] = true
            this.validate_list[data] = false 
        }
        if(type === 'time' && this.uniqueTime.length === 0 && this.new_consultation[data]!== null && this.new_consultation[data].match(/^(0[8-9]|1[0-9]|1[0-9]):[0-5][0-9]$/) !== null){
            validateDate('date', 'date')
            this.validate_list[data] = true
            this.validate_list[data + '' + '_errors'] = false
        }else if(type === 'time'){
            if(this.uniqueTime.length !== 0){
                this.validate_list.time_error_text = 'На данное время уже назначена консультация'
            }else{
                this.validate_list.time_error_text = 'Выберите время: рабочий день с 08:00 до 20:00'
            }
            this.validate_list[data + '' + '_errors'] = true
            this.validate_list[data] = false 
        }

        this.disabledButton()
      },

      //Не прошли валидацию? Кнопка создания не будет работать
      disabledButton(){
        if(this.validate_list.date && this.validate_list.time){
            this.validate = true
        }else{
            this.validate = false
        }
      },
      create(){
          this.validateFields()
          if(this.validate){
            this.randomId()
            this.params.pat_or_con = true
            this.validate_errors = false
            this.params.patient.view_or_create = true
            this.params.consultation.consultation_list.push(this.new_consultation)
          }else{
              this.validate_errors = true
          }
      },
  }
}
</script>

<style lang="scss" scoped>
    .create_consultation{
        display: flex;
        width: 60%;
        margin: auto;
        flex-direction: column;
        background: #f4f4f4;
        &_input {
            display: flex;
            flex-direction: column;

            span{
                padding: 10px;
            }
        }
        .mx-datepicker{
            width: auto;
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
