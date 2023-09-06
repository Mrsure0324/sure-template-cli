import fs from 'fs'
const dirCache={};
export default function mkdir(filePath) {
    const arr=filePath.split('/');
    let dir=arr[0];
    for(let i=1;i<arr.length;i++){
        if(!dirCache[dir]&&!fs.existsSync(dir)){
            dirCache[dir]=true;
            fs.mkdirSync(dir);
        }
        dir=dir+'/'+arr[i];
    }
    fs.writeFileSync(filePath, '')
}