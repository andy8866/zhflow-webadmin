import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// @ts-ignore
export default defineConfig(({ command, mode, ssrBuild }) => {

    let basePath="";
    if (command === 'serve') {
        basePath="/";
    } else {
        basePath="/admin";
    }

    return {
        plugins: [react()],
        server: {
            port: 3000
        },
        build: {
            assetsDir: "."
        },
        base: basePath
    }
})