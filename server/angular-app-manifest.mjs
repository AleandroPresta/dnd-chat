
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://aleandropresta.github.io/dnd-chat/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/dnd-chat/signin",
    "route": "/dnd-chat"
  },
  {
    "renderMode": 2,
    "route": "/dnd-chat/signin"
  },
  {
    "renderMode": 2,
    "route": "/dnd-chat/chat"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2436, hash: '111b27fbe73927816b28303fe24ca26c34a345a84f3ab2c4cd7c9c90b23e3f15', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1143, hash: '022a2e3a7fd74556e7dba33c99d4a8c53414c6fba647f92464f9e9cbb72cfe4c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'signin/index.html': {size: 11195, hash: '19fd04de37fe7aa977a0cfdc39840043ec6ea6d422c43790d0bcfbad8154a1a6', text: () => import('./assets-chunks/signin_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 11195, hash: '19fd04de37fe7aa977a0cfdc39840043ec6ea6d422c43790d0bcfbad8154a1a6', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'styles-HMNOYTDC.css': {size: 10479, hash: 'M+VRo6ycBXs', text: () => import('./assets-chunks/styles-HMNOYTDC_css.mjs').then(m => m.default)}
  },
};
