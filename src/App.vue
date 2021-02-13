<template>
  <div id="app">
    <TheHeader />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
  import TheHeader from '@/components/TheHeader';
  import { mapActions } from 'vuex';
  export default {
    name: 'App',
    components: {
      TheHeader
    },
    methods: {
      ...mapActions([
        'getCurrencies'
      ])
    },
    created () {
      this.getCurrencies();
    }
  }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
}
.content {
  max-width: 1000px;
  margin: 0 auto;
  color: #2c3e50;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  
  &.column {
    flex-direction: column;
  }
  &.align-start {
      align-items: flex-start;
    }
    &.align-center {
      align-items: center;
    }

  &.center {
    justify-content: center;
  }
  &.around {
    justify-content: space-around;
  }

  input {
  width: 230px;
  height: 50px;
  font-size: 30px;
  padding: 1px 8px;
  text-align: right;
  border: none;
  border-bottom: 1px solid #2c3e50;
  margin: 10px 0px 10px 10px;
}

.convert {
  background-color: transparent;
  font-size: 2rem;
  border: none;
  margin: 20px 0px;
  span {
    font-size: 16px;
  }
}

button {
  padding: 10px 20px;
  margin: 20px 0px;
  color: white;
  background-color: #2c3e50;
  border-radius: 6px;
  border: 2px solid #5e83a9;
  cursor: pointer;

  &:disabled {
    background-color: grey;
  }
}

p{
  &.error {
    margin: 5px;
    color: rgb(208, 113, 113);
  }
}

select {
  height: 50px;
  font-size: 25px;
  padding: 4px 5px;
  margin-right: 5px;
  border: none;
  background-color: #2c3e50;;
  color: white;
  min-width: 50px;
  option {
    text-align: center;
  }
  }
}
</style>
