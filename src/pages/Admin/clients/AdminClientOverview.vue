<template>
  <main class="p-4">
    <!-- Small Cards Section -->
    <div class="flex justify-between space-x-4 mb-4">
      <!-- Small Card 1 -->
      <div class="px-[6vw] py-1 bg-blue-900 rounded-xl shadow-lg text-center text-white">
        <i class="fas fa-bolt text-3xl text-yellow-300"></i>
        <p class="text-sm font-bold">Power Now</p>
        <p class="text-md">2.131 <span class="text-white">KW</span></p>
        <p class="text-sm">10/27 00:12</p>
      </div>

      <!-- Small Card 2 -->
      <div class="px-[6vw] py-1 bg-yellow-300 rounded-xl shadow-lg text-center text-blue-900">
        <i class="fas fa-sun text-3xl text-blue-900"></i>
        <p class="text-sm font-bold">Today's Energy</p>
        <p class="text-sm">0 kWh</p>
        <p class="text-sm">0 kWh</p>
      </div>

      <!-- Small Card 3 -->
      <div class="px-[6vw] py-1 bg-green-400 rounded-xl shadow-lg text-center text-white">
        <i class="fas fa-calendar text-3xl text-white"></i>
        <p class="text-sm font-bold">Monthly Energy</p>
        <p class="text-sm">0 kWh</p>
        <p class="text-sm">0 kWh</p>
      </div>

      <!-- Small Card 4 (unchanged) -->
      <div class="px-[6vw] py-1 bg-white rounded-lg shadow-lg text-center border border-blue-900">
        <i class="fas fa-chart-line text-3xl text-blue-900"></i>
        <p class="text-sm font-bold text-blue-900">Yearly Energy</p>
        <p class="text-sm">0 kWh</p>
        <p class="text-sm">41.56 kWh</p>
      </div>
    </div>

    <!-- Tables Section (unchanged) -->
    <div class="flex">
      <!-- First Table (unchanged) -->
      <div class="w-1/2 p-4">
        <table class="w-full border-collapse border">
          <thead>
            <tr>
              <th class="p-2 border">Day</th>
              <th class="p-2 border">Month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-2 border">Bill</td>
              <td class="p-2 border">0 €</td>
              <td class="p-2 border">0 €</td>
            </tr>
            <tr>
              <td class="p-2 border">Income</td>
              <td class="p-2 border">0 €</td>
              <td class="p-2 border">0 €</td>
            </tr>
            <tr>
              <td class="p-2 border">Exported Energy</td>
              <td class="p-2 border">0 kWh</td>
              <td class="p-2 border">0 kWh</td>
            </tr>
            <tr>
              <td class="p-2 border">Grid Consumption</td>
              <td class="p-2 border">0 kWh</td>
              <td class="p-2 border">0 kWh</td>
            </tr>
            <tr>
              <td class="p-2 border">Peak</td>
              <td class="p-2 border">0 kWh</td>
              <td class="p-2 border">0 kWh</td>
            </tr>
            <tr>
              <td class="p-2 border">Off-Peak</td>
              <td class="p-2 border">0 kWh</td>
              <td class="p-2 border">0 kWh</td>
            </tr>
            <tr>
              <td class="p-2 border">Standard</td>
              <td class="p-2 border">0 kWh</td>
              <td class="p-2 border">0 kWh</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Second Table (unchanged) -->
      <div class="w-1/2 p-4">
        <table class="w-full border-collapse border">
         table
        </table>
      </div>
    </div>
  </main>
</template>
