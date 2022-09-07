// import sqlite3, {OPEN_CREATE, OPEN_READWRITE} from 'sqlite3'
// import {verbose} from "sqlite3";
//
// verbose();
//
// let db = new sqlite3.Database('db.db', OPEN_READWRITE, err => {
//     if (err) console.error(err.message);
//     console.log("Connected to the database");
// });
//
// export function getCommands(filter = "1") {
//     const sql = `SELECT * FROM commands WHERE ${filter};`;
//     let commands;
//     db.all(sql, (err, rows) => {
//         if (err) throw err;
//         console.log(rows);
//         commands = rows;
//     });
//     return commands;
// }
//
// export function getCommand(filter = "1=1") {
//     const sql = `SELECT * FROM commands WHERE ${filter};`;
//     let command;
//     db.get(sql, (err, rows) => {
//         if (err) throw err;
//         command = rows;
//     });
//     return command;
// }
//
// export function addCommand(member_id, guild_id, command) {
//     const sql = `INSERT INTO commands(member_id, guild_id, command) VALUES(?, ? ,?);`;
//     db.run(sql, [member_id, guild_id, command], err => {
//         if (err) throw err;
//     });
// }