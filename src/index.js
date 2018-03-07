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

if (args.developerName) packageJson.author.name = args.developerName;
if (args.developerEmail) packageJson.author.email = args.developerEmail;
if (args.developerUrl) packageJson.author.url = args.developerUrl;

writeFileSync(`${process.cwd()}/package.json`, JSON.stringify({
    name: packageJson.name,
    ...packageJson,
}, null, 2) + os.EOL);

writeFileSync(`${process.cwd()}/.editorconfig`, readFileSync(`${__dirname}/templates/.editorconfig.template`));

writeFileSync(`${process.cwd()}/.gitignore`, readFileSync(`${__dirname}/templates/.gitignore.template`));

writeFileSync(`${process.cwd()}/LICENSE`, readFileSync(`${__dirname}/templates/LICENSE.template`));
