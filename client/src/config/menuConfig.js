export default [
    { key: "/", title: "首页", icon: 'home', isPublic: true },//isPublic公开的谁都可以访问
    {
        key: "commodity", title: "商品", icon: "appstore",
        children: [
            { key: "/commodity/classify", title: "商品类型", icon: 'menu' },
            { key: "/commodity/manage", title: "商品管理", icon: 'edit' }
        ]
    },
    {
        key: "graph", title: "图形图标", icon: "area-chart",
        children: [
            { key: "/graph/pie", title: "柱形图", icon: 'pie-chart' },
            { key: "/graph/bar", title: "饼图", icon: 'bar-chart' },
            { key: "/graph/line", title: "折线图", icon: 'line-chart' }
        ]
    },
    { key: "/role", title: "权限管理", icon: "safety-certificate" },
    { key: "/admin", title: "用户管理", icon: "user" },
]