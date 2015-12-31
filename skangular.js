var fs = require('fs');
var readline = require('readline');
var colors = require('colors');
var replaceStream = require('replacestream');

colors.setTheme({
    info: 'green',
    data: 'grey',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Angular app name: ".warn, function(answer) {
    var angularAppName = answer;
    generateAppFile(angularAppName);
    generateIndexFile(angularAppName);
    setScss(angularAppName);
});

var setScss = function(angularAppName){
    rl.question("Use .scss files? (true or false): ".warn, function(answer) {
        var scss = answer;
        if((scss === "true") || (scss === "false")){
            rl.close();
            generateBasicFolder(scss, angularAppName);
        }else{
            console.log("Invalid answer".error);
            setScss();
        }
    });
};

var generateAppFile = function(angularAppName){
    angularAppName = lowerFirstLetter(angularAppName);
    fs.createReadStream("./templates/app")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream("./" + angularAppName + "App.js"));
};

var generateIndexFile = function(angularAppName){
    angularAppName = lowerFirstLetter(angularAppName);
    fs.createReadStream("./templates/index")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream("./index.html"));
};

var generateBasicFile = function (angularAppName){
    angularAppName = lowerFirstLetter(angularAppName);
    fs.createReadStream("./templates/controller")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream("./js/controllers/" + angularAppName + "Controller.js"));
    fs.createReadStream("./templates/service")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream("./js/services/" + angularAppName + "Service.js"));
    fs.createReadStream("./templates/factory")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream("./js/factories/" + angularAppName + "Factory.js"));
    fs.createReadStream("./templates/config")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream("./" + angularAppName + "Config.js"));

    endCreate();
};

var generateBasicFolder = function(scss, angularAppName){

    var stylesFolderName;

    if(scss === "true")
        stylesFolderName = "scss";
    else
        stylesFolderName = "css";

    fs.mkdir('./js',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir('./js/controllers',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir('./js/services',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir('./js/factories',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir('./js/providers',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir('./public_views',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir('./public_views/directives_templates',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir('./' + stylesFolderName,function(err){
        if (err)
            return console.error(err.error);
    });

    generateBasicFile(angularAppName);
};

var lowerFirstLetter = function(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

var endCreate = function(){
    console.log("Project created !!".info)
};
