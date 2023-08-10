const path = require('path');
const glob = require('glob'); // 作用：获取匹配文件的路径
const fs = require('fs-extra');
const chalk = require('chalk');
const { spawnSync } = require('child_process');
const handlebars = require('handlebars');
const fetch = require('node-fetch-commonjs');

/**
 * abc-xyz => AbcXyz
 * @param {*} str 
 */
const varCase = str => str.replace(/-[a-z]/g, m => m[1].toUpperCase()).replace(/^.{1}/, m => m.toUpperCase());
const lowCase = str => str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`).replace(/^-/, '');


(async () => {
    const component = process.argv[2];

    const dirName = lowCase(component);
    const componentName = varCase(component);
   
    // let res = spawnSync(cmd, ['-p', path.join(process.cwd(), `src/${dirName}`)]); // mac 下 创建文件夹
    spawnSync('cmd', ['/c', 'md', path.join(process.cwd(), 'src/affix')]); // windows 下创建方式
    // let filesPath = path.join(__dirname, 'template', '*.tsx'); //有问题，不能使用绝对路径？
    const tplFiles = glob.sync('scripts/template/*.hbs'); // 获取模板文件路径

    tplFiles.forEach((async filePath => {
        const content = await fs.readFile(filePath, 'utf-8');
        const tempalte = handlebars.compile(content);
        const result = tempalte({
            dirName,
            componentName
        });

        // 
        const newPath = filePath.replace(path.join('scripts','template'), path.join('src',dirName))
        .replace('component', dirName)
        .replace('Component', componentName)
        .replace('.hbs', '');
        
        await fs.writeFile(newPath, result);

        console.log(chalk.green(`write ${newPath} success`));
    }))

    const response = await fetch(`https://unpkg.com/antd@4.22.5/es/${dirName}/style/index.css`);
    const body = await response.text();

    const scssFile = path.join(process.cwd(), `src/${dirName}/index.scss`);
    await fs.writeFile(scssFile, body);
    console.log(chalk.green(`update ${scssFile} success`));
})();
