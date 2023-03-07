import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getProjectMaterials = (projectId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/materials.json?orderBy="project_id"&equalTo="${projectId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getTaskMaterials = (taskID) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/materials.json?orderBy="task_id"&equalTo="${taskID}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleMaterial = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/materials/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createMaterial = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/materials.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateMaterial = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/materials/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteMaterial = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/materials/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getProjectMaterials,
  getTaskMaterials,
  getSingleMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
