# message

<!-- STORY -->

`message` is a function that allows you to display floating messages around your application.

### Children (first parameter)

You can provide any valid `ReactNode` as the children property.

### Configuration object (second parameter)

| Name     | Type                                                           | Default value | Description                                                                     |
| -------- | -------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------- |
| duration | `number`                                                       | `3000`        | Duration of the message displaying (in miliseconds).                            |
| variant  | `'contained'` / `'outlined'`                                   | `'outlined'`  | Layout of the message.                                                          |
| kind     | `'default'` / `'info'` / `'success'` / `'warning'` / `'error'` | `'default'`   | Determines the color of the notification and icon displayed next to its content |


