<template>
  <div class="editing_consultation">
    <div>
        <div class="editing_consultation_input">
            <span>Дата</span>
            <date-picker value-type="DD.MM.YYYY" v-model="editing_consultation.date" @change="validateFields('date', 'date')"></date-picker>
            <p v-if="validate_list.date_errors" class="input-errors">{{validate_list.data_error_text}}</p>
        </div>
        <div class="editing_consultation_input">
            <span>Дата</span>
            <date-picker v-model="editing_consultation.time" value-type="format" format="HH:mm" type="time" @change="validateFields('time', 'time')"></date-picker>
            <p v-if="validate_list.time_errors" class="input-errors">{{validate_list.time_error_text}}</p>
        </div>
        <div class="editing_consultation_input">
            <span>Симптомы</span>
            <textarea type="text" v-model="editing_consultation.symptoms"></textarea>
        </div>
    </div>
    <p v-if="validate_errors" class="input-errors">Введите корректные данные</p>
    <div class="editing_consultation__control-buttons">
        <button @click="back"><i class="fa fa-reply" aria-hidden="true"></i></button>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'editing_consultation',
  components: { DatePicker },
  computed:{
    uniqueTime(){
        return this.params.consultation.consultation_list.filter((item)=>{
            return item.id_patient === this.params.consultation.id_patient && item.delete === false
        })
        .filter((item)=>{
            return item.date === this.editing_consultation.date && item.time === this.editing_consultation.time
        })
    }
  },
  data(){
      return{
          editing_consultation: [],
          params: this.params,
          validate_list: {
            date: true,
            date_errors: false,
            data_error_text: '',
            time: true,
            time_errors: false,
            time_error_text: '',
          },
          validate: true,
          validate_errors: false
      }
  },
  inject: ['params'],
  methods:{
    validateFields(data, type){
        let app = this

        function validateDate(data, type){
            if(type === 'date' && app.uniqueTime.length === 1 && app.editing_consultation[data]!== null && app.editing_consultation[data].match(/^(0?[1-9]|[12][0-9]|3[01])[\.\-](0?[1-9]|1[012])[\.\-]\d{4}$/) !== null){
                app.validate_list[data] = true
                app.validate_list[data + '' + '_errors'] = false
            }else if(type === 'date'){
                if(app.uniqueTime.length !== 1){
                    app.validate_list.data_error_text = 'На данную дату и время уже назначена консультация'
                }else{
                    app.validate_list.data_error_text = 'Выберите дату'
                }
                app.validate_list[data + '' + '_errors'] = true
                app.validate_list[data] = false 
            }
        }

        function validateTime(data, type){
            if(type === 'time' && app.uniqueTime.length === 1 && app.editing_consultation[data]!== null && app.editing_consultation[data].match(/^(0[8-9]|1[0-9]|1[0-9]):[0-5][0-9]$/) !== null){
                app.validate_list[data] = true
                app.validate_list[data + '' + '_errors'] = false
            }else if(type === 'time'){
                if(app.uniqueTime.length !== 1){
                    app.validate_list.time_error_text = 'На данное время уже назначена консультация'
                }else{
                    app.validate_list.time_error_text = 'Выберите время: рабочий день с 08:00 до 20:00'
                }
                app.validate_list[data + '' + '_errors'] = true
                app.validate_list[data] = false 
            }
        }

        
        if(type === 'date' && this.uniqueTime.length === 1 && this.editing_consultation[data]!== null && this.editing_consultation[data].match(/^(0?[1-9]|[12][0-9]|3[01])[\.\-](0?[1-9]|1[012])[\.\-]\d{4}$/) !== null){
            validateTime('time', 'time')
            this.validate_list[data] = true
            this.validate_list[data + '' + '_errors'] = false
        }else if(type === 'date'){
            if(this.uniqueTime.length !== 1){
                this.validate_list.data_error_text = 'На данную дату и время уже назначена консультация'
            }else{
                this.validate_list.data_error_text = 'Выберите дату'
            }
            this.validate_list[data + '' + '_errors'] = true
            this.validate_list[data] = false 
        }
          
        if(type === 'time' && this.uniqueTime.length === 1 && this.editing_consultation[data].match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) !== null){
            validateDate('date', 'date')
            this.validate_list[data] = true
            this.validate_list[data + '' + '_errors'] = false
        }else if(type === 'time'){
            if(this.uniqueTime.length !== 1){
                this.validate_list.time_error_text = 'На данное время уже назначена консультация'
            }else{
                this.validate_list.time_error_text = 'Выберите время: рабочий день с 08:00 до 20:00'
            }
            this.validate_list[data + '' + '_errors'] = true
            this.validate_list[data] = false 
        }

        this.disabledButton()
    },
    disabledButton(){
        if(this.validate_list.date && this.validate_list.time){
            this.validate = true
        }else{
            this.validate = false
        }
    },
    back(){
        this.validateFields()
        if(this.validate){
          this.params.pat_or_con = true
          this.validate_errors = false
          this.params.consultation.create = true
          this.params.consultation.editing = false
        }else{
            this.validate_errors = true
        }
    }
  },
  mounted(){
    this.editing_consultation = this.params.consultation.editing_consultation
  }
}
</script>

<style lang="scss" scoped>
    .editing_consultation{
        display: flex;
        width: 60%;
        margin: auto;
        flex-direction: column;
        background: #f4f4f4;
        &_input{
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

