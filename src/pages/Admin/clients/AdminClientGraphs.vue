<template>
  <Chart
    :size="{ width: 500, height: 420 }"
    :data="plByMonth"
    :margin="margin"
    :direction="direction"
    :axis="axis"
    class="mx-20"
  >
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Line :dataKeys="['date', 'peakPower']" type="monotone" :lineStyle="{ stroke: '#9f7aea' }" />
      <Line :dataKeys="['date', 'peakCurrent']" type="monotone" :lineStyle="{ stroke: '#48CAE4' }" />
      <Marker v-if="marker" :value="11000" label="Mean." color="green" strokeWidth="2" strokeDasharray="6 6" />
      <defs>
        <linearGradient id="grad" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
          <stop offset="100%" stop-color="white" stop-opacity="0.4" />
        </linearGradient>
      </defs>
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          'data.peakPower': { color: '#9f7aea' }, // Note the change here
          'data.peakCurrent': { color: '#48CAE4' } // Note the change here
        }"
      />
    </template>
  </Chart>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { Chart, Grid, Line, Tooltip, Marker } from 'vue3-charts';

export default defineComponent({
  name: 'LineChart',
  components: { Chart, Grid, Line, Tooltip, Marker },
  setup() {
    const route = useRoute();
    const plByMonth = ref([]);
    const userId = computed(() => Number(route.params.id));
    const meterId = ref(0);
    const direction = ref('horizontal');
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0
    });
    const axis = ref({
      primary: {
        type: 'band'
      },
      secondary: {
        domain: ['dataMin', 'dataMax + 100'],
        type: 'linear',
        ticks: 8
      }
    });

    const fetchDayTime = async () => {
      try {
        const response2 = await axios.get('/power/peak/history', {
          params: {
            userId: userId.value,
            meterId: meterId.value
          },
        });
        plByMonth.value = response2.data.data; // Access the data property
      } catch (error) {
        console.error('Error fetching day time data:', error);
      }
    };

    watchEffect(() => {
      fetchDayTime();
    });

    onMounted(async () => {
      try {
        const response1 = await axios.get(`/meters/user/${userId.value}`);
        meterId.value = response1.data;
        console.log("meterId =", meterId.value);
      } catch (error) {
        console.error('Error fetching meterId:', error);
      }
    });

    onUnmounted(() => {
      // Clean up resources here
    });

    return { plByMonth, direction, margin, axis };
  }
});
</script>
