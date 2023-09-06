export default function (info) {
    const { modules=[] } = info;
    if(!modules || modules?.length <= 0) return;
    const result = {};
    //开始解析modules，生成 isModulesItem形式
    modules.forEach(mod => {
        result[`is${mod}`] = true;
    });

    return {
        ...info,
        ...result
    }
}