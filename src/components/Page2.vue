<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
} from "@vue/composition-api";
import { collections } from "../data/collections";

export type IModel = {
  [key: string]: any;
};

export default defineComponent({
  name: "PageTwo",
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

    const data = reactive({
      // dont populate data from props here,
      // do it in mounted!
      model: {} as any,
    });

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    const getJsonValue = (o: any, s: string) => {
      s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
      s = s.replace(/^\./, ""); // strip a leading dot
      var a = s.split(".");
      for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (o === Object(o) && k in o) {
          o = o[k];
        } else {
          return;
        }
      }
      return o;
    };

    const seek = (obj: any, location: string) => {
      var keys = location.split(".");
      keys.forEach((element) => {});
    };

    const m = computed(() => {
      //return get(data.model, "PrimaryApplicant[0].AdditionalPassports");
      //return data.model.PrimaryApplicant[0].AdditionalPassports;
      return getJsonValue(
        data.model,
        "PrimaryApplicant[0].AdditionalPassports"
      );
    });

    onMounted(async () => {
      // do i need nextTick here?
      // YES. otherwise the form is not rendered with data

      // do i need to await nextTick?
      // BY ALL MEANS. otherwise the form is not rendered with data, for some reason
      await context.root.$nextTick();

      // Now the data ALWAYS loads correctly

      //nextTick is used before the browser RENDERS the data to the DOM
      console.log("$nextTick done");
      data.model = props.modelProp;
    });

    return { formRef, collections, data, handleSubmit, m };
  },
});
</script>

<template>
  <div>
    <FormulateForm v-model="data.model" @submit="handleSubmit" ref="formRef">
      <FormulateInput type="group" name="PrimaryApplicant">
        <FormulateInput
          type="select"
          name="PreferredTitle"
          label="Title:"
          :validation="[['required']]"
          :options="collections.Titles"
          placeholder="-- Select --"
        />
        <FormulateInput
          type="text"
          name="FirstName"
          label="First Name:"
          :validation="[['required']]"
        />

        <FormulateInput
          type="group"
          name="AdditionalPassports"
          label="Additional passports:"
          :repeatable="true"
          #default="{ index }"
          add-label="+ Add additional passport"
        >
          <p>Additional passport {{ index + 1 }}</p>
          <FormulateInput
            type="select"
            name="PassportCountry"
            label="Passport country"
            :options="collections.Countries"
            placeholder="-- Select --"
            :validation="[['required']]"
          />
        </FormulateInput>
      </FormulateInput>
    </FormulateForm>
    <pre>{{ m }}</pre>
  </div>
</template>
