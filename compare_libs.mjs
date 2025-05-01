import cla from "command-line-args";
import cp from "child_process";
import path from "path";

const defs = [
    {
        name: "libs",
        multiple: true,
        type: String,
        defaultOption: true,
    },
];

const options = cla(defs);

if (!options.libs?.length) {
    console.log("Usage compare_libs <lib1> [<lib2>]");
    process.exit();
}

if (options.libs.length === 1) {
    //
    // default to comparing the one lib passed to the core lib.
    //
    options.libs.unshift("core");
}

function makeFile(index, file) {
    return path.join("libs", options.libs[index], file);
}
//
// NOTE: diff returns zero if no diff, 1 if there is at least one diff, and any
// other number to report an error. BUT cp.execSync() assumes anything other than 0
// is an error.
//
function diff(file) {
    console.log(`==================== ${file} ======================`);
    try {
        cp.execSync(`diff ${makeFile(0, file)} ${makeFile(1, file)}`);
    } catch (ex) {
        if (ex.status === 1) {
            console.log(ex.stdout.toString());
        } else {
            if (ex.stderr) {
                console.error(ex.stderr.toString());
            } else {
                console.error(ex);
            }
        }
    }
}

for (const file of [
    "ng-package.json",
    "package.json",
    "project.json",
    "tsconfig.json",
    "tsconfig.lib.json",
    "tsconfig.lib.prod.json",
    "tsconfig.spec.json",
]) {
    diff(file);
}
