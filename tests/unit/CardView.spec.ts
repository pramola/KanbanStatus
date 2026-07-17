import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";
import CardView from "@/components/CardView.vue";

describe("CardView", () => {
  it("allows the native dragstart event to proceed", () => {
    const wrapper = shallowMount(CardView, {
      props: {
        task: {
          id: "task-1",
          heading: "Task",
          description: "Description",
          tags: []
        },
        completion: 0.5
      },
      global: {
        stubs: {
          BadgeView: true
        }
      }
    });

    const card = wrapper.get(".card-container");
    const event = new Event("dragstart", { bubbles: true, cancelable: true });

    card.element.dispatchEvent(event);

    expect(event.defaultPrevented).to.equal(false);
  });
});
