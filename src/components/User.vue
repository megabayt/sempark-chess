<template>
  <div class="user">
    <span class="user__name">{{ user.name }}</span>
    <div class="user__socialLinks">
      <app-social-link v-if="user.vkId" type="vk" :href="`https://vk.com/${user.vkId}`" />
      <app-social-link
        v-if="user.telegramId"
        type="telegram"
        :href="`https://t.me/${user.telegramId}`"
      />
      <app-social-link
        v-if="user.whatsappPhone"
        type="whatsapp"
        :href="`https://wa.me/${user.whatsappPhone}`"
      />
    </div>
  </div>
</template>

<script>
import AppSocialLink from "./SocialLink";

export default {
  components: { AppSocialLink },
  props: ["user"]
};
</script>

<style scoped>
.user {
  margin-bottom: 7px;
}
.user__name {
  display: block;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}
.user__socialLinks {
  display: flex;
  justify-content: center;
}
</style>