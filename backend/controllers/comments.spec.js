const httpMocks = require('node-mocks-http');
const { getAllComments, addComment, deleteComment, updateComment } = require('../controllers/comments');

describe('Comments Controller', () => {
  it('getAllComments executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/comments/1'
    });
    const response = httpMocks.createResponse();

    await getAllComments(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });

  it('addComment executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'POST',
        url: '/comments',
        body: {
            task_id: 1,
            user_id: 1,
            description: 'Mock comment'
        }
    });
    const response = httpMocks.createResponse();

    await addComment(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });

  it('deleteComment executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/comments/1',
    });
    const response = httpMocks.createResponse();

    await deleteComment(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });

  it('updateComment executes without error', async () => {
    const request = httpMocks.createRequest({
        method: 'PUT',
        url: '/comments/1',
        body: {
            description: 'Mock update comment'
        }
    });
    const response = httpMocks.createResponse();

    await updateComment(request, response, (err) => {
        expect(err).toBeFalsy();
    });
  });
});