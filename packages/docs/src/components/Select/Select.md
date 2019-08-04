# Select

<!-- STORY -->

### Select props

| Name                     | Type                            | Default value | Description                                                                                                                 |
| ------------------------ | ------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| status                   | `Status`                        | `'default'`   | Shows visual representation of the current input status.                                                                    |
| aria-label               | `string`                        | -             | Aria label (for assistive tech).                                                                                            |
| aria-labelledby          | `string`                        | -             | HTML ID of an element that should be used as the label (for assistive tech).                                                |
| autoFocus                | `boolean`                       | -             | Focus the control when it is mounted.                                                                                       |
| backspaceRemovesValue    | `boolean`                       | `true`        | Remove the currently focused option when the user presses backspace.                                                        |
| blurInputOnSelect        | `boolean`                       | -             | Remove focus from the input when the user selects an option.                                                                |
| captureMenuScroll        | `boolean`                       | -             | When the user reaches the top/bottom of the menu, prevent scroll on the scroll-parent.                                      |
| className                | `string`                        | -             | Sets a className attribute on the outer component.                                                                          |
| closeMenuOnSelect        | `boolean`                       | `true`        | Close the select menu when the user selects an option.                                                                      |
| closeMenuOnScroll        | `boolean`                       | `false`       | If `true`, close the select menu when the user scrolls the document/body.                                                   |
| controlShouldRenderValue | `boolean`                       | `true`        | Whether the value of the select, e.g. SingleValue, should be displayed in the control.                                      |
| delimiter                | `string`                        | -             | Delimiter used to join multiple values into a single HTML Input value.                                                      |
| escapeClearsValue        | `boolean`                       | `false`       | Clear all values when the user presses escape AND the menu is closed.                                                       |
| filterOption             | `function`                      | -             | Custom method to filter whether an option should be displayed in the menu.                                                  |
| formatGroupLabel         | `function`                      | -             | Formats group labels in the menu as React components.                                                                       |
| formatOptionLabel        | `function`                      | -             | Formats option labels in the menu and control as React components.                                                          |
| getOptionLabel           | `function`                      | -             | Resolves option data to a string to be displayed as the label by components.                                                |
| getOptionValue           | `function`                      | -             | Resolves option data to a string to compare options and specify value attributes.                                           |
| hideSelectedOptions      | `boolean`                       | -             | Hide the selected option from the menu.                                                                                     |
| id                       | `string`                        | -             | The id to set on the SelectContainer component.                                                                             |
| inputValue               | `string`                        | -             | The value of the search input.                                                                                              |
| inputId                  | `string`                        | -             | The id of the search input.                                                                                                 |
| instanceId               | `string` / `number`             | -             | Define an id prefix for the select components e.g. {your-id}-value.                                                         |
| isClearable              | `boolean`                       | -             | Is the select value clearable.                                                                                              |
| isDisabled               | `boolean`                       | `false`       | Is the select disabled.                                                                                                     |
| isOptionDisabled         | `function`                      | -             | Override the built-in logic to detect whether an option is disabled.                                                        |
| isOptionSelected         | `function`                      | -             | Override the built-in logic to detect whether an option is selected.                                                        |
| isMulti                  | `boolean`                       | `false`       | Support multiple selected options.                                                                                          |
| isRtl                    | `boolean`                       | `false`       | Is the select direction right-to-left.                                                                                      |
| isSearchable             | `boolean`                       | `true`        | Whether to enable search functionality.                                                                                     |
| loadingMessage           | `function`                      | -             | Text to display when loading options.                                                                                       |
| minMenuHeight            | `number`                        | `140`         | Minimum height of the menu before flipping.                                                                                 |
| maxMenuHeight            | `number`                        | `300`         | Maximum height of the menu before scrolling.                                                                                |
| menuIsOpen               | `boolean`                       | `false`       | Whether the menu is open.                                                                                                   |
| menuPlacement            | `'auto'` / `'bottom'` / `'top'` | `'bottom'`    | Default placement of the menu in relation to the control. 'auto' will flip when there isn't enough space below the control. |
| menuPosition             | `'absolute'` / `'fixed'`        | `'absolute'`  | The CSS position value of the menu, when "fixed" extra layout management is required.                                       |
| menuPortalTarget         | `HTMLElement`                   | -             | Whether the menu should use a portal, and where it should attach.                                                           |
| menuShouldBlockScroll    | `boolean`                       | `false`       | Whether to block scroll events when the menu is open.                                                                       |
| menuShouldScrollIntoView | `boolean`                       | -             | Whether the menu should be scrolled into view when it opens.                                                                |
| name                     | `string`                        | -             | Name of the HTML Input.                                                                                                     |
| noOptionsMessage         | `function`                      | -             | Text to display when there are no options.                                                                                  |
| onBlur                   | `function`                      | -             | Handle blur events on the control.                                                                                          |
| onChange                 | `function`                      | -             | Handle change events on the select.                                                                                         |
| onFocus                  | `function`                      | -             | Handle focus events on the control.                                                                                         |
| onInputChange            | `function`                      | -             | Handle change events on the input.                                                                                          |
| onKeyDown                | `function`                      | -             | Handle key down events on the select.                                                                                       |
| onMenuClose              | `function`                      | -             | Handle the menu closing.                                                                                                    |
| onMenuScrollToTop        | `function`                      | -             | Fired when the user scrolls to the top of the menu.                                                                         |
| onMenuScrollToBottom     | `function`                      | -             | Fired when the user scrolls to the bottom of the menu.                                                                      |
| openMenuOnFocus          | `boolean`                       | `false`       | Allows control of whether the menu is opened when the Select is focused.                                                    |
| openMenuOnClick          | `boolean`                       | `true`        | Allows control of whether the menu is opened when the Select is clicked.                                                    |
| options                  | `Option[]`                      | `[]`          | Array of options that populate the select menu.                                                                             |
| pageSize                 | `number`                        | `5`           | Number of options to jump in menu when page{up                                                                              | down} keys are used. |
| placeholder              | `string`                        | `'Select...'` | Placeholder for the select value.                                                                                           |
| screenReaderStatus       | `function`                      | -             | Status to relay to screen readers.                                                                                          |
| styles                   | `object`                        | -             | Style modifier methods.                                                                                                     |
| tabIndex                 | `string`                        | `'0'`         | Sets the tabIndex attribute on the input.                                                                                   |
| tabSelectsValue          | `boolean`                       | `true`        | Select the currently focused option when the user presses tab.                                                              |
| value                    | `Value`                         | -             | The value of the select; reflected by the selected option.                                                                  |

**Status:** `'default'` / `'loading'` / `'success'` / `'warning'` / `'error'`

**Value:** `object` / `object[]` / `null` / `undefined`

**Option:** `{ label: string; value: string; data: any; }`


