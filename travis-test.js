console.log({ FAKE_VAR: process.env.FAKE_VAR });

if (process.env.FAKE_VAR === 'hola') {
  console.log('1');
} else {
  console.log('2');
}
