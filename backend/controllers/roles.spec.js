const httpMocks = require('node-mocks-http');
const { getAllRoles } = require('../controllers/roles');

describe('Roles Controller', () => {
  it('getAllRoles executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/roles'
    });
    const response = httpMocks.createResponse();

    await getAllRoles(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });
});