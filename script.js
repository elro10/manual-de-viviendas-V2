const STORAGE_KEY = 'base-cero-manual-form-v1';
const AUTH_KEY = 'base-cero-local-auth';
const BRAND = 'BASE CERO';
const LOCAL_USER = 'Vera';
const LOCAL_PASSWORD = 'culo';

const makeRule = (title, use, maintenance = {}) => ({ title, use, maintenance });
const task = (text, frequency = 'Anual', responsible = 'Usuario / profesional según corresponda') => ({ text, frequency, responsible });

const GENERAL_RULES = [
  makeRule('Uso responsable y prevención', [
    'Conserve accesibles las llaves de corte de agua, gas y electricidad; identifique su función antes de una emergencia.',
    'No intervenga instalaciones de gas ni eléctricas sin personal habilitado. Ante olor a gas, cierre la llave de paso, ventile el ambiente y no accione interruptores.',
    'Ventile los ambientes a diario y repare pérdidas o filtraciones tempranamente para evitar daños mayores.'
  ], { Semestral: [task('Accionar suavemente las llaves de paso de agua y verificar que no existan pérdidas.', 'Semestral')], Anual: [task('Inspeccionar signos de humedad, fisuras, filtraciones y el estado general de sellados.', 'Anual')] }),
  makeRule('Agua, desagües y pluviales', [
    'No arroje grasas, aceites, pinturas ni residuos sólidos por desagües. Use rejillas y cestos para retener sólidos.',
    'Mantenga desagües, rejillas y sifones libres de obstrucciones; en resumideros poco usados, renueve periódicamente el agua para evitar olores.'
  ], { Semestral: [task('Revisar flexibles, sifones, rejillas y sellados de mesadas y artefactos sanitarios.', 'Semestral')] }),
  makeRule('Confort, limpieza y seguridad', [
    'Evite sobrecargar zapatillas o prolongadores y no utilice tomacorrientes flojos, recalentados o con marcas de quemado.',
    'Mantenga libres las ventilaciones permanentes y no ubique materiales combustibles cerca de fuentes de calor.',
    'Use productos de limpieza compatibles con cada terminación y siga las indicaciones del fabricante de los equipos instalados.'
  ], { Semestral: [task('Revisar burletes, herrajes, sellados sanitarios y fijaciones accesibles.', 'Semestral')] })
];

const RULES = {
  tipoVivienda: {
    'Casa en planta baja': makeRule('Casa en planta baja', ['Revise el perímetro exterior, pendientes y desagües para que el agua de lluvia se aleje de los muros.']),
    'Casa en dos o más plantas': makeRule('Casa en dos o más plantas', ['Mantenga escaleras, barandas y circulaciones libres de obstáculos; controle fijaciones y protecciones de seguridad.'], { Anual: [task('Revisar firmeza de pasamanos, barandas y escalones.', 'Anual')] }),
    'Departamento': makeRule('Departamento', ['Respete el reglamento de copropiedad y no altere instalaciones o elementos comunes sin autorización. Coordine con la administración los mantenimientos del edificio.']),
    'Dúplex': makeRule('Dúplex', ['Mantenga despejadas las escaleras y verifique regularmente el estado de pasamanos y barandas.']),
    'PH': makeRule('PH', ['Coordine los trabajos que afecten muros, cubiertas, patios o instalaciones compartidas con los demás propietarios.']),
    'Loft': makeRule('Loft', ['Priorice la ventilación cruzada y delimite las áreas de cocina y descanso para controlar vapor, olores y condensación.'])
  },
  entorno: {
    'Urbano consolidado': makeRule('Entorno urbano', ['Limpie periódicamente rejillas, balcones y frentes para evitar que polvo y residuos obstruyan los desagües.']),
    'Suburbano': makeRule('Entorno suburbano', ['Antes de períodos de tormenta, asegure objetos exteriores y mantenga desagües, canaletas y patios despejados.']),
    'Rural': makeRule('Entorno rural', ['Controle con mayor frecuencia cubiertas, perímetros, desagües y posibles ingresos de plagas; mantenga despejada la vegetación cercana a la vivienda.'])
  },
  suelo: {
    'Compactación controlada': makeRule('Suelo compactado', ['No realice excavaciones ni agregue cargas relevantes junto a la vivienda sin evaluación técnica.']),
    'Rellenos estructurales': makeRule('Rellenos estructurales', ['Controle asentamientos, grietas nuevas o cambios en pendientes y consulte a un profesional ante variaciones progresivas.']),
    'Pendientes formadas para escurrimiento': makeRule('Pendientes de escurrimiento', ['No modifique las pendientes ni bloquee las vías de escurrimiento; manténgalas libres de tierra, hojas y objetos.']),
    'Mixto': makeRule('Suelo mixto', ['Controle periódicamente las pendientes y cualquier fisura o asentamiento nuevo; evite alteraciones del terreno sin asesoramiento técnico.'])
  },
  fundacion: {
    'Platea de hormigón armado': makeRule('Platea de hormigón armado', ['No ejecute perforaciones, cortes ni ampliaciones que comprometan elementos estructurales sin proyecto y dirección profesional.']),
    'Cimientos corridos': makeRule('Cimientos corridos', ['Evite filtraciones sostenidas al pie de los muros y controle fisuras que cambien de tamaño o dirección.']),
    'Pilotines': makeRule('Fundación con pilotines', ['No altere las cargas ni realice excavaciones próximas a la estructura sin consulta profesional.'])
  },
  sistemaConstructivo: {
    'Mampostería tradicional': makeRule('Mampostería tradicional', ['Repare sellados y fisuras superficiales de forma temprana. No demuela muros ni practique aberturas sin verificar si cumplen función estructural.']),
    'Estructura de hormigón armado': makeRule('Estructura de hormigón armado', ['No perfore vigas, columnas ni losas sin evaluación profesional. Consulte ante fisuras nuevas, desprendimientos o armaduras expuestas.']),
    'Steel framing': makeRule('Steel framing', ['Mantenga íntegras las barreras de agua y los sellos de fachada. Ante perforaciones o reformas, utilice fijaciones adecuadas y evite ingresos de humedad.'], { Anual: [task('Revisar juntas, sellos y revestimientos exteriores para detectar filtraciones.', 'Anual')] }),
    'Wood framing': makeRule('Wood framing', ['Mantenga protegidos los revestimientos, sellos y barreras de agua. Evite filtraciones persistentes y utilice fijaciones adecuadas en cualquier reforma.'], { Anual: [task('Revisar encuentros, sellos, revestimientos y posibles signos de humedad o ataque de insectos.', 'Anual')] }),
    'Sistema mixto': makeRule('Sistema constructivo mixto', ['Respete las particularidades de cada material y consulte antes de modificar muros, losas o revestimientos.']),
    'Paneles prefabricados': makeRule('Paneles prefabricados', ['No modifique uniones, juntas ni fijaciones sin asesoramiento técnico; revise sellos y encuentros visibles.'])
  },
  cubierta: {
    'Losa maciza de hormigón': makeRule('Losa maciza de hormigón', ['No obstruya desagües de cubierta. Controle que no se acumule agua ni se dañen las impermeabilizaciones.'], { Anual: [task('Inspeccionar impermeabilización, encuentros, desagües y sellos de la losa.', 'Anual', 'Profesional idóneo')], Bianual: [task('Revisar integralmente la impermeabilización y reparar sectores degradados.', 'Bianual', 'Profesional idóneo')] }),
    'Losa alivianada / viguetas': makeRule('Losa alivianada / viguetas', ['No perfore ni altere elementos portantes sin evaluación técnica. Controle filtraciones desde la cubierta o terrazas.']),
    'Cubierta de chapa': makeRule('Cubierta de chapa', ['Evite transitar sobre la chapa sin protecciones adecuadas. Mantenga limpias canaletas y revise fijaciones, uniones y signos de corrosión.'], { Semestral: [task('Limpiar canaletas y bajadas; retirar hojas y residuos.', 'Semestral')], Anual: [task('Revisar fijaciones, solapes, sellos y corrosión de la cubierta.', 'Anual')] }),
    'Teja cerámica / hormigón': makeRule('Cubierta de tejas', ['No camine sobre las tejas sin las protecciones correspondientes. Reemplace piezas quebradas y revise cumbreras y sellos.'], { Semestral: [task('Limpiar canaletas y bajadas de agua.', 'Semestral')], Anual: [task('Revisar tejas desplazadas, cumbreras, sellos y encuentros.', 'Anual')] }),
    'Paneles tipo sándwich': makeRule('Paneles tipo sándwich', ['Conserve los sellos y remates de los paneles; no perfore la cubierta sin resolver previamente la estanqueidad.'], { Anual: [task('Revisar fijaciones, sellos, uniones y estado de los remates.', 'Anual')] })
  },
  murosInteriores: {
    'Ladrillo cerámico / común': makeRule('Muros de mampostería', ['Evite perforaciones profundas sin verificar recorridos de instalaciones. Repare fisuras superficiales y consulte por grietas progresivas.']),
    'Placas de yeso': makeRule('Muros de placas de yeso', ['Use tarugos y fijaciones adecuados al peso. Repare golpes, juntas abiertas o manchas de humedad antes de que se extiendan.']),
    'Bloque de cemento': makeRule('Muros de bloque de cemento', ['Controle fisuras, humedad y desprendimientos; evite perforar sin verificar instalaciones embutidas.']),
    'Mixto': makeRule('Muros interiores mixtos', ['Utilice fijaciones acordes al tipo de muro y consulte ante fisuras, humedad o reformas que afecten tabiques.'])
  },
  revestimientosExt: {
    'Revoque tradicional': makeRule('Revoque tradicional', ['Repare fisuras y desprendimientos de forma temprana para impedir el ingreso de agua.']),
    'Revoque plástico / texturado': makeRule('Revestimiento plástico o texturado', ['Lave suavemente y evite hidrolavado agresivo. Selle fisuras antes de que permitan filtraciones.']),
    'Siding / revestimiento liviano': makeRule('Siding o revestimiento liviano', ['Limpie con métodos suaves y revise juntas, encuentros y fijaciones; no perfore ni altere paneles sin sellar correctamente.']),
    'Ladrillo visto': makeRule('Ladrillo visto', ['Evite productos ácidos. Revise juntas, sellos y posibles eflorescencias o filtraciones.'])
  },
  revestimientosInt: {
    'Pintura látex': makeRule('Pintura látex', ['Limpie con paño apenas húmedo y detergente neutro. Ventile para disminuir condensación y moho.']),
    'Pintura sintética': makeRule('Pintura sintética', ['Evite solventes abrasivos y mantenga ventilado el ambiente durante cualquier retoque.']),
    'Placas de yeso / especiales': makeRule('Revestimientos especiales', ['Utilice productos compatibles con el revestimiento y repare filtraciones antes de intervenir superficies dañadas.'])
  },
  carpinterias: {
    'Aluminio': makeRule('Carpinterías de aluminio', ['Limpie perfiles y desagües con agua y detergente neutro. No use abrasivos; mantenga libres los orificios de drenaje.'], { Semestral: [task('Limpiar guías, drenajes y revisar burletes y herrajes.', 'Semestral')] }),
    'PVC': makeRule('Carpinterías de PVC', ['Limpie con paño suave y detergente neutro. No use solventes ni abrasivos; revise burletes y drenajes.'], { Semestral: [task('Limpiar guías, drenajes y revisar burletes y herrajes.', 'Semestral')] }),
    'Madera': makeRule('Carpinterías de madera', ['Proteja de la humedad permanente y el sol intenso. No fuerce hojas hinchadas; revise terminaciones y herrajes.'], { Anual: [task('Revisar barnices o pinturas, sellos y estado de la madera expuesta.', 'Anual')], Bianual: [task('Renovar la protección superficial cuando el desgaste lo requiera.', 'Bianual')] }),
    'Chapa': makeRule('Aberturas de chapa', ['Limpie con agua y detergente neutro. Controle óxido, golpes, sellos, bisagras y cierres; no use abrasivos que dañen la protección superficial.'], { Anual: [task('Revisar corrosión, pintura protectora, herrajes y sellos perimetrales.', 'Anual')] }),
    'Mixto': makeRule('Carpinterías mixtas', ['Limpie con productos compatibles con cada material y conserve libres los drenajes y herrajes.'])
  },
  pisos: {
    'Cerámico / porcelanato': makeRule('Pisos cerámicos o porcelanato', ['Use limpiadores neutros; no emplee ácidos. Revise juntas y reemplace piezas flojas o quebradas.']),
    'Madera / flotante': makeRule('Pisos de madera o flotantes', ['Evite agua estancada y productos abrasivos. Use paño apenas húmedo y coloque protectores bajo muebles.'], { Anual: [task('Revisar juntas, zonas húmedas y piezas con movimiento o desgaste.', 'Anual')] }),
    'Cemento alisado': makeRule('Pisos de cemento alisado', ['Evite golpes y químicos agresivos. Limpie derrames rápidamente y controle sellos protectores.']),
    'Mosaicos / graníticos': makeRule('Pisos mosaicos o graníticos', ['Limpie con productos neutros y evite ácidos o abrasivos. Revise juntas, piezas flojas y sectores con desgaste o fisuras.'], { Anual: [task('Inspeccionar juntas, piezas sueltas, fisuras y desgaste de la superficie.', 'Anual')] }),
    'Vinílico / PVC': makeRule('Pisos vinílicos o PVC', ['Evite solventes y arrastre de muebles. Utilice protectores bajo apoyos y limpie con productos neutros.'])
  },
  gas: {
    'Gas natural': makeRule('Instalación de gas natural', ['Mantenga ventilaciones permanentes libres. Controle que la llama sea azul y solicite revisión ante olor a gas, hollín o llama amarilla.'], { Anual: [task('Solicitar verificación general de la instalación y artefactos a gas por gasista matriculado.', 'Anual', 'Gasista matriculado')] }),
    'Gas envasado': makeRule('Gas envasado', ['Mantenga el envase en posición vertical, ventilado y alejado de fuentes de calor. Revise regulador y mangueras según indicaciones del fabricante.'], { Anual: [task('Revisar regulador, mangueras y conexiones por gasista matriculado.', 'Anual', 'Gasista matriculado')] })
  },
  clim: {
    'Calefacción': makeRule('Calefacción', ['Antes de la temporada fría, verifique el correcto funcionamiento de los equipos y no cubra sus ventilaciones.']),
    'Aire acondicionado': makeRule('Aire acondicionado', ['Limpie filtros durante la temporada de uso y mantenga desagües de condensado sin obstrucciones.'], { Semestral: [task('Limpiar filtros y revisar drenaje de condensado durante épocas de uso.', 'Semestral')], Anual: [task('Realizar mantenimiento preventivo según fabricante.', 'Anual', 'Técnico especializado')] })
  },
  climGasTipo: {
    'Tiro balanceado': makeRule('Estufa tiro balanceado', ['No obstruya las rejillas ni terminales exteriores. Mantenga combustibles alejados y solicite revisión ante cambios en la combustión.'], { Anual: [task('Realizar limpieza y control de combustión por gasista matriculado.', 'Anual', 'Gasista matriculado')] }),
    'Infrarrojo': makeRule('Estufa infrarroja', ['Mantenga una ventilación adecuada y no acerque cortinas, ropa ni materiales combustibles.'], { Anual: [task('Revisar estado, conexiones y combustión por gasista matriculado.', 'Anual', 'Gasista matriculado')] })
  },
  equipos: {
    'Termotanque': makeRule('Termotanque', ['Mantenga despejada la zona del equipo. Verifique visualmente pérdidas y el correcto funcionamiento de la válvula de seguridad; consulte el manual del fabricante antes de purgarlo.'], { Semestral: [task('Verificar pérdidas, válvula de seguridad y conexiones visibles.', 'Semestral')], Anual: [task('Solicitar control técnico; revisar ánodo de sacrificio cuando el modelo lo posea.', 'Anual', 'Técnico / gasista matriculado según equipo')] }),
    'Calefón': makeRule('Calefón', ['No obstruya ventilaciones ni conductos de evacuación. Verifique que la llama sea azul y no use el artefacto ante olor a gas o funcionamiento irregular.'], { Anual: [task('Realizar limpieza, control de tiraje y combustión por gasista matriculado.', 'Anual', 'Gasista matriculado')] }),
    'Caldera individual': makeRule('Caldera individual', ['Respete la presión y parámetros indicados por el fabricante. No manipule componentes internos; ante fallas o pérdidas, solicite servicio técnico.'], { Anual: [task('Realizar mantenimiento preventivo y control de combustión.', 'Anual', 'Servicio técnico / gasista matriculado')] }),
    'Tanque elevado': makeRule('Tanque elevado', ['Mantenga tapa y rebalse en buen estado. Evite el ingreso de polvo, insectos u objetos y controle pérdidas en conexiones.'], { Anual: [task('Limpiar y desinfectar el tanque según procedimiento aplicable; revisar tapa, flotante y pérdidas.', 'Anual', 'Profesional idóneo')] }),
    'Cisterna': makeRule('Cisterna', ['Mantenga el acceso seguro, la tapa cerrada y el recinto libre de contaminantes. No ingrese a espacios confinados sin procedimiento profesional.'], { Anual: [task('Limpiar y desinfectar; revisar tapa, flotantes, rebalse y uniones.', 'Anual', 'Profesional idóneo')] }),
    'Bomba presurizadora': makeRule('Bomba presurizadora', ['No manipule conexiones eléctricas ni hidráulicas con el equipo energizado. Ante ruidos, vibraciones o cortes frecuentes, solicite revisión técnica.'], { Semestral: [task('Revisar pérdidas, vibraciones y estado de conexiones visibles.', 'Semestral')], Anual: [task('Realizar mantenimiento preventivo conforme al fabricante.', 'Anual', 'Técnico especializado')] })
  },
  seguridad: {
    'Disyuntor diferencial': makeRule('Disyuntor diferencial', ['Conozca su ubicación y función. Si dispara reiteradamente, no lo anule: solicite revisión eléctrica.'], { Semestral: [task('Probar el botón de test siguiendo las indicaciones del tablero; ante fallas, llamar a electricista habilitado.', 'Semestral', 'Usuario / electricista habilitado')] }),
    'Llave termomagnética': makeRule('Llave termomagnética', ['No reemplace protecciones por otras de mayor capacidad sin evaluación de un electricista habilitado.']),
    'Detector de monóxido': makeRule('Detector de monóxido', ['Mantenga el detector accesible y respete la vida útil y ubicación indicadas por el fabricante.'], { Semestral: [task('Probar la alarma y revisar estado de batería o alimentación.', 'Semestral')] }),
    'Matafuego': makeRule('Matafuego', ['Mantenga el matafuego visible, accesible y con precinto. Familiarícese con su modo de uso sin accionarlo.'], { Anual: [task('Controlar vigencia, carga y señalización.', 'Anual', 'Empresa habilitada')] })
  },
  abastecimiento: {
    'Red pública': makeRule('Abastecimiento por red pública', ['Mantenga identificada la llave de paso general y controle pérdidas en el ingreso a la vivienda.']),
    'Cooperativa de agua': makeRule('Abastecimiento por cooperativa', ['Mantenga identificada la llave de paso general y consulte a la cooperativa ante variaciones persistentes de presión o calidad.']),
    'Perforación / pozo propio': makeRule('Abastecimiento por perforación o pozo propio', ['Proteja el cabezal y las conexiones de contaminantes. Ante cambios de color, olor o sabor del agua, suspenda su uso para consumo y solicite análisis.'], { Anual: [task('Revisar bomba, cañerías visibles y condiciones sanitarias del punto de captación.', 'Anual', 'Técnico especializado')] }),
    'Cisterna / aljibe': makeRule('Cisterna o aljibe', ['Mantenga tapa, rebalse y ventilaciones protegidos. Evite el ingreso de sedimentos, insectos y objetos ajenos.'], { Anual: [task('Limpiar y desinfectar la cisterna o aljibe según el procedimiento aplicable.', 'Anual', 'Profesional idóneo')] }),
    'Captación de agua de lluvia': makeRule('Captación de agua de lluvia', ['Mantenga limpias las superficies de captación, canaletas y filtros. Destine el agua a usos compatibles con el sistema instalado.'], { Semestral: [task('Limpiar filtros, canaletas y primer desvío de lluvia si lo hubiera.', 'Semestral')] })
  },
  saneamiento: {
    'Red cloacal': makeRule('Conexión a red cloacal', ['No arroje grasas, toallitas, pañales, aceites ni residuos sólidos. Mantenga accesibles las cámaras de inspección.']),
    'Cámara séptica + pozo absorbente': makeRule('Cámara séptica y pozo absorbente', ['No arroje productos químicos agresivos, aceites ni sólidos. No transite ni construya sobre las tapas o el área del sistema.'], { Anual: [task('Solicitar inspección y desagote según uso, capacidad y condición del sistema.', 'Anual', 'Prestador habilitado')] }),
    'Biodigestor': makeRule('Biodigestor', ['Respete el manual del fabricante. No introduzca químicos agresivos, grasas ni residuos no biodegradables.'], { Anual: [task('Controlar lodos, filtros y funcionamiento conforme a las indicaciones del fabricante.', 'Anual', 'Servicio técnico')] }),
    'Planta compacta de tratamiento': makeRule('Planta compacta de tratamiento', ['Respete el manual de operación y no altere sus componentes. Registre mantenimientos, alertas y servicios técnicos.'], { Semestral: [task('Controlar equipos, aireación y dosificaciones conforme al sistema instalado.', 'Semestral', 'Servicio técnico')] }),
    'Pozo ciego': makeRule('Pozo ciego', ['No arroje residuos sólidos, grasas ni químicos. No transite ni ubique cargas sobre el área y solicite desagote antes de desbordes.'], { Anual: [task('Inspeccionar el sistema y programar desagote según nivel y uso.', 'Anual', 'Prestador habilitado')] })
  },
  tratamientoAgua: {
    'Filtro de sedimentos': makeRule('Filtro de sedimentos', ['Controle la presión y cambie cartuchos o elementos filtrantes según el manual y el estado del agua.'], { Semestral: [task('Revisar carcasa, juntas y reemplazar el elemento filtrante si corresponde.', 'Semestral')] }),
    'Ablandador de agua': makeRule('Ablandador de agua', ['Mantenga el nivel de sal y los ciclos de regeneración indicados por el fabricante.'], { Semestral: [task('Revisar sal, programación, válvulas y posibles pérdidas.', 'Semestral')] }),
    'Dosificador de cloro': makeRule('Dosificador de cloro', ['Ajuste la dosificación únicamente siguiendo las indicaciones técnicas y mantenga los productos químicos bajo resguardo.'], { Semestral: [task('Controlar dosificación, depósitos y conexiones.', 'Semestral', 'Técnico especializado')] }),
    'Ósmosis inversa': makeRule('Equipo de ósmosis inversa', ['Cambie prefiltros y membrana conforme al manual del fabricante; no utilice el equipo si presenta pérdidas o alertas.'], { Anual: [task('Realizar mantenimiento preventivo y recambio de consumibles según fabricante.', 'Anual', 'Servicio técnico')] })
  },
  calefaccionAlternativa: {
    'Salamandra a leña': makeRule('Salamandra a leña', ['Use leña seca y mantenga materiales combustibles alejados. No deje el equipo encendido sin supervisión.'], { Anual: [task('Limpiar conducto, revisar uniones y controlar tiraje antes del invierno.', 'Anual', 'Profesional idóneo')] }),
    'Hogar a leña': makeRule('Hogar a leña', ['Use leña seca, coloque protección frente a chispas y retire cenizas únicamente cuando estén frías.'], { Anual: [task('Limpiar chimenea y revisar el hogar y conductos antes de la temporada de uso.', 'Anual', 'Profesional idóneo')] }),
    'Estufa a pellets': makeRule('Estufa a pellets', ['Utilice pellets compatibles y respete el manual del fabricante. Mantenga libres las entradas de aire y salidas de gases.'], { Anual: [task('Realizar limpieza y mantenimiento preventivo antes de la temporada fría.', 'Anual', 'Servicio técnico')] }),
    'Chimenea': makeRule('Chimenea', ['Mantenga el conducto sin obstrucciones y no queme residuos, plásticos ni maderas tratadas.'], { Anual: [task('Limpiar el conducto y revisar tiraje y sombrerete.', 'Anual', 'Profesional idóneo')] })
  },
  energiaAutonoma: {
    'Paneles fotovoltaicos': makeRule('Paneles fotovoltaicos', ['No camine ni apoye objetos sobre los paneles. Controle visualmente sombras, suciedad y daños, sin intervenir conexiones eléctricas.'], { Anual: [task('Revisar estructura, cableado visible y rendimiento con instalador calificado.', 'Anual', 'Instalador calificado')] }),
    'Inversor y baterías': makeRule('Inversor y baterías', ['Mantenga el recinto ventilado y seco. No altere conexiones, protecciones ni parámetros del equipo.'], { Semestral: [task('Revisar indicadores, ventilación, conexiones visibles y estado de baterías.', 'Semestral', 'Técnico especializado')] }),
    'Grupo electrógeno': makeRule('Grupo electrógeno', ['Opere únicamente en exteriores ventilados y conforme al manual. Nunca lo use dentro de la vivienda, garaje o espacios cerrados.'], { Semestral: [task('Realizar prueba de funcionamiento y control de combustible, aceite y batería.', 'Semestral', 'Técnico especializado')] })
  },
  exterior: {
    'Muro de contención': makeRule('Muro de contención', ['No modifique drenajes ni agregue cargas próximas al muro. Consulte ante fisuras, inclinaciones, filtraciones o desplazamientos.'], { Anual: [task('Inspeccionar drenajes, fisuras y deformaciones visibles.', 'Anual', 'Profesional idóneo')] }),
    'Cerco perimetral': makeRule('Cerco perimetral', ['Revise fijaciones, tensiones y corrosión. Mantenga la vegetación controlada para evitar daños o esfuerzos sobre el cerco.']),
    'Portón': makeRule('Portón', ['Mantenga guías y área de movimiento libres. No permanezca bajo el portón ni altere finales de carrera o protecciones.'], { Semestral: [task('Lubricar herrajes compatibles y revisar fijaciones, guías y cierre.', 'Semestral', 'Técnico si es automatizado')] }),
    'Galería / pérgola': makeRule('Galería o pérgola', ['Controle fijaciones, cubiertas y canaletas. Asegure elementos livianos antes de vientos fuertes.'], { Anual: [task('Revisar estructura, anclajes, protección superficial y drenajes.', 'Anual')] }),
    'Pileta': makeRule('Pileta', ['Mantenga el perímetro seguro y use productos de tratamiento conforme a las indicaciones. No manipule equipos eléctricos con manos húmedas.'], { Semestral: [task('Revisar filtros, bombas, skimmers y sellos antes y después de la temporada de uso.', 'Semestral', 'Técnico especializado')] })
  },
  aguaExterior: {
    'Bomba de pozo': makeRule('Bomba de pozo', ['No manipule conexiones eléctricas con el equipo energizado. Ante ruidos, caudal irregular o disparos de protección, solicite revisión técnica.'], { Anual: [task('Controlar bomba, válvulas, presión y conexiones visibles.', 'Anual', 'Técnico especializado')] }),
    'Riego automático': makeRule('Riego automático', ['Ajuste la programación según estación y evite dirigir agua hacia muros, aberturas o sectores con pendientes inestables.'], { Semestral: [task('Limpiar filtros y revisar aspersores, válvulas y pérdidas.', 'Semestral')] }),
    'Riego manual': makeRule('Riego manual', ['Evite el exceso de agua junto a muros y fundaciones. Compruebe que las mangueras no generen obstáculos o pérdidas.']),
    'Reservorio de agua': makeRule('Reservorio de agua', ['Mantenga tapa y perímetro seguros. Evite agua estancada y siga el uso previsto para el reservorio.'], { Anual: [task('Limpiar reservorio, revisar tapa, rebalse y pérdidas.', 'Anual')] })
  },
  instalacionPluvial: {
    'Canaletas + bajadas pluviales': makeRule('Canaletas y bajadas pluviales', ['Retire hojas y residuos antes de las lluvias. Verifique que las descargas no humedezcan muros ni cimientos.'], { Semestral: [task('Limpiar canaletas, bocas y bajadas; comprobar escurrimiento.', 'Semestral')] }),
    'Desagües lineales': makeRule('Desagües lineales', ['Mantenga las rejillas libres de residuos y verifique el escurrimiento durante lluvias intensas.'], { Semestral: [task('Retirar rejillas accesibles y limpiar canal y puntos de descarga.', 'Semestral')] }),
    'Rejillas y cámaras': makeRule('Rejillas y cámaras', ['No arroje tierra ni residuos. Mantenga las tapas seguras y consulte ante obstrucciones persistentes.'], { Semestral: [task('Limpiar rejillas y verificar cámaras y desagües accesibles.', 'Semestral')] }),
    'Mixto': makeRule('Sistema pluvial mixto', ['Mantenga libres todos los puntos de captación, rejillas, canaletas y bajadas; revise su escurrimiento antes de las lluvias.'], { Semestral: [task('Limpiar y comprobar el sistema pluvial completo.', 'Semestral')] })
  },
  sistemasComunes: {
    'Alarma de incendio': makeRule('Alarma de incendio', ['No altere sensores, pulsadores ni sirenas. Informe fallas a la administración.']),
    'Presurización de caja de escalera': makeRule('Presurización de caja de escalera', ['No obstruya puertas, rejillas ni conductos; el mantenimiento corresponde a la administración y personal especializado.']),
    'Sala de basura y ducto': makeRule('Sala de basura y ducto', ['Deposite residuos embolsados y no arroje elementos voluminosos o inflamables.']),
    'Aguas lluvias - recolección': makeRule('Aguas lluvias - recolección', ['No arroje residuos a sumideros o rejillas. Informe obstrucciones a la administración.']),
    'Aguas lluvias - drenajes': makeRule('Aguas lluvias - drenajes', ['Mantenga libres los drenajes de áreas comunes y reporte anegamientos.']),
    'Aguas lluvias - canaletas': makeRule('Aguas lluvias - canaletas', ['La limpieza y revisión de canaletas debe coordinarse con la administración y realizarse en condiciones seguras.']),
    'Lavandería comunitaria': makeRule('Lavandería comunitaria', ['Respete las normas de uso, limpie filtros accesibles y no sobrecargue equipos.']),
    'Jardines - área verde': makeRule('Jardines y área verde', ['No modifique riego ni especies sin coordinación. Evite dirigir agua hacia muros y accesos.']),
    'Jardines - riego automático': makeRule('Riego automático', ['Informe pérdidas o aspersores dañados y no altere programadores sin autorización.'])
  }
};

const AMBIENTES = {
  Dormitorios: makeRule('Dormitorios', ['Ventile diariamente. Revise signos de condensación, mantenga despejadas las ventilaciones y controle burletes y herrajes de las aberturas.']),
  Cocina: makeRule('Cocina', ['No vierta grasas ni residuos al desagüe. Limpie campana y filtros según fabricante; revise flexibles, sifón y sellos de mesada.']),
  Baño: makeRule('Baño', ['Ventile durante y después de la ducha. Controle sellos sanitarios, griferías, descarga del inodoro y la presencia de humedad o moho.']),
  Living: makeRule('Living', ['Ventile a diario y no sobrecargue tomacorrientes. Mantenga alejadas las fuentes de calor de cortinas y mobiliario.']),
  Comedor: makeRule('Comedor', ['Proteja pisos y superficies de derrames. Mantenga despejadas las circulaciones y controle aberturas y sellos.']),
  Lavadero: makeRule('Lavadero', ['Revise mangueras y conexiones de lavarropas. No deje equipos funcionando sin supervisión y mantenga el desagüe libre.']),
  Quincho: makeRule('Quincho', ['Mantenga ventilación suficiente. Limpie parrilla y conductos fríos; aleje materiales combustibles y revise extintor si lo hubiera.']),
  Cochera: makeRule('Cochera', ['Mantenga rejillas despejadas y no almacene combustibles. Revise portones, luminarias y señalización de paso.']),
  Vestidor: makeRule('Vestidor', ['Ventile periódicamente y evite apoyar muebles contra muros con humedad. No sobrecargue estantes ni barrales.']),
  Estudio: makeRule('Estudio', ['Evite sobrecargar extensiones y zapatillas. Ordene cables para prevenir tropiezos y mantenga ventilado el ambiente.']),
  Terraza: makeRule('Terraza', ['No obstruya desagües ni exceda las cargas previstas. Revise sellos, pisos y barandas, especialmente antes de lluvias.']),
  Patio: makeRule('Patio', ['Mantenga pendientes y desagües libres. Evite que el riego moje muros de forma sostenida y asegure objetos antes de tormentas.']),
  Circulaciones: makeRule('Circulaciones', ['Mantenga los pasos libres, secos e iluminados. Revise firmemente pasamanos, barandas y alfombras.']),
  Depósito: makeRule('Depósito', ['Almacene de manera estable y deje accesibles llaves de corte y tableros. Controle humedad, plagas y vencimientos de productos.']),
  'Sala de máquinas': makeRule('Sala de máquinas', ['Mantenga el acceso restringido, ventilado y libre de objetos. Las intervenciones deben ser realizadas por personal técnico habilitado.'])
};

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem(AUTH_KEY) === 'true') initializeManual();
  else initializeLogin();
});

function initializeLogin() {
  const loginForm = document.getElementById('loginForm');
  const status = document.getElementById('loginStatus');
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPassword').value;
    if (user !== LOCAL_USER || password !== LOCAL_PASSWORD) { setStatus(status, 'Usuario o contraseña incorrectos.', true); return; }
    sessionStorage.setItem(AUTH_KEY, 'true');
    document.getElementById('loginScreen').hidden = true;
    document.getElementById('manualApp').hidden = false;
    initializeManual();
  });
}

function initializeManual() {
  document.getElementById('loginScreen').hidden = true;
  document.getElementById('manualApp').hidden = false;
  const form = document.getElementById('reportForm');
  const status = document.getElementById('manualStatus');
  restoreForm(form);
  form.addEventListener('input', () => saveForm(form));
  form.addEventListener('change', () => saveForm(form));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); setStatus(status, 'Completá los datos obligatorios para generar el PDF.', true); return; }
    setStatus(status, 'Generando PDF…');
    try { await generatePdf(collectFormData(form)); setStatus(status, 'PDF generado correctamente.'); }
    catch (error) { console.error(error); setStatus(status, 'No fue posible generar el PDF. Verificá la conexión e intentá nuevamente.', true); }
  });
  document.getElementById('newManualBtn').addEventListener('click', () => {
    if (!window.confirm('¿Querés borrar los datos del formulario y comenzar un nuevo manual?')) return;
    form.reset(); localStorage.removeItem(STORAGE_KEY); setStatus(status, 'Formulario reiniciado.');
  });
}

function collectFormData(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  ['gas', 'clim', 'climGasTipo', 'equipos', 'seguridad', 'sistemasComunes', 'tratamientoAgua', 'calefaccionAlternativa', 'energiaAutonoma', 'exterior', 'aguaExterior', 'amb'].forEach(name => { data[name] = [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value); });
  return data;
}

function saveForm(form) {
  const values = {};
  form.querySelectorAll('input, select, textarea').forEach(element => {
    if (!element.name) return;
    if (element.type === 'checkbox') { values[element.name] ||= []; if (element.checked) values[element.name].push(element.value); }
    else values[element.name] = element.value;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
}

function restoreForm(form) {
  try {
    const values = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    form.querySelectorAll('input, select, textarea').forEach(element => {
      if (!element.name || !(element.name in values)) return;
      if (element.type === 'checkbox') element.checked = values[element.name].includes(element.value);
      else element.value = values[element.name];
    });
  } catch { localStorage.removeItem(STORAGE_KEY); }
}

function getSelectedRules(data) {
  const rules = [...GENERAL_RULES];
  ['tipoVivienda', 'entorno', 'suelo', 'fundacion', 'sistemaConstructivo', 'cubierta', 'murosInteriores', 'revestimientosExt', 'revestimientosInt', 'carpinterias', 'pisos', 'abastecimiento', 'saneamiento', 'instalacionPluvial'].forEach(field => {
    const value = data[field]; if (value && value !== 'No aplica' && RULES[field]?.[value]) rules.push(RULES[field][value]);
  });
  ['gas', 'clim', 'climGasTipo', 'equipos', 'seguridad', 'sistemasComunes', 'tratamientoAgua', 'calefaccionAlternativa', 'energiaAutonoma', 'exterior', 'aguaExterior'].forEach(field => data[field].forEach(value => { if (RULES[field]?.[value]) rules.push(RULES[field][value]); }));
  return rules;
}

function unique(items) { return [...new Set(items)]; }
function setStatus(element, message, isError = false) { element.textContent = message; element.classList.toggle('is-error', isError); }
function bulletList(items) { return { ul: unique(items), margin: [0, 4, 0, 10] }; }

async function generatePdf(data) {
  if (!window.pdfMake) throw new Error('pdfMake no disponible');
  const selectedRules = getSelectedRules(data);
  const roomRules = data.amb.map(room => AMBIENTES[room]).filter(Boolean);
  const technicalData = [
    ['Tipo de vivienda', data.tipoVivienda], ['Entorno', data.entorno], ['Sistema constructivo', data.sistemaConstructivo], ['Cubierta', data.cubierta], ['Aberturas exteriores', data.carpinterias], ['Pisos', data.pisos], ['Abastecimiento de agua', data.abastecimiento], ['Saneamiento', data.saneamiento]
  ].filter(([, value]) => value && value !== 'No aplica');
  const frequencyRows = ['Semestral', 'Anual', 'Bianual'].flatMap(frequency => {
    const tasks = selectedRules.flatMap(rule => rule.maintenance[frequency] || []);
    const seen = new Set();
    return tasks.filter(item => !seen.has(item.text) && seen.add(item.text)).map(item => [frequency, item.text, item.responsible]);
  });
  const content = [
    { text: BRAND, style: 'brand', alignment: 'center' },
    { text: 'MANUAL DE USO Y MANTENIMIENTO', style: 'title', alignment: 'center' },
    { text: 'Guía personalizada para la vivienda', style: 'subtitle', alignment: 'center' },
    { text: 'Trabajamos para tu seguridad y confort.', style: 'motto', alignment: 'center' },
    { canvas: [{ type: 'line', x1: 0, y1: 8, x2: 495, y2: 8, lineColor: '#1e5a52', lineWidth: 1 }], margin: [0, 12, 0, 14] },
    { text: '1. Datos de referencia', style: 'h1' },
    { table: { widths: ['32%', '68%'], body: [['Cliente', data.cliente], ['Domicilio', data.direccion], ['Localidad', data.localidad], ['Año de construcción', data.anio || 'No informado'], ['Superficie', data.superficie ? `${data.superficie} m²` : 'No informada']] }, layout: 'lightHorizontalLines' },
    ...(technicalData.length ? [{ text: 'Características declaradas', style: 'h2' }, { table: { widths: ['32%', '68%'], body: technicalData }, layout: 'lightHorizontalLines' }] : []),
    { text: '2. Recomendaciones generales de uso y conservación', style: 'h1' },
    ...GENERAL_RULES.flatMap(rule => [{ text: rule.title, style: 'h2' }, bulletList(rule.use)]),
    { text: '3. Guía según características e instalaciones seleccionadas', style: 'h1' },
    ...selectedRules.slice(GENERAL_RULES.length).flatMap(rule => [{ text: rule.title, style: 'h2' }, bulletList(rule.use)]),
    ...(roomRules.length ? [{ text: '4. Guía por ambientes', style: 'h1' }, ...roomRules.flatMap(rule => [{ text: rule.title, style: 'h2' }, bulletList(rule.use)])] : [{ text: '4. Guía por ambientes', style: 'h1' }, { text: 'No se seleccionaron ambientes específicos. Se mantienen vigentes las recomendaciones generales de este manual.', style: 'body' }]),
    { text: '5. Plan de mantenimiento preventivo', style: 'h1' },
    { text: 'La periodicidad es orientativa. Ante anomalías, filtraciones, pérdidas, ruidos o fallas, intervenga de forma temprana y consulte a un profesional cuando corresponda.', style: 'body', margin: [0, 0, 0, 8] },
    { table: { headerRows: 1, widths: ['17%', '53%', '30%'], body: [['Frecuencia', 'Tarea', 'Responsable'], ...frequencyRows] }, layout: 'lightHorizontalLines', fontSize: 8 },
    ...(data.observaciones.trim() ? [{ text: '6. Observaciones técnicas', style: 'h1' }, { text: data.observaciones.trim(), style: 'body' }] : []),
    { text: 'Este documento brinda pautas generales de uso y mantenimiento. No reemplaza manuales de fabricante, diagnósticos ni intervenciones de profesionales habilitados.', style: 'disclaimer' }
  ];
  pdfMake.createPdf({ pageSize: 'A4', pageMargins: [48, 46, 48, 48], content, defaultStyle: { fontSize: 9, color: '#1e2930' }, styles: { brand: { fontSize: 11, bold: true, color: '#1e5a52', characterSpacing: 2 }, title: { fontSize: 20, bold: true, color: '#17212b', margin: [0, 8, 0, 4] }, subtitle: { fontSize: 11, color: '#5b6874' }, motto: { fontSize: 10, italics: true, color: '#1e5a52', margin: [0, 8, 0, 0] }, h1: { fontSize: 14, bold: true, color: '#1e5a52', margin: [0, 20, 0, 8] }, h2: { fontSize: 10.5, bold: true, color: '#253641', margin: [0, 10, 0, 2] }, body: { fontSize: 9, lineHeight: 1.25 }, disclaimer: { fontSize: 7.5, color: '#5b6874', italics: true, margin: [0, 20, 0, 0] } }, footer: (page, pages) => ({ text: `${BRAND} · Manual de uso y mantenimiento · Página ${page} de ${pages}`, alignment: 'center', fontSize: 7, color: '#68757d', margin: [0, 8, 0, 0] }) }).download(`Manual_${data.cliente.replace(/[^a-z0-9]+/gi, '_') || 'BaseCero'}.pdf`);
}
