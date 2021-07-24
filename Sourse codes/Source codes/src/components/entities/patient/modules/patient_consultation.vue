<template>
  <div class="patient_consultation">
    <div class="patient_consultation__list">
        <div class="patient_consultation_input">
            <!-- <span>Фамилия</span> -->
            <p>{{patient[0].family}}</p>
        </div>
        <div class="patient_consultation_input">
            <!-- <span>Имя</span> -->
            <p>{{patient[0].name}}</p>
        </div>
        <div class="patient_consultation_input">
            <!-- <span>Отчество</span> -->
            <p>{{patient[0].patronymic}}</p>
        </div>
        <div class="patient_consultation_input">
            <!-- <span>День рождения</span> -->
            <p>{{patient[0].date_birth}}</p>
        </div>
        <div class="patient_consultation_input">
            <!-- <span>Пол</span> -->
            <p>{{patient[0].gender}}</p>
        </div>
        <div class="patient_consultation_input">
            <!-- <span>СНИЛС</span> -->
            <p>{{patient[0].snils}}</p>
        </div>
        <div class="patient_consultation_input">
            <!-- <span>Симптомы</span> -->
            <p>{{patient[0].physiological_data_patient}}</p>
        </div>
    </div>
    <p>Консультации</p>
    <div class="consultation-elem">
        <div v-for="consultation in sortedConsultation" :key="consultation.id" class="patient_consultation__list">
            <p>Дата: {{consultation.date}}</p>
            <p>Время: {{consultation.time}}</p>
            <p>Симптомы: {{consultation.symptoms}}</p>
            <div class="ff">
                <button @click="settingsConsultation(consultation)" class="button-control"><i class="fa fa-cog" aria-hidden="true"></i></button>
                <button @click="remove(consultation)" class="button-control button-control__remove"><i class="fa fa-times" aria-hidden="true"></i></button>
            </div>
        </div>
        <div class="patient_consultation__control-buttons">
            <button @click="back"><i class="fa fa-reply" aria-hidden="true"></i></button>
            <button @click="addConsultation"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'patient_consultation',
  data(){
      return{
          params: this.params,
          all_consultation: []
      }
  },
  inject: ['params'],
  computed:{
    //Сортировка
    sortedConsultation(){
        return this.all_consultation.filter((item) => !item.delete)
    },
    patient(){
        return this.params.patient.patient_list.filter((item)=>{
            return item.id === this.params.patient.key_patient
        })
    }
  },
  methods:{
    //Закрыть блок
    back(){
        this.params.patient.patient_all_consultation = false
    },
    //Удалить консультацию
    remove(item){
        item.delete = true
    },
    //Открыть модуль создания
    addConsultation(){
        this.params.consultation.id_patient = this.params.patient.key_patient
        this.params.patient_all_consultation = false
        this.params.pat_or_con = false
        this.params.consultation.create = false
    },
    //Открыть модуль редактирования
    settingsConsultation(data){
        this.params.consultation.editing_consultation = data
        this.params.pat_or_con = false
        this.params.consultation.create = false
        this.params.consultation.editing = true
    }
  },
  mounted(){
    this.all_consultation = this.params.consultation.consultation_list.filter((item)=>{
        return item.id_patient === this.params.patient.key_patient
    })
  }
}
</script>

<style lang="scss" scoped>
    .patient_consultation{
        display: flex;
        width: 60%;
        margin: auto;
        flex-direction: column;
        background: #f4f4f4;
        &__list{
            display: flex;
            justify-content: space-around;
            p{
                margin: 10px;
            }
        }
        &_input{
            margin-top: 10px;
            p{
                padding-top:15px; 
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
    .consultation-elem{
        
    }
</style>

