export interface AllowedRoleSpartanDashboardUserRole {
    User_Role_Id: number;
    Description: string | null;
    Id: number;
  }
  
  export interface SpartanDashboardPermissions {
    Permission_Id: number;
    Spartan_Dashboard: number;
    Allowed_Role: number;
    Spartan_Dashboard_Spartan_Dashboard: any | null;
    Allowed_Role_Spartan_Dashboard_User_Role: AllowedRoleSpartanDashboardUserRole;
    Id: number;
  }
  
  export interface DashboardPermissionsResponse {
    Spartan_Dashboard_Permissionss: SpartanDashboardPermissions[];
    RowCount: number;
  }

  // ***********************************************************
  export interface DashboardTypeSpartanDashboardType {
    Dashboard_Type_Id: number;
    Description: string;
    Id: number;
  }
  
  export interface StatusSpartanDashboardStatus {
    Dashboard_Status_Id: number;
    Description: string;
    Id: number;
  }
  
  export interface SpartanDashboard {
    Dashboard_Id: number;
    Creation_Date: string; // Puedes usar Date en vez de string si quieres trabajar con objetos Date
    Dashboard_Type: number;
    Title: string;
    Description: string;
    Status: number;
    Dashboard_Type_Spartan_Dashboard_Type: DashboardTypeSpartanDashboardType;
    Status_Spartan_Dashboard_Status: StatusSpartanDashboardStatus;
    Id: number;
  }
  
  export interface SpartanDashboardsResponse {
    Spartan_Dashboards: SpartanDashboard[];
    RowCount: number;
  }
  
  