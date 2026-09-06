// api/oracion.js
// Función serverless para Vercel que genera la vista previa de una oración con metaetiquetas Open Graph

const ORACIONES_URL = 'https://oraciones-api.vercel.app/oraciones.json';

export default async function handler(req, res) {
  // Obtener el id de la query string (ej. ?id=22)
  const { id } = req.query;
  if (!id) {
    return res.status(400).send('Falta el parámetro id');
  }

  try {
    // Obtener todas las oraciones desde el JSON
    const response = await fetch(ORACIONES_URL);
    if (!response.ok) {
      throw new Error('Error al obtener las oraciones');
    }
    const data = await response.json();
    const oraciones = data.oraciones || [];

    // Buscar la oración por id (convertir a número)
    const oracion = oraciones.find(o => o.id === parseInt(id));
    if (!oracion) {
      return res.status(404).send('Oración no encontrada');
    }

    // Datos para las metaetiquetas
    const titulo = oracion.titulo || 'Oración del día';
    const descripcion = oracion.extracto || 'Comparte esta oración con alguien que la necesite';
    const imagen = oracion.urlImagen || 'https://i.postimg.cc/J02tTgVG/Chat-GPT-Image-31-ago-2026-21-07-43.png'; // imagen por defecto
    const urlCompleta = `https://${req.headers.host}/?id=${id}`;

    // Construir el HTML con las metaetiquetas Open Graph
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${titulo}</title>
  
  <!-- Open Graph / Facebook -->
  <meta property="og:title" content="${titulo}" />
  <meta property="og:description" content="${descripcion}" />
  <meta property="og:image" content="${imagen}" />
  <meta property="og:url" content="${urlCompleta}" />
  <meta property="og:type" content="website" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${titulo}" />
  <meta name="twitter:description" content="${descripcion}" />
  <meta name="twitter:image" content="${imagen}" />

  <!-- Redirigir a la SPA principal para que el usuario vea la oración completa -->
  <meta http-equiv="refresh" content="0;url=${urlCompleta}" />
  <script>
    window.location.href = "${urlCompleta}";
  </script>
</head>
<body>
  <p>Redirigiendo a la oración...</p>
</body>
</html>`;

    // Enviar el HTML con el Content-Type correcto
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error('Error en api/oracion:', error);
    res.status(500).send('Error interno del servidor');
  }
}