import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faTimes,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { projectFirestore, projectStorage } from '../firebase/config';

const UploadForm = ({ currentUser }) => {
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [error, setError] = useState('');

  function processFile(file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onerror = () => setError('오류 발생');
    reader.onloadend = (e) => {
      const { result } = e.target;
      setImageDataUrl(result);
    };
  }

  const onChangeFile = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      processFile(file);
    }
  }, []);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (text === '') return;

      let imageUrl = '';
      if (imageDataUrl) {
        const imageRef = projectStorage
          .ref()
          .child(`${currentUser.uid}/${Date.now()}_${imageFile.name}`);
        const result = await imageRef.putString(imageDataUrl, 'data_url');
        imageUrl = await result.ref.getDownloadURL();
      }

      try {
        const tweetObj = {
          text,
          createdAt: Date.now(),
          creatorId: currentUser.uid,
          creatorName: currentUser.displayName,
          imageUrl,
        };
        await projectFirestore.collection('tweets').add(tweetObj);
      } catch (error) {
        console.error(error);
        setError('오류 발생');
      }
      setText('');
      setImageFile(null);
      setImageDataUrl('');
      setError('');
    },
    [text, imageFile, imageDataUrl, currentUser.uid, currentUser.displayName],
  );

  const onRemoveImage = useCallback(async () => {
    setImageFile(null);
    setImageDataUrl('');
  }, []);

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
          {imageFile && imageDataUrl && (
            <div className="output">
              <span className="file-name">{imageFile.name}</span>
              <div className="image-preview">
                <img src={imageDataUrl} alt={imageFile.name} />
                <div className="remove-preview" onClick={onRemoveImage}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            </div>
          )}
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
