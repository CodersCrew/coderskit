# Dialog

<!-- STORY -->

Accessible modal dialog component. It uses [react-modal](http://reactcommunity.org/react-modal/) under the hood.

### Dialog props

| Name                        | Type                | Default value         | Description                                                                                                                              |
| --------------------------- | ------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| aria                        | `object`            | -                     | Aria attributes.                                                                                                              |
| ariaHideApp                 | `boolean`           | `true`                | Indicate if the appElement should be hidden.                                                                                             |
| className                   | `string`            | -                     | className to be applied to the portal. You can use it to style overlay (`.ck-dialog__overlay`) and dialog window (`.ck-dialog__window`). |
| closeTimeoutMS              | `number`            | `0`                   | Indicate the milliseconds to wait before closing the dialog.                                                                             |
| contentLabel                | `string`            | -                     | String indicating how the content container should be announced to screenreaders.                                                        |
| contentRef                  | `function`          | -                     | Content ref callback.                                                                                                                    |
| data                        | `object`            | -                     | Data attributes.                                                                                                              |
| isOpen                      | `boolean`           | `false`               | Describe if the dialog should be shown or not.                                                                                           |
| onAfterOpen                 | `() => void`        | -                     | Function that will be run after the dialog has opened.                                                                                   |
| onRequestClose              | `(e) => void`       | -                     | Function that will be run when the dialog is requested to be closed (either by clicking on overlay or pressing ESC).                     |
| overlayRef                  | `function`          | -                     | Overlay ref callback.                                                                                                                    |
| parentSelector              | `() => HTMLElement` | `() => document.body` | Function that will be called to get the parent element that the modal will be attached to.                                               |
| role                        | `string`            | `'dialog'`            | Indicate the role of the modal, allowing the 'dialog' role to be applied if desired.                                                     |
| shouldCloseOnEsc            | `boolean`           | `true`                | Indicate if pressing the esc key should close the modal,                                                                                 |
| shouldCloseOnOverlayClick   | `boolean`           | `true`                | Indicate if clicking on the overlay should close the modal.                                                                              |
| shouldFocusAfterRender      | `boolean`           | `true`                | Indicate if the modal should be focused after render.                                                                                    |
| shouldReturnFocusAfterClose | `boolean`           | `true`                | Indicate if the modal should restore focus to the element that had focus prior to its display.                                           |
| style                       | `object`            | -                     | Object indicating styles to be used for the modal. It has two keys, `overlay` and `content`.                                             |

### Dialog.Header props

Component accepts all of the properties that can be provided to the native `<div>` element.

### Dialog.Content props

Component accepts all of the properties that can be provided to the native `<div>` element.

### Dialog.Footer props

Component accepts all of the properties that can be provided to the native `<div>` element.

