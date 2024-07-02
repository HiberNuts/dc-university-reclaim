exports.mapRichTextNodesToSchema = (nodes) => {
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