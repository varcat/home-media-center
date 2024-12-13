<script setup></script>

<template>
  <a-config-provider
    componentSize="middle"
    :dropdownMatchSelectWidth="true"
    :theme="{
      token: {
        colorPrimary: 'rgb(154,97,188)',
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
