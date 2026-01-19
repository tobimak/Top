// Variable global para guardar los datos cargados
let matchups = [];

// Función para cargar los datos desde el archivo JSON
async function cargarMatchups() {
    try {
        const respuesta = await fetch('A_matchups.json');
        const datosObjeto = await respuesta.json();
        
        // TRANSFORMACIÓN: Convertimos el objeto de objetos en un Array
        // para que el resto de tu código (filtros y renderizado) funcione.
        matchups = Object.keys(datosObjeto).map(nombre => {
            return {
                name: nombre, // El nombre ahora viene de la "llave" del objeto
                ...datosObjeto[nombre]
            };
        });

        renderTable(matchups); // Renderiza la tabla por primera vez
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
    }
}

function renderTable(data) {
    const list = document.getElementById('matchupList');
    list.innerHTML = '';
    
    data.forEach(m => {
        const row = document.createElement('div');
        row.className = 'matchup-row';
        
        // Convertimos los tips en lista con puntos (ul)
        const tipsHtml = m.tips.map(tip => `<li>${tip}</li>`).join('');

        // Convertimos la build en lista con números (ol)
        const buildItems = m.build.split(',').filter(item => item.trim() !== '');
        const buildHtml = buildItems.length > 0 
            ? `<ol>${buildItems.map(item => `<li>${item.trim()}</li>`).join('')}</ol>`
            : '';

        row.innerHTML = `
            <div class="col col-icon"><img src="https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/${m.name}.png" alt="${m.name}"></div>
            <div class="col col-champ">${m.name}</div>
            <div class="col col-runas">${m.runas}</div>
            <div class="col col-tips"><ul>${tipsHtml}</ul></div>
            <div class="col col-build">${buildHtml}</div>
            <div class="col col-tier ${m.tier}"></div>
        `;
        list.appendChild(row);
    });
}

// Buscador funcional con la nueva estructura
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    renderTable(matchups.filter(m => m.name.toLowerCase().includes(term)));
});

// Iniciar la carga al abrir la página
cargarMatchups();