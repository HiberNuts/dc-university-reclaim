import { CodeBlock, dracula } from "react-code-blocks";

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
  if (codeBlock) {
    result.push({ type: 'code', content: codeBlock });
  }

  return result;
};


export const renderContent = (item) => {
  switch (item.type) {
    case 'list':
      return (
        <div className={`ml-4 ${item.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
          {item.children.map((child, index) => (
            <div key={index} className="ml-2">
              {renderContent(child)}
            </div>
          ))}
        </div>
      );
    case 'paragraph':
      return (
        <div className={` ${item.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
          {item.children.map((child, index) => (
            <div key={index} className="ml-2">
              {renderContent(child)}
            </div>
          ))}
        </div>
      );
    case 'list-item':
      return (
        <div className="flex items-start mb-1">
          <span className="mr-2">{item.format === 'ordered' ? `${index + 1}.` : '•'}</span>
          <div>{item.children.map((child, index) => renderContent(child))}</div>
        </div>
      );
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
    case 'link':
      return (
        <a href={item.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
          {item.children.map((child, index) => renderContent(child))}
        </a>
      );
    case 'quote':
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic">
          {item.children.map((child, index) => renderContent(child))}
        </blockquote>
      );
    case 'code':
      return (
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          <CodeBlock
            language="javascript"
            text={item.children.map(child => child.text).join('\n')}
            theme={dracula}
            className="custom-copy-block"
          />

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
}


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
