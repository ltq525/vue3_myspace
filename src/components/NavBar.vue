<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <!-- router-link前端处理事件 a ref 后端处理 -->
    <router-link class="navbar-brand" :to="{name: 'home'}">我的空间</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'home'}">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'userlist'}">好友列表</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="$store.state.user.is_login" class="nav-link" :to="{name: 'userprofile',  params: {userId: $store.state.user.id}}">用户动态</router-link>
          <router-link v-else class="nav-link" :to="{name: 'login'}">用户动态</router-link>
        </li>
        
      </ul>

      <ul class="navbar-nav" v-if="!$store.state.user.is_login">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'login'}">登陆</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'register'}">注册</router-link>
        </li>
      </ul>
      <ul class="navbar-nav" v-else>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'userprofile', params: {userId: $store.state.user.id}}">
            {{ $store.state.user.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="cursor: pointer" @click="logout">退出</a>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
</template>

<script>
import { useStore } from 'vuex';

export default {
    name: 'NavBar',
    setup() {
      const store = useStore();
      const logout = () => {
        // commit调用mutations dispatch调用actions
        store.commit("logout");
      };
      return {
        logout,
      }
    }

}
</script>


<style scoped>
</style>



