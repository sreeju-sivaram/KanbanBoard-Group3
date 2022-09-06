const httpMocks = require('node-mocks-http');
const { getAllProjects, addNewProject } = require('../controllers/projects');

describe('Projects Controller', () => {
  it('getAllProjects executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/projects'
    });
    const response = httpMocks.createResponse();

    await getAllProjects(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });

  it('addNewProject executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'POST',
        url: '/projects',
        body: { 
            inputText: 'Mock text',
            description: 'Mock description',
            startDate: '01/09/2022',
            endDate: '10/10/2022',
            id: 1
        }
    });
    const response = httpMocks.createResponse();

    await addNewProject(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });
});