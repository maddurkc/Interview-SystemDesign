import useCopyToClipboard from './useCopyToClipboard';

const MyComponent = () => {
  const [copiedText, copy] = useCopyToClipboard();

  return (
    <div>
      <button onClick={() => copy('YOU HAVE COPIED THIS!!')}>Copy Text</button>
      {copiedText && <span>Copied: {copiedText}</span>}
    </div>
  );
};

export default MyComponent;
