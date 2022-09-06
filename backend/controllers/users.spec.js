const httpMocks = require('node-mocks-http');
const { getUsersByProjectId, getAllUsers } = require('../controllers/users');

describe('Users Controller', () => {
  it('getAllUsers executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users'
    });
    const response = httpMocks.createResponse();

    await getAllUsers(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });

  it('getUsersByProjectId executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users/1'
    });
    const response = httpMocks.createResponse();

    await getUsersByProjectId(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });
});