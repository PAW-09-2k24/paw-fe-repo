const mainRoute = 'http://localhost:3500';

//auth
const loginRoute = `${mainRoute}/user/login`;
const logoutRoute = `${mainRoute}/user/logout`;
const registerRoute = `${mainRoute}/user`;

//groups
const groupsRoute = `${mainRoute}/group`;
const groupUserRoute = `${mainRoute}/user/groups`;
const countGroupRoute = `${mainRoute}/user/groupCount`;

//tasks
const tasksRoute = `${mainRoute}/task`;

export const apiRoutes = {
  main: mainRoute,
  auth: {
    login: loginRoute,
    logout: logoutRoute,
    register: registerRoute
  },
  groups: {
    main: groupsRoute,
    count: countGroupRoute,
    user: groupUserRoute,

  },
  tasks: {
    main: tasksRoute,
  },
};
