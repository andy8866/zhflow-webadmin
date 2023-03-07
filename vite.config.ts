import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export let basePath="/";

// @ts-ignore
export default defineConfig(({ command, mode, ssrBuild }) => {

    if (command === 'serve') {
        basePath="/";
    } else {
        basePath="/admin";
    }

  let config={
            plugins: [react()],
            server:{
              port:3000
            },
            build:{
              assetsDir:"."
            },
            base: basePath
          };
    return config
})