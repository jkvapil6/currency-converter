<template>
  <div>
    <h2>
      Currency Convertor
    </h2>
    <form @submit="onSubmit">
      <input placeholder="Dollar" type="text" v-model="dollar">
      <input placeholder="Czk" type="text" v-model="czk">
      <input type="submit" value="Convert">
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      czk: '',
      dollar: ''
    }
  },
  methods: {
    ...mapActions(['convert', 'fetchExchangeRates']),
    onSubmit(e) {
      e.preventDefault()
      this.convert(this.czk)
      
    }
  },
  created() {
    this.fetchExchangeRates()
  },
  computed: {
    czkToDollars() {
      return this.$store.getters.exchangeCzkToDollars(this.czk)
    }
  } 
}
</script>