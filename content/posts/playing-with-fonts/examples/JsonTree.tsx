import React, { useEffect, useState } from 'react';
import { getFont } from 'react-warp-text';
import { JsonTree as BaseJsonTree } from 'gatsby-plugin-bluewings';

function JsonTree({ message, fontFamily }: any) {
  const [glyphs, setGlyphs] = useState();
  useEffect(() => {
    (async () => {
      const { font } = await getFont(fontFamily);
      setGlyphs(font.stringToGlyphs(message));
    })();
  }, [fontFamily, message]);

  return (
    <div>
      {glyphs && <BaseJsonTree data={glyphs} shouldExpandNode={shouldExpandNode} labelRenderer={labelRenderer} />}
    </div>
  );
}

export default JsonTree;

const shouldExpandNode = (keyName: string[]) => {
  const [firstKeyName] = keyName;
  return ['root', 0, 'path'].indexOf(firstKeyName) !== -1;
};

const labelRenderer = (raw: any[]) => {
  if (['path', 'commands'].indexOf(raw[0]) !== -1) {
    return <span style={{ background: '#E3342F', color: '#fff' }}>{raw[0].toString()}</span>;
  }
  return (raw[0] && raw[0].toString()) || '0';
};
