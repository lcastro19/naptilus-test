import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { urlBase } from "../common"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setItem } from "../redux/slices"


export const Details = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const items = useSelector((state) => state.item);
    const filterId = () => { return items?.filter(item => item.id === id)?.[0] }

    const fetchData = async () => {
        try {
            const now = new Date().getTime();
            const oneDayInMillis = 24 * 60 * 60 * 1000;
            const lastRequested = filterId()?.lastRequested
            if (!lastRequested || now - lastRequested > oneDayInMillis) {
                const response = await axios.get(`${urlBase}/${id}`);
                dispatch(setItem({ ...response.data, lastRequested: now, id }));
            }
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="container">
            {filterId() && <div className="items-group" style={{ marginTop: '24px' }}>
                <img src={filterId().image} alt="" />
                <div className="card">
                    <h3>{`${filterId().first_name} ${filterId().last_name}`}</h3>
                    <span className="other" >{filterId().gender === 'M' ? 'Man' : 'Women'}</span>
                    <i className="other">{filterId().profession}</i>
                    <div style={{ marginTop: '20px' }}
                        dangerouslySetInnerHTML={{ __html: filterId().description }}>
                    </div>
                </div>
            </div>}
        </div>
    )
}
