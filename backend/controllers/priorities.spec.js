const httpMocks = require('node-mocks-http');
const { getAllPriorities } = require('../controllers/priorities');

describe('Priorities Controller', () => {
  it('getAllPriorities executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/priorities'
    });
    const response = httpMocks.createResponse();

    await getAllPriorities(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });
});