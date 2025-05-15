
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
    'index.csr.html': {size: 2487, hash: 'f5c32f34039c9f4e0c97fd1727fd95db328c5424d55b46fe87a814237d13e621', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1194, hash: 'd69858c0e5b6afb7656b857987d7d2fd800fba7e2a4e172d608dc90da7f133a8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 11888, hash: '56fc7ad2294a1391e8e0902270f70b8df2a0ca2b53bdaf8c703001e4e5d1ff31', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'signin/index.html': {size: 11888, hash: '56fc7ad2294a1391e8e0902270f70b8df2a0ca2b53bdaf8c703001e4e5d1ff31', text: () => import('./assets-chunks/signin_index_html.mjs').then(m => m.default)},
    'styles-DUZGZFD3.css': {size: 12823, hash: '+hrcxc/mJCs', text: () => import('./assets-chunks/styles-DUZGZFD3_css.mjs').then(m => m.default)}
  },
};
