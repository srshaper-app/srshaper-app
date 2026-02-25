export type Lang = 'es' | 'en';

export const translations = {
    es: {
        // Nav
        nav_tablas: 'Tablas',
        nav_tablas_todas: 'Todas las tablas',
        nav_tablas_crea: 'Crea tu tabla',
        nav_academia: 'Academia',
        nav_academia_shape: 'Curso de shape',
        nav_academia_laminacion: 'Curso de laminación',
        nav_academia_glassing: 'Curso de glassing and sanding',
        nav_academia_completo: 'Curso completo 0 a 100',
        nav_academia_reparacion: 'Curso de reparación',
        nav_accesorios: 'Accesorios',
        nav_accesorios_todos: 'Todos los accesorios',
        nav_quillas: 'Quillas',
        nav_grips: 'Grips',
        nav_fundas: 'Fundas',
        nav_wax: 'Wax',
        nav_leashes: 'Leashes',
        nav_surf_skate: 'Surf Skate',
        nav_sobre_nosotros: 'Sobre nosotros',
        nav_contacto: 'Contacto',

        // Mobile menu
        mobile_menu: 'Menú',
        mobile_cerrar: 'Cerrar',

        // Home hero
        home_eyebrow: 'Tablas personalizadas · Envíos a todo el país',
        home_h1: 'Diseña tu tabla a medida o elige una de nuestro catálogo para surfear.',
        home_lead: 'Priorizamos el shaping personalizado con opciones listas para entrega. Todo con estilo surfero, funcional y auténtico.',
        home_cta_crea: 'Crea tu tabla',
        home_cta_compra: 'Comprar tablas',
        home_badge_custom: 'Custom shaping',
        home_badge_catalogo: 'Catálogo inmediato',
        home_badge_asesoria: 'Asesoría experta',
        home_card_tag: 'Sesión real · Las Palmas',
        home_card_h3: 'Olas reales, tablas reales',
        home_card_p: 'Nuestra referencia está en el agua: condiciones reales para diseñar tablas que respondan de verdad cuando toca surfear.',
        home_card_ver: 'Ver tablas',
        home_card_crear: 'Crear a medida',
        home_modelos_h2: 'Modelos de tablas Sr.Shaper',
        home_modelos_p: 'Estos son nuestros modelos base. Cada compra inicia fabricación a medida en taller.',
        home_modelos_ver: 'Ver modelo',
        home_modelos_cta_ver: 'Ver todas las tablas',
        home_accesorios_h2: 'Accesorios esenciales',
        home_accesorios_p: 'Quillas, wax, fundas y grips seleccionados para sesiones fuertes.',
        home_recursos_h2: 'Recursos Sr.Shaper',
        home_recursos_p: 'Guías, recomendaciones y contenido práctico sobre shaping, mantenimiento y elección de tablas.',
        home_recursos_cta: 'Ver contenidos',
        home_sesiones_h2: 'Sesiones del equipo',
        home_sesiones_p: 'Probamos cada concepto de diseño en el mar, no solo en el taller.',

        // Tablas page
        tablas_h1: 'Tablas de Surf',
        tablas_lead: 'No trabajamos un catálogo cerrado de stock: fabricamos cada tabla bajo pedido sobre estos 4 modelos base.',
        tablas_modelos_disponibles: 'Modelos disponibles',
        tablas_crea_medida: 'Crea tu tabla a medida',
        tablas_catalogo_h2: 'Catálogo de Tablas',
        tablas_catalogo_p: 'Conoce nuestros 4 modelos insignia y elige tu próxima tabla.',
        tablas_ver_modelo: 'Ver modelo',
        tablas_como_comprar_h2: 'Cómo comprar tu tabla',
        tablas_como_comprar_p: 'Proceso simple y claro para cada pedido.',
        tablas_paso1_h3: '1. Elige modelo',
        tablas_paso1_p: 'Selecciona Princess, Gentleman, Gangster o Shark Attack.',
        tablas_paso2_h3: '2. Configura',
        tablas_paso2_p: 'Define outline y medida de fabricación desde la página de cada modelo.',
        tablas_paso3_h3: '3. Compra y empezamos',
        tablas_paso3_p: 'Tras el pago, iniciamos el shape de tu tabla con la configuración elegida.',

        // Modelos page
        modelo_medida: 'a medida',
        modelo_no_stock: 'Este modelo no se vende en stock prefabricado: cada compra inicia la fabricación personalizada en taller según outline y medida seleccionados.',
        modelo_paso1: 'Selecciona outline y medida de fabricación.',
        modelo_paso2: 'Añade la tabla al carrito y completa tu compra.',
        modelo_paso3: 'Con el pago confirmado, comenzamos el shape de tu tabla.',
        modelo_configurar: 'Configurar este modelo',
        modelo_crea: 'Crea tu tabla',
        modelo_variaciones: 'Variaciones del modelo',
        modelo_variaciones_p: 'Acabados y opciones reales disponibles para',
        modelo_descripcion: 'Descripción del modelo',
        modelo_medidas: 'Medidas de fabricación',
        modelo_specs: 'Especificaciones de construcción',
        modelo_precio: 'Precio',
        modelo_no_encontrado: 'Modelo no encontrado',
        modelo_volver: 'Volver a tablas',

        // Accesorios
        accesorios_h1: 'Accesorios que aguantan sesiones intensas.',
        accesorios_lead: 'Seleccionamos materiales resistentes al sol, sal y arena. Todo pensado para que rindas mejor.',
        accesorios_categorias: 'Categorías de accesorios',
        accesorios_disponibles: 'Accesorios disponibles',
        accesorios_disponibles_p: 'Arma tu set completo y sal al agua sin preocuparte.',
        accesorios_vacio: 'No hay accesorios cargados.',

        // Surf Skate
        surfskate_h1: 'Surf Skate para entrenar tus giros fuera del agua.',
        surfskate_lead_all: 'Configura tu set de surf skate con tablas, ejes, ruedas y accesorios.',
        surfskate_mostrando: 'Mostrando artículos de:',
        surfskate_categorias: 'Categorías de Surf Skate',
        surfskate_todos: 'Todos',
        surfskate_disponibles: 'Artículos disponibles',
        surfskate_disponibles_p: 'Material real para practicar técnica de surf en asfalto.',
        surfskate_vacio: 'No hay artículos de Surf Skate cargados todavía.',

        // Academia
        academia_h1: 'Academia Sr.Shaper',
        academia_lead: 'Cursos de shaping artesanal: aprende a dar forma, laminar y reparar tus propias tablas de surf.',
        academia_cursos: 'Cursos disponibles',
        academia_disponibles: 'Cursos disponibles',
        academia_disponibles_p: 'Cada curso cubre una etapa del proceso de fabricación artesanal.',
        academia_vacio: 'No hay cursos disponibles ahora mismo.',

        // Sobre nosotros
        sobre_h1: 'Sobre nosotros',
        sobre_lead: 'Nuestra historia nace en el Atlántico, entre olas, madera y shaping artesanal.',
        sobre_historia_h2: 'Nuestra Historia',
        sobre_historia_p1: 'En Las Palmas de Gran Canaria, donde el Atlántico dibuja líneas perfectas contra la costa volcánica, nació algo más que un taller de tablas de surf. Nació una conversación silenciosa entre el océano, la madera, y las manos que conocen ambos idiomas.',
        sobre_historia_p2: 'Mi historia comenzó donde comienzan todas las buenas historias de surf: en el agua. Años de leer olas, de sentir cómo cada tabla respondía diferente a cada sección, de entender que el océano no perdona la mediocridad pero recompensa la constancia. Fue en esas sesiones interminables en el norte de la isla, bajo el cielo cambiante del Atlántico, donde aprendí que una tabla de surf no es un objeto, es un puente entre el surfista y la ola.',
        sobre_historia_p3: 'Lo que comenzó como una inquietud se transformó en obsesión. Necesitaba entender por qué algunas tablas bailaban en el agua y otras simplemente flotaban. Por qué ciertas líneas de rail hacían que el tiempo se detuviera en el tubo. Por qué un centímetro podía ser la diferencia entre la magia y la medianía.',
        sobre_artesania_h2: 'Artesanía con Alma Atlántica',
        sobre_artesania_p1: 'En nuestro taller, cada tabla es un acto de fe. Fe en el proceso, en la paciencia, en la idea de que las cosas bien hechas llevan su tiempo. Aquí no hay prisa, porque el océano no tiene prisa y las olas perfectas no se pueden forzar.',
        sobre_artesania_p2: 'El foam blanco es nuestro lienzo, la resina es escultura líquida, arquitectura fluida diseñada no para museos sino para momentos efímeros de perfección en agua salada.',
        sobre_artesania_p3: 'Trabajamos con las manos y la mente clara. Cada tabla lleva las marcas invisibles de nuestras sesiones. Creemos en la honestidad del shape. En tablas que no prometen milagros pero entregan rendimiento. En diseños que respetan tanto la tradición como la innovación, porque el océano es antiguo pero cada ola es nueva.',
        sobre_artesania_p4: 'Creemos en conocer a quien va a surfear nuestras tablas. En escuchar no solo lo que dicen, sino lo que buscan cuando miran el horizonte del mar. En entender que cada surfista tiene su propia danza con las olas, y nuestra misión es crear el instrumento perfecto para esa música.',
        sobre_mas_h2: 'Más Allá del Shape',
        sobre_mas_p1: 'Cuando entregas una tabla terminada, con el cristal brillando bajo la luz del taller, sabes que estás entregando parte de ti. Cada una lleva horas de trabajo, años de aprendizaje, décadas de amor por el surf.',
        sobre_mas_p2: 'Pero más que eso, lleva una promesa: que cuando esa tabla toque el agua, cuando sienta el peso del surfista y la fuerza de la ola, va a responder. Va a estar ahí, firme y fluida, permitiendo ese momento de gracia donde todo desaparece excepto el surfista, la ola y la línea perfecta que los une.',

        // Contacto
        contacto_h1: 'Contacto',
        contacto_lead: 'Escríbenos directamente por cualquiera de estos canales.',
        contacto_whatsapp_h2: 'WhatsApp',
        contacto_whatsapp_p: 'La forma más rápida de contactarnos. Respondemos en menos de 24 horas.',
        contacto_whatsapp_btn: 'Abrir WhatsApp',
        contacto_email_h2: 'Email',
        contacto_email_p: 'Para consultas detalladas o presupuestos personalizados.',
        contacto_horario_h2: 'Horario',
        contacto_horario_p: 'Lunes a viernes, de 9:00 a 18:00 (hora canaria).',

        // Producto detalle
        producto_volver: 'Volver',
        producto_stock: 'Stock disponible:',
        producto_agotado: 'Agotado',
        producto_pocas: 'Quedan pocas unidades',
        producto_anadir: 'Añadir al carrito',
        producto_ver: 'Ver detalle',

        // ProductCard
        card_agregar: 'Agregar al carrito',
        card_agotado: 'Agotado',
        card_ver: 'Ver detalle',

        // Footer
        footer_note: '© 2026 Sr.Shaper Surfboards. Hecho con sal y madera.',

        // Newsletter
        newsletter_h2: 'Únete a la comunidad Sr.Shaper',
        newsletter_p: 'Noticias, drops y tips de entrenamiento directo a tu correo.',
    },

    en: {
        // Nav
        nav_tablas: 'Surfboards',
        nav_tablas_todas: 'All surfboards',
        nav_tablas_crea: 'Build your board',
        nav_academia: 'Academy',
        nav_academia_shape: 'Shaping course',
        nav_academia_laminacion: 'Lamination course',
        nav_academia_glassing: 'Glassing & sanding course',
        nav_academia_completo: 'Full course 0 to 100',
        nav_academia_reparacion: 'Repair course',
        nav_accesorios: 'Accessories',
        nav_accesorios_todos: 'All accessories',
        nav_quillas: 'Fins',
        nav_grips: 'Traction pads',
        nav_fundas: 'Board bags',
        nav_wax: 'Wax',
        nav_leashes: 'Leashes',
        nav_surf_skate: 'Surf Skate',
        nav_sobre_nosotros: 'About us',
        nav_contacto: 'Contact',

        // Mobile menu
        mobile_menu: 'Menu',
        mobile_cerrar: 'Close',

        // Home hero
        home_eyebrow: 'Custom surfboards · Shipping nationwide',
        home_h1: 'Design your custom board or choose from our ready catalogue.',
        home_lead: 'We prioritise personalised shaping with ready-to-ship options. All with authentic surf style and functionality.',
        home_cta_crea: 'Build your board',
        home_cta_compra: 'Shop boards',
        home_badge_custom: 'Custom shaping',
        home_badge_catalogo: 'Ready catalogue',
        home_badge_asesoria: 'Expert advice',
        home_card_tag: 'Real session · Las Palmas',
        home_card_h3: 'Real waves, real boards',
        home_card_p: 'Our reference is in the water: real conditions to design boards that truly respond when it counts.',
        home_card_ver: 'View boards',
        home_card_crear: 'Build custom',
        home_modelos_h2: 'Sr.Shaper Board Models',
        home_modelos_p: 'These are our base models. Every purchase starts custom manufacturing in the workshop.',
        home_modelos_ver: 'View model',
        home_modelos_cta_ver: 'View all boards',
        home_accesorios_h2: 'Essential accessories',
        home_accesorios_p: 'Fins, wax, board bags and traction pads selected for serious sessions.',
        home_recursos_h2: 'Sr.Shaper Resources',
        home_recursos_p: 'Guides, tips and practical content on shaping, board care and model selection.',
        home_recursos_cta: 'View content',
        home_sesiones_h2: 'Team sessions',
        home_sesiones_p: 'We test every design concept in the ocean, not just in the workshop.',

        // Tablas page
        tablas_h1: 'Surfboards',
        tablas_lead: "We don't carry a closed stock catalogue: we build every board to order based on these 4 base models.",
        tablas_modelos_disponibles: 'Available models',
        tablas_crea_medida: 'Build your custom board',
        tablas_catalogo_h2: 'Board Catalogue',
        tablas_catalogo_p: 'Discover our 4 signature models and choose your next board.',
        tablas_ver_modelo: 'View model',
        tablas_como_comprar_h2: 'How to order your board',
        tablas_como_comprar_p: 'Simple and clear process for every order.',
        tablas_paso1_h3: '1. Choose model',
        tablas_paso1_p: 'Select Princess, Gentleman, Gangster or Shark Attack.',
        tablas_paso2_h3: '2. Configure',
        tablas_paso2_p: 'Set outline and size from each model page.',
        tablas_paso3_h3: '3. Buy and we start',
        tablas_paso3_p: 'Once payment is confirmed, we start shaping your board with your chosen configuration.',

        // Modelos page
        modelo_medida: 'custom',
        modelo_no_stock: 'This model is not sold as pre-manufactured stock: every purchase starts personalised manufacturing in the workshop based on the selected outline and size.',
        modelo_paso1: 'Select outline and manufacturing size.',
        modelo_paso2: 'Add the board to your cart and complete your purchase.',
        modelo_paso3: 'Once payment is confirmed, we begin shaping your board.',
        modelo_configurar: 'Configure this model',
        modelo_crea: 'Build your board',
        modelo_variaciones: 'Model variations',
        modelo_variaciones_p: 'Real finishes and options available for',
        modelo_descripcion: 'Model description',
        modelo_medidas: 'Manufacturing sizes',
        modelo_specs: 'Build specs',
        modelo_precio: 'Price',
        modelo_no_encontrado: 'Model not found',
        modelo_volver: 'Back to surfboards',

        // Accesorios
        accesorios_h1: 'Accessories built for intense sessions.',
        accesorios_lead: 'We select materials that resist sun, salt and sand. Everything designed to help you perform better.',
        accesorios_categorias: 'Accessory categories',
        accesorios_disponibles: 'Available accessories',
        accesorios_disponibles_p: 'Build your complete set and hit the water worry-free.',
        accesorios_vacio: 'No accessories loaded yet.',

        // Surf Skate
        surfskate_h1: 'Surf Skate to train your turns off the water.',
        surfskate_lead_all: 'Set up your surf skate with decks, trucks, wheels and accessories.',
        surfskate_mostrando: 'Showing items from:',
        surfskate_categorias: 'Surf Skate categories',
        surfskate_todos: 'All',
        surfskate_disponibles: 'Available items',
        surfskate_disponibles_p: 'Real gear to practise surf technique on asphalt.',
        surfskate_vacio: 'No Surf Skate items loaded yet.',

        // Academia
        academia_h1: 'Sr.Shaper Academy',
        academia_lead: 'Handcraft shaping courses: learn to shape, laminate and repair your own surfboards.',
        academia_cursos: 'Available courses',
        academia_disponibles: 'Available courses',
        academia_disponibles_p: 'Each course covers a stage of the handcraft manufacturing process.',
        academia_vacio: 'No courses available right now.',

        // Sobre nosotros
        sobre_h1: 'About us',
        sobre_lead: 'Our story was born in the Atlantic, among waves, wood and handcraft shaping.',
        sobre_historia_h2: 'Our Story',
        sobre_historia_p1: 'In Las Palmas de Gran Canaria, where the Atlantic draws perfect lines against the volcanic coastline, something more than a surfboard workshop was born. A silent conversation was born between the ocean, the wood, and the hands that know both languages.',
        sobre_historia_p2: "My story began where all good surf stories begin: in the water. Years of reading waves, feeling how each board responded differently to each section, understanding that the ocean doesn't forgive mediocrity but rewards consistency. It was in those endless sessions in the north of the island, under the changing Atlantic sky, that I learned a surfboard is not an object — it's a bridge between the surfer and the wave.",
        sobre_historia_p3: 'What began as curiosity became obsession. I needed to understand why some boards danced in the water and others simply floated. Why certain rail lines made time stop in the tube. Why a centimetre could be the difference between magic and mediocrity.',
        sobre_artesania_h2: 'Craftsmanship with an Atlantic Soul',
        sobre_artesania_p1: "In our workshop, every board is an act of faith. Faith in the process, in patience, in the idea that things made well take their time. There is no rush here, because the ocean is not in a rush and perfect waves can't be forced.",
        sobre_artesania_p2: 'White foam is our canvas, resin is liquid sculpture — fluid architecture designed not for museums but for ephemeral moments of perfection in salt water.',
        sobre_artesania_p3: "We work with our hands and a clear mind. Each board carries the invisible marks of our sessions. We believe in the honesty of the shape. In boards that don't promise miracles but deliver performance. In designs that respect both tradition and innovation, because the ocean is ancient but every wave is new.",
        sobre_artesania_p4: "We believe in knowing the person who will surf our boards. In listening not only to what they say, but to what they're seeking when they look at the sea's horizon. In understanding that every surfer has their own dance with the waves, and our mission is to create the perfect instrument for that music.",
        sobre_mas_h2: 'Beyond the Shape',
        sobre_mas_p1: "When you hand over a finished board, with the glass shining under the workshop light, you know you're handing over a part of yourself. Each one carries hours of work, years of learning, decades of love for surf.",
        sobre_mas_p2: "But more than that, it carries a promise: that when that board touches the water, when it feels the weight of the surfer and the force of the wave, it will respond. It will be there, firm and fluid, allowing that moment of grace where everything disappears except the surfer, the wave and the perfect line that connects them.",

        // Contacto
        contacto_h1: 'Contact',
        contacto_lead: 'Write to us directly through any of these channels.',
        contacto_whatsapp_h2: 'WhatsApp',
        contacto_whatsapp_p: 'The fastest way to reach us. We reply within 24 hours.',
        contacto_whatsapp_btn: 'Open WhatsApp',
        contacto_email_h2: 'Email',
        contacto_email_p: 'For detailed enquiries or personalised quotes.',
        contacto_horario_h2: 'Opening hours',
        contacto_horario_p: 'Monday to Friday, 9:00 to 18:00 (Canary Island time).',

        // Producto detalle
        producto_volver: 'Back',
        producto_stock: 'Stock available:',
        producto_agotado: 'Out of stock',
        producto_pocas: 'Only a few left',
        producto_anadir: 'Add to cart',
        producto_ver: 'View details',

        // ProductCard
        card_agregar: 'Add to cart',
        card_agotado: 'Out of stock',
        card_ver: 'View details',

        // Footer
        footer_note: '© 2026 Sr.Shaper Surfboards. Crafted with salt and wood.',

        // Newsletter
        newsletter_h2: 'Join the Sr.Shaper community',
        newsletter_p: 'News, drops and training tips straight to your inbox.',
    },
} as const;

export type TranslationKey = keyof typeof translations.es;

export function t(lang: Lang, key: TranslationKey): string {
    return translations[lang][key] as string;
}
