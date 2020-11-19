import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faTimes,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  projectFirestore,
  projectStorage,
  timestamp,
} from '../firebase/config';
import ProgressBar from './ProgressBar';

const UploadForm = ({ currentUser }) => {
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [isShowProgress, setIsShowProgress] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (imageFile !== null) {
      setIsShowProgress(true);
      const imageRef = projectStorage
        .ref()
        .child(`${currentUser.uid}/${imageFile.name}`);

      imageRef.put(imageFile).on(
        'state_changed',
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          setError(error);
        },
        async () => {
          const url = await imageRef.getDownloadURL();
          setImageUrl(url);
        },
      );
    }
  }, [currentUser.uid, imageFile]);

  const onChangeFile = useCallback((e) => {
    const types = ['image/png', 'image/jpeg'];
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setImageFile(selected);
      setError('');
    } else {
      setImageFile(null);
      setError('png 또는 jpg 이미지 파일만 지원합니다.');
    }
  }, []);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (text === '') return;

      try {
        const tweetObj = {
          text,
          createdAt: timestamp(),
          creatorId: currentUser.uid,
          imageUrl,
        };
        await projectFirestore.collection('tweets').add(tweetObj);
      } catch (error) {
        console.error(error);
        setError('오류 발생');
      }
      setText('');
      setImageFile(null);
      setImageUrl('');
      setError('');
    },
    [text, currentUser.uid, imageUrl],
  );

  const onRemoveImage = useCallback(async () => {
    setImageFile(null);
    setImageUrl('');
    await projectStorage.refFromURL(imageUrl).delete();
  }, [imageUrl]);

  return (
    <div className="upload-form-block">
      <form onSubmit={onSubmit}>
        <div className="text-form">
          <input
            type="text"
            placeholder="오늘 하루는 어땠나요?"
            value={text}
            onChange={onChangeText}
            maxLength={120}
            required
          />
          <button>{<FontAwesomeIcon icon={faAngleRight} />}</button>
        </div>
        <div className="image-form">
          {!imageFile && (
            <>
              <label>
                <input type="file" accept="image/*" onChange={onChangeFile} />
                <FontAwesomeIcon icon={faPlus} />
              </label>
              <p>사진 추가하기</p>
            </>
          )}
          {imageFile && (
            <div className="output">
              <span className="file-name">{imageFile.name}</span>
              {imageUrl && (
                <div className="image-preview">
                  <img src={imageUrl} alt={imageFile.name} />
                  <div className="remove-preview" onClick={onRemoveImage}>
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </div>
              )}
              {isShowProgress && (
                <ProgressBar
                  progress={progress}
                  setIsShowProgress={setIsShowProgress}
                  imageUrl={imageUrl}
                />
              )}
            </div>
          )}
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
