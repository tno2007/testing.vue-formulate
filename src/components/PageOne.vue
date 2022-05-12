<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from "@vue/composition-api";
import { useAppStore } from "../stores/appStore";
import logicalDataModel from "../data/logical-data-model.json";

export default defineComponent({
  name: "PersonalDetails",
  components: {},
  props: {},
  setup(props, context) {
    const store = useAppStore();

    const formRef: any = ref(null);

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    onMounted(() => {
      store.logicalDataModel = logicalDataModel;
    });

    return { formRef, store, handleSubmit };
  },
});
</script>

<template>
  <FormulateForm
    v-model="store.logicalDataModel"
    @submit="handleSubmit"
    ref="formRef"
  >
    <FormulateInput type="group" name="PrimaryApplicant">
      <FormulateInput
        type="select"
        name="PreferredTitle"
        label="Title:"
        :validation="[['required']]"
      />
      <FormulateInput
        type="text"
        name="FirstName"
        label="First Name:"
        :validation="[['required']]"
      />
      <FormulateInput
        type="yearmonthday"
        name="DateOfBirth"
        label="Date of birth"
        format="date"
      />
      <FormulateInput
        type="yearmonthday"
        name="DateOfBirthAlt"
        label="Date of birth"
        :validation="[['required']]"
      />
    </FormulateInput>
  </FormulateForm>
</template>
