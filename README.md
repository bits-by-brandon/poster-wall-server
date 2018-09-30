# Poster Wall

## Next steps
 - [x] Create server-side persistence layer
    - RethinkDB
 - [ ] Create client-side (*remote*) persistence layer
 - [ ] Create client-side (*device*) persistence layer
 - [ ] Generate *device* uuid, store in persistence layer
 - [ ] *remote* + *device* pairing flow 
    - Show uuid on screen
    - User inputs *device* uuid on *remote* 
    - *remote* passes off Server *device* uuid
    - Server makes new association
 - [ ] User account creation
    - Passport | Firebase
 - [ ]
 - [ ]
 
## Optional
 - [x] set up rethinkDB up command
 
## Application flow
 - New *device* attaches to new socket
 - *device* checks localstorage for existing *UID*
 - If no *UID* exists, *device* sends request to `/device-register` endpoint
 - *server* receives `/device-register` request
 - *server* generates a collision checked *UID*
 - *server* stores the *UID* in the *DB* as an registered and unowned device
 - *server* creates a new *room* with the *UID*
 - *server* responds to *device* with created *UID*
 - *device* stores *UID* in localstorage
 - *device* displays short hashed *UID* on screen
 - New *remote* attaches to new socket
 - *remote* authorizes / creates new account with server
 - *remote* logs in to account
 - *remote* prompts user to enter displayed *UID*
 - *remote* sends *UID* of *device* to *server*
 - *server* searches for existing *UID* in *DB*
 - if *server* finds matching *UID*, it will send verification code to *device*
 - *device* displays verification code
 - *remote* enters verification code and sends to *server*
 - *server* confirms verification code, adds *remote* user account as owner of *device*
 - *server* adds *remote* to room with *device*
 - *device* sends *command* to *server*
 - *server* sends *command* to registered *device*
 - *device* responds
