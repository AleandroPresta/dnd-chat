
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://aleandropresta.github.io/dnd-chat/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/dnd-chat"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2436, hash: '1900b126e4e05414abedf4fd719e00f8160da4b3b858c9432ff42012cc34ad21', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1143, hash: 'd81188455b9317271418a50677b911d4685b9f5b7b97e8b0aefd011763d4778b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 11351, hash: 'b5d0bcf26135f553716cb99c47790f6106fe9ad6b7209881130448455f6d0c44', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-LHWFYFW6.css': {size: 9699, hash: 'aj/zoj6LGDU', text: () => import('./assets-chunks/styles-LHWFYFW6_css.mjs').then(m => m.default)}
  },
};
