import { TimeProgressBar } from "../components/time_progress_bar"
const Planet =  require("../assets/images/planet.png")

export const Title = () => {
    const imgSize = 300
    
    return (
        <div className="flex flex-col w-4/5 relative">
            <h1 className="text-7xl mb-12 absolute top-14" style={{zIndex: 100}}>
                EXPLORE YOUR OWN PLANET <br /> IN <span className="text-white outlined">OUR NEW</span> METAVERSE
            </h1>
            <div className="self-end rounded-full" style={{width: 300, height: 300}}>
                <TimeProgressBar>
                    <img src={Planet} width={imgSize} height={imgSize} alt="" />    
                </TimeProgressBar>
            </div>
            <div className="w-4/12">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nobis quis atque corporis voluptatem recusandae ut vero laboriosam enim architecto temporibus porro autem, 
                e   sse blanditiis accusantium sint itaque sequi minima similique nemo at? Neque, quisquam?
            </div>
        </div>
    )
}