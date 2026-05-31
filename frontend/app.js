const apiBaseUrl = window.API_BASE_URL || 'http://localhost:8080';

const entities = {
    clientes: {
        title: 'Clientes',
        singular: 'Cliente',
        basePath: '/api/clientes',
        fields: [
            { name: 'nome', label: 'Nome', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'telefone', label: 'Telefone', type: 'text', required: true }
        ]
    },
    produtos: {
        title: 'Produtos',
        singular: 'Produto',
        basePath: '/api/produtos',
        fields: [
            { name: 'nome', label: 'Nome', type: 'text', required: true },
            { name: 'preco', label: 'Preço', type: 'number', numberType: 'float', required: true },
            { name: 'estoque', label: 'Estoque', type: 'number', numberType: 'integer', required: true }
        ]
    },
    funcionarios: {
        title: 'Funcionários',
        singular: 'Funcionário',
        basePath: '/api/funcionarios',
        fields: [
            { name: 'nome', label: 'Nome', type: 'text', required: true },
            { name: 'cargo', label: 'Cargo', type: 'text', required: true },
            { name: 'salario', label: 'Salário', type: 'number', numberType: 'float', required: true }
        ]
    }
};

const state = {
    entity: 'clientes',
    current: null
};

const appElement = document.getElementById('app');
const messageElement = document.getElementById('message');

function createNavButtons() {
    document.getElementById('btn-clientes').addEventListener('click', () => switchEntity('clientes'));
    document.getElementById('btn-produtos').addEventListener('click', () => switchEntity('produtos'));
    document.getElementById('btn-funcionarios').addEventListener('click', () => switchEntity('funcionarios'));
}

function switchEntity(entityKey) {
    state.entity = entityKey;
    state.current = null;
    document.querySelectorAll('.menu .btn').forEach(button => button.classList.remove('active'));
    document.getElementById(`btn-${entityKey}`).classList.add('active');
    render();
    loadList();
}

function render() {
    const config = entities[state.entity];
    const formFields = config.fields.map(field => {
        return `
            <label for="${field.name}">${field.label}</label>
            <input id="${field.name}" name="${field.name}" type="${field.type}" ${field.required ? 'required' : ''} ${field.type === 'number' ? 'step="0.01"' : ''}>
        `;
    }).join('');

    appElement.innerHTML = `
        <div class="grid">
            <section class="card">
                <h2>${config.title}</h2>
                <div id="list-container"><p>Carregando...</p></div>
            </section>
            <section class="card">
                <h2>${state.current ? 'Editar' : 'Novo'} ${config.singular}</h2>
                <form id="entity-form">
                    <input type="hidden" id="id" name="id">
                    ${formFields}
                    <button type="submit" class="btn">Salvar</button>
                    <button type="button" class="btn-secondary" id="btn-reset">Limpar</button>
                </form>
            </section>
        </div>
    `;

    document.getElementById('entity-form').addEventListener('submit', handleSave);
    document.getElementById('btn-reset').addEventListener('click', () => {
        state.current = null;
        render();
    });

    if (state.current) {
        fillForm(state.current);
    }
}

function loadList() {
    const config = entities[state.entity];
    const listContainer = document.getElementById('list-container');
    fetch(`${apiBaseUrl}${config.basePath}`)
        .then(response => response.json())
        .then(items => {
            if (!items.length) {
                listContainer.innerHTML = `<p>Sem registros encontrados.</p>`;
                return;
            }

            const headers = config.fields.map(field => `<th>${field.label}</th>`).join('');
            const rows = items.map(item => {
                const cells = config.fields.map(field => `<td>${item[field.name] ?? ''}</td>`).join('');
                return `
                    <tr>
                        ${cells}
                        <td>
                            <button type="button" class="btn edit-btn" data-id="${item.id}">Editar</button>
                            <button type="button" class="btn-secondary delete-btn" data-id="${item.id}">Excluir</button>
                        </td>
                    </tr>
                `;
            }).join('');

            listContainer.innerHTML = `
                <table>
                    <thead>
                        <tr>${headers}<th>Ações</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            `;

            listContainer.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', () => editItem(button.dataset.id));
            });
            listContainer.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', () => deleteItem(button.dataset.id));
            });
        })
        .catch(error => showMessage(`Erro ao carregar ${config.title.toLowerCase()}: ${error.message}`, true));
}

function editItem(id) {
    const config = entities[state.entity];
    fetch(`${apiBaseUrl}${config.basePath}/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Registro não encontrado');
            return response.json();
        })
        .then(item => {
            state.current = item;
            render();
            showMessage(`${config.singular} carregado para edição.`, false);
        })
        .catch(error => showMessage(error.message, true));
}

function deleteItem(id) {
    const config = entities[state.entity];
    fetch(`${apiBaseUrl}${config.basePath}/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) throw new Error('Não foi possível excluir o registro.');
            showMessage(`${config.singular} excluído com sucesso.`, false);
            render();
            loadList();
        })
        .catch(error => showMessage(error.message, true));
}

function handleSave(event) {
    event.preventDefault();
    const config = entities[state.entity];
    const form = event.target;
    const data = {};
    const idValue = form.querySelector('#id').value;
    if (idValue) {
        data.id = Number(idValue);
    }

    config.fields.forEach(field => {
        const input = form.querySelector(`#${field.name}`);
        let value = input.value;
        if (field.type === 'number') {
            value = field.numberType === 'integer' ? parseInt(value, 10) : parseFloat(value);
        }
        data[field.name] = value;
    });

    fetch(`${apiBaseUrl}${config.basePath}/salvar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(async response => {
            const result = await response.json().catch(() => null);
            if (!response.ok) {
                const errorMessage = result?.message || result || 'Erro ao salvar registro.';
                throw new Error(errorMessage);
            }
            return result;
        })
        .then(saved => {
            showMessage(`${config.singular} salvo com sucesso.`, false);
            state.current = null;
            render();
            loadList();
        })
        .catch(error => showMessage(error.message, true));
}

function fillForm(item) {
    const config = entities[state.entity];
    document.getElementById('id').value = item.id || '';
    config.fields.forEach(field => {
        const input = document.getElementById(field.name);
        if (input) {
            input.value = item[field.name] ?? '';
        }
    });
}

function showMessage(text, isError) {
    messageElement.textContent = text;
    messageElement.className = `message ${isError ? 'error' : 'success'}`;
    setTimeout(() => { messageElement.textContent = ''; messageElement.className = 'message'; }, 5000);
}

createNavButtons();
switchEntity(state.entity);
