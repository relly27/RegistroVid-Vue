import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'create-htaccess',
      closeBundle() {
        const htaccessContent = `
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
        `;
        const outputPath = path.resolve(__dirname, 'registroadmin', '.htaccess');
        fs.writeFileSync(outputPath, htaccessContent, 'utf8');
        console.log('.htaccess file has been created in the output directory.');
      }
    }
  ],
  build: {
    outDir: 'registroadmin',
  }
})
