const ZONAS_URL = "http://localhost:8082/api/zonas";
const ESPACIOS_URL = "http://localhost:8082/api/espacios";
const ESPACIOS_ZONA_URL = (id) => `http://localhost:8082/api/espacios/zona/${id}`;
const SSE_ZONAS_URL = "http://localhost:8082/api/espacios/sse";

const zonasContainer = document.getElementById('zonasContainer');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalSub = document.getElementById('modalSub');
const modalEspacios = document.getElementById('modalEspacios');
const modalClose = document.getElementById('modalClose');

let zonaAbierta = null; // id de la zona abierta en el modal

// ---- Helpers de estado / estilo ----
const estadoBadge = (estado, active) => {
    if (active === false) return 'bg-slate-700/40 text-slate-400 border border-slate-600/40';
    switch (estado) {
        case 'DISPONIBLE': return 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40';
        case 'OCUPADO': return 'bg-red-900/40 text-red-300 border border-red-700/40';
        case 'RESERVADO': return 'bg-amber-900/40 text-amber-300 border border-amber-700/40';
        default: return 'bg-slate-800 text-slate-300 border border-slate-700';
    }
};
const espacioBorder = (estado, active) => {
    if (active === false) return 'border-slate-700 opacity-50';
    switch (estado) {
        case 'DISPONIBLE': return 'border-emerald-600/60';
        case 'OCUPADO': return 'border-red-600/60';
        case 'RESERVADO': return 'border-amber-600/60';
        default: return 'border-slate-700';
    }
};
const etiquetaEstado = (estado, active) => (active === false ? 'DESHABILITADO' : estado);

// ---- Cargar zonas + espacios y renderizar tarjetas ----
const cargarZonas = async () => {
    try {
        const [zonasRes, espaciosRes] = await Promise.all([
            fetch(ZONAS_URL),
            fetch(ESPACIOS_URL),
        ]);
        const zonas = zonasRes.ok ? await zonasRes.json() : [];
        const espacios = espaciosRes.ok ? await espaciosRes.json() : [];

        // Conteo por zona (solo espacios activos vienen en /api/espacios)
        const conteo = {};
        for (const e of espacios) {
            const z = e.idZona;
            if (!conteo[z]) conteo[z] = { DISPONIBLE: 0, OCUPADO: 0, RESERVADO: 0, total: 0 };
            conteo[z][e.estado] = (conteo[z][e.estado] || 0) + 1;
            conteo[z].total++;
        }
        renderZonas(zonas, conteo);
    } catch (err) {
        console.error('Error cargando zonas:', err);
        zonasContainer.innerHTML = `<div class="col-span-full text-center text-red-400 py-12">No se pudieron cargar las zonas.</div>`;
    }
};

const renderZonas = (zonas, conteo) => {
    if (!zonas || zonas.length === 0) {
        zonasContainer.innerHTML = `<div class="col-span-full text-center text-slate-400 py-12">No hay zonas registradas.</div>`;
        return;
    }

    zonasContainer.innerHTML = zonas.map((z) => {
        const c = conteo[z.id] || { DISPONIBLE: 0, OCUPADO: 0, RESERVADO: 0, total: 0 };
        const deshabilitada = z.active === false;
        const cardBorder = deshabilitada ? 'border-slate-700 opacity-60' : 'border-slate-700 hover:border-indigo-500/70';

        const badgeZona = deshabilitada
            ? '<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-slate-700/50 text-slate-400 border border-slate-600/50">Deshabilitada</span>'
            : '<span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-indigo-900/40 text-indigo-300 border border-indigo-700/40">Activa</span>';

        return `
            <div data-id="${z.id}" data-nombre="${z.nombre}" class="zona-card cursor-pointer bg-slate-900/50 border ${cardBorder} rounded-xl p-5 transition-all duration-200 active:scale-[.98]">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="font-extrabold text-lg text-slate-100">${z.nombre}</h3>
                        <p class="text-[11px] text-slate-400">${z.codigo || ''} · ${z.tipo}</p>
                    </div>
                    ${badgeZona}
                </div>
                <div class="flex items-center gap-2 text-[11px] mb-4">
                    <span class="px-2 py-0.5 rounded bg-emerald-900/30 text-emerald-300">${c.DISPONIBLE || 0} libres</span>
                    <span class="px-2 py-0.5 rounded bg-red-900/30 text-red-300">${c.OCUPADO || 0} ocup.</span>
                    <span class="px-2 py-0.5 rounded bg-amber-900/30 text-amber-300">${c.RESERVADO || 0} resv.</span>
                </div>
                <div class="flex justify-between items-center text-[11px] text-slate-400">
                    <span>Capacidad: <strong class="text-slate-200">${z.capacidad}</strong></span>
                    <span class="text-indigo-400 font-semibold">Ver espacios →</span>
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.zona-card').forEach((card) => {
        card.addEventListener('click', () => abrirZona(card.dataset.id, card.dataset.nombre));
    });
};

// ---- Abrir modal con los espacios de una zona ----
const abrirZona = async (id, nombre) => {
    zonaAbierta = id;
    modalTitulo.textContent = nombre;
    modalSub.textContent = 'Cargando espacios...';
    modalEspacios.innerHTML = '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    await pintarEspaciosZona(id);
};

const pintarEspaciosZona = async (id) => {
    try {
        const res = await fetch(ESPACIOS_ZONA_URL(id));
        const espacios = res.ok ? await res.json() : [];

        const activos = espacios.filter((e) => e.active !== false);
        const libres = activos.filter((e) => e.estado === 'DISPONIBLE').length;
        const ocup = activos.filter((e) => e.estado === 'OCUPADO').length;
        const resv = activos.filter((e) => e.estado === 'RESERVADO').length;
        const deshab = espacios.filter((e) => e.active === false).length;
        modalSub.textContent = `${espacios.length} espacios · ${libres} libres · ${ocup} ocupados · ${resv} reservados` + (deshab ? ` · ${deshab} deshabilitados` : '');

        if (espacios.length === 0) {
            modalEspacios.innerHTML = `<div class="col-span-full text-center text-slate-400 py-8">Esta zona no tiene espacios.</div>`;
            return;
        }

        modalEspacios.innerHTML = espacios.map((e) => `
            <div class="rounded-lg border ${espacioBorder(e.estado, e.active)} bg-slate-900/60 p-3 flex flex-col gap-2 fade-in">
                <div class="flex justify-between items-center">
                    <span class="font-bold text-sm text-slate-100">${e.nombre}</span>
                    <span class="text-[10px] text-slate-500">${e.tipo}</span>
                </div>
                <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full text-center ${estadoBadge(e.estado, e.active)}">
                    ${etiquetaEstado(e.estado, e.active)}
                </span>
            </div>
        `).join('');
    } catch (err) {
        console.error('Error cargando espacios de la zona:', err);
        modalEspacios.innerHTML = `<div class="col-span-full text-center text-red-400 py-8">Error al cargar los espacios.</div>`;
    }
};

const cerrarModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    zonaAbierta = null;
};
modalClose.addEventListener('click', cerrarModal);
modal.addEventListener('click', (e) => { if (e.target === modal) cerrarModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarModal(); });

// ---- SSE: actualizacion en vivo ----
const setSse = (ok) => {
    const pulse = document.getElementById('ssePulse');
    const dot = document.getElementById('sseDot');
    const text = document.getElementById('sseText');
    if (ok) {
        pulse.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75';
        dot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500';
        text.textContent = 'Conectado'; text.className = 'text-xs font-semibold text-emerald-400';
    } else {
        pulse.className = 'absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-0';
        dot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500';
        text.textContent = 'Desconectado'; text.className = 'text-xs font-medium text-slate-400';
    }
};

const conectarSse = () => {
    const es = new EventSource(SSE_ZONAS_URL);
    es.addEventListener('INIT', () => setSse(true));
    es.onopen = () => setSse(true);

    const onCambio = (event) => {
        let payload = null;
        try { payload = JSON.parse(event.data); } catch (_) { }
        // Refrescar tarjetas (conteos) siempre
        cargarZonas();
        // Si el cambio pertenece a la zona abierta, refrescar el modal
        if (zonaAbierta && payload && payload.idZona === zonaAbierta) {
            pintarEspaciosZona(zonaAbierta);
        }
    };
    es.addEventListener('espacio_cambiado', onCambio);

    es.onerror = () => {
        setSse(false);
        es.close();
        setTimeout(conectarSse, 5000);
    };
};

// ---- Entrada ----
(async () => {
    await cargarZonas();
    conectarSse();
    setInterval(cargarZonas, 30000); // respaldo por polling
})();
