const encryptPassword = require('./encryptPassword');
const validatePassword = require('./validatePassword');

test('properly encrypts and validates correct passwords', ()=>{
    encryptPassword('testPassword_123')
    .then(res =>{validatePassword('testPassword_123', res)
    .then(res =>{expect(res).toBe(true)})
})
})

test('properly encrypts and validates incorrect passwords', ()=>{
    encryptPassword('testPassword_124')
    .then(res =>{validatePassword('testPassword_123', res)
    .then(res =>{expect(res).toBe(false)})
})
})