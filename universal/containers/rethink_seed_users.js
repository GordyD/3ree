r.table('users').insert([
    {
      firstName: 'Eric',
      lastName: 'Bakan',
      address1: '1864 Fell St',
      address2: '2nd floor',
      city: 'San Francisco',
      state: 'California',
      zipcode: 94117,
    },
    {
      firstName: 'Neva',
      lastName: 'Hadfield',
      address1: '1864 Fell St',
      address2: '3rd floor',
      city: 'San Francisco',
      state: 'California',
      zipcode: 94117,
    },
    {
      firstName: 'Jeffrey',
      lastName: 'Morelli',
      address1: '1864 Fell St',
      address2: '1st floor',
      city: 'San Francisco',
      state: 'California',
      zipcode: 94117,
    }
]).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
});
