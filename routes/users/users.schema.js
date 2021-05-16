const USER_ID = 'publicUser';
const CREATE_USER_ID = 'createUser';
const USER_LIST_ID = 'publicUsers';

const USER_LIST_REF = `${USER_LIST_ID}#`;
const USER_REF = `${USER_ID}#`;
const CREATE_USER_REF = `${CREATE_USER_ID}#`;

/**
 * @schema public
 * @description
 */
const publicUser = {
  $id: USER_ID,
  type: 'object',
  properties: {
    username: { type: 'string' },
    email: { type: 'string' },
    tlf: { type: 'number' },
  },
}; // PublicUser

/**
 * @schema public
 * @description
 */
const publicUsers = {
  $id: USER_LIST_ID,
  type: 'array',
  items: { $ref: USER_REF },
}; // PublicUsers

/**
 * @schema public
 * @description
 */
const createUser = {
  $id: CREATE_USER_ID,
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    fullName: { type: 'string' },
  },
};

/**
 * @schema response
 * @description
 */
const usersResponseSchema = {
  schema: {
    response: {
      200: { $ref: USER_LIST_REF },
    },
  },
}; // UsersSchema

/**
 * @schema response
 * @description
 */
const createUserResponseSchema = {
  schema: {
    response: {
      201: { $ref: USER_REF },
    },
  },
}; // CreateUserResponseSchema

module.exports = {
  USER_LIST_REF,
  USER_REF,
  publicUser,
  publicUsers,
  createUser,
  usersResponseSchema,
  createUserResponseSchema,
};
