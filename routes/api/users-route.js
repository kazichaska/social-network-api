const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/users-controller');


// set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);


// set up GET, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;