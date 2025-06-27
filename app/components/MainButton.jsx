import Image from "next/image";

const Button = ({ text, icon }) => {
  const handleClick = () => {
    const targetElement = document.getElementById("hrLine");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <button
      onClick={handleClick}
      className="mainButton"
    >
      <span><Image src={icon} className="w-5 mr-2.5" width={20} height={20} alt="button"/></span>
      {text}
    </button>
  );
};

export default Button;
