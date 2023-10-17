import Link from "next/link";

export default function NotFound() {
  return (
    <div className="global ">
      <h2>Tweet Not Found</h2>
      
      <div >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 64" aria-labelledby="title"
        aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>Skull Head</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <circle data-name="layer2"
        cx="20" cy="36" r="8" fill="none" stroke="#202020" stroke-miterlimit="10"
        stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></circle>
        <circle data-name="layer2" cx="44" cy="36" r="8" fill="none"
        stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"
        stroke-linecap="round"></circle>
        <path data-name="layer1" d="M48 58a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4v-6h-2a8 8 0 0 1-8-8V28A26 26 0 0 1 32 2a26 26 0 0 1 26 26v16a8 8 0 0 1-8 8h-2zM32 45.1V48m0 8v6m-8-6v6m16-6v6"
        fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"
        stroke-linecap="round"></path>
      </svg>


      </div>
      <Link href="/">Return Home</Link>
    </div>
  );
}