<template>
<div>
  <h3>Calculator</h3>
  <div class="flex-container column align-center converter-box">
    <div>
      <input type="text"
        placeholder="convert"
        @input="convert('from')"
        v-model="amountFrom"
        maxlength="7"
        autocomplete="off"/>
      <select v-model="fromCurrency" @change="convert('from')">
        <option
          v-for="currency in currencies"
          :key="currency"
          :value="currency">{{currency}}</option>
      </select>
    </div>
    <p class="error" v-if="error.from">Please enter a valid input</p>
    <div>
      <button class="swap" @click="swap()" v-if="!loading">
        <p>⬆</p>
       
      </button>
      <div class="loading" v-if="loading"><p>⌛</p></div>
    </div>
    <div>
      <input type="text"
        placeholder="to"
        @input="convert('to')"
        v-model="amountTo"
        maxlength="7"
        autocomplete="off"/>
      <select v-model="toCurrency" @change="convert('to')">
        <option
          v-for="currency in currencies"
          :key="currency"
          :value="currency">{{currency}}</option>
      </select>
    </div>
    <p class="error" v-if="error.to">Please enter a valid input</p>
    <button @click="save()" :disabled="!amountFrom || !amountTo">Save</button>
  </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: "ConverterBox",
  props: {
    from: {
      type: String,
      default: 'USD' // can be set to as needed while injecting
      },
    to: {
      type: String,
      default: 'EUR' // can be set to as needed while injecting
    }
  },
  data() {
    return{
      toCurrency: '',
      fromCurrency: '',
      amountTo: '',
      amountFrom: '',
      error: {},
      timer: '',
      loading: false,
      converting: false // for debouncing
    }
  },
  computed: {
    ...mapState([
      'currencies'
      ]
    )
  },
  methods: {
    ...mapActions([
      'convertCurrency', 'setDataAtLocalStorage'
    ]),
    //swap the currencies
    async swap() {
      this.loading = true;
      [this.amountTo, this.amountFrom] = [this.amountFrom, this.amountTo];
      let output = await this.convertCurrency({
              from: this.fromCurrency,
              to: this.toCurrency,
              amount: this.amountFrom});
      this.amountTo = parseFloat(output).toFixed(3);
      this.loading = false;
    },
    convert: async function(source) {
        this.error = {};
        //check for input of source
        if (isNaN(+this.amountTo % 1)) {
          this.error.to = true;
          return;
        }

        //check for input of to
        if (isNaN(+this.amountFrom % 1)) {
          this.error.from = true;
          return;
        }

        //clear timer for custom debouncing
        if (this.timer) {
          clearTimeout(this.timer);
        }

        //convert from - to
        if (source === 'from' && this.amountFrom) {
          this.loading = true;
          this.timer = setTimeout(async () => {
          let output = await this.convertCurrency({
              from: this.fromCurrency,
              to: this.toCurrency,
              amount: this.amountFrom
          });
          this.amountTo = parseFloat(output).toFixed(3);
          this.loading = false;
          }, 400); //delay of 400ms
           return;
        }

        //convert to - from
        if (source === 'to' && this.amountTo) {
          this.loading = true;
          this.timer = setTimeout(async () => {
          let output = await this.convertCurrency({
              from: this.toCurrency,
              to: this.fromCurrency,
              amount: this.amountTo
          });
          this.amountFrom = parseFloat(output).toFixed(3);
          this.loading = false;
          }, 400); //delay of 400ms
          return;
        }
      },
      //save in localStorage
      save() {
        let setObject = {
          amountFrom: this.amountFrom,
          amountTo: this.amountTo,
          from: this.fromCurrency,
          to: this.toCurrency,
          date: new Date()
        };
        this.setDataAtLocalStorage(setObject);
        this.$emit('updated-db');
      }
  },
  created () {
    this.toCurrency = this.$props.to;
    this.fromCurrency = this.$props.from;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.converter-box {
  padding: 20px 1px 10px 1px;
  border: 1px dotted grey;
  border-radius: 6px;
}

button {
  &.swap {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    p {
      margin-left: -3px;
      margin-top: 3px;
    }
  }
}
</style>
