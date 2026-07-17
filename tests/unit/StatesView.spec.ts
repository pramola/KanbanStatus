import { mount } from "@vue/test-utils";
import { expect } from "chai";
import StatesView from "@/views/StatesView.vue";

describe("StatesView", () => {
  it("highlights the target column when a card is dragged over it", () => {
    const wrapper = mount(StatesView, {
      global: {
        stubs: {
          CardView: true,
          "font-awesome-icon": true
        }
      }
    });

    const column = wrapper.find('[data-state-id="toStart"]');
    const event = new Event("dragover", { bubbles: true, cancelable: true });

    column.element.dispatchEvent(event);

    expect((wrapper.vm as any).isDragging).to.equal(true);
    expect((wrapper.vm as any).highlightedState.id).to.equal("toStart");
  });
});
