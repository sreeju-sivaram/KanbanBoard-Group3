const httpMocks = require('node-mocks-http');
const { addNewUser } = require('../controllers/register');

describe('Register Controller', () => {
  it('addNewUser executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'POST',
        url: '/register',
        body: { 
            name: 'Elly2',
            password: 'test@123',
            email: 'test@test.com'
        }
    });
    const response = httpMocks.createResponse();

    await addNewUser(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });
});