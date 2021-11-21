import axios from "axios"

export const state = () => ({
  exchangeRate: 22.048,
  czk: '',
  dollar: '',
  message: '',
})

export const getters = {
  exchangeRate: (state) => () => state.exchangeRate,
  czk: (state) => () => state.czk,
  dollar: (state) => () => state.dollar,
}

export const actions = {
  async fetchExchangeRates({ commit }) {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
 
    const response = await axios.get('https://cors-anywhere.herokuapp.com/https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt', { 

    })
    const splitted = response.data.split(/\r|\n/)
    const usdRows = splitted[33].split('|')
    const czkToUsd =  Number(usdRows[4].replace(",", '.'))
    if (czkToUsd > 20 && czkToUsd < 30) {
      commit('setExchangeRate', czkToUsd)
    }
  },
  convertDollar({ commit }, dollar) {
    commit('setDollar', dollar)
  },
  convertCzk({ commit }, czk) {
    commit('setCzk', czk)
  }
}

export const mutations = {
  setExchangeRate(state, value) {
    state.exchangeRate = value
  },
  setDollar(state, value) {
    state.dollar = value
  },
  setCzk(state, value) {
    state.czk = value
  },
  updateMessage (state, message) {
    state.message = message
  }
}