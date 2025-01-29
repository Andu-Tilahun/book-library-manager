import {MenuItem} from '../models/menu.model';

export const MENU: MenuItem[] = [

  {
    id: 1,
    label: 'MENU_ITEMS.USER_MANAGEMENT.LABEL',
    icon: 'bi bi-person-fill-gear',
    role: ['ADMIN'],
    subMenuItems: [
      {
        id: 5,
        parentId: 9,
        label: 'MENU_ITEMS.USER_MANAGEMENT.SUB_MENUS.USER',
        link: 'user-management/user',
        icon: 'bi bi-eye',
        role: ['ADMIN'],
      },

    ],
  },


];
