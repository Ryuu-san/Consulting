<template>
  <div>
    <view_patient v-if="params.view_or_create && !params.editing && !params.patient_all_consultation" @createPatient="createPatient" ></view_patient>
    <create_patient v-if="!params.view_or_create && !params.editing && !params.patient_all_consultation" @backPatient="backPatient"></create_patient>
    <editing_patient v-if="params.editing"></editing_patient>
    <patient_consultation v-if="params.patient_all_consultation"></patient_consultation>
  </div>
</template>

<script>
import view_patient from './modules/view_patient'
import create_patient from './modules/create_patient'
import editing_patient from './modules/editing_patient'
import patient_consultation from './modules/patient_consultation'

export default {
  name: 'patient',
  inject: [
    'params'
  ],
  data(){
    return{
        params: this.params.patient
    }
  },
  components:{
      view_patient,
      create_patient,
      editing_patient,
      patient_consultation
  },
  methods:{
    createPatient(){
        this.params.view_or_create = false
    },
    backPatient(){
        this.params.view_or_create = true
    }
  }
}
</script>