import pug from 'pug';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Знаходимо всі .pug файли в src (крім partials)
const pugFiles = glob.sync('./src/*.pug');

if (pugFiles.length === 0) {
  console.log('⚠️ No .pug files found in src/');
} else {
  pugFiles.forEach(file => {
    const fileName = path.basename(file, '.pug');
    const htmlPath = path.join(__dirname, `../src/${fileName}.html`);

    try {
      const html = pug.renderFile(file, {
        pretty: true,
        basedir: path.join(__dirname, '../src'),
      });

      fs.writeFileSync(htmlPath, html);
      console.log(`✓ Compiled ${fileName}.pug → ${fileName}.html`);
    } catch (error) {
      console.error(`✗ Error compiling ${fileName}.pug:`, error.message);
    }
  });
}
