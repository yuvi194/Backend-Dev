const fs = require("fs");
function writewordcount(){
    const content = fs.readFileSync('./log.txt', 'utf-8');
    console.log(content);
    const wc = content.split(" ").length;
    console.log("Word Count:", wc);
    function writewc(){
        fs.writeFileSync('wc.txt', `Word Count: ${wc}`);
    }
    writewc()
}
module.exports={
    writewordcount,
};
