// Constatns
import { ROLES } from "../consts/roles";

// Вestructuring values from roles
const { ADMIN, PASSANGER, DRIVER, DISPATCHER } = ROLES;

// Admin page
// Access: Administator
export const adminRouteRoles = [ADMIN];

// Trips page
// Access: Administator, Passanger, Driver, Dispatcher
export const tripsRouteRoles = [ADMIN, PASSANGER, DRIVER, DISPATCHER];

// Dispatcher page
// Access: Administator, Dispatcher
export const dispatcherRouteRoles = [ADMIN, DISPATCHER];

// Driver page
// Access: Administator, Driver
export const driverRouteRoles = [ADMIN, DRIVER];
