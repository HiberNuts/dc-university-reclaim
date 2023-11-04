import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HTMLRenderer from 'react-html-renderer';

const Courseplace = () => {
  const [moduleContent, setModuleContent] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/courses/1?populate=deep')
      .then((response) => {
        const content =
          response.data?.data?.attributes?.module?.[0]?.chapter?.[0]?.content;
        console.log(content);
        if (content) {
          setModuleContent(content);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="flex justify-center align-middle">
      {/* <div className="flex justify-center align-middle w-[80%] flex-col" dangerouslySetInnerHTML={{ __html: moduleContent }} /> */}
      <div className="flex justify-center align-middle w-[80%] flex-col">
        <HTMLRenderer
          html={moduleContent}
          components={{
            h1: props => <h1 className='prose-h1' color="red" {...props} />,
            // h2: Subheading,
            // a: Link,
          }}
        />
      </div>
    </div>
  );
};

export default Courseplace;
