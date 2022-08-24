const fsx = require('fs-extra');
const path = require('path');
const package = require('./package.json');

const domain = 'spid-growth.com';
const config = {
  dev: `.`, // local files
  test: `cdn.test.${domain}`,
  uat: `cdn.uat.${domain}`,
  production: `cdn.${domain}`,
};

const prefix = config[process.env.NODE_ENV || 'dev'];
const projectRoute = package.name || 'cocos-boilerplate';
let origin = `https://${prefix}/${projectRoute}/static`;
if (!prefix.includes('.com')) {
  origin = origin.replace(`${projectRoute}/`, '').replace('https://', '');
}
console.log('origin:', origin);

const buildPath = path.join(__dirname, 'build');
const staticPath = path.join(buildPath, 'static');

async function deleteStaticDir(dir = staticPath) {
  console.log('remove static dir');
  return fsx.removeSync(dir);
}

async function copyToStatic(dir = buildPath) {
  console.log('copy data to static dir');
  fsx.mkdirSync(staticPath);
  const exlude = ['static', 'index.html'];
  const list = fsx.readdirSync(dir);
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (exlude.includes(item)) {
      continue;
    }
    const src = path.join(dir, item);
    const dest = path.join(staticPath, item);
    fsx.copySync(src, dest);
  }
}

async function prepareApplication() {
  console.log('prepare application.js');
  const list = fsx
    .readdirSync(staticPath)
    .filter((v) => v.includes('application'));
  if (list.length <= 0) {
    throw new Error('application not found');
  } else if (list.length > 1) {
    throw new Error('dupplicate application');
  }

  const applicationPath = path.join(staticPath, list[0]);
  const appContent = fsx.readFileSync(applicationPath, { encoding: 'utf-8' });
  const MAIN_PATTERN = '_cc$AssetManager$Buil.MAIN';
  const RESOURCES_PATTERN = '_cc$AssetManager$Buil.RESOURCES';
  const newContent = appContent
    .replace(MAIN_PATTERN, `'${origin}/assets/main'`)
    .replace(RESOURCES_PATTERN, `'${origin}/assets/resources'`)
    .replace(/src\//g, `${origin}/src/`)
    .replace(`var server = ''`, `var server = '${origin}/'`);
  fsx.writeFileSync(applicationPath, newContent, { encoding: 'utf-8' });
}

async function updateIndexHTML() {
  console.log('update index.html');
  const indexFile = fsx
    .readdirSync(staticPath)
    .filter((v) => v.includes('index'))[0];

  if (!indexFile) {
    throw new Error('index file not found');
  }

  const indexItem = `System.import('./${indexFile}').catch(function(err) { console.error(err); })`;
  const indexPath = path.join(buildPath, 'index.html');
  const content = fsx.readFileSync(indexPath, { encoding: 'utf-8' });
  const data = content.split('<').map((tag) => (tag ? `<${tag}` : tag));

  const replaceCallback = (pattern) => {
    return (s1, s2) => {
      if (s1.includes('http') && !s1.includes(domain)) {
        return s1;
      }

      const file = s2.replace(/^(.*?)\/static\//g, '');
      return `${pattern}"${origin}/${file}"`;
    };
  };

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.includes('src=') && item.includes('<script')) {
      // handle js
      data[i] = item.replace(/src=\"(.*?)\"/g, replaceCallback('src='));
    } else if (item.includes('href=') && item.includes('stylesheet')) {
      // handle link
      data[i] = item.replace(/href=\"(.*?)\"/g, replaceCallback('href='));
    } else if (item.includes(indexItem)) {
      data[i] = `<script src="${origin}/${indexFile}"></script>`;
    }
  }

  const newContent = data.join('');
  fsx.writeFileSync(indexPath, newContent, { encoding: 'utf-8' });
}

deleteStaticDir();
copyToStatic();
prepareApplication();
updateIndexHTML();
