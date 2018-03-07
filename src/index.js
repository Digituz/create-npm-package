#! /usr/bin/env node

const commandLineArgs = require('command-line-args');
const { readFileSync, writeFileSync } = require('fs');
const os = require('os');

const argsDefinitions = [
    { name: 'target', alias: 't', type: String, defaultOption: true },
    { name: 'packageName', alias: 'p', type: String },
    { name: 'developerName', alias: 'n', type: String },
    { name: 'developerEmail', alias: 'e', type: String },
    { name: 'developerUrl', alias: 'u', type: String },
];

const args = commandLineArgs(argsDefinitions);

const packageJson = JSON.parse(readFileSync(`${__dirname}/templates/package.json.template`));

packageJson.name = args.packageName;
packageJson.author = {};

if (packageJson.author.name) packageJson.author.name = args.developerName;
if (packageJson.author.email) packageJson.author.email = args.developerEmail;
if (packageJson.author.url) packageJson.author.url = args.developerUrl;

writeFileSync(`${process.cwd()}/${args.packageName}/package.json`, JSON.stringify({
    name: packageJson.name,
    ...packageJson,
}, null, 2) + os.EOL);
