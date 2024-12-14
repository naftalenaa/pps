import banner from '../assets/banner.png';

const Banner = () => (
  <div className="relative h-[500px] bg-[#E8F3F3]">
    <img
      src={banner}
      alt="Fresh vegetables"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
);

export default Banner;
