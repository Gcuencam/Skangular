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

var skangular = {

    templateDirectory: "./templates/",
    srcDirectory: "",
    srcDirectoryCustom: "",
    publicDirectory: "",
    publicDirectoryCustom: "",
    angularAppName: "",

    lowerFirstLetter: function(string){
        return string.charAt(0).toLowerCase() + string.slice(1);
    },

    main: function() {
        rl.question("Angular app name: ".warn, function(answer) {
            skangular.angularAppName = answer;
            skangular.configDirectories();
        });
    },

    configDirectories: function(){
        rl.question("Enter a directory for javascripts files, starting in root: ".warn, function(answer) {
            skangular.srcDirectoryCustom = answer;
            skangular.srcDirectory = "../../" + skangular.srcDirectoryCustom;
            rl.question("Enter a directory for index file, starting in root: ".warn, function(answer) {
                skangular.publicDirectoryCustom = answer;
                skangular.publicDirectory = "../../" + skangular.publicDirectoryCustom;
                skangular.generateAppFile();
                skangular.generateIndexFile();
            });
        });
    },

    generateAppFile: function(){
        var angularAppName = skangular.lowerFirstLetter(skangular.angularAppName);
        fs.createReadStream(skangular.templateDirectory + "app")
            .pipe(replaceStream('*****', angularAppName))
            .pipe(fs.createWriteStream(skangular.srcDirectory + "app" + skangular.angularAppName + ".js"));
    },

    generateIndexFile: function(){
        var angularAppName = skangular.lowerFirstLetter(skangular.angularAppName);
        fs.createReadStream(skangular.templateDirectory + "index")
            .pipe(replaceStream('*****', angularAppName))
            .pipe(fs.createWriteStream(skangular.publicDirectory + "index.html"));

        skangular.generateBasicFolder()
    },

    generateBasicFolder: function(){
        fs.mkdir(skangular.srcDirectory + 'controllers',function(err){
            if (err)
                return console.error(err.error);
        });
        fs.mkdir(skangular.srcDirectory + 'services',function(err){
            if (err)
                return console.error(err.error);
        });
        fs.mkdir(skangular.srcDirectory + 'factories',function(err){
            if (err)
                return console.error(err.error);
        });
        fs.mkdir(skangular.srcDirectory + 'providers',function(err){
            if (err)
                return console.error(err.error);
        });
        fs.mkdir(skangular.srcDirectory + 'public_views',function(err){
            if (err)
                return console.error(err.error);
        });
        fs.mkdir(skangular.srcDirectory + 'public_views/directives_templates',function(err){
            if (err)
                return console.error(err.error);
        });

        skangular.generateBasicFile();
    },

    generateBasicFile: function(){
        var angularAppName = skangular.lowerFirstLetter(skangular.angularAppName);
        fs.createReadStream(skangular.templateDirectory + "controller")
            .pipe(replaceStream('*****', angularAppName))
            .pipe(fs.createWriteStream(skangular.srcDirectory + "controllers/" + angularAppName + "Controller.js"));
        fs.createReadStream(skangular.templateDirectory + "service")
            .pipe(replaceStream('*****', angularAppName))
            .pipe(fs.createWriteStream(skangular.srcDirectory + "services/" + angularAppName + "Service.js"));
        fs.createReadStream(skangular.templateDirectory + "factory")
            .pipe(replaceStream('*****', angularAppName))
            .pipe(fs.createWriteStream(skangular.srcDirectory + "factories/" + angularAppName + "Factory.js"));
        fs.createReadStream(skangular.templateDirectory + "config")
            .pipe(replaceStream('*****', angularAppName))
            .pipe(fs.createWriteStream(skangular.srcDirectory  + "config.js" + skangular.angularAppName + ".js"));

        skangular.endCreate();
    },

    endCreate: function(){
        console.log("Project created !!".info)
    }
};

skangular.main();