import { useState, useEffect } from 'react';

import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [commentSubmitSuccess, setCommentSubmitSuccess] = useState(false);
  const [localStorageData, setLocalStorage] = useState(null);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false,
  });

  const onInputChange = (e) => {
    const { target } = e;

    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleCommentSubmission = () => {
    setError(false);

    const { name, email, comment, storeData } = formData;

    if (!name || !email || !comment) {
      setError(true);
      return;
    }

    const commentData = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    submitComment(commentData).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = '';
          formData.email = '';
        }
        formData.comment = '';
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));

        setCommentSubmitSuccess(true);
        setTimeout(() => {
          setCommentSubmitSuccess(false);
        }, 3000);
      }
    });
  };

  useEffect(() => {
    setLocalStorage(window.localStorage);

    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData:
        window.localStorage.getItem('name') ||
        window.localStorage.getItem('email'),
    };

    setFormData(initalFormData);
  }, []);

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Leave a Reply
      </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          name='comment'
          placeholder='Comment'
          value={formData.comment || ''}
          onChange={onInputChange}
          className='p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name || ''}
          onChange={onInputChange}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email || ''}
          onChange={onInputChange}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            type='checkbox'
            id='storeData'
            name='storeData'
            value='true'
            checked={formData.storeData}
            onChange={onInputChange}
          />
          <label
            className='text-gray-500 cursor-pointer ml-2'
            htmlFor='storeData'>
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className='text-xs text-red-500'>All fields are required.</p>
      )}
      <div className='mt-8'>
        <button
          type='button'
          onClick={handleCommentSubmission}
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
          Post Comment
        </button>
        {commentSubmitSuccess && (
          <span className='text-xl float-right font-semibold mt-3 text-green-500'>
            Comment submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
