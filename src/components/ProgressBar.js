import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, imageUrl, setIsShowProgress }) => {
  useEffect(() => {
    if (imageUrl) {
      setIsShowProgress(false);
    }
  }, [imageUrl, setIsShowProgress]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
};

export default ProgressBar;
