import React, { Component, InputHTMLAttributes, ReactNode, SyntheticEvent, ImgHTMLAttributes, useState } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';

export interface UploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  width?: string | number;
  height?: string | number;
  children?: ReactNode;
  onChange?: (e: { name: string; files: File[] }) => void;
}

type UploadBaseProps = Omit<UploadProps, 'onChange'>;

const fileListToArray = (list: any) => {
  const array = [];

  for (var i = 0; i < list.length; i++) {
    array.push(list.item(i));
  }

  return array;
};

const UploadBase = styled.div<UploadBaseProps>(props => {
  const { theme, width, height } = props;
  const { colors, radii } = theme;

  return {
    position: 'relative',
    width,
    height,
    padding: 16,

    '.ck-upload-input': {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer',

      '&:hover + .ck-upload-dropzone': {
        backgroundColor: colors.itemHover,
      },
    },

    '.ck-upload-dropzone': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px dashed ${colors.border}`,
      borderRadius: radii.small,
      color: colors.fontRegular,
    },
  };
});

export class Upload extends Component<UploadProps> {
  static Preview: (props: UploadPreviewProps) => JSX.Element;
  static defaultProps = {
    width: 160,
    height: 160,
  };

  state = { hightlight: false };
  fileInputRef = React.createRef<HTMLInputElement>();

  onChange = (e: any) => {
    if (this.props.disabled) return;

    const files = e.target.files;

    if (this.props.onChange) {
      const array = fileListToArray(files);
      this.props.onChange({ name: this.props.name || '', files: array });
    }
  };

  onDragOver = (e: SyntheticEvent) => {
    e.preventDefault();
    if (this.props.disabled) return;
    this.setState({ hightlight: true });
  };

  onDragLeave = () => {
    this.setState({ hightlight: false });
  };

  onDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.onChange(e);
    this.setState({ hightlight: false });
  };

  render() {
    const { width, height, className, children, ...props } = this.props;
    const containerProps = { width, height };

    return (
      <UploadBase className={classnames(className, 'ck-upload')} {...containerProps}>
        <input
          {...props}
          className="ck-upload-input"
          ref={this.fileInputRef}
          type="file"
          onDrop={this.onDrop}
          onChange={this.onChange}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
        />
        <div className="ck-upload-dropzone">{children}</div>
      </UploadBase>
    );
  }
}

interface PreviewBaseProps extends ImgHTMLAttributes<HTMLImageElement> {
  imageSize?: 'fit' | 'cover';
}

export interface UploadPreviewProps extends Omit<PreviewBaseProps, 'src'> {
  src: string | File;
}

const getBase64 = (file: any, callback: any) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    callback(reader.result);
  };
  reader.onerror = function(error) {
    console.error('Error: ', error);
  };
};

const PreviewBase = styled.img<PreviewBaseProps>(props => {
  const { theme, imageSize, src } = props;
  const { radii } = theme;

  return {
    position: 'absolute',
    top: 4,
    left: 4,
    display: src ? 'block' : 'none',
    width: 'calc(100% - 8px)',
    height: 'calc(100% - 8px)',
    objectFit: imageSize === 'cover' ? 'cover' : 'contain',
    borderRadius: radii.small,
  };
});

const Preview = (props: UploadPreviewProps) => {
  const [src, setSrc] = useState(typeof props.src === 'string' ? props.src : '');

  if (typeof props.src !== 'string' && typeof props.src.name === 'string') {
    getBase64(props.src, (imageString: string) => {
      setSrc(imageString);
    });
  }

  return <PreviewBase {...props} src={src} />;
};

Preview.defaultProps = {
  imageSize: 'cover',
};

Upload.Preview = Preview;
