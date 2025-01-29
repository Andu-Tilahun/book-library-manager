import { Role } from "@core/models/role.model";

export interface MenuItem {
  id: number;
  label?: any;
  translatedLabel?:any;
  icon?: string;
  link?: string;
  subMenuItems?: MenuItem[] | undefined;
  parentId?: number;
  role?: string[];
  numRows?: number;
  serviceName?:string;
  status?:string;
  isHistory?: boolean | false ;
}
