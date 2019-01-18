#!/usr/bin/env node

const fs = require('fs');
const exist = fs.existsSync;
const package = require('./package.json');
const program = require('commander');
const download = require('download-git-repo');
const path = require('path');
const inquirer = require('inquirer');
const rm = require('rimraf').sync

program
  .version(package.version)
  .usage('<command> [options]')

program.command('init [project-name]')
  .description("创建新新项目")
  .alias('i')
  .action(function(){
    const projectName = program.args[0];
    if (projectName) {
      initProject(projectName)
    } else {
      inquirer.prompt([{
        type: 'input',
        message: '请输入新建项目名称: ',
        name: 'projectName',
      }]).then(({ projectName }) => {
        if (projectName) {
          initProject(projectName)
        } else {
          console.log('已退出')
        }
      })
    }
  })

program.parse(process.argv);

if(program.args.length==0){
  program.help();
}

function initProject(projectName){
  const to = path.resolve(process.cwd(), projectName);
  if (exist(to)) {
    inquirer.prompt([{
      type: 'list',
      message: `该目录下已有名为"${projectName}"的项目，是否移除并重新构建？`,
      name: 'ok',
      choices: ['yes', 'no']
    }]).then(({ ok }) => {
      if (ok === 'yes') {
        downloadTemplate(to, true)
      } else {
        console.log('已退出')
      }
    })
  } else {
    downloadTemplate(to)
  }
}

function downloadTemplate(to, needToRemoveExistProject) {
  
  inquirer.prompt([{
    type: 'list',
    message: `"React应用模版"|"React组件模版"`,
    name: 'choices',
    choices: ['应用', '组件']
  }]).then(({ choices }) => {
    
    let downloadURL = ''
    
    if (choices === '应用') {
      downloadURL = 'ZJBC/react-ts-parcel-template-app#master'
    } else {
      downloadURL = 'ZJBC/react-ts-parcel-template-component#master'
    }
  
    let loadingMag = '初始化项目中'
    if (needToRemoveExistProject) rm(to)
    const loadingInterval = setInterval(() => {
      if (loadingMag.length > 11) {
        loadingMag = '初始化项目中.'
      } else {
        loadingMag += '.'
      }
      process.stdout.write(loadingMag + '\33[K\r')
    }, 200)
    download(downloadURL, to, err => {
      clearInterval(loadingInterval)
      if (err) {
        process.stdout.write('\33[K\r' + `初始化项目错误：${err}`)
      } else {
        process.stdout.write('\33[K\r' + `初始化项目完毕!`)
      }
    })
    
  })
}
