export default {
    name: 'PageCurd',
    description: '增删改查页面，支持模块Table，Search，',
    modules: [
        {
            name: 'Table',
            description: 'Normal Table'
        },
        {
            name: 'Search',
            description: 'Normal Search'
        },
    ],
    fileType: 'folder', //folder 文件夹形式 or file 文件形式
    resolve: 'src/index.tsx.mu'
}