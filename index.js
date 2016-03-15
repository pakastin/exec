
var cp = require('child_process');

module.exports = function exec (cmd, args) {
  var child = cp.spawn(cmd, args || []);

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  var next = new Array(arguments.length - 2);

  for (var i = 0; i < next.length; i++) {
    next[i] = arguments[i + 2];
  }

  if (next.length) {
    child.on('exit', function () {
      exec.apply(this, next);
    });
  }

  return child;
}
