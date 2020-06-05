import storageUtils from '@/utils/storageUtils.js'
export default {
    state: {
        user: {},
        title: '首页'
    },
    reducers: {
        setIsUser(state, action) {//当前登录用户信息
            let user = action.payload;
            return {
                ...state,
                user
            }
        },
        setTitle(state, action) {//当前路径对应的标题
            let title = action.payload;
            return {
                ...state,
                title
            }
        }
    },

    effects: {
        *isUser({ payload }, { put }) {//设置当前登录用户的信息
            const { isUser } = payload;
            console.log(payload)
            storageUtils.setUser("onIsUser", { ...isUser });
            yield put({ type: "setIsUser", payload: { ...isUser } })
        },
        *loginOut(action, { put }) {//当前用户退出登录
            storageUtils.removeUser("onIsUser");
            yield put({ type: "setIsUser", payload: {} })
        },
    },

    subscriptions: {
        syncstorageUtils({ dispatch }) {
            //同步本地存储
            let onIsUser = storageUtils.getUser('onIsUser');
            if (onIsUser) { //当前登录用户
                console.log(onIsUser)
                dispatch({ type: "setIsUser", payload: onIsUser });
            }
        }
    },

};