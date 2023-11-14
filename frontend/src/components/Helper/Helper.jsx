import ROLES from '../../constants/ROLES';

export const findBelowUsers = (currentUser) => {
  let { role, subBranch, branch, department } = currentUser;
  let filters = {};
  let role2 = '',
    role3 = '';

  if (!role || role === ROLES.ADMIN) return filters;

  if (role === ROLES.SUB_BRANCH_STORE_MANAGER) {
    role2 = ROLES.EMPLOYEE;
    role3 = ROLES.SUB_BRANCH_HEAD;
    filters = { role: [role2, role3], subBranch, branch, department };
  } else if (role === ROLES.BRANCH_STORE_MANAGER) {
    role2 = ROLES.SUB_BRANCH_STORE_MANAGER;
    role3 = ROLES.BRANCH_HEAD;
    filters = { role: [role2, role3], branch, department };
  } else if (role === ROLES.DEPARTMENT_STORE_MANAGER) {
    role2 = ROLES.BRANCH_STORE_MANAGER;
    role3 = ROLES.DEPARTMENT_HEAD;
    filters = { role: [role2, role3], department };
  }

  if (role === ROLES.SUB_BRANCH_HEAD) {
    role2 = ROLES.SUB_BRANCH_STORE_MANAGER;
    filters = { role: [role2], subBranch, branch, department };
  } else if (role === ROLES.BRANCH_HEAD) {
    role2 = ROLES.BRANCH_STORE_MANAGER;
    filters = { role: [role2], branch, department };
  } else if (role === ROLES.DEPARTMENT_HEAD) {
    role2 = ROLES.DEPARTMENT_STORE_MANAGER;
    filters = { role: [role2], department };
  }

  return { ...filters };
};
