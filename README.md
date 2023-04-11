# CRM For passenger transportation

## This project is a small CRM for passenger transportation based on roles: ADMIN, DISPATCHER, DRIVER, and PASSANGER.

## Routing

### "/"
- The main page, is also the authentication page. Available not only for an unauthorized user.
       Allows you to log in with Email&Passowrd, Facebook, Google, and Phone number.
       Upon first registration, the user receives the PASSENGER role.
  - Unauthorized users have access to this route.
      
#### "/passanger"
- The page which automatically redirects an authorized user who has the PASSENGER role.
       On this page, the user has access to his trips, he can divide them into completed and pending.
- Access to this route is available to users with the role: ADMIN, PASSANGER.
      
#### "/driver"
- The page which automatically redirects an authorized user who has the DRIVER role.
       On this page, the user has access to his trips, he can divide them into completed and pending.
- Access to this route is available to users with the role: ADMIN, DRIVER.
      

#### "/dispatcher"
- The page which automatically redirects an authorized user who has the DISPATCHER role. On this page, there is a form for adding a trip.
- Access to this route is available to users with the role: ADMIN, DISPATCHER.

#### "/trips"
- A page containing cards with trips and their basic information. The peculiarity is that the card has hidden buttons available only to users with ADMIN and DISPATCHER roles. It is possible to edit and delete a trip. Also, the list of passengers on the trip is available only for ADMIN and DISPATCHER.
  - Access to this route is available to users with the role: ADMIN, DISPATCHER, DRIVER, or PASSANGER.

#### "/admin"
- The page which automatically redirects an authorized user who has the ADMIN role. This page contains a list of all users (excluding ADMIN). Here the administrator can change user roles.
- Access to this route is available to users with the role: ADMIN.


#### User profile:
- In the header (in the mobile version of the burger menu) there is a Profile button that displays information about the user, such as (nickname, ID, role, email, or phone number depending on the registration method)
- Since in the case of registration by phone number, we give the user a random nickname. The profile menu has the functionality of changing the login, for all roles.

#### Technologies used:

- React
- typescript
- firebase
- Redux Toolkit
- React Bootstrap


#### Additional Information:
- There are comments in the code
- I checked the application for a long time and found possible errors, but if I suddenly missed something, you can let me know.
- If you have any questions for the project, be kind, contact me.
