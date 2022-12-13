async function createUser(credentials) {
    authData.create(credentials)
}

function generateToken() {
    const rand = function () {
        return Math.random().toString(36).substr(2);
    };

    const token = function () {
        return rand() + rand();
    };

    console.log(token());
}
