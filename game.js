async function cargarPartidas() {
    try {
        const respuesta = await fetch('games.json');
        const partidas = await respuesta.json();
        const tabla = document.getElementById('gameLogs');
        tabla.innerHTML = '';

        partidas.forEach((p, index) => {
            // 1. Crear fila principal
            const filaP = document.createElement('tr');
            filaP.className = 'main-row';
            filaP.style.cursor = "pointer";
            
            // Lógica de clases y colores ya existente...
            const resClass = (p.resultado || "").toLowerCase() === 'win' ? 'win' : 'lose';
            const splitClass = `tag-${(p.splitTf || "").toLowerCase()}`;
            const actitudClass = (p.actitud || "").toLowerCase() === "medio" ? "tag-medio-actitud" : `tag-${(p.actitud || "").toLowerCase()}`;

            filaP.innerHTML = `
                <td>${p.fecha || ""}</td>
                <td><img src="https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/${p.champ}.png" width="30"></td>
                <td>${p.matchup || ""}</td>
                <td>${p.side || ""}</td>
                <td><span class="${resClass}">${p.resultado || ""}</span></td>
                <td>${p.kda || ""}</td>
                <td>${p.cs10 || 0}</td>
                <td>${p.cs20 || 0}</td>
                <td>${p.oroDiff || 0}</td>
                <td>${p.plates || 0}</td>
                <td>${p.torres || 0}</td>
                <td>${p.tps || ""}</td>
                <td>${p.minMax || ""}</td>
                <td>${p.nivelPico || 0}</td>
                <td>${p.rol || ""}</td>
                <td><span class="tag ${splitClass}">${p.splitTf || ""}</span></td>
                <td><span class="tag ${actitudClass}">${p.actitud || ""}</span></td>
            `;

            // 2. Crear fila de detalles (oculta por defecto)
            const filaD = document.createElement('tr');
            filaD.className = 'detail-row';
            filaD.id = `detail-${index}`;
            filaD.style.display = 'none'; // Oculta inicialmente

            filaD.innerHTML = `
                <td colspan="17">
                    <div class="expandable-detail">
                        <div class="detail-grid">
                            <div><strong>Primer back:</strong> ${p.primerBack || "N/A"}</div>
                            <div><strong>Razón 1° muerte:</strong> ${p.razonMuerte || "N/A"}</div>
                            <div><strong>Razón 1° kill:</strong> ${p.razonKill || "N/A"}</div>
                            <div><strong>¿Sobreviviste gank?:</strong> ${p.sobrevivisteGank || "N/A"}</div>
                            <div><strong>¿Por qué ganaste/perdiste?:</strong> ${p.porquePerdisteGanaste || "N/A"}</div>
                            <div><strong>Detalle Macro:</strong> ${p.detalleMacro || "N/A"}</div>
                            <div><strong>Detalle Micro:</strong> ${p.detalleMicro || "N/A"}</div>
                        </div>
                    </div>
                </td>
            `;

            // 3. Evento para expandir/colapsar
            filaP.addEventListener('click', () => {
                const isVisible = filaD.style.display === 'table-row';
                // Opcional: Cerrar otros detalles abiertos antes de abrir este
                document.querySelectorAll('.detail-row').forEach(row => row.style.display = 'none');
                
                filaD.style.display = isVisible ? 'none' : 'table-row';
            });

            tabla.appendChild(filaP);
            tabla.appendChild(filaD);
        });
    } catch (error) {
        console.error("Error al cargar datos:", error);
    }

}
document.addEventListener('DOMContentLoaded', cargarPartidas);