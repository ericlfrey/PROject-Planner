import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createUserProject = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user_projects.json`, {
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

const updateUserProject = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user_projects/${payload.firebaseKey}.json`, {
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

const getAddedUserProjects = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user_projects.json?orderBy="uid"&equalTo="${uid}"`, {
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

const getProjectUserProjects = (projectId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user_projects.json?orderBy="project_id"&equalTo="${projectId}"`, {
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

const deleteUserProject = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user_projects/${firebaseKey}.json`, {
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
  createUserProject,
  getAddedUserProjects,
  updateUserProject,
  getProjectUserProjects,
  deleteUserProject,
};
