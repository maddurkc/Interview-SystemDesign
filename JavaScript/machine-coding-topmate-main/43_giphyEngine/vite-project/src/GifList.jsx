const GifList = ({ gifs }) => {
  return (
    <div>
      {gifs.map((gif) => (
        <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
      ))}
    </div>
  );
};

export default GifList;
