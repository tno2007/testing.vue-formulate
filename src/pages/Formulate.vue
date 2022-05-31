<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from "@vue/composition-api";
import { useAppStore } from "../stores/appStore";
//import logicalDataModel from "../data/logical-data-model.json";
import { logicalDataModel } from "../data/logical-data-model";
import Page1 from "../components/Page1.vue";
import Page2 from "../components/Page2.vue";
import Page3 from "../components/Page3.vue";
import { get, method, set } from "lodash";

export default defineComponent({
  name: "PersonalDetails",
  components: {
    Page1,
    Page2,
    Page3,
  },
  props: {},
  setup(props, context) {
    const store = useAppStore();

    const formRef: any = ref(null);

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    const setObjectsAsArrays = (obj: object, keys: string[]) => {
      keys.forEach((k, index) => {
        const value = get(obj, k) ?? {};
        set(obj, k, [value]);
      });
      return obj;
    };

    const data = reactive({});

    const nextClick = async () => {
      const appRef: any = context.refs.appRef;
      const valid = await appRef.$refs.formRef.formSubmitted();

      if (valid) {
        console.log("valid!");
      } else {
        console.log("NOT valid!");
      }
    };

    onMounted(() => {
      logicalDataModel.PrimaryApplicant.AdditionalPassports = [];

      const structuredResponse = setObjectsAsArrays(logicalDataModel, [
        "Explore",
        "PrimaryApplicant",
        "Partner",
      ]);

      store.logicalDataModel = structuredResponse;
    });

    return { formRef, store, handleSubmit, nextClick };
  },
});
</script>

<template>
  <div>
    <component
      is="Page3"
      ref="appRef"
      @handleSubmit="handleSubmit"
      :modelProp="store.logicalDataModel"
    >
    </component>
    <button @click="nextClick" class="col btn btn-secondary ml-2">
      Submit
    </button>
  </div>
</template>

<style lang="scss">
[data-classification="text"][data-is-showing-errors="true"],
[data-classification="select"][data-is-showing-errors="true"] {
  .formulate-input-wrapper {
    .formulate-input-element--text,
    .formulate-input-element--number {
      input {
        border: 1px solid red;
        background-color: rgba(255, 0, 0, 0.15);
      }
    }

    .formulate-input-element--select,
    .formulate-input-element--yearmonthday {
      select {
        border: 1px solid red;
        background-color: rgba(255, 0, 0, 0.15);
      }
    }
  }
}
</style>
