<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user" />
                <UserProfileWrite @post_a_post="post_a_post" />
            </div>
            <div class="col-9">
                <UserProfilePosts :user="user" :posts="posts" @delete_a_post="delete_a_post" />
            </div>
        </div>
    </ContentBase>
</template>
  
<script>

import ContentBase from '@/components/ContentBase.vue';
import UserProfileInfo from '@/components/UserProfileInfo.vue';
import UserProfilePosts from '@/components/UserProfilePosts.vue';
import UserProfileWrite from '@/components/UserProfileWrite.vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';


export default {
    name: 'UserProfileView',
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileWrite,
    },
    setup() {
        const route = useRoute();
        // 路由传参的params下的userId数据
        const userId = parseInt(route.params.userId);

        const user = reactive({
            id: userId,
            username: 'ltq',
            lastname: 'Tingquan',
            firstname: "Liu",
            followerCount: 0,
            is_followed: false,
        });

        // reactive变量主键
        const posts = reactive({
            count: 3,
            posts: [
                {
                    id: 3,
                    userId: userId,
                    content: "Hello",
                },
                {
                    id: 2,
                    userId: userId,
                    content: "World",
                },
                {
                    id: 1,
                    userId: userId,
                    content: "!",
                },
            ]
        });

        const follow = () => {
            if (user.is_followed) return;
            user.is_followed = true;
            user.followerCount++;
        }

        const unfollow = () => {
            if (!user.is_followed) return;
            user.is_followed = false;
            user.followerCount--;
        }

        const post_a_post = (content) => {
            posts.count++;
            // 元素最前面添加unshift, 后面添加push
            posts.posts.unshift(
                {
                    id: posts.count,
                    userId: user.id,
                    content: content,
                },
            )
        }

        const delete_a_post = (post_id) => {
            posts.posts = posts.posts.filter((post) => post.id !== post_id);
            posts.count = posts.posts.length;
        }

        return {
            user,
            follow,
            unfollow,
            posts,
            post_a_post,
            delete_a_post,
        }
    }
}
</script>
  
<style scoped></style>
  