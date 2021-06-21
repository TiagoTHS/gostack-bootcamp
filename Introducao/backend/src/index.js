const express = require('express');
const cors = require('cors');
const { isUuid } = require('uuidv4');

const { v4: uuid_v4 } = require('uuid'); 
// com o jeito de importar da aula, dava esse erro -> uuidv4() is deprecated
// https://stackoverflow.com/questions/60721008/react-deep-requiring-is-deprecated-as-of-uuid-please-require-the-top-level-mod

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

// Middleware
function logRequest(request, response, next) {
    const { method, url }= request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next(); // Próximo middleware
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID.' });
    }

    return next(); 
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
    const { title } = request.query;

    const result = title 
    ? projects.filter(project => project.title.includes(title))
    : projects;

    return response.json(result);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuid_v4(), title, owner };

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' });
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' });
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('Back-end started!');
});