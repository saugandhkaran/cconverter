import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { format } from 'date-fns';
export default new Vuex.Store({
  state: {
    currencies: []
  },
  mutations: {
    /**
     * 
     * @param {state} state 
     * @param {Object} currencyData 
     * Collects only the currencies from the currency api getCurrencies
     */
    setCurrencyList(state, currencyData) {
      Object.keys(currencyData.rates).forEach((currency) => {
        state.currencies.push(currency)
      })
      state.currencies.push('EUR'); //since base is EUR, can be made customisable
    }
  },
  actions: {
    getDataFromLocalStorage() {
      if (localStorage.db) {
        return JSON.parse(localStorage.db);
      } else {
        return []
      }
    },
    /**
     *  
     * @param {Object} setObject 
     * set data in the localStorage
     */
    setDataAtLocalStorage(context, setObject) {
      if (!localStorage.db) {
        localStorage.db = '[]';
      }
      const data = JSON.parse(localStorage.db);
      data.unshift(setObject);
      localStorage.db = JSON.stringify(data);
    },
    /**
     * clear the localStorage and set as blank array
     */
    clearDataFromLocalStorage() {
      localStorage.db = [];
    },
    /**
     * 
     * @param {state} commit 
     * Gets all the currency based on EUR
     */
    getCurrencies({ commit }) {
      axios.get(process.env.VUE_APP_CURRENCY_API + '/latest?base=EUR')
        .then(succ => {
          commit('setCurrencyList', succ.data);
        })
        .catch((err) => {
          console.log(err);
      })
    },
    /**
     * 
     * @param {state} context 
     * @param {Object} convertObject 
     * Converts currency to the base currency multipled to the amount
     */
    convertCurrency(context, convertObject) {
      return axios.get(process.env.VUE_APP_CURRENCY_API + `/latest?base=${convertObject.from}`)
        .then(succ => {
          return (succ.data.rates[convertObject.to] * convertObject.amount);
        })
        .catch(err => err);
    },
    /**
     * 
     * @param {state} context 
     * @param {Object} historyObject
     * Gets the history of the currency - per EUR
     */
    getCurrencyHistory(context, historyObject) {
      let now = format(new Date(), 'yyyy-MM-dd');
      return axios.get(process.env.VUE_APP_CURRENCY_API + `/history?start_at=${historyObject.from}&end_at=${now}&base=EUR`)
        .then(succ => {
          return Object.keys(succ.data.rates).map((item) => {
            return {
              date: item,
              value: succ.data.rates[item][historyObject.for]
            }
          })
        })
        .catch(err => err);
    }
  }
});
