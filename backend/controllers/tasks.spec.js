const httpMocks = require('node-mocks-http');
const { getAllTasks, addNewTask, deleteTask, updateTask } = require('../controllers/tasks');

describe('Tasks Controller', () => {
  it('getAllTasks executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/tasks'
    });
    const response = httpMocks.createResponse();

    await getAllTasks(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });

  it('addNewTask executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'POST',
        url: '/tasks',
        body: {
            name: 'Task1',
            status_id: 2,
            date: '10/10/2022',
            description: 'Test description',
            project_id: 1,
            priority_id: 3,
        }
    });
    const response = httpMocks.createResponse();

    await addNewTask(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });

  it('deleteTask executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/tasks/1',
    });
    const response = httpMocks.createResponse();

    await deleteTask(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });

  it('updateTask executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'PUT',
        url: '/tasks/1',
        body: {
            name: 'Mock update name'
        }
    });
    const response = httpMocks.createResponse();

    await updateTask(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });
});