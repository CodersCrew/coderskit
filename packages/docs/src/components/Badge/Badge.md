# Badge



### Badge props

| Name      | Type                                                          | Default value | Description                                                            |
| --------- | ------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------- |
| children  | `ReactNode`                                                   | -             | Content wrapped by the badge.                                          |
| circle    | `boolean`                                                     | `false`       | Set to `true` if badge is attached to an element with shape of circle. |
| color     | Theme palette color                                           | `'primary'`   | Name of the color of badge's background.                                 |
| maxLength | `number`                                                      | `4`           | Maximal length of the content inside the badge.                        |
| position  | `'leftTop'` / `'rightTop'` / `'rightBottom'` / `'leftBottom'` | `'rightTop'`  | Position of the badge in relation to wrapped item.                     |
| value     | `number` / `string` / `Icon`                                  | -             | Content displayed inside the badge.                                     |

You can also provide all of the properties that can be provided to the native `<div>` element.
