import BackToTop from 'react-easy-back-to-top';

export default function BackToTopBtn() {
  return (
    <BackToTop
      backgroundColor="#2371b1"
      position={{ right: '1%', bottom: '6%' }}
      hover={{ backgroundColor: 'rgb(170, 72, 72)', color: 'white' }}
      transition="all 0.15s"
      showOnDistance={500}
      borderRadius={50}
      opacity="1"
      color="white"
      fontSize="24px"
      text="UP"
    />
  );
}
