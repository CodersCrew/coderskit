# LinearProgress

<!-- STORY -->

### LinearProgress props

| Name        | Type                                     | Default value | Description                                                                                |
| ----------- | ---------------------------------------- | ------------- | ------------------------------------------------------------------------------------------ |
| size        | `number`                                 | `8`           | Height of the progress bar.                                                                |
| percent     | `number` / `number[]`                    | `0`           | Percent value represented by the progress bar. You can provide an array for multiple bars. |
| strokeColor | Theme palette color (single or an array) | `'primary'`   | Color of the progress bar. You can provide an array if you have multiple bars.             |
| trailColor  | Theme palette color                      | `'border'`    | Color of the trail behind the porgress bar.                                                |

You can also provide all of the properties that can be provided to the native `<div>` element.
