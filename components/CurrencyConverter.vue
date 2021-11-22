<template>
  <section class="bg-gray-200 px-3 py-6">
    <header>
      <h2 class="text-xl">
        Current Rate
      </h2>
      <span>1 USD = {{ exchangeRate }} CZK</span>
    </header>
    <form class="flex flex-col mt-2">
      <label class="text-gray-500" for="usd">USD</label>
      <input class="px-3 py-2 mb-4" v-model="usd">
      <label class="text-gray-500" for="czk">CZK</label>
      <input class="px-3 py-2 mb-4" v-model="czk">
    </form>
  </section>
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
    usd: {
      get () {
        return this.$store.state.usd
      },
      set (value) {
        const parsed = Number(value)
        if (Number.isNaN(parsed)) return
        this.$store.commit('setUsd', parsed)
        this.$store.commit('setCzk', (parsed * this.exchangeRate).toFixed(2))
      }
    },
    czk: {
      get () {
        return this.$store.state.czk
      },
      set (value) {
        const parsed = Number(value)
        if (Number.isNaN(parsed)) return
        this.$store.commit('setUsd', (parsed / this.exchangeRate).toFixed(2))
        this.$store.commit('setCzk', parsed)
      }
    }
  } 
}
</script>