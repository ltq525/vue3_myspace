import $ from 'jquery';
import { jwtDecode }  from "jwt-decode";

const ModuleUser = {
    // 存储静态数据
    state: {
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        is_followed: "",
        is_login: false,
        access: "",
        refresh: "",

    },
    // 对获取state的计算数据，不允许修改 getters(访问)
    getters: {
    },
    // 对state数据进行修改，不支持异步操作 mutations(改变)
    mutations: {
        updateUser(state, user) {
            state.id = user.user_id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },
        updateAccess(state, access) {
            state.access = access;
        },
        logout(state) {
            state.id = "";
            state.username = ""
            state.photo = "";
            state.followerCount = 0;
            state.is_followed = "";
            state.is_login = false;
            state.access = "";
            state.refresh = "";
        },
    },
    // 对state的各种操作
    actions: {
        login(context, data) {
            $.ajax({
                url: 'https://app5806.acapp.acwing.com.cn/settings/token/',
                type: 'POST',
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    const {refresh, access} = resp;
                    const access_obj = jwtDecode(access);
                    setInterval(() => {
                        $.ajax({
                            url: 'https://app5806.acapp.acwing.com.cn/settings/token/refresh/',
                            type: 'POST',
                            data: {
                                refresh,
                            },
                            success(resp) {
                                context.commit('updateAccess', resp.access);
                            }
                        })

                    }, 1000 * 60 * 4.5);

                    $.ajax({
                        url: 'https://app5806.acapp.acwing.com.cn/settings/getinfo',
                        type: 'GET',
                        data: {
                            user_id: access_obj.use_id,
                        },
                        // 令牌认证信息
                        headers: {
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            
                            context.commit("updateUser", {
                                ...resp,
                                ...access_obj,
                                access,
                                refresh,
                                is_login: true,
                            });
                            data.success();
                        },
                    })
                },
                error() {
                    data.error();
                }
            })
        },

    },
    // 对state进行
    modules: {
    }
}

export default ModuleUser;
