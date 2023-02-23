import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// @ts-ignore
export default defineConfig(({ command, mode, ssrBuild }) => {
  let config={
            plugins: [react()],
            server:{
              port:3000
            },
            build:{
              assetsDir:"."
            },
            base: "/"
          };

  if (command === 'serve') {
      config.base="/";
    return config
  } else {
      config.base="/admin";
      return config
  }
})