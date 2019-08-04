# Input

<!-- STORY -->

### Input props

| Name       | Type         | Default value | Description                                       |
| ---------- | ------------ | ------------- | ------------------------------------------------- |
| dimensions | `Dimensions` | `'default'`   | Determines height of the input and its font size. |

You can also provide all of the properties that can be provided to the native `<input>` element.

*Dimensions:* `'small'` / `'default'` / `'large'`

### Input.Status props

Wraps `Input` element and enhences it with the visual status representation (by an icon and border color).

| Name   | Type      | Default value | Description                                              |
| ------ | --------- | ------------- | -------------------------------------------------------- |
| status | `Status`  | `'default'`   | Shows visual representation of the current input status. |
| noIcon | `boolean` | `false`       | Determines if status icon is displayed.                  |

You can also provide all of the properties that can be provided to the native `<div>` element.

*Status:* `'default'` / `'loading'` / `'success'` / `'warning'` / `'error'`

### Input.Field props

Wrapper for other input elements. Accepts all of the properties that can be provided to the native `<div>` element.
