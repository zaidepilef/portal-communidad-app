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
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: true
      },
      {
        id: 'empresas',
        title: 'Empresas',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/empresas',
        icon: 'dashboard',
        breadcrumbs: true
      },
      {
        id: 'condominios',
        title: 'Condominios',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/condominios',
        icon: 'dashboard',
        breadcrumbs: true
      },
      {
        id: 'unidades',
        title: 'Unidades',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/unidades',
        icon: 'dashboard',
        breadcrumbs: true
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
        target: false,
        breadcrumbs: true
      },
      {
        id: 'perfiles',
        title: 'Perfiles',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/roles',
        icon: 'login',
        target: false,
        breadcrumbs: true
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
        icon: 'question'
      }
    ]
  },

  {
    id: 'ejemplo',
    title: 'Ejemplo',
    hidden: false,
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'hijouno',
        title: 'hijouno',
        type: 'item',
        url: 'dashboard/hijouno',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'hijodos',
        title: 'hijodos',
        type: 'item',
        classes: 'nav-item',
        url: 'dashboard/hijodos',
        icon: 'question'
      }
    ]
  }





];
