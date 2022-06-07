# testing.vue-formulate

## Work to do

- ~~Make json schema FormulateForm give off the 'submit' event~~
  - The form fields needs to be empty, not pre-populated
- Implement the vanilla bootstrap based tab interface and make it easy to switch between different tabs
- make customgroup repeatable work in json schema, especially since it require a template
  - implement testing.vue page in json schema

## Tips

---

- Always use context.root.$nextTick() in mounted.
- Always await context.root.$nextTick().

```js
onMounted(async () => {
  await context.root.$nextTick();

  //console.log("$nextTick done");
  //data.model = props.modelProp;
});
```

- Always use a default [] empty array for repeatables. This makes sure to initialize it to empty

```html
<FormulateInput
    type="group"
    name="AdditionalPassports"
    label="Additional passports:"
    :repeatable="true"
    #default="{ index }"
    add-label="+ Add additional passport"
    :value="[]"
```
