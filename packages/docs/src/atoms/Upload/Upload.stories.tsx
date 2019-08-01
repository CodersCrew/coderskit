import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { text, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Upload } from 'coderskit';

const UploadField = (props: any) => {
  const [image, setImage] = useState('');
  const { children, actions, ...rest } = props;

  const onChange = ({ files }: any) => {
    console.log(files);
    setImage(files[0]);
    actions.onChange(files);
  };

  return (
    <Upload {...rest} onChange={onChange}>
      {children}
      <Upload.Preview src={image} />
    </Upload>
  );
};

storiesOf('Atoms', module)
  .addDecorator(withDesign)
  .add(
    'Upload',
    () => {
      const props = {
        children: text('children', 'Upload something'),
        width: number('width', 160),
        height: number('height', 160),
        multiple: boolean('multiple', false),
      };

      const actions = {
        onChange: action('onChange'),
      };

      return <UploadField actions={actions} {...props} />;
    },
    {
      design: {
        type: 'figma',
        url: 'https://www.figma.com/file/H3nYAU5AetzPWs04mL8Em5CY/CodersKit?node-id=551%3A32',
      },
    },
  );
