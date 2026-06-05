import { useEffect } from 'react';

const useSEO = ({ title, description, keywords }) => {
  useEffect(() => {
    // Standardize Title
    if (title) {
      document.title = title;
    }

    // Update Meta Description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content = description;
        document.head.appendChild(metaDescription);
      }
    }

    // Update Meta Keywords
    if (keywords && keywords.length > 0) {
      const keywordsString = keywords.join(', ');
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywordsString);
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        metaKeywords.content = keywordsString;
        document.head.appendChild(metaKeywords);
      }
    }
  }, [title, description, keywords]);
};

export default useSEO;
