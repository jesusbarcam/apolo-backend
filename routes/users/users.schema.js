const USER_ID = 'publicUser';
const USER_LIST_ID = 'publicUsers';

const USER_LIST_REF = `${USER_LIST_ID}#`;
const USER_REF = `${USER_ID}#`;

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
 * @schema response
 * @description
 */
const usersSchema = {
  response: {
    200: { $ref: USER_LIST_REF },
  },
}; // UsersSchema

module.exports = {
  USER_LIST_REF,
  USER_REF,
  publicUser,
  publicUsers,
  usersSchema,
};
