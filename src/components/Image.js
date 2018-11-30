import React from "react";

const Image = props => {
  const imageUrl = props.image.images ? props.image.images.preview_gif.url : '';
  return (
    <div className="image">
        <img
          width="200"
          alt={`The image titled: ${props.image.slug}`}
          src={imageUrl}
        />
    </div>
  );
};

export default Image;