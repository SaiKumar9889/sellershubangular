export class UserAccount {
    companyName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    emailAddress?: string;
    phoneNumber?: string;
    zipCode?: string;
    vatregistered: boolean;
    vatnumber?: string
}

export class User {
    id?: number;
    emailAddress?: string;
    name?: string;
    newpassword?: string;
    password?: string;
    currentpassword?: string;
}


export class UserPermission {
    value1: Array<string>;
    // admin: boolean;
    // dashboard: boolean;
    // inventory: boolean;
    // order: boolean;
    // customer: boolean;
    // stockrepricer: boolean;
    // reports: boolean;
}