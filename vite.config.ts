import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// @ts-ignore
export default defineConfig(({ command, mode, ssrBuild }) => {

    return {
        plugins: [react()],
        server: {
            port: 3000
        },
        build: {
            assetsDir: "."
        }
    }
})