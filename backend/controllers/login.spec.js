const httpMocks = require('node-mocks-http');
const { getUser, changePassword } = require('../controllers/login');

describe('Login Controller', () => {
  it('getUser executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/login',
        body: {
            email: 'Elly1@gmail.com'
        }
    });
    const response = httpMocks.createResponse();

    await getUser(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });

  it('changePassword executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'PUT',
        url: '/login',
        body: {
            password: 'Elly@Test123',
            user_id: 1
        }
    });
    const response = httpMocks.createResponse();

    await changePassword(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });
});