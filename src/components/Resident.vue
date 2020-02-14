<template>
  <div class="resident">
    <span class="resident__name">{{ resident.name }}</span>
    <div class="resident__socialLinks">
      <app-social-link v-if="resident.vkId" type="vk" :href="`https://vk.com/${resident.vkId}`" />
      <app-social-link
        v-if="resident.telegramId"
        type="telegram"
        :href="`https://t.me/${resident.telegramId}`"
      />
      <app-social-link
        v-if="resident.whatsappPhone"
        type="whatsapp"
        :href="`https://wa.me/${resident.whatsappPhone}`"
      />
    </div>
  </div>
</template>

<script>
import AppSocialLink from "./SocialLink";

export default {
  components: { AppSocialLink },
  props: ["resident"]
};
</script>

<style scoped>
.resident {
  margin-bottom: 7px;
}
.resident__name {
  display: block;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}
.resident__socialLinks {
  display: flex;
  justify-content: center;
}
</style>