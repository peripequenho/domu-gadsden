// Baja la lista completa de Contenido > Archivos de la tienda (nombre, tipo, URL, tamaño, medidas) a tmp/files.json.
// Sirve para comprobar que cada shopify://shop_images/... y shopify://files/videos/... de las plantillas exista.
// Uso: node tools/files_pull.js
const { path, ROOT, gql, writeJSON } = require('./lib');
const Q = `query($after: String) { files(first: 250, after: $after) { pageInfo { hasNextPage endCursor } nodes {
  __typename id fileStatus alt createdAt
  ... on MediaImage { image { url width height } originalSource { fileSize } }
  ... on Video { filename originalSource { url fileSize width height } }
  ... on GenericFile { url originalFileSize mimeType }
} } }`;
const all = [];
let after = null;
do {
  const d = gql(Q, { after });
  for (const n of d.files.nodes) {
    const url = n.image?.url || n.originalSource?.url || n.url || '';
    const name = n.filename || decodeURIComponent(url.split('?')[0].split('/').pop());
    all.push({ name, type: n.__typename, status: n.fileStatus, url, size: n.originalSource?.fileSize || n.originalFileSize || null,
      w: n.image?.width || n.originalSource?.width || null, h: n.image?.height || n.originalSource?.height || null, id: n.id });
  }
  after = d.files.pageInfo.hasNextPage ? d.files.pageInfo.endCursor : null;
} while (after);
writeJSON(path.join(ROOT, 'tmp/files.json'), all);
const by = {}; all.forEach(f => by[f.type] = (by[f.type] || 0) + 1);
console.log(all.length, 'archivos', JSON.stringify(by));
