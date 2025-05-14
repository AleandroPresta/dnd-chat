
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
    'index.csr.html': {size: 2487, hash: 'f1f124e9f45c832ea3c55bb4e0b8b4c7afd5355cd927158daf36443198f171c2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1194, hash: 'c2cbdec230f865c1ce67f2ae0ec066c3dcc0972bfd9a88dba83576bab7b9d64c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'signin/index.html': {size: 11888, hash: '1aef938f9441524c439c288f67e3e13f3f25ddd8e026f2010667dfa802835d7a', text: () => import('./assets-chunks/signin_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 11888, hash: '1aef938f9441524c439c288f67e3e13f3f25ddd8e026f2010667dfa802835d7a', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'styles-DEEEI6K4.css': {size: 12187, hash: 'pSqpgEBGFzU', text: () => import('./assets-chunks/styles-DEEEI6K4_css.mjs').then(m => m.default)}
  },
};
