<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { Card } from 'ant-design-vue';
import { GaugeChart } from 'echarts/charts';
import * as echarts from 'echarts/core';

echarts.use([GaugeChart]);

const cpuChartRef = ref<EchartsUIType>();
const memoryChartRef = ref<EchartsUIType>();
const diskChartRef = ref<EchartsUIType>();

const { renderEcharts: renderCpuChart } = useEcharts(cpuChartRef);
const { renderEcharts: renderMemoryChart } = useEcharts(memoryChartRef);
const { renderEcharts: renderDiskChart } = useEcharts(diskChartRef);

onMounted(() => {
  // CPU使用率图表
  renderCpuChart({
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 100,
        detail: {
          formatter: '{value}%',
        },
        data: [{ value: 78 }],
      },
    ],
  });

  // 内存使用图表
  renderMemoryChart({
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 100,
        detail: {
          formatter: '{value}%',
        },
        data: [{ value: 65 }],
      },
    ],
  });

  // 磁盘空间图表
  renderDiskChart({
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 100,
        detail: {
          formatter: '{value}%',
        },
        data: [{ value: 42 }],
      },
    ],
  });
});
</script>

<template>
  <div class="p-4">
    <Page title="监控面板" content="系统运行状态监控">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card title="CPU使用率" class="shadow">
          <div class="h-64">
            <EchartsUI ref="cpuChartRef" />
          </div>
        </Card>
        <Card title="内存使用" class="shadow">
          <div class="h-64">
            <EchartsUI ref="memoryChartRef" />
          </div>
        </Card>
        <Card title="磁盘空间" class="shadow">
          <div class="h-64">
            <EchartsUI ref="diskChartRef" />
          </div>
        </Card>
      </div>
    </Page>
  </div>
</template>
