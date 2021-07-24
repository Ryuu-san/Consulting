<template>
  <div id="app">
    <patient v-if="params.pat_or_con"></patient>
    <consultation v-if="!params.pat_or_con"></consultation>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      params: this.params
    }
  },
  components: {},
  methods:{},
  computed: {
    params() {
      return this.$store.state
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
    border: none;
    background: #c7ffa6;
    border-radius: 0px 0px 5px 5px;
    padding: 5px;
    margin: 0 5px;
    cursor: pointer;
    font-size: 1rem;
}
.button-control{
  background: none;
  color:#a8a8a8;
  &__remove{
    color:red;
  }
}
svg {
    min-width: 18px;
    min-height: 18px;
}
input{
  padding: 10px;
}
.input-errors{
  color:red;
  font-size: 0.75rem;
  text-align: right;
  margin: 0;
  margin-top: 2px;
}
</style>
