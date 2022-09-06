const httpMocks = require('node-mocks-http');
const { getAllStatuses, addNewStatus } = require('../controllers/statuses');

describe('Statuses Controller', () => {
  it('getAllStatuses executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/statuses'
    });
    const response = httpMocks.createResponse();

    await getAllStatuses(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });

  it('addNewStatus executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'POST',
        url: '/statuses',
        body: { 
            name: 'Test'
        }
    });
    const response = httpMocks.createResponse();

    await addNewStatus(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });
});