export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'administrar',
    title: 'Administrar',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/home',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'empresas',
        title: 'Empresas',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/empresas',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'condominios',
        title: 'Condominios',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/condominios',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'unidades',
        title: 'Unidades',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/unidades',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'settings',
        title: 'Settings',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/settings',
        icon: 'font-size'
      }

    ]
  },

  {
    id: 'accesos',
    title: 'Accesos',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'usuarios',
        title: 'Usuarios',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/usuarios',
        icon: 'login',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'perfiles',
        title: 'Perfiles',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/roles',
        icon: 'login',
        target: true,
        breadcrumbs: false
      }
    ]
  },

  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'periodos',
        title: 'Periodos',
        type: 'item',
        url: 'dashboard/periodos',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'gastos',
        title: 'Gastos',
        type: 'item',
        classes: 'nav-item',
        url: 'dashboard/gastos',
        icon: 'question',
        target: true,
        external: true
      }
    ]
  }
];
