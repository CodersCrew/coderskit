# Upload



### Upload props

| Name     | Type                | Default value | Description                      |
| -------- | ------------------- | ------------- | -------------------------------- |
| height   | `string` / `number` | `160`         | Height of the upload container.  |
| width    | `string` / `number` | `160`         | Width of the upload container.   |
| children | `ReactNode`         | -             | Content of the upload container. |

You can also provide all of the properties that can be provided to the native `<input type="file">` element.

### Upload.Preview props

| Name      | Type                | Default value | Description                                         |
| --------- | ------------------- | ------------- | --------------------------------------------------- |
| imageSize | `'fit'` / `'cover'` | `'cover'`     | Spefifies if the image fills or fits its container. |
| src       | `string` / `File`   | -             | Source of the image to show in preview.             |

You can also provide all of the properties that can be provided to the native `<img>` element.
