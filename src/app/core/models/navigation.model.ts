/** Navigation-related types used across the app. */
export interface NavLink {
  label: string;
  path: string;
  description?: string;
  badge?: string;
  icon?: string;
}

export interface NavItem {
  label: string;
  path: string;
  description?: string;
  badge?: string;
  icon?: string;
  children?: NavItem[];
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}
