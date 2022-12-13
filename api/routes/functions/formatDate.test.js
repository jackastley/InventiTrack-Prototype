const formatDate = require('./formatDate');

//INPUT FORMAT: MM/DD/YYYY
test('properly formats dates',()=>{expect(formatDate('11/23/1998')).toEqual('23/11/98')});