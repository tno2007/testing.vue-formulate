<!--

# what we know

Setting an item to [] does not make it empty.

Eg.

```
data.model.Partner[0].AdditionalPassportsX = [];
set(data.model.Partner[0], "AdditionalPassportsX", []);

```
These only worked in 
    "@braid/vue-formulate": "2.4.3",
  
Not the latest version(s)

-->

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  nextTick,
  computed,
} from "@vue/composition-api";
import { collections } from "../../data/collections";
import { IModel } from "@/common/typings/explore";
import { getObjectValue as g } from "@/common/composables/useFormHelper";

export default defineComponent({
  name: "Testing",
  components: {},
  props: {
    modelProp: {
      type: Object as PropType<IModel>,
      required: true,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const formRef: any = ref(null);
    const ace: any = ref(null);

    const data = reactive({
      model: {} as any,
    });

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    const isObjectEmpty = (obj: any) => {
      for (var i in obj) return false;
      return true;
    };

    const isThatThingEmpty = computed(() => {
      return isObjectEmpty(data.model.Partner[0].AdditionalPassportsX[0]);
    });

    const is = (model: any) => {
      const a = g(model, `Theranos[0]`);
      console.log(`a`, a);

      return a && a.length;
    };

    onMounted(async () => {
      await nextTick();
      data.model = props.modelProp;
    });

    /**
     * i can't use watch() because i dont have access to Partner[0] yet
     */

    return {
      ace,
      formRef,
      collections,
      data,
      handleSubmit,
      g,
      isObjectEmpty,
      isThatThingEmpty,
      is,
    };
  },
});
</script>

<template>
  <div>
    <FormulateForm v-model="data.model" @submit="handleSubmit" ref="formRef">
      <!-- Group test -->
      <FormulateInput
        type="group"
        name="PrimaryApplicant"
        label="PrimaryApplicant"
      >
        <FormulateInput
          type="customgroup"
          name="AdditionalPassports"
          label="AdditionalPassports"
          :repeatable="true"
        >
          <template #repeatable="{ model, index, removeItem }">
            <div class="formulate-input-group-repeatable">
              <a
                role="button"
                class="formulate-input-group-repeatable-remove"
                @click.prevent="removeItem"
                >Remove</a
              >
              <FormulateInput
                type="text"
                name="Country"
                label="Country:"
                :validation="[['required']]"
              />
            </div>
          </template>
        </FormulateInput>
      </FormulateInput>
      <!-- / Group test -->

      <!-- Group test -->
      <FormulateInput type="group" name="Partner" label="Partner">
        <FormulateInput
          type="group"
          name="AdditionalPassports"
          label="AdditionalPassports"
          #default="{ model, index }"
          :repeatable="true"
        >
          <FormulateInput
            type="text"
            name="Country"
            label="Country:"
            :validation="[['required']]"
          />
        </FormulateInput>
      </FormulateInput>
      <!-- / Group test -->
    </FormulateForm>
    <pre>{{ data.model.Partner }}</pre>
  </div>
</template>
