const Button = ({ onClick, type, placeHolder, bg }) => {
  return (
    <button
      type={type}
      className={`w-32 text-sm text-gray-900 bg-${
        bg ? bg : 'white'
      } hover:bg-gray-400  h-12 mx-5 uppercase focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-pink-500 rounded-lg`}
      onClick={onClick}
    >
      {placeHolder}
    </button>
  );
};

export default Button;
