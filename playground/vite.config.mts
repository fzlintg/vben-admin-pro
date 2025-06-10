import { defineConfig } from '@vben/vite-config';

import AutoImport from 'unplugin-auto-import/vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export default defineConfig(async () => {
  return {
    plugins: [
      VueSetupExtend(),
      AutoImport({
        imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: 'types/auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
      }),
    ],
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
    },
  };
});
