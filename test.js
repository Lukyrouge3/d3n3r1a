// const fs = require("fs");
//
// readDir('./commands/');
//
// function readDir(path) {
//     fs.readdir(path, {withFileTypes: true}, (err, files) => {
//         if (err) return console.log(err);
//         files.forEach(file => {
//             // console.log(file);
//             if (file.isDirectory()) {
//                 readDir(path + file.name + '/');
//                 return;
//             }
//             if (!file.name.endsWith('.js')) return;
//             console.log('Loading: ', path + `${file.name}`);
//             // let props = require(path + `/${file.name}`);
//             // let commandName = file.name.split('.')[0];
//             // this.addCommand(props, commandName);
//         });
//     });
// }