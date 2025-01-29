import {MenuItem} from '../models/menu.model';

export const MENU: MenuItem[] = [

  {
    id: 1,
    label: 'MENU_ITEMS.USER_MANAGEMENT.LABEL',
    icon: 'bi bi-person-fill-gear',
    role: ['ADMIN'],
    subMenuItems: [
      {
        id: 2,
        parentId: 1,
        label: 'MENU_ITEMS.USER_MANAGEMENT.SUB_MENUS.USER',
        link: 'user-management/user',
        icon: 'bi bi-eye',
        role: ['ADMIN'],
      },

    ],
  },


  {
    id: 2,
    label: 'MENU_ITEMS.BOOK_MANAGEMENT.LABEL',
    icon: 'bi bi-book',
    role: ['ADMIN'],
    subMenuItems: [
      {
        id: 1,
        parentId: 2,
        label: 'MENU_ITEMS.BOOK_MANAGEMENT.SUB_MENUS.BOOK',
        link: 'book-management',
        icon: 'bi bi-eye',
        role: ['ADMIN'],
      },

    ],
  },


];
