import { RoleData } from '@type/event';

export type FormSelectRow = {
  id: string,
  value: string,
  description: string,
  isDisabled: boolean
}

export function parseRoles(roles: Array<RoleData>): Array<FormSelectRow> {
  // most vacancies come first
  // roles.sort((a, b) => b.volunteers.length - a.volunteers.length);
  return roles.map((role) => {
    const { remaining, total } = getRoleVacancies(role);
    return {
      id: role._id,
      value: role.name,
      description: `${role.name} (${remaining}/${total} ${remaining === 1 ? 'vacancy' : 'vacancies'} available)`,
      isDisabled: remaining === 0,
    };
  });
}

export function getRoleVacancies(role: RoleData): { remaining: number, filled: number, total: number } {
  if (!role || !role.volunteers) {
    return { filled: 0, total: 0, remaining: 0 };
  }
  const filled = role.volunteers.length;
  const total = role.capacity;
  const remaining = total - filled;
  return { remaining, filled, total };
}
