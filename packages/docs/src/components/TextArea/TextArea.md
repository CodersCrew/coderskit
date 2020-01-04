# TextArea



### TextArea props

| Name       | Type                                                | Default value | Description                                |
| ---------- | --------------------------------------------------- | ------------- | ------------------------------------------ |
| dimensions | `'small'` / `'default'` / `'large'`                 | `'default'`   | Determines font size in the text area.     |
| resize     | `'none'` / `'both'` / `'horizontal'` / `'vertical'` | `'none'`      | Specifies axies of the text area resizing. |

You can also provide all of the properties that can be provided to the native `<textarea>` element.

### Input.Status props

Wraps `TextArea` element and enhences it with the visual status representation (by an icon and border color).

| Name   | Type                                                              | Default value | Description                                              |
| ------ | ----------------------------------------------------------------- | ------------- | -------------------------------------------------------- |
| status | `'default'` / `'loading'` / `'success'` / `'warning'` / `'error'` | `'default'`   | Shows visual representation of the current input status. |
| noIcon | `boolean`                                                         | `false`       | Determines if status icon is displayed.                  |

You can also provide all of the properties that can be provided to the native `<div>` element.

### Input.Field props

Wrapper for other input elements. Accepts all of the properties that can be provided to the native `<div>` element.
