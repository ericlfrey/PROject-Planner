import {
  deleteMaterial, getProjectMaterials, getSingleMaterial, getTaskMaterials, updateMaterial,
} from './materialData';
import { deleteProject, getSingleProject, getUserProjects } from './projectData';
import { deleteTask, getProjectTasks } from './taskData';

const getProjectDetails = async (firebaseKey) => {
  const projectObj = await getSingleProject(firebaseKey);
  const projectTasks = await getProjectTasks(firebaseKey);
  const projectMaterials = await getProjectMaterials(firebaseKey);
  return { ...projectObj, projectTasks, projectMaterials };
};

const deleteProjectDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getProjectTasks(firebaseKey).then((tasksArr) => {
    const deleteTaskPromises = tasksArr.map((task) => deleteTask(task.firebaseKey));
    getProjectMaterials(firebaseKey).then((materialsArr) => {
      const deleteMaterialsPromises = materialsArr.map((material) => deleteMaterial(material.firebaseKey));
      Promise.all(deleteTaskPromises, deleteMaterialsPromises).then(() => {
        deleteProject(firebaseKey).then(resolve);
      });
    });
  })
    .catch(reject);
});

const deleteTaskDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getTaskMaterials(firebaseKey).then((materialsArr) => {
    const deleteTaskIds = materialsArr.map((material) => (
      getSingleMaterial(material.firebaseKey).then((materialObj) => {
        const patchPayload = { ...materialObj, task_id: '' };
        updateMaterial(patchPayload);
        Promise.all(deleteTaskIds).then(() => {
          deleteTask(firebaseKey).then(resolve);
        });
      })));
  })
    .catch(reject);
});

const getAllProjectsDetails = (uid) => new Promise((resolve, reject) => {
  getUserProjects(uid).then((userProjectsArr) => {
    const projectDetailsPromises = userProjectsArr.map((project) => getProjectDetails(project.firebaseKey));
    Promise.all(projectDetailsPromises).then(resolve);
  })
    .catch(reject);
});

export {
  getProjectDetails,
  deleteProjectDetails,
  getAllProjectsDetails,
  deleteTaskDetails,
};
