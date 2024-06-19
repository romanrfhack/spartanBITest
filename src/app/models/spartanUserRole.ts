export interface RoleSpartanUserRole {
    User_Role_Id: number;
    Description: string;
    Status: any | null;
    Status_Spartan_User_Role_Status: any | null;
    Id: number;
  }
  
  export interface StatusSpartanUserStatus {
    User_Status_Id: number;
    Description: string;
    Id: number;
  }
  
  export interface SpartanUser {
    Id_User: number;
    Name: string;
    Role: number;
    Image: any | null;
    Email: string;
    Status: number;
    Username: string;
    Password: string;
    Role_Spartan_User_Role: RoleSpartanUserRole;
    Image_Spartane_File: any | null;
    Status_Spartan_User_Status: StatusSpartanUserStatus;
    Id: number;
  }
  
  export interface SpartanUsersResponse {
    Spartan_Users: SpartanUser[];
    RowCount: number;
  }
  