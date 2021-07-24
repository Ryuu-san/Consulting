<template>
  <div>
    <div class="view_patient">
      <p>Список всех пациентов</p>
      <div class="view_patient__container">
        <input type="text" placeholder="Search" v-model="search_title">
        <div class="view_patient__search-categories">
          <button @click="sortPatients('family')">Family</button>
          <button @click="sortPatients('name')">Name</button>
          <button @click="sortPatients('patronymic')">Patronymic</button>
          <button @click="sortPatients('snils')">Snils</button>
        </div>
        <div v-for="patient in filteredUsers" :key="patient.id" class="view_patient__list">
          <div class="patient-list__item">
            <p>{{patient.family}}</p>
            <p>{{patient.name}}</p>
            <p>{{patient.patronymic}}</p>
            <p>{{patient.snils}}</p>
            <button @click="patientConsultation(patient)" class="button-control"><i class="fa fa-id-card" aria-hidden="true"></i></button>
            <button @click="settingsPatient(patient)" class="button-control"><i class="fa fa-cog" aria-hidden="true"></i></button>
            <button @click="removePatient(patient)" class="button-control button-control__remove"><i class="fa fa-times" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </div>
    <button @click="addPatient">add patient</button>
  </div>
</template>

<script>
import fontawesome from '@fortawesome/fontawesome-free/js/all.min'

export default {
  name:'view_patient',
  inject: ['params'],
  data(){
      return{
        params: this.params.patient,
        patients: [],
        sortKey: 'patient_search',
        reverse: false,
        search_title: ''
      }
  },
  computed: {
    //Сортировка
    sortedUsers() {
      const k = this.sortKey;
      return this.patients.filter(item => !item.delete).sort((a, b) => {
        return (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0) * [ 1, -1 ][+this.reverse];
      });
    },
    filteredUsers() {
      const s = this.search_title.replace(/\s+/g, '').toLowerCase();
      return this.sortedUsers.filter(n => {
        return Object.values(n).some(m => m.toString().toLowerCase().includes(s));
      });
    },
  },
  methods:{
    //Открываем модуль создания пациента
    addPatient(){
      this.$emit('createPatient')
    },
    //Удаляем пациента
    removePatient(item){
      item.delete = true
    },
    //Сортировка
    sortPatients(sortKey) {
      this.reverse = (this.sortKey == sortKey) ? !this.reverse : false;
      this.sortKey = sortKey;
    },
    //Открываем модуль редактирования
    settingsPatient(data){
      this.params.editing_patient = data
      this.params.editing = true
    },
    //Открываем модуль пациента с его консультациями
    patientConsultation(data){
      this.params.key_patient = data.id
      this.params.patient_all_consultation = true
    }
  }, 
  mounted(){
    this.patients = this.params.patient_list
  },
  watch:{}
}
</script>

<style lang="scss" scoped>
  .view_patient{
    &__list{
      width: -webkit-fill-available;
      display: flex;
      justify-content: space-between;
      padding: 10px;
      p{
        margin: 10px;
        min-width: 10%;
        max-width: 100px;
      }
    }
    input{
      display: flex;
    }
    .patient-list__item{
      width: inherit;
      display: flex;
      justify-content: space-between;
    }
    &__container {
      width: 60%;
      margin: auto;
      background: #f4f4f4;
    }
    &__search-categories{
      width: 70%;
      display: flex;
      justify-content: space-around;
    }
  }
</style>

