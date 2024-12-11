<script setup></script>

<template>
  <a-config-provider
    componentSize="middle"
    :dropdownMatchSelectWidth="true"
    :theme="{
      token: {
        colorPrimary: '#666',
      },
    }"
    :input="{
      autocomplete: 'off',
    }"
  >
    <a-app>
      <router-view></router-view>
    </a-app>
  </a-config-provider>
</template>

<style scoped></style>
