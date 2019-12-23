let sm = require('string-similarity'), client;
const inject = (client_object, field) => {
    new Promise((resolve, reject) => {
        client = client_object;
        delete module.exports['inject'];
        try {
            if (!client.dataManager) throw new Error("Sorry, discord.js only!")
            Object.defineProperty(client, field ? field : 'query', {
                get: function () { return module.exports; },
                enumerable: false,
                configurable: false
            })
            resolve(true);
        } catch (error) {
            throw new Error(error.message === 'Sorry, discord.js only!' ? 'Sorry, discord.js only!' : "Please, provide a client");
        };
    });
}
const checkForClient = () => this.client ? true : new Error("No client provided");
const findMember = (message, string) => {
    checkForClient()
    if (!string || string === null || !string.trim()) throw new Error('Вы не передали строку, либо она является null\'ом или содержит только пробелы');
    let { guild } = message,
        { members } = guild,
        tags = members.map(x => x.user.tag),
        indexes = members.map(x => x.user.id),
        { bestMatchIndex } = sm.findBestMatch(string, tags),
        output = message.guild.members.get(indexes[bestMatchIndex]);

    return output;
};

const findUser = (message, string) => {
    checkForClient()
    if (!string || string === null || !string.trim()) throw new Error('Вы не передали строку, либо она является null\'ом или содержит только пробелы');

    let { users } = client,
        tags = users.map(x => x.tag),
        indexes = users.map(x => x.id),
        { bestMatchIndex } = sm.findBestMatch(string, tags),
        output = users.get(indexes[bestMatchIndex]);

    return output;
};

const findRole = (message, string) => {
    checkForClient()
    if (!string || string === null || !string.trim()) throw new Error('Вы не передали строку, либо она является null\'ом или содержит только пробелы');
    let { guild } = message,
        { roles } = guild,
        tags = roles.map(x => x.name),
        indexes = roles.map(x => x.id),
        { bestMatchIndex } = sm.findBestMatch(string, tags),
        output = message.guild.roles.get(indexes[bestMatchIndex]);

    return output;
};

const findChannel = (message, string) => {
    checkForClient()
    if (!string || string === null || !string.trim()) throw new Error('Вы не передали строку, либо она является null\'ом или содержит только пробелы');
    let { guild } = message,
        { channels } = guild,
        tags = channels.map(x => x.name),
        indexes = channels.map(x => x.id),
        { bestMatchIndex } = sm.findBestMatch(string, tags),
        output = message.guild.channels.get(indexes[bestMatchIndex]);

    return output;
};

const findGuild = (string) => {
    checkForClient()
    if (!string || string === null || !string.trim()) throw new Error('Вы не передали строку, либо она является null\'ом или содержит только пробелы');
    let { guilds } = client,
        tags = guilds.map(x => x.name),
        indexes = guilds.map(x => x.id),
        { bestMatchIndex } = sm.findBestMatch(string, tags),
        output = guilds.get(indexes[bestMatchIndex]);

    return output;
};


const findCommand = (string, target = false) => {
    checkForClient()
    if (!string || string === null || !string.trim()) throw new Error('Вы не передали строку, либо она является null\'ом или содержит только пробелы');
    let { commands } = client,
        tags = commands.map(x => x.name),
        { bestMatch } = sm.findBestMatch(string, tags),
        output = bestMatch;

    return target ? output : commands.get(output.target);
};
module.exports = {
    findMember, findUser, findRole, findChannel, findGuild, findCommand, inject
};
