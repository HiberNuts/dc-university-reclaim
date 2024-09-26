export const mapRichTextNodesToSchema = (nodes) => {
  const result = [];
  let codeBlock = '';

  nodes.forEach(node => {
    if (node.type === 'list-item') {
      node.children.forEach(child => {
        if (child.code) {
          codeBlock += (codeBlock ? '\n' : '') + child.text;
        } else if (child.type === 'link') {

          if (codeBlock) {
            result.push({ type: 'code', content: codeBlock });
            codeBlock = '';
          }

          result.push({ type: 'link', content: child.children[0].text, url: child.url });
        } else if (child.type === 'text' && child.text.trim() !== '') {

          if (codeBlock) {
            result.push({ type: 'code', content: codeBlock });
            codeBlock = '';
          }
          result.push({ type: 'text', content: child.text });
        }
      });
    }
  });

  // Push any remaining code block
  if (codeBlock) {
    result.push({ type: 'code', content: codeBlock });
  }

  return result;
};


export const renderContent = (item) => {
  switch (item.type) {
    case 'list':
      return (
        <ul className={item.format === 'ordered' ? 'list-decimal' : 'list-disc'}>
          {item.children.map((child, index) => (
            <li key={index}>{renderContent(child)}</li>
          ))}
        </ul>
      );
    case 'list-item':
      return item.children.map((child, index) => renderContent(child));
    case 'text':
      let textElement = item.text;
      if (item.bold) {
        textElement = <strong>{textElement}</strong>;
      }
      if (item.code) {
        textElement = <code className="bg-gray-100 p-1 rounded">{textElement}</code>;
      }
      return textElement;
    case 'heading':
      const HeadingTag = `h${item.level}`;
      return <HeadingTag className="font-bold my-2">{item.children.map((child, index) => renderContent(child))}</HeadingTag>;
    case 'code':
      return (
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          <code>{item.children.map(child => child.text).join('\n')}</code>
        </pre>
      );
    case 'image':
      return (
        <figure className="my-4">
          <img
            src={item.image.url}
            alt={item.image.alternativeText || ''}
            className="max-w-full h-auto"
          />
          {item.image.caption && <figcaption className="text-center text-sm mt-2">{item.image.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
};

export const renderDescription = (desc) => {
  return desc.map((item, index) => {
    switch (item.type) {
      case 'text':
        return <span key={index}>{item.content}</span>;
      case 'code':
        return <code key={index} className="bg-gray-100 p-1 rounded">{item.content}</code>;
      default:
        return null;
    }
  });
};
