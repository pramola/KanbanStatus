<template>
  <div class="statesView" :class="{ dragging: isDragging }">
    <div
      v-for="(state, index) in states"
      :key="state.id"
      :class="{ highlightState: state.id == highlightedState.id }"
      :data-state-id="state.id"
      @contextmenu.prevent="(evt) => showActions(evt, state)"
      @dragover="
        (evt) => {
          console.log('dd');
          handleColumnDragOver(evt, state);
        }
      "
      @drop="
        (evt) => {
          handleColumnDrop(evt, state);
        }
      "
    >
      <div class="task-header">
        <h3 :title="state.tooltip">{{ state.msg }}</h3>
      </div>
      <div class="task-list">
        <template v-for="(task, i) in state.tasks" :key="task.id">
          <div v-if="i == dropIndex && state.id == highlightedState.id" class="drop-zone">Drop here</div>
          <CardView
            :task="task"
            :completion="index / states.length"
            @card-dragstart="
              (task) => {
                dragEnter(task, state.id);
              }
            "
            @card-dragend="(task) => cardDropped(state, task)"
          />
        </template>
        <div v-if="state.tasks.length == dropIndex && state.id == highlightedState.id" class="drop-zone">Drop here</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CardView from "@/components/CardView.vue";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
const states = ref([
  {
    id: "toStart",
    msg: "To Do",
    tooltip: "These tasks are planned",
    tasks: [
      {
        id: "uuid_43a",
        heading: "Design login page UI",
        description: "Create a wireframe for the login page",
        tags: [
          {
            id: "ux_tag",
            tag: "UX",
            priority: "danger",
            description: "UX To be finalised and should be Good"
          }
        ]
      },
      {
        id: "uuid_43b",
        heading: "Set up Vue project structure",
        description: "Initialize the Vue project with the desired directory structure",
        tags: []
      },
      {
        id: "uuid_43c",
        heading: "Create Kanban board layout (columns)",
        tags: [],
        description: "Design the layout for the Kanban board with columns for each task state"
      },
      {
        id: "uuid_43d",
        tags: [],
        heading: "Define task data model (TypeScript interfaces)",
        description: "Create TypeScript interfaces for the task data structure"
      },
      {
        tags: [],
        id: "uuid_43e",
        heading: "Install and configure Pinia store",
        description: "Set up Pinia for state management"
      },
      {
        tags: [],
        id: "uuid_43f",
        heading: "Add routing setup (Vue Router)",
        description: "Configure Vue Router for navigation between different views"
      },
      {
        tags: [],
        id: "uuid_440",
        heading: "Create reusable Button component",
        description: "Develop a reusable button component for consistent UI"
      },
      {
        tags: [],
        id: "uuid_441",
        heading: "Plan drag-and-drop behavior",
        description: "Design the drag-and-drop functionality for tasks"
      }
    ]
  },
  {
    id: "inProgress",
    msg: "In Progress",
    tooltip: "These tasks are currently being worked on",
    highlight: false,
    tasks: [
      {
        id: "uuid_442",
        heading: "Build task card component",
        description: "Create the UI component for displaying individual tasks"
      },
      {
        id: "uuid_4a3",
        heading: "Implement column rendering logic",
        description: "Develop the logic for rendering each column based on task states"
      },
      {
        id: "uuid_4b4",
        heading: "Connect Pinia store to UI",
        description: "Integrate the Pinia store with the Vue components"
      },
      {
        id: "uuid_44r5",
        heading: "Add basic styling for Kanban board",
        description: "Apply basic CSS styles to the Kanban board and its components"
      },
      {
        id: "uuid_44w6",
        heading: "Fetch dummy tasks from local file",
        description: "Retrieve dummy task data from a local JSON file"
      }
    ]
  },
  {
    id: "review",
    msg: "Review",
    tooltip: "These tasks are under review",
    tasks: [
      {
        id: "uuid_44x7",
        heading: "Validate task state transitions",
        description: "Ensure tasks move correctly between states"
      },
      {
        id: "uuid_44y8",
        heading: "Test drag-and-drop functionality",
        description: "Verify that tasks can be dragged and dropped between columns"
      },
      {
        id: "uuid_44z9",
        heading: "Check responsiveness on different screen sizes",
        description: "Ensure the UI is responsive and works well on various devices"
      },
      {
        id: "uuid_45a0",
        heading: "Review code for best practices",
        description: "Conduct a code review to ensure adherence to best practices"
      },
      {
        id: "uuid_45b1",
        heading: "Update documentation for components",
        description: "Document the components and their usage"
      }
    ]
  },
  {
    id: "done",
    msg: "Done",
    tooltip: "These tasks are completed",
    tasks: [
      {
        id: "uuid_45c2",
        heading: "Finalize Kanban board UI",
        description: "Complete the UI design for the Kanban board"
      },
      {
        id: "uuid_45d3",
        heading: "Implement task filtering and sorting",
        description: "Add functionality to filter and sort tasks"
      },
      {
        id: "uuid_45e4",
        heading: "Optimize performance for large task lists",
        description: "Improve performance when handling many tasks"
      },
      {
        id: "uuid_45f5",
        heading: "Conduct user testing and gather feedback",
        description: "Perform user testing and collect feedback for improvements"
      },
      {
        id: "uuid_45g6",
        heading: "Deploy application to production environment",
        description: "Deploy the application to a live production environment"
      }
    ]
  }
]);
const isDragging = ref(false);
const highlightedState = ref({
  id: ""
});
function cardDragged() {
  isDragging.value = true;
}
function cardDropped(parentState: any, task: any) {
  let taskId = task.id;
  let index = 0;
  parentState.tasks.map((task, indx) => task.id == taskId && (index = indx));
  parentState.tasks.splice(index, 1);
}
const dropIndex = ref(0);

function setHighlightedState(stateId: string) {
  highlightedState.value.id = stateId;
}

function dragEnter(task: any, stateId: any) {
  setTimeout(() => {
    cardDragged();
    setHighlightedState(stateId);
  }, 0);
}

function handleColumnDragOver(event: DragEvent, state: any) {
  event.preventDefault();
  setHighlightedState(state.id);
  setDropZone(event, state);
}

async function handleColumnDrop(event: DragEvent, state: any) {
  let data = event.dataTransfer?.getData("text/plain") as string;
  let cleanData = JSON.parse(data);
  let status: number = await updateTaskState();
  if (status < 300 && status >= 200) {
    state.tasks.splice(dropIndex.value, 0, cleanData);
    cleanUpDragging();
  }
}

async function updateTaskState() {
  // if (false) {
  //   return 400;
  // }
  return 200;
}

function showActions(event: MouseEvent, state: any) {
  return "";
}

function setDropZone(event: DragEvent, state: any) {
  let target: HTMLElement = event.target as HTMLElement;
  let card = target?.closest(".card-container") as HTMLElement;
  //when hovering it may be possible that hovered over dropzone or main container don't change the dropIndex
  if (card) {
    // 1. Get the bounding box of the hovered item
    const rect = card?.getBoundingClientRect();
    // 2. Calculate the vertical midpoint of the element
    const elementMidpoint = rect.top + rect.height / 2;

    // 3. Get the current cursor Y position relative to viewport
    const cursorY = event.clientY;

    // 4. Determine the drop zone position
    let taskId: string = card["dataset"].taskId as string;
    let index = 0;
    state.tasks.map((task, indx) => task.id == taskId && (index = indx));
    if (cursorY > elementMidpoint) {
      index = index + 1;
    }
    dropIndex.value = index;
  }
}

function cleanUpDragging() {
  dropIndex.value = 0;
  isDragging.value = false;
  highlightedState.value.id = "";
}
</script>

<style lang="scss" scoped>
.statesView {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  color: #1a202c;
  background-color: #f7fafc;
  & > div {
    width: 23%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
  }

  &.dragging {
    background-color: rgba(0, 0, 0, 0.4);
    transition: background-color 0.3s ease;
    .highlightState {
      background-color: rgba(255, 255, 255, 0.95) !important;
      opacity: 1;
      border: 2px solid #3182ce; /* Professional blue border */
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transform: scale(1.02);
      transition: all 0.2s ease;
      z-index: 10;
    }
    > div:not(.highlightState) {
      opacity: 0.1;
    }
  }
  .task-header {
    display: flex;
    align-items: center;
    h3 {
      flex: 1;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #2d3748;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    svg {
      transform: rotate(90deg);
      cursor: pointer;
    }
  }
  .task-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
    gap: 1rem;
    padding: 1rem 0;
  }

  .drop-zone {
    min-height: 90px;
    padding: 1rem;
    border-radius: 4px;
    border: 2px dashed #3182ce;
    background-color: rgba(49, 130, 206, 0.08);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1f2937;
    font-weight: 700;
    font-size: 0.95rem;
    transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
  }

  .drop-zone:hover {
    background-color: rgba(49, 130, 206, 0.12);
    transform: translateY(-1px);
  }
}
</style>
