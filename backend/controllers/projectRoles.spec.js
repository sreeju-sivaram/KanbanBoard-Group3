const httpMocks = require('node-mocks-http');
const { assignUser} = require('../controllers/projectRoles');

describe('Project Roles Controller', () => {
  it('assignUser executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'POST',
        url: '/projectRoles',
        body: {
            roleId: 1,
            userId: 1,
            projectId: 1
        }
    });
    const response = httpMocks.createResponse();

    await assignUser(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });
});