/**
 * BASE CERO - Technical Library
 * Professional technical content for different building systems.
 *
 * Este archivo es la versión TypeScript del script original en JS.
 * Se mantiene la lógica y se agregan tipados mínimos para que compile sin cambiar el comportamiento.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

const STORAGE_KEYS = {
  form: 'basecero_manual_form_v2',
  snapshot: 'basecero_manual_snapshot_v2'
} as const;

type Ambiente = string;

const AMBIENTE_RECOMENDACIONES: Record<string, string[]> = {
  Dormitorios: [
    'Diariamente: ventilar el ambiente 10 a 15 minutos para reducir condensación y humedad ambiental.',
    'Semestralmente: verificar estado de burletes, sellos de carpinterías y herrajes (sin holguras ni fisuras).',
    'Anualmente: controlar visualmente la presencia de manchas por humedad y revisar continuidad de cierres en ventanas.'
  ],
  Cocina: [
    'Mensualmente: limpiar campana extractora, filtros y zona de grasa acumulada para asegurar correcto funcionamiento.',
    'Trimestralmente: verificar estado de llaves de paso, flexibles y conexiones (ausencia de goteos o pérdidas).',
    'Semestralmente: revisar sifones, rejillas de desagüe y funcionamiento de escurrimiento en piletas.'
  ],
  Baño: [
    'Mensualmente: revisar visualmente sellos sanitarios y juntas (sin desprendimientos ni fisuras).',
    'Semestralmente: verificar descarga del inodoro y griferías, controlando ausencia de pérdidas en juntas y uniones.',
    'Anualmente: revisar ventilación del ambiente (rejas/extractores si existieran) y limpiar puntos con acumulación de humedad.'
  ],
  Living: [
    'Diariamente: ventilar el ambiente para controlar condensación y evitar ambientes cerrados.',
    'Semestralmente: controlar tomacorrientes y puntos eléctricos (sin calentamientos, sin olor a quemado, sin empalmes).',
    'Anualmente: verificar estado de burletes y cierres de aberturas exteriores (ajustes necesarios para evitar ingreso de aire húmedo).'
  ],
  Comedor: [
    'Semestralmente: revisar pisos, juntas y revestimientos en zonas de mayor tránsito (sin levantamientos ni fisuras).',
    'Mensualmente: verificar ventilación y remover acumulación de humedad visible (si existiera).',
    'Anualmente: inspeccionar sellos de aberturas vinculadas al exterior para prevenir filtraciones.'
  ],
  Lavadero: [
    'Trimestralmente: inspeccionar mangueras de lavarropas, conexiones flexibles y estado de uniones (sin ablandamientos o desgaste).',
    'Mensualmente: limpiar piletas, rejillas y bacha, evitando obstrucciones que generen desbordes.',
    'Semestralmente: verificar escurrimiento y ausencia de pérdidas en sifones y conexiones de descarga.'
  ],
  Quincho: [
    'Mensualmente: controlar extracción de humos/ventilación y limpieza de conductos visibles (sin obstrucciones).',
    'Trimestralmente: verificar estado de sellos en salidas de ventilación y rejillas (sin deformaciones).',
    'Cuando corresponda: toda intervención en instalaciones de gas debe ser ejecutada por personal matriculado.'
  ],
  Cochera: [
    'Semestralmente: verificar que desagües y pendientes exteriores evacuen correctamente (sin empozamientos).',
    'Antes y durante temporada de lluvias: limpiar puntos de drenaje (bocas, rejillas) para evitar acumulaciones.',
    'Anualmente: controlar visualmente filtraciones o humedades en muros cercanos a aberturas o conexiones.'
  ],
  Vestidor: [
    'Diariamente o según uso: ventilar el espacio para evitar acumulación de humedad y olores.',
    'Semestralmente: controlar presencia de manchas de humedad u hongos (si aparecen, informar y ejecutar acciones correctivas).',
    'Anualmente: revisar cierres de aberturas y puntos de posible ingreso de aire húmedo.'
  ],
  Estudio: [
    'Semanalmente: ventilar el ambiente para mantener condiciones higiénicas y evitar condensación.',
    'Mensualmente: controlar estado de regletas, prolongadores y conexiones (sin sobrecarga ni cables dañados).',
    'Anualmente: revisar puntos eléctricos visibles y estado de iluminación.'
  ],
  Terraza: [
    'Antes de la temporada de lluvias: limpiar desagües pluviales, embudos y rejillas.',
    'Durante la temporada: inspeccionar escurrimiento luego de eventos intensos (sin obstrucciones ni empozamientos).',
    'Anualmente: controlar impermeabilización y fisuras superficiales, registrando hallazgos para su eventual reparación.'
  ],
  Patio: [
    'Antes de temporada de lluvias: retirar hojas y sedimentos de canaletas y rejillas.',
    'Trimestralmente: verificar pendientes y escurrimiento superficial (sin sectores con acumulación).',
    'Anualmente: inspeccionar puntos de descarga y limpiar rejillas de entrada para mantener trazabilidad del mantenimiento.'
  ],
  Circulaciones: [
    'Mensualmente: mantener áreas de paso despejadas y secas para prevenir accidentes.',
    'Trimestralmente: revisar funcionamiento de llaves, luminarias y señalización (sin fallas intermitentes).',
    'Anualmente: verificar estado de cielorrasos/zonas con riesgo de humedad cerca de instalaciones (si aplica).'
  ],
  Depósito: [
    'Mensualmente: ventilar el área para evitar condensación y olores asociados.',
    'Semestralmente: verificar que no existan pérdidas de agua por puntos cercanos a instalaciones (sin goteos).',
    'Anualmente: limpiar y reordenar, evitando apoyar materiales directamente contra muros expuestos.'
  ],
  'Sala de máquinas': [
    'Toda intervención: realizarla con personal técnico habilitado, de acuerdo con manuales y normativa aplicable.',
    'Mensualmente: inspección visual de estado del recinto (limpieza, ventilación y ausencia de obstrucciones).',
    'Anualmente: verificar funcionamiento de instalaciones y registrar controles efectuados.'
  ]
};

// Nota: el índice y la numeración se renderizan desde HTML (buildPdfHtml()) para evitar desincronización del paginado y recorte entre páginas.

document.addEventListener('DOMContentLoaded', () => {
  restoreFormFromStorage();
  bindFormPersistence();
  updateManualStatus();

  const generateBtn = document.getElementById('generateBtn');
  const newManualBtn = document.getElementById('newManualBtn');

  if (generateBtn) generateBtn.addEventListener('click', handleGeneratePdf);
  if (newManualBtn) newManualBtn.addEventListener('click', handleNewManual);
});

function getAllFields(): Array<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  return Array.from(document.querySelectorAll('#reportForm input, #reportForm textarea, #reportForm select'));
}

function serializeForm(): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  getAllFields().forEach((el) => {
    const key = (el as HTMLInputElement).id || ((el as HTMLInputElement).name ? `${(el as HTMLInputElement).name}::${(el as HTMLInputElement).value}` : null);
    if (!key) return;
    data[key] = (el as HTMLInputElement).type === 'checkbox' ? !!(el as HTMLInputElement).checked : (el as HTMLInputElement).value;
  });
  return data;
}

function restoreFormFromStorage(): void {
  const raw = localStorage.getItem(STORAGE_KEYS.form);
  if (!raw) return;

  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    getAllFields().forEach((el) => {
      const key = (el as HTMLInputElement).id || ((el as HTMLInputElement).name ? `${(el as HTMLInputElement).name}::${(el as HTMLInputElement).value}` : null);
      if (!key || !(key in data)) return;
      if ((el as HTMLInputElement).type === 'checkbox') (el as HTMLInputElement).checked = !!data[key];
      else (el as HTMLInputElement).value = String(data[key]);
    });
  } catch {
    // no-op
  }
}

function bindFormPersistence(): void {
  const persist = () => {
    localStorage.setItem(STORAGE_KEYS.form, JSON.stringify(serializeForm()));
  };

  getAllFields().forEach((el) => {
    el.addEventListener('input', persist);
    el.addEventListener('change', persist);
  });
}

function updateManualStatus(): void {
  const statusEl = document.getElementById('manualStatus');
  if (!statusEl) return;

  const snap = localStorage.getItem(STORAGE_KEYS.snapshot);
  statusEl.textContent = snap
    ? 'Se encuentra un manual generado previamente. Puede actualizarlo o iniciar un nuevo manual.'
    : 'Complete el formulario y genere el documento técnico profesional.';
}

function handleNewManual(): void {
  const form = document.getElementById('reportForm') as HTMLFormElement | null;
  if (form) form.reset();

  localStorage.removeItem(STORAGE_KEYS.form);
  localStorage.removeItem(STORAGE_KEYS.snapshot);

  updateManualStatus();
}

function gatherFormData() {
  const getValue = (id: string): string => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
    return el ? el.value.trim() : '';
  };

  const getCheckedList = (name: string): string[] =>
    Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => (el as HTMLInputElement).value);

  const getCheckedById = (id: string): boolean => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    return !!(el && el.checked);
  };

  return {
    cliente: getValue('cliente'),
    direccion: getValue('direccion'),
    localidad: getValue('localidad'),
    anio: getValue('anio'),
    superficie: getValue('superficie'),
    observaciones: (document.getElementById('observaciones') as HTMLTextAreaElement | null)?.value || '',
    gas: getCheckedList('gas'),
    clim: getCheckedList('clim'),
    climGasTipo: getCheckedList('climGasTipo'),
    amb: getCheckedList('amb'),
    termotanque: getCheckedById('termotanque'),
    calefon: getCheckedById('calefon'),
    calderaIndividual: getCheckedById('calderaIndividual'),
    tanqueElevado: getCheckedById('tanqueElevado'),
    cisterna: getCheckedById('cisterna'),
    bombaPresurizadora: getCheckedById('bombaPresurizadora'),
    disyuntorDiferencial: getCheckedById('disyuntorDiferencial'),
    llaveTermomagnetica: getCheckedById('llaveTermomagnetica'),
    detectorMonoxido: getCheckedById('detectorMonoxido'),
    matafuego: getCheckedById('matafuego')
  };
}

function buildSections(data: ReturnType<typeof gatherFormData>) {
  const sections: Array<{ titulo: string; contenido: string }> = [];

  const alcance = `
        <h3>Objeto del documento</h3>
        <p>
            El presente manual establece pautas de uso, conservación y mantenimiento preventivo
            de la vivienda consignada, con el fin de preservar condiciones de seguridad, habitabilidad
            y durabilidad de sus componentes constructivos e instalaciones.
        </p>
        <h3>Datos de referencia</h3>
        <ul class="pdf-compact-list">
            <li><strong>Cliente:</strong> ${data.cliente || 'No consignado'}</li>
            <li><strong>Domicilio:</strong> ${data.direccion || 'No consignado'}</li>
            <li><strong>Localidad:</strong> ${data.localidad || 'No consignada'}</li>
            <li><strong>Año de construcción:</strong> ${data.anio || 'No consignado'}</li>
            <li><strong>Superficie:</strong> ${data.superficie ? `${data.superficie} m²` : 'No consignada'}</li>
        </ul>
    `;
  sections.push({ titulo: 'Alcance y datos de referencia', contenido: alcance });

  const ambientes = data.amb.length
    ? `<ul class="pdf-compact-list">${data.amb.map((a) => `<li>${a}</li>`).join('')}</ul>`
    : `<p>No se registraron ambientes en esta emisión del documento.</p>`;

  const recomendacionesAmb = data.amb.length
    ? data.amb
        .map((amb) => {
          const recs = AMBIENTE_RECOMENDACIONES[amb] || ['Aplicar mantenimiento preventivo del ambiente según corresponda.'];

          const usoPorVaporBañoCocinaLavadero =
            'Si durante el uso se genera vapor o condensación (humedad visible): ventilar el ambiente hasta eliminar vapor/condensación para prevenir hongos y deterioros prematuros.';

          const normalized = [...recs];

          const ambientesConVapor = ['Baño', 'Cocina', 'Lavadero'];
          if (ambientesConVapor.includes(amb) && !normalized.some((x) => (x || '').toLowerCase().includes('vapor') && (x || '').toLowerCase().includes('ventil'))) {
            normalized.unshift(usoPorVaporBañoCocinaLavadero);
          }

          if (
            amb === 'Quincho' &&
            !normalized.some((x) => (x || '').toLowerCase().includes('vapor') || (x || '').toLowerCase().includes('hum'))
          ) {
            normalized.unshift(
              'Si se generan humos/vapor durante la cocción: mantener ventilación/extracción hasta retirar humedad y olores.'
            );
          }

          return `
                <div class="pdf-reco-card">
                    <h3>${amb}</h3>
                    <ul class="pdf-compact-list">
                        ${normalized.map((r) => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
            `;
        })
        .join('')
    : `<p>No corresponde emitir recomendaciones por ambiente al no existir selección de ambientes.</p>`;

  sections.push({
    titulo: 'Ambientes relevados y pautas de mantenimiento',
    contenido: `
            <h3>Ambientes incluidos</h3>
            ${ambientes}
            <h3>Recomendaciones técnicas por ambiente</h3>
            ${recomendacionesAmb}
            <p>
                Estas pautas complementan los planes de mantenimiento semestral y anual/bianual del presente manual.
            </p>
        `
  });

  let condicionales = `
        <ul class="pdf-compact-list">
            <li><span class="priority-badge alta">Alta</span> Toda intervención en gas debe ser ejecutada por gasista matriculado.</li>
            <li><span class="priority-badge alta">Alta</span> Verificar periódicamente ventilaciones permanentes y estado de conductos.</li>
            <li><span class="priority-badge media">Media</span> Mantener registro de tareas y servicios realizados.</li>
        </ul>
    `;

  if (data.termotanque) {
    condicionales += `
            <div class="pdf-reco-card">
                <h3>Condición específica: Termotanque</h3>
                <ul class="pdf-compact-list">
                    <li>Realizar control técnico anual del equipo.</li>
                    <li>Verificar y programar reemplazo de ánodo de sacrificio según recomendación del fabricante (habitualmente entre 12 y 24 meses).</li>
                    <li>Controlar válvula de seguridad y estado de conexiones hidráulicas.</li>
                </ul>
            </div>
        `;
  }

  if (data.calderaIndividual || data.calefon) {
    condicionales += `
            <div class="pdf-reco-card">
                <h3>Condición específica: Equipos de combustión</h3>
                <ul class="pdf-compact-list">
                    <li>Realizar service anual obligatorio por técnico habilitado.</li>
                    <li>Verificar combustión correcta (llama estable y predominantemente azul).</li>
                </ul>
            </div>
        `;
  }

  if (data.disyuntorDiferencial || data.llaveTermomagnetica) {
    condicionales += `
            <div class="pdf-reco-card">
                <h3>Condición específica: Seguridad eléctrica</h3>
                <ul class="pdf-compact-list">
                    <li>Ejecutar prueba funcional periódica del disyuntor diferencial.</li>
                    <li>Verificar ausencia de calentamientos anómalos en tablero y protecciones.</li>
                </ul>
            </div>
        `;
  }

  sections.push({ titulo: 'Recomendaciones generales y condiciones específicas', contenido: condicionales });

  sections.push({
    titulo: 'Plan de mantenimiento semestral',
    contenido: `
            <table class="pdf-checklist-table">
                <thead>
                    <tr>
                        <th>Criticidad</th>
                        <th>Tarea</th>
                        <th>Responsable sugerido</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Media</td><td>Limpieza de canaletas, rejillas y bajadas pluviales.</td><td>Usuario / servicio de mantenimiento</td><td>☐</td></tr>
                    <tr><td>Alta</td><td>Control de pérdidas en griferías, sifones y artefactos sanitarios.</td><td>Plomero matriculado</td><td>☐</td></tr>
                    <tr><td>Media</td><td>Revisión de sellos en carpinterías y juntas húmedas.</td><td>Técnico especializado</td><td>☐</td></tr>
                    <tr><td>Alta</td><td>Limpieza y desinfección de tanque de agua (si aplica).</td><td>Empresa habilitada</td><td>☐</td></tr>
                </tbody>
            </table>
        `
  });

  sections.push({
    titulo: 'Plan de mantenimiento anual / bianual',
    contenido: `
            <table class="pdf-checklist-table">
                <thead>
                    <tr>
                        <th>Criticidad</th>
                        <th>Tarea</th>
                        <th>Periodicidad</th>
                        <th>Responsable sugerido</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Alta</td><td>Service integral de equipos a gas (calefón/caldera/estufas).</td><td>Anual</td><td>Gasista matriculado</td><td>☐</td></tr>
                    <tr><td>Alta</td><td>Revisión de tablero eléctrico y protecciones.</td><td>Anual</td><td>Electricista matriculado</td><td>☐</td></tr>
                    <tr><td>Media</td><td>Verificación de sellados exteriores e impermeabilización expuesta.</td><td>Anual</td><td>Técnico especializado</td><td>☐</td></tr>
                    <tr><td>Baja</td><td>Repintado general interior.</td><td>Bianual</td><td>Contratista / usuario</td><td>☐</td></tr>
                </tbody>
            </table>
        `
  });

  const obs = data.observaciones
    ? `<p>${data.observaciones.replace(/\n/g, '<br>')}</p>`
    : `<p>Sin observaciones adicionales consignadas.</p>`;

  sections.push({ titulo: 'Observaciones técnicas', contenido: obs });

  sections.push({
    titulo: 'Registro de intervenciones',
    contenido: `
            <p>Registrar cada tarea ejecutada para asegurar trazabilidad técnica del mantenimiento.</p>
            <table class="pdf-checklist-table pdf-log-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Tarea ejecutada</th>
                        <th>Responsable</th>
                        <th>Matrícula / Comprobante</th>
                        <th>Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr>
                </tbody>
            </table>
        `
  });

  return sections;
}

function buildPdfHtml(data: ReturnType<typeof gatherFormData>) {
  const sections = buildSections(data);

  const cover = `
        <div class="pdf-page pdf-cover">
            <img class="pdf-logo" src="https://res.cloudinary.com/dgfp1qcnq/image/upload/v1779226762/d9e025c9-61bd-4900-9868-58399972aa7e.png" alt="Base Cero" crossorigin="anonymous" />
            <h1>Manual de Uso y Mantenimiento</h1>
            <h2>Vivienda residencial</h2>
            <div class="pdf-meta">
                <p><strong>Cliente:</strong> ${data.cliente || 'No consignado'}</p>
                <p><strong>Domicilio:</strong> ${data.direccion || 'No consignado'}</p>
                <p><strong>Localidad:</strong> ${data.localidad || 'No consignada'}</p>
                <p><strong>Fecha de emisión:</strong> ${new Date().toLocaleDateString('es-AR')}</p>
            </div>
        </div>
    `;

  let index = `
        <div class="pdf-page pdf-index">
            <h2>Índice de contenidos</h2>
            <ul>
    `;

  sections.forEach((s, i) => {
    index += `<li><span>${i + 1}. ${s.titulo}</span><span>${i + 3}</span></li>`;
  });

  index += `</ul></div>`;

  let body = '';
  sections.forEach((s, i) => {
    body += `
            <div class="pdf-page pdf-section">
                <h2>${i + 1}. ${s.titulo}</h2>
                ${s.contenido}
            </div>
        `;
  });

  return cover + index + body;
}

async function handleGeneratePdf(): Promise<void> {
  const btn = document.getElementById('generateBtn') as HTMLButtonElement | null;
  if (!btn) return;

  btn.disabled = true;
  btn.textContent = 'Generando PDF...';

  try {
    const data = gatherFormData();
    localStorage.setItem(STORAGE_KEYS.form, JSON.stringify(serializeForm()));
    localStorage.setItem(STORAGE_KEYS.snapshot, JSON.stringify(data));

    const container = document.getElementById('pdf-container') as HTMLDivElement | null;
    if (!container) throw new Error('No se encontró contenedor de PDF.');

    container.innerHTML = buildPdfHtml(data);
    container.style.display = 'block';

    const opt = {
      margin: [12, 12, 14, 12],
      filename: `Manual_Uso_Mantenimiento_${(data.cliente || 'vivienda').replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 1.25,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: {
        unit: 'pt',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    // html2pdf expone un factory global desde el CDN.
    // @ts-expect-error - typing provisto por CDN no incluido.
    const worker = html2pdf().set(opt).from(container).toPdf();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pdf = await worker.get('pdf');

    await worker.save();

    container.innerHTML = '';
    container.style.display = 'none';
    updateManualStatus();
  } catch (err) {
    console.error(err);
    alert('No fue posible generar el PDF. Revise la consola para más detalle.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Generar PDF profesional';
  }
}
