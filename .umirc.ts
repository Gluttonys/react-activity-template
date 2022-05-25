import { defineConfig } from 'umi';

const pxToViewPort = require('postcss-px-to-viewport');
const postcssPresetEnv = require('postcss-preset-env');

export default defineConfig({
  base: '/common/test/',
  publicPath: '/common/test/',
  links: [{ rel: 'icon', href: 'favicon.ico' }],
  inlineLimit: 10,
  autoprefixer: {},
  extraPostCSSPlugins: [
    postcssPresetEnv({
      stage: 0,
      browsers: 'last 2 versions',
      autoprefixer: { grid: true },
    }),
    pxToViewPort({
      viewportWidth: 375,
      unitPrecision: 2,
      mediaQuery: true,
    }),
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', title: '耳畔科技', component: '@/pages/Index' }],
  fastRefresh: {},
  antd: {
    mobile: false,
  },
  hash: true,
  define: {
    'process.env.REQUEST_BASE_URL': '',
  },
});
