<template>
  <div>
    <create_consultation v-if="!params.create && !params.editing"></create_consultation>
    <editing_consultation v-if="params.editing"></editing_consultation>
  </div>
</template>

<script>
import create_consultation from './modules/create_consultation'
import editing_consultation from './modules/editing_consultation'

export default {
  name: 'consultation',
  inject: [
    'params'
  ],
  data(){
    return{
      params: this.params.consultation
    }
  },
  components:{
      create_consultation,
      editing_consultation
  },
  methods:{
   
  }
}
</script>

