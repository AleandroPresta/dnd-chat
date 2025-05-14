
export default {
  basePath: 'https://aleandropresta.github.io/dnd-chat',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
