# Radio



### Radio props

Radio accepts all of the properties that can be provided to the native `<input type="radio">` element.

### Radio.Label props

| Name     | Type      | Default value | Description                    |
| -------- | --------- | ------------- | ------------------------------ |
| disabled | `boolean` | `false`       | Whether the radio is disabled. |

You can also provide all of the properties that can be provided to the native `<label>` element.

### Radio.Group props

| Name         | Type                          | Default value | Description                                      |
| ------------ | ----------------------------- | ------------- | ------------------------------------------------ |
| *name*       | `string`                      | `false`       | Name of the form field.                          |
| onChange     | `(e) => void`                 | -             | Function invoked when selected radio change.     |
| children     | `Radio.Label[]`               | -             | Radio elements included in the particular group. |
| layout       | `'vertical'` / `'horizontal'` | `'vertical'`  | Axis of the radios alignment.                    |
| spaceBetween | `number`                      | `12`          | Space between radio elements.                    |

You can also provide all of the properties that can be provided to the native `<div>` element.

