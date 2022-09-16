module.exports.config = {
  name: "help",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team", // fix DuyVuong
  description: "Hướng dẫn cho người mới",
  commandCategory: "danh sách lệnh",
  usages: "[Tên module]",
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 120
  }
};

module.exports.handleEvent = function ({ api, event }) {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    const { commands } = global.client;
    const { threadID, messageID, body } = event;
    if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
    const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
    if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const command = commands.get(splitBody[1].toLowerCase());
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
        return axios.get('https://apikanna.ngochan6666.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
    
          api.sendMessage({body:`Lệnh: ${command.config.name}
🕹️ Thực thi: ${command.config.description}
📝 Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : "Chưa có hướng dẫn cụ thể"}
🕐 Thời gian chờ: ${command.config.cooldowns}
✍ Quyền hạn: ${((command.config.hasPermssion == 0) ? `Người dùng` : (command.config.hasPermssion == 1) ? `Quản trị viên nhóm` : `Quản trị viên BOT`)}
📢 Credit: ${command.config.credits}`, 
            attachment: fs.createReadStream(__dirname + `/cache/4723.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/4723.${ext}`), event.messageID);
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/4723.${ext}`)).on("close", callback);
     });
}

module.exports.run = function({ api, event, args }) {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs-extra");
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const command = commands.get((args[0] || "").toLowerCase());
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  var tl = ["Lệnh math có thể giúp bạn giải toán !","đm bạn !","tôi không có khả năng hiểu con gái","con bot này giúp bạn hỗ trợ trong việc học?","spam bot tôi sẽ ban bạn khỏi người dùng bot","đừng để tôi cáu nhé!","việc bạn đang làm là vô nghĩa","bạn đã làm tôi cáu😡","tôi yêu bạn vai lon","bạn có yêu tôi không ?","cái gì chưa biết chỉ cần biết là được","con chuột bị ốm uống thuốc chuột thì tại sao con chuột lại chết ?","chảy máu cam nhưng sao màu máu là màu đỏ ?","đây chỉ là sản phẩm kem chống nắng ?","Tôi không có khả năng hắc ạcc bạn như các trick lỏ hay doạ !","Ngày 04 tháng 10 là ngày sinh nhật của admin ?","Con bot này giống bạn nó cũng ăn hại như bạn vậy !","Bạn đang thở ?","Bạn yêu bot hả ?","228922 là một con số tuyệt vời.","Đây là một lệnh vô dụng","177013 là một con số tuyệt vời","Đã từng có 600+ code JAV ở phiên bản đầu tiên","Ngôn ngữ của admin là ngôn ngữ của chúa","Nếu ","Đây là con bot tự viết code cho chính nó","7749 là con số đẹp cho tình yêu","tôi không yêu bạn !","bạn rất ngu"];
  var tle = tl[Math.floor(Math.random() * tl.length)];
  if (args[0] == "all") {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `» ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)}\n${commandGroup.cmds.join(', ')}\n\n`);
    return axios.get('https://apikanna.ngochan6666.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({ body:`━━• DANH SÁCH LỆNH HIỆN CÓ •━━\n\n` + msg + `📢 Số lệnh hiện có: ${commands.size} \n\n☠NGHIÊM CẤM SỬ DỤNG LỆNH THUỘC PHẦN ADMIN☠\n[Bạn có biết] : ${tle}`, 
            attachment: fs.createReadStream(__dirname + `/cache/472.${ext}`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/472.${ext}`);
        if (autoUnsend == true) {
            setTimeout(() => { 
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 1000);
        }
        else return;
    }, event.messageID);
        }
         request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/472.${ext}`)).on("close", callback);
     })
};
if (!command) {
    const commandsPush = [];
    const page = parseInt(args[0]) || 1;
    const pageView = 20;
    let i = 0;
    let msg = "━━• DANH SÁCH LỆNH •━━\n\n";
    for (var [name, value] of (commands)) {
        name += `
➣ ${value.config.description}
➣ Thời gian chờ: ${value.config.cooldowns}s
➣ Quyền hạn: ${((value.config.hasPermssion == 0) ? `Người dùng` : (value.config.hasPermssion == 1) ? `Quản trị viên nhóm` : `Quản trị viên BOT`)}\n`;
        commandsPush.push(name);
    }

    commandsPush.sort((a, b) => a.data - b.data);

    const first = pageView * page - pageView;
    i = first;
    const helpView = commandsPush.slice(first, first + pageView);

    for (let cmds of helpView)
        msg += `「 ${++i} 」- ${cmds}\n\n`;
    const cmdsView = `
🎮 Trang ${page}/${Math.ceil(commandsPush.length/pageView)}
📌 Hiện tại có ${commandsPush.length} lệnh có thể sử dụng trên bot của GK
✍ HDSD: ${prefix}help <Số trang/all> || help sẽ tự động gỡ sau 2 phút
📢 Liên hệ admin qua callad nếu có gì thắc mắc`;
    return axios.get('https://apikanna.ngochan6666.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({body: msg + cmdsView, attachment: fs.createReadStream(__dirname + `/cache/478.${ext}`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/478.${ext}`);
        if (autoUnsend == true) {
            setTimeout(() => { 
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 1000);
        }
        else return; 
        }, event.messageID);
    }
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/478.${ext}`)).on("close", callback);
     })
};
return axios.get('https://apikanna.ngochan6666.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
        api.sendMessage({body:`💐 Lệnh: ${command.config.name}
📝 Thực thi: ${command.config.description}
🎮 Cách sử dụng: ${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : "Chưa có hướng dẫn cụ thể"}
⏱ Thời gian chờ: ${command.config.cooldowns}
📌 Quyền hạn: ${((command.config.hasPermssion == 0) ? `Người dùng` : (command.config.hasPermssion == 1) ? `Quản trị viên nhóm` : `Quản trị viên BOT`)}
🗝️ Credit: ${command.config.credits}`,
        attachment: fs.createReadStream(__dirname + `/cache/475.${ext}`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/475.${ext}`), event.messageID);
        }; request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/475.${ext}`)).on("close", callback);
     })
};

