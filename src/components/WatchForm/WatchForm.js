import React from 'react';

import './WatchForm.css';
import {useField} from '../../hooks'



function WatchForm({onSubmit}) {

  const title = useField('');
  const director = useField('');

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit({
      title: title.value,
      director: director.value,
      isDone: false,
    });
    
  }

  return (
    <form className="watch-form" onSubmit={onFormSubmit}>
      <input type="text" name="title" {...title} />
      <input
        type="text"
        name="director"
        {...director}
      />
      <button className="add">Add</button>
    </form>
  );
}

export default WatchForm;
