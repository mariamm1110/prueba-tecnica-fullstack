import gql from "graphql-tag";


export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      image
      id
      name
      email
      role
      
    }
    }`



export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      email
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $name: String, $role: Role) {
    updateUser(id: $id, name: $name, role: $role) {
      id
      name
      role
    }
  }
`;
