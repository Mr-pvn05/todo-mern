import { Oval } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div>
      <Oval
        visible={true}
        height="30"
        width="30"
        color="#ffffff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
