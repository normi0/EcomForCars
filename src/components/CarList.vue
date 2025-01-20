<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">My Cars</h2>
    <ul class="space-y-4">
      <li v-for="car in cars" :key="car.id" class="border p-4 rounded-lg">
        <h3 class="text-lg font-bold">{{ car.make }} {{ car.model }}</h3>
        <p>Year: {{ car.year }}</p>
        <p>Color: {{ car.color }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter';

export default {
  setup() {
    const counterStore = useCounterStore();
    return { cars: counterStore.cars };
  },
};
</script>