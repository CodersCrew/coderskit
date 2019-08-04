# Tooltip

<!-- STORY -->

### Tooltip props

| Name                 | Type                          | Default value | Description                                                                                            |
| -------------------- | ----------------------------- | ------------- | ------------------------------------------------------------------------------------------------------ |
| afterVisibleChange   | `function`                    | -             | Function called after tolltip visibility changes.                                                      |
| children             | `ReactElement`                | -             | Element wrapped by the tooltip                                                                         |
| defaultVisible       | `boolean`                     | -             | Indicates if the tooltip is visible after the first mount.                                             |
| destroyTooltipOnHide | `boolean`                     | `false`       | Destroys tooltip when its hidden.                                                                      |
| id                   | `string`                      | -             | Id attached to the tooltip content. Can be used with aria-describedby to achieve screenreader support. |
| mouseEnterDelay      | `number`                      | `0`           | Delay time to show tooltip when a trigger activates.                                                   |
| mouseLeaveDelay      | `number`                      | `0.1`         | Delay time to hide tooltip when a trigger deactivates.                                                 |
| onPopupAlign         | `function`                    | -             | Function called when popup node is aligned.                                                            |
| onVisibleChange      | `function`                    | -             | Function called when tolltip visibility changes.                                                       |
| overlay              | `ReactNode`                   | -             | Content of the tooltip.                                                                                |
| placement            | `Placement`                   | -             | Position of the tooltip related to its wrapped element.                                                |
| trigger              | `('hover'|'focus'|'click')[]` | `['hover']`   | Determines which actions cause tooltip shown.                                                          |
| visible              | `boolean`                     | -             | Indicates if the tooltip is visible.                                                                   |

Placement: `'right'`, `'bottom'`, `'left'`, `'topLeft'`, `'topRight'`, `'bottomLeft'`, `'bottomRight'`, `'leftTop'`, `'leftBottom'`, `'rightTop'`, `'rightBottom'`. 

