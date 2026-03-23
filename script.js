// Fuentes consultadas:
// - Fetch API: https://developer.mozilla.org/es/docs/Web/API/Fetch_API
// - JSON: https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/JSON

const DATA_URL = 'https://opendata-ajuntament.barcelona.cat/data/dataset/65e624dc-b338-4191-b91d-73cf14a8b25c/resource/65e624dc-b338-4191-b91d-73cf14a8b25c/download';

document.getElementById('loadDataBtn').addEventListener('click', async () => {
    const container = document.getElementById('dataContainer');
    const loading = document.getElementById('loading');

    loading.style.display = 'block';
    container.innerHTML = '';

    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error('Error en la descarga');

        const data = await response.json();

        if (data.length === 0) {
            container.innerHTML = '<p>No hay datos</p>';
            return;
        }

        let html = '<table><tr>';
        
        Object.keys(data[0]).forEach(key => html += `<th>${key}</th>`);
        html += '</tr>';
        // Datos
        data.forEach(item => {
            html += '<tr>';
            Object.values(item).forEach(value => html += `<td>${value || '-'}</td>`);
            html += '</tr>';
        });
        html += '</table>';

        container.innerHTML = html;

    } catch (error) {
        container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    } finally {
        loading.style.display = 'none';
    }
});