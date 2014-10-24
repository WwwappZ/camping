var Gpio = require('onoff').Gpio,
  pir = new Gpio(17, 'in', 'both');
 
pir.watch(function(err, value) {
  if (err) exit();
  console.log('Intruder detected');
});
 
console.log('Pi Bot deployed successfully!');
console.log('Guarding the Magic pencil...');
 
function exit() {
  pir.unexport();
  process.exit();
}