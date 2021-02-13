<template>
<div>
  <h3>Conversion history</h3>
  <div class="table">
    <div class="items">
    <div v-if="!transactions.length" class="flex-container around card">
      Your conversions will be shown here
    </div>
    <button class="clear" @click="clearHistory()" v-if="transactions.length">
      Clear history
    </button>
    <div class="flex-container around align-center card" v-for="(transaction) in transactions" :key="transaction.time">
      <div>
        <p class="amount">{{transaction.amountFrom}}</p>
        <p>{{transaction.from}}</p>
      </div>
      <span>➡</span>
      <div>
        <p class="amount">{{transaction.amountTo}}</p>
        <p>{{transaction.to}}</p>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';
export default {
  name: "ConvertHistory",
  components: {
  },
  data() {
    return {
      transactions: []
    }
  },
  methods: {
    ...mapActions([
        'getDataFromLocalStorage','clearDataFromLocalStorage'
      ]),
      // delete data from localStorage
      clearHistory() {
        this.clearDataFromLocalStorage();
        this.transactions = [];
      }
  },
  async mounted() {
    this.transactions = await this.getDataFromLocalStorage();
  }
};
</script>

<style lang="scss" scoped>
.table {
  min-width: 300px;
  padding: 20px 10px;
  border: 1px dotted grey;
  border-radius: 6px;
}
.items {
  max-height: 915px;
  overflow-y: scroll;
}

button {
  &.clear {
    width: 100%;
    margin-top: 5px;
    background-color: rgb(208, 113, 113);
    border: rgb(242, 125, 125);
  }
}

.card {
  border: 1px solid #2c3e50;
  background-color: #2c3e50;
  margin-bottom: 3px;
  color: white;
  padding: 10px;
  border-radius: 6px;
  min-width: 300px;
  .amount {
    padding: 5px;
    margin: 5px;
    font-size: 2.5vw;
    font-size: 26px;
  }
  span {
    font-size: 2rem;
  }
  p {
    padding: 5px;
    margin: 5px;
    text-align: center;
  }
}
</style>
