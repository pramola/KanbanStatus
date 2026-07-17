<template>
  <div
    class="card-container"
    :key="task.id"
    :data-task-id="task.id"
    :style="cardStyles"
    draggable="true"
    @dragstart="startingToDrag"
    @dragend="(evt) => stopDragging(evt, task)"
  >
    <div class="tags">
      <div v-for="taskTag in task.tags" :key="taskTag.id">
        <BadgeView :tag="taskTag.tag" :priority="taskTag.priority" :description="taskTag.description" />
      </div>
    </div>
    <span>{{ task.heading }}</span>
    <p :title="task.description">{{ task.description }}</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, defineOptions } from "vue";
import BadgeView from "@/components/BadgeView.vue";
const emit = defineEmits(["card-dragstart", "card-dragend"]);
defineOptions({
  name: "card-view"
});

const props = defineProps<{
  task: {
    id: string;
    heading: string;
    description: string;
    tags: Array<any>;
  };
  completion: number;
}>();

const task = computed(() => props.task);
const percentComplete = computed(() => {
  const value = Number(props.completion) * 100;
  return Math.max(0, Math.min(100, value));
});
const cardStyles = computed(() => ({
  "--pct": `${percentComplete.value}`
}));
//make the card-container draggable and add a dragstart event listener
let startingToDrag = (event: DragEvent) => {
  const payload = JSON.stringify(task.value);
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    dataTransfer.setData("text/plain", payload);
    dataTransfer.effectAllowed = "move";
    dataTransfer.dropEffect = "move";
  }

  const element = event.currentTarget as HTMLElement | null;
  if (element) {
    element.style.opacity = "0.3";
  }

  const preview = createDragPreview(event);
  if (preview && event.dataTransfer) {
    event.dataTransfer.setDragImage(preview, 20, 20);
  }
  emit("card-dragstart", task);
  console.log("emmited card-dragstart");
};

const stopDragging = (event: DragEvent, task: any) => {
  const element = event.currentTarget as HTMLElement | null;
  if (element) {
    element.style.opacity = "1";
  }
  emit("card-dragend", task);
};

const createDragPreview = (event: DragEvent): HTMLElement | null => {
  const element = event.currentTarget as HTMLElement | null;
  if (!element) {
    return null;
  }

  const preview = element.cloneNode(true) as HTMLElement;
  const styles = window.getComputedStyle(element);

  preview.style.position = "absolute";
  preview.style.top = "-9999px";
  preview.style.left = "-9999px";
  preview.style.margin = "0";
  preview.style.width = `${element.offsetWidth}px`;
  preview.style.boxSizing = "border-box";
  preview.style.pointerEvents = "none";
  preview.style.opacity = "1";
  preview.style.transform = "none";
  preview.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
  preview.style.backgroundColor = styles.backgroundColor;
  preview.style.borderRadius = styles.borderRadius;
  preview.style.border = styles.border;

  document.body.appendChild(preview);

  setTimeout(() => {
    if (preview.parentElement) {
      preview.parentElement.removeChild(preview);
    }
  }, 0);

  return preview;
};
</script>
<style lang="scss" scoped>
.card-container {
  user-select: none;
  cursor: pointer;
  width: 100%;
  padding: 1em;
  background-color: #ffffff;
  border: 1px solid #e0e6ed;
  border-radius: 4px;
  height: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  gap: 10px;
  flex-direction: column;
  white-space: nowrap;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-left: 4px solid;
  border-left-color: hsl(calc(120 * var(--pct) / 100), 80%, 45%);
  .tags {
    display: flex;
    gap: 8px;
    height: 15px;
  }
  .divider-horizontal {
    border: 1px solid grey;
    margin: 5px 5px 5px 5px;
  }
  span {
    display: block;
    font-family: "Inter", system-ui, sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #1f2937;
    line-height: 1.2;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "Inter", system-ui, sans-serif;
    font-size: 14px;
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
  }
}
</style>
