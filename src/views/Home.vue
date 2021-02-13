<template>
<div>
  <div class="flex-container around">
    <div class="boxing">
    <ConverterBox @updated-db="reloadConvertHistory()"/>
    <ChartContainer />
    </div>
    <ConvertHistory :key="reloader"/>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import ConverterBox from '@/components/ConverterBox';
import ConvertHistory from '@/components/ConvertHistory';
import ChartContainer from '@/components/ChartContainer';

export default {
  name: 'Home',
  components: {
    ConverterBox,
    ConvertHistory,
    ChartContainer
  },
  data() {
    return {
      reloader: 0
    }
  },
  methods: {
    reloadConvertHistory() {
      this.reloader++;
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 445px) {
  .boxing {
    width: 351px;
  }
}
</style>
