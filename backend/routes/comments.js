var express = require('express');
const { getAllComments, addComment,deleteComment, updateComment } = require('../controllers/comments');

var router = express.Router();

router.get('/:id', getAllComments);
router.post('/', addComment);
router.delete('/:id', deleteComment)
router.put('/:id', updateComment);

module.exports = router;
