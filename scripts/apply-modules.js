#!/usr/bin/env node

/**********
 * Globals
 **********/

const PLUGIN_NAME = "Diagnostic plugin";
const PLUGIN_ID = "cordova.plugins.diagnostic";
const PREFERENCE_NAME = PLUGIN_ID + ".modules";

const MODULES = [
    "LOCATION",
    "BLUETOOTH",
    "WIFI",
    "CAMERA",
    "NOTIFICATIONS",
    "MICROPHONE",
    "CONTACTS",
    "CALENDAR",
    "REMINDERS",
    "MOTION",
    "NFC",
    "EXTERNAL_STORAGE",
    "AIRPLANE_MODE"
];

const COMMENT_START = "<!--";
const COMMENT_END = "-->";

// Node dependencies
var path, fs;

// External dependencies
var et;

// Internal dependencies
var logger;

var projectPath, pluginNodePath, pluginScriptsPath, configXmlPath, pluginXmlPath, configXmlData, pluginXmlText;


/*********************
 * Internal functions
 *********************/

var run = function (){
    var configuredModules = getSelectedModules();
    logger.verbose("Modules: " + configuredModules);

    readPluginXml();
    enableAllModules();
    if(configuredModules){
        MODULES.forEach(function(module){
            if(configuredModules.indexOf(module) === -1){
                disableModule(module);
            }
        });
    }

    writePluginXml();
};


var handleError = function (error) {
    error = PLUGIN_NAME + " - ERROR: " + error;
    if(logger){
        logger.error(error);
    }else{
        console.log(error);
        console.error(error)
    }
    return error;
};

// Parses a given file into an elementtree object
var parseElementtreeSync = function(filename) {
    var contents = fs.readFileSync(filename, 'utf-8');
    if(contents) {
        //Windows is the BOM. Skip the Byte Order Mark.
        contents = contents.substring(contents.indexOf('<'));
    }
    return new et.ElementTree(et.XML(contents));
};

// Parses the config.xml into an elementtree object and stores in the config object
var getConfigXml = function() {
    if(!configXmlData) {
        configXmlData = parseElementtreeSync(configXmlPath);
    }
    return configXmlData;
};

var readPluginXml = function(){
    pluginXmlText = fs.readFileSync(pluginXmlPath, 'utf-8');
};

var writePluginXml = function(){
    fs.writeFileSync(pluginXmlPath, pluginXmlText, 'utf-8');
};

var getSelectedModules = function(){
    var modules = null;
    var preference = getConfigXml().findall("preference[@name='"+PREFERENCE_NAME+"']")[0];
    if(preference){
        modules = preference.attrib.value.split(' ');
    }
    return modules;
};

var enableAllModules = function(){
    MODULES.forEach(function(module){
        var commentedStartRegExp = new RegExp(getModuleStart(module)+COMMENT_START, "g");
        var commentedEndRegExp = new RegExp(COMMENT_END+getModuleEnd(module), "g");
        if(pluginXmlText.match(commentedStartRegExp)){
            pluginXmlText = pluginXmlText.replace(commentedStartRegExp, getModuleStart(module));
            pluginXmlText = pluginXmlText.replace(commentedEndRegExp, getModuleEnd(module));
        }
    });
};

var disableModule = function(module){
    var commentedStart = getModuleStart(module)+COMMENT_START;
    var commentedEnd = COMMENT_END+getModuleEnd(module);
    pluginXmlText = pluginXmlText.replace(new RegExp(getModuleStart(module), "g"), commentedStart);
    pluginXmlText = pluginXmlText.replace(new RegExp(getModuleEnd(module), "g"), commentedEnd);
};

var getModuleStart = function(module){
    return "<!--BEGIN_MODULE "+module+"-->";
};

var getModuleEnd = function(module){
    return "<!--END_MODULE "+module+"-->";
};


/**********
 * Main
 **********/
// Finds the project root by walking up from startDir looking for config.xml
var findProjectRoot = function(startDir) {
    var dir = startDir;
    while (true) {
        if (fs.existsSync(path.join(dir, 'config.xml'))) {
            return dir;
        }
        var parent = path.dirname(dir);
        if (parent === dir) {
            // Reached filesystem root without finding config.xml
            return null;
        }
        dir = parent;
    }
};

var main = function() {
    try{
        fs = require('fs');
        path = require('path');

        // Use __dirname to reliably locate the plugin regardless of node_modules structure.
        // This works with npm, yarn, and pnpm (which uses symlinked .pnpm store).
        pluginNodePath = path.resolve(__dirname, "..");
        pluginScriptsPath = __dirname;

        logger = require(path.join(pluginScriptsPath, "logger.js"))(PLUGIN_ID);
        et = require('elementtree');
    }catch(e){
        handleError("Failed to load dependencies. If using cordova@6 CLI, ensure this plugin is installed with the --fetch option or run 'npm install "+PLUGIN_ID+"': " + e.message);
    }

    try{
        projectPath = findProjectRoot(pluginNodePath);
        if (!projectPath) {
            handleError("Could not find project root (no config.xml found in any parent directory)");
            return;
        }
        configXmlPath = path.join(projectPath, 'config.xml');
        pluginXmlPath = path.join(pluginNodePath, "plugin.xml");
        run();
    }catch(e){
        handleError(e.message);
    }
};

main();