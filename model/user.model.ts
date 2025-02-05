export interface UserModel {
    AdminLevel?: string;
    CurrentSigninId?: string;
    Email?: string;
    FileProfile?: string;
    FkStaff?: string | null;
    Id?: string;
    IdSeq?: number;
    Is2fa?: boolean;
    IsAdmin?: boolean;
    IsArchived?: boolean;
    IsLock?: boolean;
    IsRequireReset?: boolean;
    Name?: string;
    Phone?: string;
    ResetExpiryDate?: string | null;
    ResetToken?: string;
  }
  