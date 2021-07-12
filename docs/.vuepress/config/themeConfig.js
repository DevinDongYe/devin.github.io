module.exports = {
    repo: 'vuejs/vuepress',
    editLinks: true,
    docsDir: 'packages/docs/docs',
    smoothScroll: true,
    nav: require('./themeConfig/nav'),
    sidebar: {
        "/frame/vue/":[
            {
                title:"Vue",
                collapsable:false,
                children:[
                    "",
                    "data-binding"
                ]
            },
          
        ],
        "/frame/react/":[
            {
                title:"React",
                collapsable:false,
                children:[
                    "",
                    "fiber"
                ] 
            }
        ],
        "/engineering/":[
            {
                title:"工程化",
                collapsable:false,
                children:[
                    ""
                ] 
            },
            {
                title:"TypeScript",
                collapsable:false,
                children:[
                    "typescript/ts"
                ] 
            },
            {
                title:"Webpack",
                collapsable:false,
                children:[
                    "webpack/wb",
                   
                ] 
            }
        ],
        "/javascript/":[
            {
                title:"JavaScript",
                collapsable:false,
                children:[
                    "",
                    "hand",
                    "pattern"
                ] 
            },
            {
                title:"Array",
                collapsable:false,
                children:[
                    "array/arr-base"
                ] 
            },
            {
                title:"Object",
                collapsable:false,
                children:[
                    "object/obj-base", 
                ] 
            }
        ]
    },
}