
export default function Privacy(props) {

    return (
        <div class="pt-48">
        <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p class="uppercase tracking-loose w-full">We don't collect any data</p>
            <p class="leading-normal text-2xl mb-8">
                The data shown are read directly by Spotify through the API. <br/>
                We do not collect any of your data on our servers.
            </p>
            <p class="leading-normal text-2xl mb-8">
                The only cookie we use is that of Google Analitycs to monitor traffic.
            </p>
          </div>
         <div class="w-full md:w-3/5 py-6 text-center">
            <img class="w-full md:w-4/5 z-50" src="/images/music_6.jpg" alt="music" />
          </div>
        </div>
      </div>

    )

}