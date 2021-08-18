export interface Admins {
    admins: JSONAdmin
}

export interface JSONAdmin {
    admin_email:     string;
    admin_id:        number;
    admin_nome:      string;
    admin_password:  string;
    admin_role:      string;
    admin_telemovel: string;
}