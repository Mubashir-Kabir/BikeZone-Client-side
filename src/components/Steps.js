const Steps = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div></div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight  sm:text-4xl md:mx-auto">
          Welcome To Bike Zone
        </h2>
        <p className="text-base  md:text-lg">
          A perfect place to deal with your dream and bring it to reality
        </p>
      </div>
      <div className="grid gap-8 row-gap-8 lg:grid-cols-3">
        <div className="sm:text-center">
          <div className="flex items-center justify-center w-24 h-24 mb-4 text-5xl font-extrabold rounded-full  bg-primary sm:mx-auto">
            1
          </div>
          <h6 className="mb-2 font-semibold leading-5">
            Buy second hand bikes
          </h6>
          <p className="max-w-md mb-3 text-sm sm:mx-auto">
            Choose a category. find the best fit for you. Meet with Sellers.
            Grab your deal. Yoy can safe payment through us.
          </p>
        </div>
        <div className="sm:text-center">
          <div className="flex items-center justify-center w-24 h-24 mb-4 text-5xl font-extrabold rounded-full  bg-primary sm:mx-auto">
            2
          </div>
          <h6 className="mb-2 font-semibold leading-5">Sell your old one</h6>
          <p className="max-w-md mb-3 text-sm  sm:mx-auto">
            Create a seller account if you want to sell your old bike. Add bike
            details with picture and wait for the deal.
          </p>
        </div>
        <div className="sm:text-center">
          <div className="flex items-center justify-center w-24 h-24 mb-4 text-5xl font-extrabold rounded-full  bg-primary sm:mx-auto">
            3
          </div>
          <h6 className="mb-2 font-semibold leading-5">Be yourself</h6>
          <p className="max-w-md mb-3 text-sm  sm:mx-auto">
            You can't sell from buyer account and also can't buy from seller
            account. this is for your security purpose.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
