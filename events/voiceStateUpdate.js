let jailed = [];

exports.run = async (oldMember, newMember) => {
    for (let i = 0; i<jailed.length; i++) {
        if (oldMember.id === jailed[i] || newMember.id === jailed[i]) {
            newMember.member.voice.kick("YOU HAVE BEEN JAILED !");
        }
    }
};


exports.jail = (id) => {
    jailed.push(id);
};
exports.unjail = (id) => {
    for (let i = 0; i < jailed.length; i++) {
        if (jailed[i] === id) jailed.splice(i, 1);
    }
};