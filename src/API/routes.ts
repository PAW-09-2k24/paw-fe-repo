const mainRoute = process.env.NEXT_PUBLIC_API_URL;

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
const allTasksRoute = `${tasksRoute}/all`;

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
    all: allTasksRoute,
  },
};
