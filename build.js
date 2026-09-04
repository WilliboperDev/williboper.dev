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

    // 2. Minificar y empaquetar CSS (incluyendo FontAwesome y fuentes)
    await esbuild.build({
      entryPoints: ['css/style.css'],
      outfile: 'css/style.min.css',
      bundle: true,  // Necesario para procesar el @import de FontAwesome
      minify: true,
      external: ['/images/*', '../images/*', './images/*'], // Ignora rutas de imágenes absolutas y relativas
      // Le dice a esbuild que extraiga las fuentes
      loader: {
        '.woff': 'file',                       
        '.woff2': 'file',   
        '.eot': 'file',
        '.ttf': 'file',
        '.svg': 'file'
      },
      assetNames: '../webfonts/[name]' // Genera las fuentes en la carpeta /webfonts/
    });

    const elapsed = Date.now() - start;
    console.log(`✅ ¡Archivos minificados y empaquetados con éxito en ${elapsed}ms!`);
  } catch (error) {
    console.error('❌ Error durante la minificación:', error);
    process.exit(1);
  }
}

build();