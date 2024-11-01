import { useEffect, useRef, useState } from 'react';
import Script from './script';
import {
  CloudinaryInstance,
  UploadWidgetError,
  UploadWidgetInstance,
  UploadWidgetProps,
  UploadWidgetResults,
} from './upload-widget.type';

const UploadWidget = ({ children, onSuccess, onError }: UploadWidgetProps) => {
  const cloudinary = useRef<CloudinaryInstance>();
  const widget = useRef<UploadWidgetInstance>();

  const [isScriptLoading, setIsScriptLoading] = useState(true);

  const uploadOptions = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  };

  function handleOnLoad() {
    setIsScriptLoading(false);

    if (!cloudinary.current && typeof window !== 'undefined') {
      cloudinary.current = (window as any).cloudinary;
    }

    function onIdle() {
      if (!widget.current) {
        widget.current = createWidget();
      }
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);
  }

  function createWidget() {
    return cloudinary.current?.createUploadWidget(
      uploadOptions,
      (error: UploadWidgetError, result: UploadWidgetResults) => {
        if (error && typeof onError === 'function') {
          onError(error, widget.current);
        }

        if (result.event === 'success' && typeof onSuccess === 'function') {
          onSuccess(result, widget.current);
        }
      },
    );
  }

  function open() {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  useEffect(() => {
    return () => {
      widget.current?.destroy();
      widget.current = undefined;
      cloudinary.current = undefined;
    };
  }, []);

  return (
    <>
      {typeof children === 'function' && children({ cloudinary, widget, open })}
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        onLoad={handleOnLoad}
        onError={() => console.error(`Failed to load Cloudinary Upload Widget`)}
      />
    </>
  );
};

export default UploadWidget;
