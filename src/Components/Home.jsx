export function Home() {
  // return (
  //   <>
  //     <div className="flex-1 flex flex-col border-2 border-yellow-300">
  //       <section className="max-h-dvh flex border-2 border-pink-400">
  //         <img
  //           className="flex-1 object-scale-down h-dvh aspect-square"
  //           src="https://theenterpriseworld.com/wp-content/uploads/2025/10/1.1-Before-You-Watch-Any-Other-Movie-See-These-20-Highest-Grossing-Movies-of-All-Time.jpg"
  //           alt="movies-home"
  //         />
  //
  //         <div className="flex-1 flex justify-center items-center">
  //           <p className="text-4xl">text</p>
  //         </div>
  //       </section>
  //
  //       <section className="min-h-dvh flex justify-between">
  //         <div>
  //           <p>img</p>
  //         </div>
  //
  //         <div>
  //           <p>text</p>
  //         </div>
  //       </section>
  //
  //       <section className="min-h-dvh flex justify-between">
  //         <a href="/shows">Explore Now</a>
  //       </section>
  //     </div>
  //   </>
  // );

  return (
    <>
      <section className="grid h-dvh grid-rows-2 md:grid-cols-2 md:grid-rows-1 bg-blue-950 text-gray-300">
        <div className="object-center">
          <img
            // src="https://theenterpriseworld.com/wp-content/uploads/2025/10/1.1-Before-You-Watch-Any-Other-Movie-See-These-20-Highest-Grossing-Movies-of-All-Time.jpg"

            src="https://irp.cdn-website.com/e0446a5f/dms3rep/multi/opt/Best+Favourite+Films+of+2025+ALL-6f363e45-1920w.png"
            alt="Film projector in a dark room"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-8 md:px-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            All your movies, one place
          </h2>
          <p className="mt-4 max-w-lg text-lg">
            MovieExplorer lets you browse thousands of films, check ratings and
            release years, and read short summaries without leaving the page.
          </p>
        </div>
      </section>

      <section className="grid h-dvh grid-rows-2 md:grid-cols-2 md:grid-rows-1 text-gray-300 bg-gray-900 ">
        <div className="overflow-hidden md:order-2">
          <img
            src="https://images.unsplash.com/photo-1620510625142-b45cbb784397?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt="Popcorn and a film reel"
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-8 md:order-1 md:px-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            Find your next favorite
          </h2>
          <p className="mt-4 max-w-lg text-lg ">
            Not sure what to watch tonight? Search by title, scroll through
            popular picks, and open any movie to see its details.
          </p>
        </div>
      </section>

      <section
        className="h-dvh text-gray-200 bg-cover bg-center
				           bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.9)),url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1')]"
        // style={{
        //   backgroundImage:
        //     "url(https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D)",
        // }}
      >
        <div className="flex h-full flex-col items-center justify-center px-4 text-center">
          <h2 className="text-4xl font-extrabold md:text-6xl">
            Ready to start watching?
          </h2>
          <p className="mt-4 max-w-md text-lg ">
            The full movie list is waiting for you.
          </p>
          <a
            href="/shows"
            className="mt-8 rounded-lg bg-red-600 px-8 py-4 text-lg font-semibold hover:bg-red-700 hover:scale-110 transition-all duration-200"
          >
            Explore Now
          </a>
        </div>
      </section>
    </>
  );
}
