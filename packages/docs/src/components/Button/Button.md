# Button

<!-- STORY -->

### Button props

| Name    | Type                                    | Default value | Description                                                                    |
| ------- | --------------------------------------- | ------------- | ------------------------------------------------------------------------------ |
| as      | `ElementType` / `string`                | `'button'`    | Type of the element that will be rendered as a button                          |
| size    | `'small'` / `'default'` / `'large'`     | `'default'`   | Size of the button                                                             |
| color   | Theme palette color                     | `'primary'`   | Name of the color of button's background or text (depends on the button variant) |
| variant | `'contained'` / `'outlined'` / `'text'` | `'contained'` | Layout of the button                                                           |

You can also provide all of the properties that can be provided to the native `<button>` element (or another element provided in `as` property).
