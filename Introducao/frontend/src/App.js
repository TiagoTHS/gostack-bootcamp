import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header'

function App() {
    const [projects, setProjects] = useState([]); // Array com 2 posições , 1o a variável com seu valor inicial, 2o uma função para att esse valor

    useEffect(() => {
        api.get('projects').then((response) => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Tiago Souza'
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects" />

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;