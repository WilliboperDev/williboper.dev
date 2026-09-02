const esbuild = require('esbuild');
const path = require('node:path');

async function build() {
  console.log('⚡ Iniciando minificación con esbuild...');
  const start = Date.now();

  try {
    // 1. Minificar JavaScript e inyectar variables de entorno
    await esbuild.build({
      entryPoints: ['js/main.js'],
      outfile: 'js/main.min.js',
      minify: true,
      sourcemap: false,         // Cambia a true para depurar
      target: ['es2020'],
      define: {
        // Valores configurados en el panel del proyecto
        'process.env.FORMSPREE_ID': JSON.stringify(process.env.FORMSPREE_ID || ''),
        'process.env.PIPEDREAM_ENDPOINT': JSON.stringify(process.env.PIPEDREAM_ENDPOINT || '')
      }
    });

    // 2. Minificar CSS
    await esbuild.build({
      entryPoints: ['css/style.css'],
      outfile: 'css/style.min.css',
      minify: true,
    });

    const elapsed = Date.now() - start;
    console.log(`✅ ¡Archivos minificados con éxito en ${elapsed}ms!`);
  } catch (error) {
    console.error('❌ Error durante la minificación:', error);
    process.exit(1);
  }
}

build();