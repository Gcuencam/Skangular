var fs = require('fs');
var readline = require('readline');
var colors = require('colors');
var replaceStream = require('replacestream');

var directorySrcCustom, publicDirectoryCustom;
var directoryTemplate = "./templates/";
var directorySrc, publicDirectory;

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
    configDirectories(angularAppName);
});

var configDirectories = function(angularAppName){
    rl.question("Introduza un directorio para los js, partiendo de raiz: ".warn, function(answer) {
        directorySrcCustom = answer;
    });
    rl.question("Introduza un directorio para el index, partiendo de raiz: ".warn, function(answer) {
        publicDirectoryCustom = answer;
    });

    directorySrc = "../../" + directorySrcCustom;
    publicDirectory = "../../" + publicDirectoryCustom;

    generateAppFile(angularAppName);
    generateIndexFile(angularAppName);
};


var generateAppFile = function(angularAppName){
    angularAppName = lowerFirstLetter(angularAppName);
    fs.createReadStream(directoryTemplate + "app")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream(directorySrc + "app" + angularAppName + ".js"));
};

var generateIndexFile = function(angularAppName){
    angularAppName = lowerFirstLetter(angularAppName);
    fs.createReadStream(directoryTemplate + "index")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream(publicDirectory + "index.html"));

    generateBasicFolder(angularAppName)
};

var generateBasicFile = function (angularAppName){
    angularAppName = lowerFirstLetter(angularAppName);
    fs.createReadStream(directoryTemplate + "controller")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream(directorySrc + "controllers/" + angularAppName + "Controller.js"));
    fs.createReadStream(directoryTemplate + "service")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream(directorySrc + "services/" + angularAppName + "Service.js"));
    fs.createReadStream(directoryTemplate + "factory")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream(directorySrc + "factories/" + angularAppName + "Factory.js"));
    fs.createReadStream(directoryTemplate + "config")
        .pipe(replaceStream('*****', angularAppName))
        .pipe(fs.createWriteStream(directorySrc + angularAppName + "Config.js"));

    endCreate();
};

var generateBasicFolder = function(angularAppName){


    fs.mkdir(directorySrc + 'controllers',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir(directorySrc + 'services',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir(directorySrc + 'factories',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir(directorySrc + 'providers',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir(directorySrc + 'public_views',function(err){
        if (err)
            return console.error(err.error);
    });
    fs.mkdir(directorySrc + 'public_views/directives_templates',function(err){
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