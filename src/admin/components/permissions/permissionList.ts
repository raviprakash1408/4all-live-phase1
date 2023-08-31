

export interface PermissionGroup {
    id: number;
    name: string;
}

export interface PermissionType {
    id: number;
    name: string;
    group: PermissionGroup;
    value: boolean;
    db_name: string;
}

export interface Permission {
    id: number;
    name: string;
    type: PermissionType;
    value: boolean;
    db_name: string;
}



export const permissionGroups:Array<PermissionGroup> = [
    {
        id: 1,
        name: 'Global'
    },
    {
        id: 2,
        name: 'Space'
    },
    {
        id: 3,
        name: 'Lobby'
    },
    {
        id: 4,
        name: 'Video Quality'
    }

]

export const permissionTypes:Array<PermissionType> = [
    {
        id: 1,
        name: 'view_team_members',
        group: permissionGroups[0],
        value: false,
        db_name: 'view_team_members'
        
    },
    {
        id: 2,
        name: 'view_spaces',
        group: permissionGroups[0],
        value: false,
        db_name: 'view_spaces'
    },
    {
        id: 3,
        name: 'view_sub_spaces',
        group: permissionGroups[0],
        value: false,
        db_name: 'view_sub_spaces'

    },
    {
        id: 4,
        name: 'view_roles',
        group: permissionGroups[0],
        value: false,
        db_name: 'view_roles'

    },
    {
        id: 5,
        name: 'view_permissions',
        group: permissionGroups[0],
        value: false,
        db_name: 'view_permissions'

    },


]

// filter by group
export const permissionTypesByGroup = (group: PermissionGroup):Array<PermissionType> => {
    return permissionTypes.filter((type: PermissionType) => type.group.id === group.id)
}

export const permissions:Array<Permission> = [
    {
        id: 1,
        name: 'can_add_team_members',
        type: permissionTypes[0],
        value: false,
        db_name: 'can_add_team_members'
    },
    {
        id: 2,
        name: 'can_remove_team_members',
        type: permissionTypes[0],
        value: false,
        db_name: 'can_remove_team_members'
    },
    {
        id: 3,
        name: 'can_edit_team_members',
        type: permissionTypes[0],
        value: false,
        db_name: 'can_edit_team_members'
    },
    {
        id: 4,
        name: 'can_add_spaces',
        type: permissionTypes[1],
        value: false,
        db_name: 'can_add_spaces'
    },
    {
        id: 5,
        name: 'can_remove_spaces',
        type: permissionTypes[1],
        value: false,
        db_name: 'can_remove_spaces'
    },
    {
        id: 6,
        name: 'can_edit_spaces',
        type: permissionTypes[1],
        value: false,
        db_name: 'can_edit_spaces'
    },


    {
        id: 7,
        name: 'can_share_spaces',
        type: permissionTypes[1],
        value: false,
        db_name: 'can_share_spaces'
    },
    {
        id: 8,
        name: 'can_add_sub_spaces',
        type: permissionTypes[2],
        value: false,
        db_name: 'can_add_sub_spaces'
    },
    {
        id: 9,
        name: 'can_remove_sub_spaces',
        type: permissionTypes[2],
        value: false,
        db_name: 'can_remove_sub_spaces'
    },


    {
        id: 10,
        name: 'can_edit_sub_spaces',
        type: permissionTypes[2],
        value: false,
        db_name: 'can_edit_sub_spaces'
    },
    {
        id: 11,
        name: 'can_add_roles',
        type: permissionTypes[3],
        value: false,
        db_name: 'can_add_roles'
    },
    {
        id: 12,
        name: 'can_remove_roles',
        type: permissionTypes[3],
        value: false,
        db_name: 'can_remove_roles'
    },
    {
        id: 13,
        name: 'can_edit_roles',
        type: permissionTypes[3],
        value: false,
        db_name: 'can_edit_roles'
    },
    {
        id: 14,
        name: 'can_add_permissions',
        type: permissionTypes[4],
        value: false,
        db_name: 'can_add_permissions'
    },
    {
        id: 14,
        name: 'can_remove_permissions',
        type: permissionTypes[4],
        value: false,
        db_name: 'can_remove_permissions'
    },
    {
        id: 14,
        name: 'can_edit_permissions',
        type: permissionTypes[4],
        value: false,
        db_name: 'can_edit_permissions'
    },

]

// filter by type
export const permissionsByType = (type: PermissionType):Array<Permission> => {
    return permissions.filter((permission: Permission) => permission.type.id === type.id)
}