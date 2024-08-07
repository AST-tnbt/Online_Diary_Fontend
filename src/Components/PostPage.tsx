import { Link } from "react-router-dom"

interface PostPgaeProp {
  username : string;
}

export default function PostPage({username}: PostPgaeProp) {
  return (
    <div className="w-full min-h-screen pt-20 pb-20 bg-gradient-to-t from-[#B5C18E] to-white">
        <Link to={`/home/${username}`}>
          <h2 className="ml-16 font-mont text-lg font-medium underline">Back to home</h2>
        </Link>
        <div className="w-[80%] min-h-[500px] m-auto p-10 bg-[#fff] rounded-md mt-20 shadow-sm">
            {/* <input type="text" placeholder="Title" className="font-mont text-xl outline-none w-full font-medium"/> */}
            <h1 className="font-mont text-xl outline-none w-full font-medium">Title</h1>
            <div className="h-[1px] bg-[#333]"></div>
            {/* <textarea name="content" id=""  className="w-full min-h-screen text-lg mt-2 outline-none font-mont" /> */}
            <p className="w-full text-lg mt-2 outline-none font-mont" >
                Bali is predominantly a Hindu country. Bali is known for its elaborate, traditional dancing. The dancing is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil. To watch the dancing is a breathtaking experience. Lombok has some impressive points of interest – the majestic Gunung Rinjani is an active volcano. It is the second highest peak in Indonesia. Art is a Balinese passion. Batik paintings and carved statues make popular souvenirs. Artists can be seen whittling and painting on the streets, particularly in Ubud. It is easy to appreciate each island as an attractive tourist destination. Majestic scenery; rich culture; white sands and warm, azure waters draw visitors like magnets every year. Snorkelling and diving around the nearby Gili Islands is magnificent. Marine fish, starfish, turtles and coral reef are present in abundance. Bali and Lombok are part of the Indonesian archipelago. Bali has some spectacular temples. The most significant is the Mother Temple, Besakih. The inhabitants of Lombok are mostly Muslim with a Hindu minority. Lombok remains the most understated of the two islands. Lombok has several temples worthy of a visit, though they are less prolific. Bali and Lombok are neighbouring islands.
            </p>
        </div>
    </div>
  )
}
