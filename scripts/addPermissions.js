module.exports = function(ctx) {
    // make sure android platform is part of build
    if (ctx.opts.cordova.platforms.indexOf('android') < 0) {
        return;
    }
    const fs = require('fs');
    var xml_helpers = ctx.requireCordovaModule("cordova-common").xmlHelpers;
    var et = ctx.requireCordovaModule('elementtree');
    var XML = et.XML;
    var ElementTree = et.ElementTree;
    var element = et.Element;
    var subElement = et.SubElement;
    const scheme = 'flowkey';
    const manifestPath = ctx.opts.projectRoot + '/platforms/android/AndroidManifest.xml';
    var manifest = xml_helpers.parseElementtreeSync(manifestPath);
    if(ctx.cmdLine.split("Permissions=").length>=2){
        var string = ctx.cmdLine.split("Permissions=")[1];
        if(string != undefined){
            while (string.indexOf("'")!=-1){
            string =  string.replace("'","\"");
        }
            var obj = JSON.parse(string);
            var i;
            for (i = 0; i < obj.length; ++i) {
                var alreadyExits= false;
                var a;
                var allUserPermissions = manifest._root.findall("./uses-permission");
                for(a = 0; a< allUserPermissions.length; a ++){
                    var permission = allUserPermissions[a].attrib;
                    var permissionString = JSON.stringify(permission);
                    if(permissionString.indexOf(obj[i])!=-1){
                        alreadyExits = true;
                    }
                }
                if(!alreadyExits){
                    var uses_permission = subElement(manifest._root,'uses-permission');
                    uses_permission.set('android:name', obj[i]);
                }
            }
        }
     }
     fs.writeFile(manifestPath, manifest.write({'indent': 4}));
}
