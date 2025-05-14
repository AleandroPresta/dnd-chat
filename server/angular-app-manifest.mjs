
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
    'index.csr.html': {size: 2436, hash: '13e68769506556160d16f94ab094a9e96f477166071a42fbca4ecf3d49299b08', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1143, hash: '420c2509c1705d6fd56085c95db50875cc85243c5ac61b65fdbcc5d3a86910cd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 11837, hash: 'ef67cc0b3aa92f8eb882719e5112bced588e526c54a5ce30c99e80f9aab2c6b3', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'signin/index.html': {size: 11837, hash: 'ef67cc0b3aa92f8eb882719e5112bced588e526c54a5ce30c99e80f9aab2c6b3', text: () => import('./assets-chunks/signin_index_html.mjs').then(m => m.default)},
    'styles-IOVX2UAX.css': {size: 10764, hash: 'cjMhM6m8xrE', text: () => import('./assets-chunks/styles-IOVX2UAX_css.mjs').then(m => m.default)}
  },
};
