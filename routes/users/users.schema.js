/**
 * @schema public
 * @description
 */
const publicUser = {
  $id: 'publicUser',
  type: 'object',
  properties: {
    username: { type: 'string' },
    email: { type: 'string' },
    fullname: { type: 'string' },
  },
}; // PublicUser

/**
 * @schema public
 * @description
 */
const publicUsers = {
  $id: 'publicUsers',
  type: 'array',
  items: { $ref: 'publicUser#' },
}; // PublicUsers

/**
 * @schema public
 * @description
 */
const createUserValidate = {
  $id: 'createUserValidate',
  required: ['username', 'password', 'fullname', 'email'],
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    fullName: { type: 'string' },
    email: { type: 'string' },
  },
};

module.exports = {
  publicUser,
  publicUsers,
  createUserValidate,
};
