import ReactLoading from 'react-loading';
import "./SpinningLoader.css"


export default function LandingImages(props) {


    return (
        <div className='spinning-loader-container'>
            <ReactLoading type={"spinningBubbles"}></ReactLoading>
        </div>
    )
}