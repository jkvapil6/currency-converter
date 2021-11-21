<template>
  <div>
    <h2>
      Rate 1:{{ exchangeRate }}
    </h2>
    <form>
      <label for="">Dollar</label>
      <input v-model="dollar" placeholder="Dollar">
      <label for="">Czk</label>
      <input v-model="czk" placeholder="Czk">
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  methods: {
    ...mapActions(['fetchExchangeRates']),
  },
  created() {
    this.fetchExchangeRates()
  },
  computed: {
    ...mapState({
      exchangeRate: state => state.exchangeRate,
    }),
    dollar: {
      get () {
        return this.$store.state.dollar
      },
      set (value) {
        const parsed = Number(value)
        if (Number.isNaN(parsed)) return
        this.$store.commit('setDollar', parsed)
        this.$store.commit('setCzk', parsed * this.exchangeRate)
      }
    },
    czk: {
      get () {
        return this.$store.state.czk
      },
      set (value) {
        const parsed = Number(value)
        if (Number.isNaN(parsed)) return
        this.$store.commit('setDollar', parsed / this.exchangeRate)
        this.$store.commit('setCzk', parsed)
      }
    }
  } 
}
</script>