# Menu

<!-- STORY -->

### Menu props

| Name     | Type                     | Default value | Description                                              |
| -------- | ------------------------ | ------------- | -------------------------------------------------------- |
| as       | `ElementType` / `string` | `'div'`       | Type of the element that will be rendered as the menu.   |
| children | `ReactNode`              | -             | Content displayed inside the menu.                       |
| shape    | `'circle'` / `'square'`  | `'circle'`    | Shape of the menu's container.                           |
| size     | `number`                 | `32`          | Width and height of the menu's container.                |
| src      | `string`                 | `''`          | Source of the menu's image.                              |

You can also provide all of the properties that can be provided to the native `<div>` element (or another element provided in `as` property).
