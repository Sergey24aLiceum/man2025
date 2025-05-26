let allProjects = [];

function renderProjects(projects) {
    const container = document.getElementById('projects');
    if (projects.length === 0) {
        container.innerHTML = '<p>Немає проєктів за обраними фільтрами.</p>';
        return;
    }
    container.innerHTML = projects.map(item => `
      <div class="project-card" style="display: flex; align-items: flex-start; gap: 20px;">
        <div style="flex: 1;">
            <h3>${item.title}</h3>
            <p><strong>Автор:</strong> ${item.author}</p>
            <p><strong>Школа:</strong> ${item.school}</p>
            <p><strong>Відділення:</strong> ${item.department}</p>
            <p><strong>Секція:</strong> ${item.section}</p>
            <p><strong>Область:</strong> ${item.region}</p>
            <p>${item.description}</p>
            <a href="${item.contact_link}" target="_blank">Контакти</a> |
            <a href="${item.poster_link}" target="_blank">Постер</a>
        </div>
        <div style="min-width:150px;">
            <img src="${item.image}" alt="${item.title}" style="max-width:150px;max-height:150px;object-fit:cover;">
        </div>
      </div>
    `).join('');
}

function fillFilter(id, values) {
    const select = document.getElementById(id);
    values.forEach(val => {
        const option = document.createElement('option');
        option.value = val;
        option.textContent = val;
        select.appendChild(option);
    });
}

function getUniqueValues(arr, key) {
    return [...new Set(arr.map(item => item[key]))].sort();
}

function filterProjects() {
    const section = document.getElementById('sectionFilter').value;
    const department = document.getElementById('departmentFilter').value;
    const region = document.getElementById('regionFilter').value;
    let filtered = allProjects;
    if (section) filtered = filtered.filter(p => p.section === section);
    if (department) filtered = filtered.filter(p => p.department === department);
    if (region) filtered = filtered.filter(p => p.region === region);
    if (section || department || region) {
        renderProjects(filtered);
    } else {
        document.getElementById('projects').innerHTML = '';
    }
}

fetch('js/data.json')
  .then(r => r.json())
  .then(data => {
    allProjects = data;
    fillFilter('sectionFilter', getUniqueValues(data, 'section'));
    fillFilter('departmentFilter', getUniqueValues(data, 'department'));
    fillFilter('regionFilter', getUniqueValues(data, 'region'));
    document.getElementById('sectionFilter').onchange = filterProjects;
    document.getElementById('departmentFilter').onchange = filterProjects;
    document.getElementById('regionFilter').onchange = filterProjects;
    document.getElementById('projects').innerHTML = '';
  });
