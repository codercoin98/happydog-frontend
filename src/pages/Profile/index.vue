<template>
    <div class="container h-full flex flex-col">
        <div class="flex pb-4 border-bottom border-b-2">
            <n-avatar :src="state.avatar_url" :size="100" />
            <div class="flex flex-col place-content-end ml-4">
                <p class="text-black font-medium lg:text-xl">{{state.nickname}}</p>
                <p class="text-gray-300 font-medium lg:text-lg">@{{state.username}}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getUserByUsername } from '@/services/user/user.api';
import { useUserStore } from '@/store';
import { onMounted, reactive } from 'vue';
const userStore = useUserStore()
const state = reactive({
    username: '',
    nickname: '',
    avatar_url: '',
    mood: ''
})
onMounted(async () => {
    if (userStore.getUsername === '') {
        return
    }
    const { data } = await getUserByUsername(userStore.getUsername)
    if (data) {
        state.username = data.username;
        state.nickname = data.nickname;
        state.avatar_url = data.avatar_url;
        state.mood = data.mood
    }
})
</script>