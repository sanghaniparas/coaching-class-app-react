import React from 'react';
import { Helmet } from 'react-helmet';

const JsonLd = ({ data }) => {
  return (
    <div>
      <Helmet>
        <script type="application/ld+json">{data}</script>
      </Helmet>
    </div>
  );
};

export default JsonLd;
