<template>
  <div class="badge-container" :class="priority">
    {{ props.tag }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  tag: string;
  priority: string;
  description: string;
}>();
</script>

<style lang="scss" scoped>
.badge-container {
  display: inline-block;
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
  line-height: 1;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 9999px;
  text-transform: uppercase;
  &:hover {
    box-shadow: 1px 1px 4px #141612;
  }
  &.primary {
    background-color: #0b55bc;
  }

  &.stale {
    background-color: #8a8a8a;
  }

  &.secondary {
    background-color: #6c757d;
  }

  &.danger {
    background-color: #dc3545;
  }
}
</style>
