import axios from "axios"

export const state = () => ({
  exchangeRate: 22.048,
  
})

export const getters = {
  exchangeRate: (state) => () => state.exchangeRate,
  exchangeCzkToDollars: (czk) => () => {
    console.log(czk)
    return 42
  }
}

export const actions = {
  async fetchExchangeRates({ commit }) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    console.log(response.data.length)
    commit('setExchangeRate', response.data.length)
    console.log("fetching currencies")
  },
  convert({ commit }, czk) {
    console.log(czk)

  }

}

export const mutations = {
  setExchangeRate(state, value) {
    state.exchangeRate = value
  }
}