import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
import { Select } from 'coderskit';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const statuses = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  error: 'error',
  loading: 'loading',
};

const selectSection = 'Select';
const messagesSection = 'Messages';
const fieldSection = 'Field';

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .add(
    'Select',
    () => {
      const props = {
        status: select('status', statuses, 'default', selectSection) as keyof typeof statuses,
        defaultInputValue: text('defaultInputValue', '', selectSection),
        defaultMenuIsOpen: boolean('defaultMenuIsOpen', false, selectSection),
        autoFocus: boolean('autoFocus', false, selectSection),
        backspaceRemovesValue: boolean('backspaceRemovesValue', true, selectSection),
        closeMenuOnSelect: boolean('closeMenuOnSelect', true, selectSection),
        closeMenuOnScroll: boolean('closeMenuOnScroll', false, selectSection),
        controlShouldRenderValue: boolean('controlShouldRenderValue', true, selectSection),
        escapeClearsValue: boolean('escapeClearsValue', false, selectSection),
        hideSelectedOptions: boolean('hideSelectedOptions', false, selectSection),
        isClearable: boolean('isClearable', true, selectSection),
        isDisabled: boolean('isDisabled', false, selectSection),
        isMulti: boolean('isMulti', false, selectSection),
        isSearchable: boolean('isSearchable', true, selectSection),
        menuShouldBlockScroll: boolean('menuShouldBlockScroll', false, selectSection),
        name: text('name', 'select-name', selectSection),
        placeholder: text('placeholder', 'Select something', selectSection),
        tabSelectsValue: boolean('tabSelectsValue', true, selectSection),
        options,
      };

      const messages = {
        noOptionsMessage: text('noOptionsMessage', 'No options available', messagesSection),
        loadingMessage: text('loadingMessage', 'Loading in progress...', messagesSection),
      };

      const fieldProps = {
        label: text('label', 'Label', fieldSection),
        error: text('error', '', fieldSection),
        help: text('help', 'Help message', fieldSection),
      };

      const actions = {
        onChange: action('onChange'),
        onBlur: action('onBlur'),
        onFocus: action('onFocus'),
        onInputChange: action('onInputChange'),
        onMenuOpen: action('onMenuOpen'),
        onMenuClose: action('onMenuClose'),
      };

      return (
        <Select.Field {...fieldProps}>
          <Select
            {...props}
            {...actions}
            noOptionsMessage={() => {
              return messages.noOptionsMessage;
            }}
            loadingMessage={() => {
              return messages.loadingMessage;
            }}
          />
        </Select.Field>
      );
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=24%3A28',
      },
    },
  );
