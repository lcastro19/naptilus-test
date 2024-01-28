import { useLocation, useNavigate } from "react-router-dom"

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const backMain = () => {
        if (location.search === '') navigate(-1)
    }
    return (
        <header>
            <div className='container'>
                <img
                    onClick={backMain}
                    src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png" />
                <span className='title'>
                    Oompa Loompa's Crew
                </span>
            </div>
        </header>
    )
}
